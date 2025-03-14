<template>
  <div>
    <h1 class="text-center">마음EASY 검사</h1>

    <div style="display: flex; justify-content: center">
      <div style="max-width: 650px" class="text-justify mx-4">
        <div
          v-if="alerting"
          style="border: 3px solid black"
          class="pa-3 rounded-lg mt-4"
        >
          <p>
            다음은 <b class="text-decoration-underline">학생 여러분</b>의 최근
            상태를 묻는 설문입니다. 이 검사에는 옳거나 그른 답이 없으므로 자신의
            의견을 있는 그대로 솔직하게 응답하면 됩니다. 다음 각 문항을 읽고,
            주로 <b class="text-decoration-underline">최근 3개월간</b> 자신의
            모습에 해당돤다고 생각하는 곳을 선택해주세요.
          </p>
          <br />
          <p>
            본인에게 전혀 해당되지 않는 경우 ➤ 전혀 아니다<br />
            본인에게 약간은 해당되고 평소 생활에 분명한 영향이 별로 없는 경우 ➤
            조금 그렇다<br />
            본인의 평소 생활에 영향을 주지만 항상 또는 전적으로는 해당되지 않는
            경우 ➤ 그렇다<br />
            본인에게 거의 항상 또는 전적으로 해당되는 경우 ➤ 매우 그렇다
          </p>

          <div class="mt-3 d-flex justify-center">
            <v-btn variant="tonal" @click="alerting = false">닫기</v-btn>
          </div>
        </div>

        <br />

        <v-text-field
          v-model="studentId"
          placeholder="학번을 입력해주세요"
          variant="outlined"
          label="학번"
          :rules="[
            (v) => !!v || '학번을 입력해주세요',
            (v) => /^[0-9]{5}$/.test(v) || '5자리 숫자로 입력해주세요',
          ]"
        ></v-text-field>
        <v-text-field
          v-model="name"
          placeholder="이름을 입력해주세요"
          variant="outlined"
          label="이름"
        ></v-text-field>

        <v-label>성별</v-label>
        <v-radio-group v-model="gender" class="pt-3" inline>
          <v-radio label="남" value="boy"></v-radio>
          <v-radio label="여" value="girl"></v-radio>
        </v-radio-group>

        <br />

        <div style="border: 3px solid black" class="pa-3 rounded-lg">
          <p>지난 3개월간 나는...</p>
        </div>

        <br />

        <v-table>
          <tr v-for="(value, key) in question" :key="key">
            <th>{{ key }}. {{ value.question }}</th>
            <td>
              <v-radio-group v-model="value.answer" class="pt-3">
                <v-radio label="전혀 아니다" :value="0"></v-radio>
                <v-radio label="조금 그렇다" :value="1"></v-radio>
                <v-radio label="그렇다" :value="2"></v-radio>
                <v-radio label="매우 그렇다" :value="3"></v-radio>
              </v-radio-group>
            </td>
          </tr>
        </v-table>

        <br />

        <v-btn
          color="primary"
          block
          @click="submit"
          :disabled="
            Object.values(question).some(({ answer }) => answer === null) ||
            !studentId ||
            !name
          "
        >
          제출
        </v-btn>
      </div>
    </div>

    <v-dialog v-model="taa" fullscreen>
      <v-card>
        <v-card-title class="mt-3 text-center">안내</v-card-title>

        <div
          class="text-justify ma-5 pa-6 rounded-lg"
          style="border: 1px solid black"
        >
          - 해당 검사는 학교 현장에서 학생들의 마음건강 지원 강화를 위해서
          실시하는 검사이며, 검사 후 전문기관 연계 등에 해당 검사결과를 활용할
          수 있습니다.<br /><br />
          - 본 검사는 학교가 학기 초에
          <a
            href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%ED%95%99%EA%B5%90%EB%B3%B4%EA%B1%B4%EB%B2%95"
            >학교보건법 제7조 제6항</a
          >에 대해 학생 및 보호자(학부모)로부터 동의받은 개인정보 이용·수집과
          관련하여 실시하는 검사입니다.<br /><br />
          - 검사결과는 학교생활기록부 또는 건강기록부에 일절 기재되지 않습니다.<br /><br />
          - 무단으로 다른 사람의 검사에 참여하는 경우, 법적 제재를 받을 수
          있습니다.<br /><br />

          <hr />
          <br />

          - 입력한 학번, 이름과 검사결과는 관리자(선생님과 본인)와 개발자만
          확인할 수 있습니다.<br /><br />

          <v-checkbox
            v-model="agreed"
            label="나는 안내를 다 읽었고 이에 동의합니다."
          ></v-checkbox>

          <v-btn :disabled="!agreed" @click="taa = false" variant="tonal" block>
            시작하기
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-overlay v-model="loading" class="align-center justify-center">
      <v-progress-circular
        color="primary"
        size="64"
        width="7"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue, set } from "firebase/database";

const router = useRouter();

const { $db } = useNuxtApp();

const gender = ref(null);
const taa = ref(true);
const agreed = ref(false);
const loading = ref(false);
const studentId = ref("");
const name = ref("");
const alerting = ref(true);
const types = ref([
  "불안 및 우울 문제",
  "자살 및 위기 문제",
  "외현화 문제",
  "심리외상 문제",
  "학교생활적응 문제",
]);
const question = ref({
  1: {
    question: "사람과 있을 때 긴장을 많이 한다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  2: {
    question: "이유 없이 감정기복이 심하다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  3: {
    question: "심각하게 죄책감을 느낀다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  4: {
    question: "예민하고 신경질이 난다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  5: {
    question: "자신감이 부족하다.",
    answer: null,
    type: "학교생활적응 문제",
  },
  6: {
    question: "매사에 의욕이 없고 피곤하다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  7: {
    question: "괜한 걱정을 미리한다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  8: {
    question: "사소한 일에도 불안해지거나 겁이 난다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  9: {
    question: "자주 슬프거나, 기분이 가라앉거나, 우울해진다.",
    answer: null,
    type: "불안 및 우울 문제",
  },
  10: {
    question: "늦게 자서 아침에 일어나기 어렵다.",
    answer: null,
    type: "학교생활적응 문제",
  },
  11: {
    question: "살고 싶지 않다는 생각이 자주 든다.",
    answer: null,
    type: "자살 및 위기 문제",
  },
  12: {
    question: "자해를 한 적이 있다.",
    answer: null,
    type: "자살 및 위기 문제",
  },
  13: {
    question: "자살계획을 구체적으로 세운 적이 있다.",
    answer: null,
    type: "자살 및 위기 문제",
  },
  14: {
    question: "자살을 심각하게 생각하고 있다.",
    answer: null,
    type: "자살 및 위기 문제",
  },
  15: {
    question: "내 삶은 더 이상 희망이 없는 것 같다.",
    answer: null,
    type: "자살 및 위기 문제",
  },
  16: {
    question: "죽으려고 자살을 시도한 적이 있다.",
    answer: null,
    type: "자살 및 위기 문제",
  },
  17: {
    question: "거짓말을 자주 한다.",
    answer: null,
    type: "외현화 문제",
  },
  18: {
    question: "다른 아이들과 자주 다툰다(예: 말싸움 혹은 주먹 다툼).",
    answer: null,
    type: "외현화 문제",
  },
  19: {
    question: "어른(부모, 교사 등)에게 반항적이거나 대든다.",
    answer: null,
    type: "외현화 문제",
  },
  20: {
    question:
      "다른 아이를 놀리거나 괴롭힌 적(언어폭력, 사이버폭력, 신체적폭력 등)이 있다.",
    answer: null,
    type: "외현화 문제",
  },
  21: {
    question:
      "이전에 겪었던 힘든 일들(사건·사고, 가까운 사람과의 이별 또는 사망 등)이 지금도 계속 생각나서 힘들다.",
    answer: null,
    type: "심리외상 문제",
  },
  22: {
    question:
      "힘든 일들(사건·사고, 가까운 사람과의 이별 또는 사망 등)을 겪은 후 악몽을 자주 꾼다.",
    answer: null,
    type: "심리외상 문제",
  },
  23: {
    question:
      "힘든 일들(사건·사고, 가까운 사람과의 이별 또는 사망 등)을 겪은 후 다른 사람을 믿기 어려워 혼자 지낸다.",
    answer: null,
    type: "심리외상 문제",
  },
  24: {
    question:
      "힘든 일들(사건·사고, 가까운 사람과의 이별 또는 사망 등)을 겪은 후 지나치게 안전을 확인한다.",
    answer: null,
    type: "심리외상 문제",
  },
  25: {
    question:
      "힘든 일들(사건·사고, 가까운 사람과의 이별 또는 사망 등)이 생각나는 상황을 피한다.",
    answer: null,
    type: "심리외상 문제",
  },
  26: {
    question: "담배를 자주 피우고 있다.",
    answer: null,
    type: "외현화 문제",
  },
  27: {
    question: "술을 자주 마시고 있다.",
    answer: null,
    type: "외현화 문제",
  },
  28: {
    question: "적응력이나 대처 능력이 또래에 비해 떨어진다.",
    answer: null,
    type: "학교생활적응 문제",
  },
  29: {
    question: "집에서 멀리 떨어져 자는 것이 두렵다(수학여행, 캠프 등)",
    answer: null,
    type: "학교생활적응 문제",
  },
  30: {
    question: "수업 내용을 대부분 이해하기 어렵다.",
    answer: null,
    type: "학교생활적응 문제",
  },
  31: {
    question: "다른 사람의 물건을 부수거나 훔친 적이 있다.",
    answer: null,
    type: "외현화 문제",
  },
  32: {
    question: "게임에 너무 빠진 것 같다.",
    answer: null,
    type: "외현화 문제",
  },
  33: {
    question: "친구를 사귀거나 친밀한 관계를 유지하는 것이 어렵다.",
    answer: null,
    type: "학교생활적응 문제",
  },
  34: {
    question: "학교에 가는 것이 두렵다.",
    answer: null,
    type: "학교생활적응 문제",
  },
  35: {
    question:
      "다른 아이로부터 놀림이나 괴롭힙(언어폭력, 사이버폭력, 신체적폭력 등)을 당하여 힘들다.",
    answer: null,
    type: "심리외상 문제",
  },
  36: {
    question: "다른 아이로부터 따돌림이나 무시를 당하여 힘들다.",
    answer: null,
    type: "심리외상 문제",
  },
});

const test = () => {
  for (const key in question.value) {
    question.value[key].answer = 3;
  }
};

const saveToDatabase = (parsedDate, totalScore, link, scores) => {
  const data = {
    studentId: studentId.value,
    name: name.value,
    parsedDate,
    totalScore,
    link,
    scores,
  };
  // 10822
  const grade = data.studentId.slice(0, 1);
  const classNumber = data.studentId.slice(1, 3);
  const studentNumber = data.studentId.slice(3, 5);

  const db = dbRef(
    $db,
    `easy/students/${grade}/${classNumber}/${studentNumber}`
  );
  set(db, data);
};

const submit = () => {
  loading.value = true;

  // scores for each type
  const scores = types.value.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {});

  // calculate scores
  for (const key in question.value) {
    const { answer, type } = question.value[key];
    scores[type] += answer;
  }

  // calculate total score
  const totalScore = Object.values(question.value).reduce(
    (acc, { answer }) => acc + answer,
    0
  );

  const date = new Date();
  const parsedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const link = `/test/easy/result?gender=${
    gender.value
  }&totalScore=${totalScore}&scores=${JSON.stringify(
    scores
  )}&date=${parsedDate}&studentId=${studentId.value}&name=${name.value}`;

  saveToDatabase(parsedDate, totalScore, link, scores);

  router.push(link);
};

onMounted(() => {
  if (process.env.NODE_ENV === "development") {
    studentId.value = "10822";
    name.value = "이현승";
    taa.value = false;
    agreed.value = true;
    gender.value = "boy";
    test();
  }
});
</script>

<style scoped>
.v-table {
  width: 100%;
  border-collapse: collapse;
}

.v-table th {
  width: 50%;
  padding: 10px;
}
</style>
