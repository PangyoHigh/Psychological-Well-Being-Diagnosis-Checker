<template>
  <div class="mx-4">
    <h1>우을증 검사 결과</h1>
    <p>당신의 우울증 점수는 {{ score }}점 입니다.</p>

    <br />
  </div>
</template>

<script setup>
import { ref as dbRef, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const { $auth, $db } = useNuxtApp();

const route = useRoute();
const score = route.query.score;

const result = ref("");

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) {
      const uid = user.uid;
      const depressionRef = dbRef($db, `users/${uid}/depression`);
      set(depressionRef, score);
    }
  });
});
</script>
