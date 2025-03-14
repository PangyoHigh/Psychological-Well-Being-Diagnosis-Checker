<template>
  <div style="width: 100%">
    <div
      style="height: calc(100vh - 60px)"
      class="section d-flex justify-center align-center"
    >
      <v-card variant="tonal" class="text-center pa-4">
        <v-avatar size="100" class="mb-3">
          <v-img
            src="/mga.png"
            width="100"
            class="ma-auto mb-2 mb-3"
            :class="{ 'heart-logo': isHeartBeating }"
            @click="toggleHeartBeat"
          ></v-img>
        </v-avatar>

        <div>
          <h1 class="hero-title">마인즈</h1>
          <p class="hero-subtitle">판교고 학생들을 위한 맞춤형 서비스</p>
        </div>
      </v-card>
    </div>

    <br /><br /><br />

    <div class="section">
      <h1 class="text-center mb-5 section-title">마인즈</h1>

      <v-card
        max-width="340px"
        class="custom-card"
        to="/community/share-emotion"
      >
        <v-card-title>감정 나누기</v-card-title>
        <v-card-subtitle class="custom-subtitle">
          {{ share_emotion }}개
        </v-card-subtitle>
        <v-card-text>
          자신의 고민을 전문가 및 또래 친구들과 온라인으로 상담합니다.
        </v-card-text>
      </v-card>
    </div>

    <div v-if="userInfo" class="section">
      <h1 class="text-center mb-5 section-title">나의 활동</h1>

      <div v-if="userInfo?.adhd?.score">
        <v-card max-width="340px" class="custom-card">
          <v-card-title>ADHD 검사</v-card-title>
          <v-card-subtitle class="custom-subtitle">
            {{ userInfo?.adhd?.score }}점
          </v-card-subtitle>
          <v-card-text>
            자신의 ADHD 점수를 확인하고, 전문가와 상담을 받아보세요.
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card max-width="340px" class="custom-card" to="/test/adhd">
          <v-card-title>ADHD 검사</v-card-title>
          <v-card-subtitle class="custom-subtitle">미응시</v-card-subtitle>
          <v-card-text>
            자신의 ADHD 점수를 확인하고, 전문가와 상담을 받아보세요.
          </v-card-text>
        </v-card>
      </div>

      <br />

      <div v-if="userInfo?.personality">
        <v-card max-width="340px" class="custom-card">
          <v-card-title>성격 검사</v-card-title>
          <v-card-text class="custom-subtitle">
            {{ userInfo?.personality?.join(", ") }}
          </v-card-text>
          <v-card-text>
            자신의 성격 유형을 확인하고, 전문가와 상담을 받아보세요.
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card max-width="340px" class="custom-card" to="/test/personality">
          <v-card-title>성격 검사</v-card-title>
          <v-card-subtitle class="custom-subtitle">미응시</v-card-subtitle>
          <v-card-text>
            자신의 성격 유형을 확인하고, 전문가와 상담을 받아보세요.
          </v-card-text>
        </v-card>
      </div>

      <br />

      <div v-if="userInfo?.depression?.score">
        <v-card max-width="340px" class="custom-card">
          <v-card-title>우을증 검사</v-card-title>
          <v-card-text class="custom-subtitle">
            {{ userInfo?.depression?.score }}점
          </v-card-text>
          <v-card-text>
            자신의 우울증 점수를 확인하고, 전문가와 상담을 받아보세요.
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card max-width="340px" class="custom-card" to="/test/depression">
          <v-card-title>우을증 검사</v-card-title>
          <v-card-subtitle class="custom-subtitle">미응시</v-card-subtitle>
          <v-card-text>
            자신의 우울증 점수를 확인하고, 전문가와 상담을 받아보세요.
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const userInfo = ref(null);

const share_emotion = ref(0);

const { $auth, $db } = useNuxtApp();

const home1 = ref(false);
const home2 = ref(false);

const isHeartBeating = ref(true);

const toggleHeartBeat = () => {
  isHeartBeating.value = !isHeartBeating.value;
};

onMounted(() => {
  const db = dbRef($db, "community/share-emotion/number");
  onValue(db, (snapshot) => {
    share_emotion.value = snapshot.val() ?? 0;
  });

  onAuthStateChanged($auth, (user) => {
    userInfo.value = user;

    if (userInfo.value) {
      const user_db = dbRef($db, `users/${userInfo.value.uid}/`);
      onValue(user_db, (snapshot) => {
        const data = snapshot.val();
        userInfo.value = { ...userInfo.value, ...data };
      });
    }
  });

  setTimeout(() => (home1.value = true), 300);
  setTimeout(() => (home2.value = true), 1000);
});
</script>

<style scoped>
html {
  scroll-snap-type: y mandatory;
}

.section {
  scroll-snap-align: start;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.25rem;
}

.custom-card {
  border-radius: 10px;
}

.custom-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.custom-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #db1307;
}

.heart-logo {
  animation: beat 1s infinite;
}

@keyframes beat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
