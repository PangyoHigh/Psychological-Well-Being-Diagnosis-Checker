<template>
  <div class="container">
    <h1 class="title">마음EASY 검사 통계</h1>

    <v-alert v-if="loading" type="info" class="alert"
      >데이터를 불러오는 중입니다. 잠시만 기다려주세요...</v-alert
    >
    <v-alert v-if="error" type="error" class="alert"
      >데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.</v-alert
    >

    <div v-if="!loading && !error">
      <v-card class="card">
        <h2 class="subtitle">응답 개요</h2>
        <p><strong>총 응답 수:</strong> {{ totalResponses }}</p>
        <p><strong>남학생 응답 수:</strong> {{ genderStats.boy || 0 }}</p>
        <p><strong>여학생 응답 수:</strong> {{ genderStats.girl || 0 }}</p>
      </v-card>

      <v-card class="card">
        <h2 class="subtitle">항목별 점수 및 백분위</h2>
        <v-table class="table">
          <thead>
            <tr>
              <th>문항 유형</th>
              <th>평균 점수</th>
              <th>백분위(남학생)</th>
              <th>백분위(여학생)</th>
              <th>표준편차</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, type) in averageScores" :key="type">
              <td>{{ type }}</td>
              <td>{{ score.toFixed(2) }}</td>
              <td>
                {{
                  convertScoreToPercentage(
                    type,
                    "boy",
                    Math.round(score)
                  )?.toFixed(1) + "%"
                }}
              </td>
              <td>
                {{
                  convertScoreToPercentage(
                    type,
                    "girl",
                    Math.round(score)
                  )?.toFixed(1) + "%"
                }}
              </td>
              <td>{{ standardDeviations[type]?.toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table>
        <div class="download-buttons">
          <v-btn color="secondary" @click="downloadFullData"
            >전체 데이터 다운로드</v-btn
          >
        </div>
      </v-card>

      <v-card class="card">
        <h2 class="subtitle">항목별 점수 및 백분위</h2>
        <v-table class="table">
          <thead>
            <tr>
              <th>학년</th>
              <th>성별</th>
              <th>최종점수</th>
              <th>시간</th>
              <th>결과</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="i in aData"
              :key="aData"
              :style="
                getCategoryByTotalScore(
                  i.link.includes('boy') ? 'boy' : 'girl',
                  i.totalScore
                ) == '우선관심군'
                  ? 'background-color: #ffcccc'
                  : getCategoryByTotalScore(
                      i.link.includes('boy') ? 'boy' : 'girl',
                      i.totalScore
                    ) == '관심군'
                  ? 'background-color: #ffebcc'
                  : ''
              "
            >
              <td>
                {{ i.studentGrade }}
              </td>
              <td>
                {{ i.link.includes("boy") ? "남" : "여" }}
              </td>
              <td>
                {{
                  getCategoryByTotalScore(
                    i.link.includes("boy") ? "boy" : "girl",
                    i.totalScore
                  )
                }}
              </td>
              <td>
                {{ i.parsedDate }}
              </td>
              <td>
                <a :href="i.link"><v-icon>mdi-open-in-new</v-icon></a>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { ref as dbRef, get } from "firebase/database";
import Plotly from "plotly.js-dist-min";

const loading = ref(true);
const error = ref(false);
const totalResponses = ref(0);
const genderStats = ref({});
const gradeStats = ref({});
const gradeGenderStats = ref({});
const averageScores = ref({});
const standardDeviations = ref({});
const chartContainer = ref(null);
const stdDevChartContainer = ref(null);
const fullData = ref([]);

const aData = ref([]);

const { $db } = useNuxtApp();

const drawCharts = async () => {
  await nextTick();

  const categories = Object.keys(averageScores.value);
  const values = Object.values(averageScores.value);
  const stdDevs = Object.values(standardDeviations.value);

  Plotly.newPlot(
    chartContainer.value,
    [
      {
        x: categories,
        y: values,
        type: "bar",
        marker: { color: "steelblue" },
      },
    ],
    {
      title: "항목별 평균 점수",
      xaxis: { title: "항목" },
      yaxis: { title: "평균 점수" },
    }
  );

  Plotly.newPlot(
    stdDevChartContainer.value,
    [
      {
        x: categories,
        y: stdDevs,
        type: "bar",
        marker: { color: "tomato" },
      },
    ],
    {
      title: "항목별 표준편차",
      xaxis: { title: "항목" },
      yaxis: { title: "표준편차" },
    }
  );
};

const fetchData = async () => {
  try {
    const snapshot = await get(dbRef($db, "easy/statistics/"));
    if (!snapshot.exists()) {
      error.value = true;
      return;
    }

    const data = snapshot.val();
    const responses = Object.values(data);
    fullData.value = responses;

    totalResponses.value = responses.length;

    genderStats.value = responses.reduce((acc, entry) => {
      acc[entry.gender] = (acc[entry.gender] || 0) + 1;
      return acc;
    }, {});

    const scoreSums = {};
    const scoreCounts = {};
    const scoreSquares = {};

    responses.forEach(({ scores }) => {
      Object.entries(scores).forEach(([type, score]) => {
        scoreSums[type] = (scoreSums[type] || 0) + score;
        scoreCounts[type] = (scoreCounts[type] || 0) + 1;
        scoreSquares[type] = (scoreSquares[type] || 0) + score * score;
      });
    });

    averageScores.value = Object.fromEntries(
      Object.entries(scoreSums).map(([type, sum]) => [
        type,
        sum / scoreCounts[type],
      ])
    );

    standardDeviations.value = Object.fromEntries(
      Object.entries(scoreSums).map(([type]) => {
        const mean = averageScores.value[type];
        const variance = scoreSquares[type] / scoreCounts[type] - mean * mean;
        return [type, Math.sqrt(variance)];
      })
    );

    loading.value = false;
    drawCharts();
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = true;
  }
};

const downloadFullData = () => {
  const jsonContent =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(fullData.value));
  const link = document.createElement("a");
  link.setAttribute("href", jsonContent);
  link.setAttribute("download", "full_data.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(async () => {
  fetchData();

  const snapshot = await get(dbRef($db, "easy/students/"));
  if (!snapshot.exists()) {
    error.value = true;
    return;
  }

  const data = snapshot.val();
  const responses = Object.values(data);
  aData.value = responses;
});
</script>

<style scoped>
.container {
  padding: 30px;
  background-color: #f9f9f9;
  min-height: 100vh;
}
.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
}
.alert {
  margin-top: 20px;
}
.card {
  background: white;
  padding: 30px;
  margin-top: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.subtitle {
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.table th {
  background-color: #efefef;
}
.download-buttons {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}
.chart-section {
  margin-top: 50px;
}
.chart-container {
  width: 100%;
  height: 450px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}
</style>
