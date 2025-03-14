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
