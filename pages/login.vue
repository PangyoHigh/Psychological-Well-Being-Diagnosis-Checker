<template>
  <div class="mx-4">
    <h1 class="my-3 text-center">로그인하기</h1>

    <v-btn variant="outlined" block @click="login">
      <v-icon start>mdi-google</v-icon> 구글로 로그인
    </v-btn>
  </div>
</template>

<script setup>
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const { $auth } = useNuxtApp();
const router = useRouter();

const login = async () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup($auth, provider).then(() => router.push("/"));
};
</script>
