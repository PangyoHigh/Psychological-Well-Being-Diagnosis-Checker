<template>
  <div class="mx-7">
    <div class="d-flex justify-center">
      <v-card variant="tonal" class="mt-5">
        <h1 class="mt-3 mx-4">마음EASY 선별 검사 결과</h1>

        <br />

        <div class="d-flex justify-center mb-5 ga-3">
          <v-btn variant="tonal" @click="share"
            ><v-icon>mdi-share-variant</v-icon> 공유하기</v-btn
          >
          <v-btn variant="tonal" @click="saveAsPdf"
            ><v-icon>mdi-download</v-icon> 다운로드</v-btn
          >
        </div>
      </v-card>
    </div>

    <br />

    <div v-show="agreed" id="main">
      <v-card-title>학생 기본 정보</v-card-title>

      <table class="header-table">
        <thead>
          <tr>
            <th>학년</th>
            <th>성별</th>
            <th>검사완료일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ studentGrade }}</td>
            <td>{{ gender === "boy" ? "남자" : "여자" }}</td>
            <td>{{ date }}</td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <v-card-title>종합 점수</v-card-title>
      <table class="mb-2">
        <thead>
          <tr>
            <th>구분</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ getCategoryByTotalScore(gender, totalScore) }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colspan="2">종합 점수</th>
            <th>T점수</th>
            <th>백분위</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">{{ totalScore }}점</td>
            <td>
              {{ convertScoreToTScore("종합점수", gender, totalScore) }}점
            </td>
            <td>
              {{ convertScoreToPercentage("종합점수", gender, totalScore) }}%
            </td>
          </tr>
          <tr>
            <td colspan="5" class="text-left text-justify">
              {{
                reading["종합점수"][getCategoryByTotalScore(gender, totalScore)]
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      <v-card-title>하위요인 프로파일</v-card-title>

      <div style="display: none" id="myChart"></div>
      <v-img :src="chartImage" alt="chart" class="w-full my-5" />

      <v-table class="responsive-table">
        <tbody>
          <div
            v-for="scoreKey in [
              '불안 및 우울 문제',
              '자살 및 위기 문제',
              '외현화 문제',
              '심리외상 문제',
              '학교생활적응 문제',
            ]"
            :key="scoreKey"
            class="mb-4"
          >
            <tr style="background-color: #f2f2f2; font-size: 18px;">
              <td colspan="2">
                <b>{{ scoreKey }}</b>
              </td>
              <td>
                <b>
                  {{
                    categoryByTScore(
                      convertScoreToTScore(
                        scoreKey,
                        gender,
                        JSON.parse(scores)[scoreKey]
                      )
                    )
                  }}
                </b>
              </td>
            </tr>

            <tr>
              <td>{{ JSON.parse(scores)[scoreKey] }}점 (점수)</td>
              <td>
                {{
                  convertScoreToTScore(
                    scoreKey,
                    gender,
                    JSON.parse(scores)[scoreKey]
                  )
                }}점 (T점수)
              </td>
              <td>
                {{
                  convertScoreToPercentage(
                    scoreKey,
                    gender,
                    JSON.parse(scores)[scoreKey]
                  )
                }}% (백분위)
              </td>
            </tr>
            <tr style="font-size: 1rem">
              <td colspan="4" class="text-justify">
                <strong>해석:</strong>
                {{
                  reading[scoreKey][
                    categoryByTScore(
                      convertScoreToTScore(
                        scoreKey,
                        gender,
                        JSON.parse(scores)[scoreKey]
                      )
                    )
                  ]
                }}
              </td>
            </tr>
          </div>
        </tbody>
      </v-table>
    </div>

    <v-dialog v-model="taa" fullscreen>
      <v-card>
        <div
          class="text-justify ma-5 pa-6 rounded-lg"
          style="border: 1px solid black; font-size: 18px"
        >
          - 검사결과 <span style="color: red">(우선)관심군</span>인 경우
          <span style="color: blue">전문가의 치료적 도움과 평가</span>를 받기를
          강력하게 권유합니다.<br /><br />
          - 판교고 <span style="color: blue">1층 위(Wee) 클래스 상담실</span>에
          방문하시면,
          <span style="color: blue">보다 정확한 검사와 전문적인 도움</span>을
          받을 수 있습니다.

          <br />
          <br />

          <p v-if="!timerFinished">남은 시간: {{ timeLeft }}초</p>
          <p v-else>체크박스를 활성화할 수 있습니다.</p>

          <v-checkbox
            v-model="agreed"
            :disabled="!timerFinished"
            label="나는 안내를 다 읽었다"
          ></v-checkbox>

          <v-btn
            :disabled="!agreed || !timerFinished"
            @click="taa = false"
            variant="tonal"
            block
          >
            시작하기
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <div style="color: blue; font-size: 18px" class="mt-3">
      판교고 1층 위(Wee) 클래스 상담실에 방문하시면, 보다 정확한 검사와 전문적인
      도움을 받을 수 있습니다.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Plotly from "plotly.js-dist-min";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const route = useRoute();
const { gender, totalScore, scores, date, studentGrade } = route.query;
const taa = ref(true);
const agreed = ref(false);
const timerFinished = ref(false);
const timeLeft = ref(5);

const reading = {
  종합점수: {
    일반군:
      "전반적인 마음건강과 관련한, 혹은 기준 점수에 해당하는 하위요인과 관련된 심각한 문제가 나타나지 않는다. 일상생활 및 학교생활에 대체로 잘 적응하고 있고, 일상에서 나타날 수 있는 문제들과 어려움에 적절히 대처할 수 있다.",
    관심군:
      "전반적인 마음건강과 관련한, 혹은 기준 점수에 해당하는 하위요인과 관련된 심리적 문제가 나타날 가능성이 있다. 검사 대상자가 관심군에 속할 경우, 일상에서 나타날 수 있는 문제들에 대해 적절히 대처하지 못할 수 있다. 관심군 대상에게 지속적인 관심을 가지고 상태를 점검할 필요가 있다.",
    우선관심군:
      "전반적인 마음건강과 관련한, 혹은 기준 점수에 해당하는 하위요인과 관련된 심리적 문제가 나타날 가능성이 상당히 높다. 검사 대상자가 우선 관심군에 속할 경우, 일상에서 나타날 수 있는 문제들에 대한 적절한 대처능력이 부족하거나 사회적으로 일탈된 방식으로 나타날 가능성이 상대적으로 높다. 우선 관심군 대상에게 지속적인 관심을 가지고 상태를 면밀히 점검할 필요가 있으며, 보다 섬세한 생활지도나 전문가의 심리개입이 필요할 수 있다.",
  },
  "불안 및 우울 문제": {
    일반군:
      "임상적인 수준의 불안 및 우울 문제가 나타나지 않는다. 일상생활에서 걱정이나 두려움, 죄책감 등으로 인한 정서적 불안이나, 우울과 관련된 무기력, 의욕저하 등의 문제가 크게 없다.",
    관심군:
      "임상적인 수준의 불안 및 우울 문제가 나타날 가능성이 다소 있다. 긴장, 감정기복, 죄책감, 신경질, 의욕저하, 걱정 등의 문제를 보일 수 있고, 경우에 따라 이를 인하여 학업이나 일상생활에서 수행이 다소 방해받을 수 있다.",
    우선관심군:
      "임상적인 수준의 불안 및 우울 문제가 나타날 가능성이 높다. 긴장, 감정기복, 죄책감, 신경질, 의욕저하, 걱정 등의 문제가 자주 또는 지속적으로 나타날 수 있고, 경우에 따라 이를 인하여 학업이나 일상생활 기능에 심한 영향을 줄 수 있다. 이 외에 일반적인 심리상태의 범위를 넘어서 사회적, 학교적 적응을 심각하게 저해할 수 있는 정서 문제의 근본 원인을 탐색하여 해결하도록 도움을 필요로 한다.",
  },
  "자살 및 위기 문제": {
    일반군:
      "자살 및 심각한 정신적 문제와 같은 중대한 위험 증상들과 관련된 위험성이 나타나지 않는다.",
    관심군:
      "자살 및 심각한 정신적 문제와 같은 중대한 위험 증상들의 위험성이 나타날 가능성이 다소 있다. 자해, 자살계획 및 의도, 현실도피, 무망감 등의 문제가 발생할 가능성이 있다. 우선 관심군의 이들에겐 자살이나 자해 등 부정적인 반응을 예방하고 위기 상황을 지연시키기 위해 자살위기개입과 같은 전문적인 지원과 지속적인 모니터링을 지속적으로 실시할 필요가 있다.",
    우선관심군:
      "자살 및 심각한 정신적 문제와 같은 중대한 위험 증상들이 발생할 가능성이 강력하게 존재한다. 자해, 자살계획 및 의도, 현실도피, 무망감 등이 나타날 가능성이 높다. 우선 관심군의 이들에겐 자살이나 자해 등 부정적인 반응을 예방하고 위기 상황을 지연시키기 위해 자살위기개입과 같은 전문적인 지원 제공과 지속적인 모니터링을 지속적으로 실시할 필요가 있다.",
  },
  "외현화 문제": {
    일반군:
      "임상적인 수준에서 친구와 싸우는 것, 타인을 괴롭히는 것, 상습적인 거짓말, 물건 훔치기 등의 외현화 문제가 나타나지 않는다.",
    관심군:
      "겉으로 나타나는 다양한 행동적 문제의 임상적 수준으로 나타날 가능성이 있다. 예를 들어, 반항행동, 비행행동(도벽, 친구와 싸우는 것, 타인을 괴롭히는 것, 상습적인 거짓말, 물건 훔치기), 지나친 게임 이용, 상급한 등 외현화 문제를 일으킬 수 있다. 그러나 정서 문제와 같은 다른 문제들로 인하여 발생하는 결과일 수도 있음을 고려해야 한다.",
    우선관심군:
      "겉으로 나타나는 다양한 행동적 문제가 임상적 수준의 가능성이 높다. 예를 들어, 반항행동, 비행행동(도벽, 친구와 싸우는 것, 타인을 괴롭히는 것, 상습적인 거짓말, 물건 훔치기), 지나친 게임 이용, 상급한 등 외현화 문제를 일으킬 수 있다. 그러나 정서 문제와 같은 다른 문제들로 인하여 발생하는 결과일 수도 있음을 고려해야 한다. 행동적 문제가 특히 타인에게 해를 미치는 방식으로 나타난다면, 적절한 조치를 취할 필요가 있다.",
  },
  "심리외상 문제": {
    일반군:
      "최근 외상적 경험과 그 경험으로 인한 외상 관련 증상들이 나타나지 않는다.",
    관심군:
      "최근 외상적 경험과 그 경험으로 인한 외상 관련 증상들이 다소 나타날 수 있다. 폭력과 같은 과거 외상적 경험으로 인한 불안, 악몽, 외로움, 회피, 분노, 침울, 우울, 수면 문제 등의 문제가 나타날 수 있다. 일상적으로 하던 일상생활에 지장이 있는지 추가적인 탐색과 조치가 필요하다.",
    우선관심군:
      "최근 외상적 경험과 그 경험으로 인한 외상 관련 증상들이 나타날 가능성이 상당히 있다. 폭력피해와 같은 과거 경험, 과거의 외상 경험이 침울, 우울, 외로움, 회피, 불안, 악몽, 수면 문제, 분노 등의 문제로 나타날 수 있다. 이러한 일상생활에 지장이 있는 추가적인 탐색과 조치(예: 개입자의 문리라 필요하다. 경우에 따라 위기개입을 실시할 필요가 있다.)",
  },
  "학교생활적응 문제": {
    일반군:
      "학교생활에 적응하는 데의 어려움과 대처기술의 저하 수준이 임상적으로 심각하지 않다. 여러 학교생활 영역에서 대체로 잘 적응하며, 큰 문제가 발견되지 않는다.",
    관심군:
      "학교생활에 적응하는 데의 어려움을 경험하고, 대처기술이 부적응적일 수 있다. 일부 학교생활 영역에서 잘 적응하지 못할 수 있다(예: 수업 준비, 등교 거부, 수업 내용 이해의 어려움). 대처기술훈련이나 사회기술훈련, 수면시간 조정 등의 개입이 필요할 수 있다.",
    우선관심군:
      "학교생활에 적응하는 데의 어려움을 경험하고, 대처기술이 부적응적일 가능성이 상당히 있다. 여러 학교생활 영역에서 잘 적응하지 못할 수 있으며, 큰 문제가 발견되며 심도 있는 평가와 개입이 필요하다. 대처기술훈련이나 사회기술훈련, 수면시간 조정 등의 개입이 필요할 수 있다.",
  },
};
const types = ref([
  "불안 및 우울 문제",
  "자살 및 위기 문제",
  "외현화 문제",
  "심리외상 문제",
  "학교생활적응 문제",
]);

const chartImage = ref("");

function share() {
  navigator.share({
    title: "마음EASY 선별 검사 결과",
    text: "마음EASY 선별 검사 결과",
    link: window.location.href,
  });
}

async function saveAsPdf() {
  const captureElement = document.querySelector("#main"); // Capture the whole page
  // Temporarily scale down the entire page
  captureElement.style.transform = "scale(0.8)"; // Shrink everything
  captureElement.style.transformOrigin = "top left"; // Ensure it scales correctly
  captureElement.style.width = "80%"; // Adjust width to match scaling

  await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for UI to adjust

  const canvas = await html2canvas(captureElement, {
    scale: 2, // Capture at higher quality to prevent blurriness
    useCORS: true,
  });

  // Restore original scale
  captureElement.style.transform = "scale(1)";
  captureElement.style.width = "100%";

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const pdfHeight = 297;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let position = 0;
  while (position < imgHeight) {
    pdf.addImage(imgData, "PNG", 0, position * -1, imgWidth, imgHeight);
    position += pdfHeight;
    if (position < imgHeight) {
      pdf.addPage();
    }
  }

  pdf.save("page.pdf");
}

onMounted(() => {
  const categories = types.value.map((scoreKey) =>
    categoryByTScore(
      convertScoreToTScore(scoreKey, gender, JSON.parse(scores)[scoreKey])
    )
  );

  const colors = categories.map((category) => {
    if (category === "일반군") return "#4CAF50"; // Green
    if (category === "관심군") return "#FFC107"; // Amber/Yellow
    if (category === "우선관심군") return "#F44336"; // Red
    return "#90A4AE"; // Default grey fallback
  });

  var data = [
    {
      x: types.value.map((scoreKey) =>
        convertScoreToTScore(scoreKey, gender, JSON.parse(scores)[scoreKey])
      ),
      y: types.value.map((scoreKey) => scoreKey.replace(" 문제", "")),
      type: "bar",
      orientation: "h",
      marker: {
        color: colors,
      },
    },
  ];

  var layout = {
    title: "심리 평가 결과",
    autosize: false,
    width: 800,
    height: 900,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    yaxis: { automargin: true, tickfont: { size: 35 } },
    font: { size: 24 },
  };

  Plotly.newPlot("myChart", data, layout);
  Plotly.toImage("myChart", { format: "png", width: 800, height: 600 }).then(
    (imgData) => {
      chartImage.value = imgData;
    }
  );

  const interval = setInterval(() => {
    timeLeft.value -= 1;
    if (timeLeft.value === 0) {
      timerFinished.value = true;
      clearInterval(interval);
    }
  }, 1000);
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  border: 1px solid #000;
  padding: 8px;
  margin-bottom: 8px;
  width: 240px;
  text-align: center;
}
</style>
