<template>
  <div class="mt-6">
    <div style="position: fixed; top: 0; left: 0; right: 0">
      <v-progress-linear
        v-model="progress"
        color="primary"
        height="16"
        class="mb-4"
      ></v-progress-linear>
    </div>
    <h1 class="text-center">마음EASY 검사</h1>

    <div v-show="agreed" style="display: flex; justify-content: center">
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
        </div>

        <br />
        <br />

        <v-select
          v-model="studentGrade"
          placeholder="학년을 입력해주세요"
          variant="outlined"
          label="학년"
          :items="['1학년', '2학년', '3학년']"
        ></v-select>
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
            <div>
              <th style="font-size: 17px">{{ key }}. {{ value.question }}</th>
              <v-radio-group v-model="value.answer" class="pt-4 ml-3">
                <v-radio label="전혀 아니다" :value="0"></v-radio>
                <v-radio label="조금 그렇다" :value="1"></v-radio>
                <v-radio label="그렇다" :value="2"></v-radio>
                <v-radio label="매우 그렇다" :value="3"></v-radio>
              </v-radio-group>
            </div>
          </tr>
        </v-table>

        <br />

        <v-btn
          color="primary"
          block
          rounded
          @click="submit"
          :disabled="
            Object.values(question).some(({ answer }) => answer === null) ||
            !studentGrade ||
            !gender
          "
        >
          제출
        </v-btn>

        <div class="mt-2 ml-3 text-red">
          <div v-if="!studentGrade">- 학년을 입력해주세요</div>
          <div
            v-if="Object.values(question).some(({ answer }) => answer === null)"
          >
            - 모든 문항에 답해주세요

            <div
              v-if="
                unansweredQuestions.length > 0 &&
                unansweredQuestions.length < Object.values(question).length - 9
              "
              class="mt-4"
            >
              <p class="text-red font-bold">답변하지 않은 문항:</p>
              <ul>
                <li v-for="(q, index) in unansweredQuestions" :key="index">
                  {{ q }}
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div v-if="!gender">- 성별을 선택해주세요</div>
        </div>
      </div>
    </div>

    <br /><br />

    <v-dialog v-model="taa" fullscreen>
      <v-card>
        <v-card-title class="text-h3 mt-3 text-center">안내</v-card-title>

        <div class="text-justify pa-5 rounded-lg">
          - 마음EASY 선별검사는 교육부에서 개발하여 배포한 자료를 판교고
          학생들의 정신건강을 위하여
          <span style="color: blue"
            >위(Wee)클래스와 창체동아리(심장박동&코딩인사이트)</span
          >가 연합하여 판교고 마인즈 앱으로 개발하였습니다.<br /><br />
          - 365일 24시간 언제, 어디서나 검사 가능한 교내 마인즈앱 지원시스템
          구축으로 판교고 학생 마음건강 예방 및 관리 강화의 목적이 있습니다.
          <br /><br />
          - 본 검사는 학년과 성별, 검사 결과 데이터만 저장되기에 개인정보 식별이
          불가합니다<br /><br />
          - 검사 결과는 자신만 볼 수 있습니다.<br /><br />

          <v-checkbox
            v-model="agreed"
            label="나는 안내를 다 읽었고 이에 동의합니다."
          ></v-checkbox>

          <v-btn
            :disabled="!agreed"
            @click="taa = false"
            variant="tonal"
            color="primary"
            block
          >
            시작하기
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-overlay v-model="loading" class="align-center justify-center">
      <v-card class="pa-6">
        <div>
          <p class="text-center mb-4">잠시만 기다려 주세요...</p>
          <div class="d-flex justify-center">
            <v-progress-circular
              color="primary"
              size="64"
              width="7"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      </v-card>
    </v-overlay>
  </div>
</template>

<script setup>
import { ref as dbRef, push } from "firebase/database";

const router = useRouter();

const { $db } = useNuxtApp();

const gender = ref(null);
const taa = ref(true);
const agreed = ref(false);
const loading = ref(false);
const studentGrade = ref("");
const progress = ref(0);
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

const unansweredQuestions = computed(() => {
  return Object.entries(question.value)
    .filter(([_, value]) => value.answer === null)
    .map(([key, value]) => `${key}. ${value.question}`);
});

const setProgress = () => {
  const answered = Object.values(question.value).filter(
    ({ answer }) => answer !== null
  ).length;
  progress.value = (answered / Object.keys(question.value).length) * 100;
};
watch(question, setProgress, { deep: true });

const test = () => {
  for (const key in question.value) {
    question.value[key].answer = Math.floor(Math.random() * 4);
  }
};

const saveToDatabase = (parsedDate, totalScore, link, scores) => {
  const data = {
    studentGrade: studentGrade.value,
    parsedDate,
    totalScore,
    link,
    scores,
  };

  const grade = data.studentGrade;
  const date = new Date();

  const db = dbRef($db, `easy/students/`);
  push(db, data);

  const db2 = dbRef($db, `easy/statistics/`);
  push(db2, {
    grade,
    gender: gender.value,
    scores,
    totalScore,
    question: question.value,
    date: `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`,
  });
};

const submit = () => {
  loading.value = true;

  const scores = types.value.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {});

  for (const key in question.value) {
    const { answer, type } = question.value[key];
    scores[type] += answer;
  }

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
  )}&date=${parsedDate}&studentGrade=${studentGrade.value}`;

  saveToDatabase(parsedDate, totalScore, link, scores);

  const resultData = {
    gender: gender.value,
    totalScore,
    scores,
    date: parsedDate,
    studentGrade: studentGrade.value,
  };

  const encodedData = btoa(encodeURIComponent(JSON.stringify(resultData)));
  router.push({ path: '/test/easy/result', query: { data: encodedData } });
};

onMounted(() => {
  setProgress();
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
