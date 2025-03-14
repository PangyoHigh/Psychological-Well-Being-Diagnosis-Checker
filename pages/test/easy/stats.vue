<template>
  <div class="pa-6">
    <h1 class="text-center">마음EASY 검사 통계</h1>

    <v-alert v-if="loading" type="info" class="mt-4">데이터를 불러오는 중...</v-alert>
    <v-alert v-if="error" type="error" class="mt-4">데이터를 불러오는데 실패했습니다.</v-alert>

    <div v-if="!loading && !error">
      <v-card class="pa-4 mt-6">
        <h2>응답 개요</h2>
        <p><b>총 응답 수:</b> {{ totalResponses }}</p>
        <p><b>남학생 응답 수:</b> {{ genderStats.boy || 0 }}</p>
        <p><b>여학생 응답 수:</b> {{ genderStats.girl || 0 }}</p>
      </v-card>

      <v-card class="pa-4 mt-6">
        <h2>학년별 응답 수</h2>
        <v-table>
          <thead>
            <tr>
              <th>학년</th>
              <th>응답 수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(count, grade) in gradeStats" :key="grade">
              <td>{{ grade }}</td>
              <td>{{ count }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <v-card class="pa-4 mt-6">
        <h2>평균 점수 및 표준편차</h2>
        <v-table>
          <thead>
            <tr>
              <th>문제 유형</th>
              <th>평균 점수</th>
              <th>표준편차</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(score, type) in averageScores" :key="type">
              <td>{{ type }}</td>
              <td>{{ score.toFixed(2) }}</td>
              <td>{{ standardDeviations[type]?.toFixed(2) || 'N/A' }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-btn class="mt-4" color="primary" @click="downloadCSV">CSV 다운로드</v-btn>
        <v-btn class="mt-4 ml-4" color="secondary" @click="downloadFullData">전체 데이터 다운로드</v-btn>
      </v-card>

      <div class="mt-6">
        <h2>점수 분포</h2>
        <div ref="chartContainer" class="chart-container"></div>
      </div>
      
      <div class="mt-6">
        <h2>표준편차 그래프</h2>
        <div ref="stdDevChartContainer" class="chart-container"></div>
      </div>
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
const averageScores = ref({});
const standardDeviations = ref({});
const chartContainer = ref(null);
const stdDevChartContainer = ref(null);
const fullData = ref([]);

const { $db } = useNuxtApp();

const drawCharts = async () => {
  await nextTick();

  const categories = Object.keys(averageScores.value);
  const values = Object.values(averageScores.value);
  const stdDevs = Object.values(standardDeviations.value);

  Plotly.newPlot(chartContainer.value, [
    {
      x: categories,
      y: values,
      type: "bar",
      marker: { color: "blue" },
    },
  ], {
    title: "Average Score per Category",
    xaxis: { title: "Category" },
    yaxis: { title: "Average Score" },
  });

  Plotly.newPlot(stdDevChartContainer.value, [
    {
      x: categories,
      y: stdDevs,
      type: "bar",
      marker: { color: "red" },
    },
  ], {
    title: "Standard Deviation per Category",
    xaxis: { title: "Category" },
    yaxis: { title: "Standard Deviation" },
  });
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
    
    // Count gender-based responses
    genderStats.value = responses.reduce((acc, entry) => {
      acc[entry.gender] = (acc[entry.gender] || 0) + 1;
      return acc;
    }, {});

    // Count responses per grade
    gradeStats.value = responses.reduce((acc, entry) => {
      acc[entry.grade] = (acc[entry.grade] || 0) + 1;
      return acc;
    }, {});

    // Calculate average scores and standard deviations
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
      Object.entries(scoreSums).map(([type, sum]) => [type, sum / scoreCounts[type]])
    );

    standardDeviations.value = Object.fromEntries(
      Object.entries(scoreSums).map(([type]) => {
        const mean = averageScores.value[type];
        const variance = (scoreSquares[type] / scoreCounts[type]) - (mean * mean);
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
  const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData.value));
  const link = document.createElement("a");
  link.setAttribute("href", jsonContent);
  link.setAttribute("download", "full_data.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(fetchData);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
