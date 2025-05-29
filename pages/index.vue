<template>
  <div style="width: 100%">
    <div style="margin: 15px">
      <div class="d-flex flex-row justify-center align-center title-wrapper">
        <div class="text-center">
          <h1 class="hero-title">마인즈</h1>
          <p class="hero-subtitle">판교고 학생들을 위한 맞춤형 서비스</p>
        </div>
      </div>

      <br />

      <div class="character-row">
        <v-card class="character-card-long interactive-card" elevation="3">
          <v-card-title class="text-center name-label">
            판교고 마음건강 지킴이
          </v-card-title>
        </v-card>
      </div>

      <div class="character-row">
        <!-- 카미 -->
        <v-card
          class="character-card interactive-card"
          elevation="3"
          @click="animateCard('kami')"
          :class="{ bounce: clickedCard === 'kami' }"
        >
          <v-img src="/b.jpg" alt="카미" height="100"></v-img>
          <v-card-title class="text-center name-label">카미</v-card-title>
        </v-card>

        <!-- 하티 -->
        <v-card
          class="character-card interactive-card"
          elevation="3"
          @click="animateCard('hearti')"
          :class="{ bounce: clickedCard === 'hearti' }"
        >
          <v-img src="/g.jpg" alt="하티" height="100"></v-img>
          <v-card-title class="text-center name-label">하티</v-card-title>
        </v-card>
      </div>

      <div class="character-row">
        <v-card
          class="character-card-long interactive-card"
          elevation="3"
          to="/test/easy"
        >
          <v-img
            class="mt-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzPYdY3EvbAWlBjDnPCOA0ehgvZgeoqZrkg&s"
            alt="카미"
            height="75"
          ></v-img>
          <v-card-title class="text-center name-label"
            >마음EASY 검사 <v-icon>mdi-link</v-icon></v-card-title
          >
        </v-card>
      </div>

      <div class="character-row">
        <v-card
          class="character-card-long interactive-card"
          elevation="3"
          href="https://www.wee.go.kr/home/main/main.do"
        >
          <v-img
            class="mt-3"
            src="https://www.wee.go.kr/home/images/h1_logo.png"
            alt="카미"
            height="75"
          ></v-img>
          <v-card-title class="text-center name-label"
            >WEE클래스 <v-icon>mdi-link</v-icon></v-card-title
          >
        </v-card>
      </div>
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

const clickedCard = ref(null);

function animateCard(cardName) {
  clickedCard.value = cardName;
  setTimeout(() => {
    clickedCard.value = null;
  }, 500); // Reset after bounce animation
}

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
@import url("https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap");

.title-wrapper {
  margin-top: 20px;
}

.hero-title {
  font-family: "Gowun Dodum", sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  background: linear-gradient(90deg, #ffebe3, #d7150e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInDown 1s ease-out;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #444;
  margin-top: 8px;
  animation: fadeInUp 1.2s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.character-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.character-card-long {
  width: 250px;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.character-card {
  width: 120px;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.interactive-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.bounce {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.name-label {
  font-weight: bold;
  font-size: 1rem;
  color: #333;
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
