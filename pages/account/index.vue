<template>
  <div class="mx-4">
    <h1 class="text-center">나의 활동</h1>

    <br />

    <v-card variant="outlined" class="py-3" width="100%">
      <div class="d-flex align-center">
        <v-avatar class="ml-5">
          <v-img :src="userInfo.photoURL"></v-img>
        </v-avatar>
        <div>
          <div class="d-flex">
            <v-card-title style="padding: 0 1rem !important">
              {{ userInfo.displayName }}
            </v-card-title>
            <div class="ma-auto" style="margin-left: -10px !important">
              <v-icon v-if="isRevealed" size="small">mdi-eye</v-icon>
              <v-icon v-else size="small">mdi-eye-off</v-icon>
            </div>
          </div>
          <v-card-subtitle style="padding: 0 1rem !important">
            {{ userInfo.email }}
          </v-card-subtitle>
        </div>
      </div>

      <v-btn
        @click="logout"
        variant="outlined"
        color="red"
        width="calc(100% - 33px)"
        class="mx-4 mt-3"
      >
        로그아웃
      </v-btn>
    </v-card>

    <br /><br />

    <v-card v-if="!isRevealed" variant="outlined">
      <v-card-title>나의 계정 공개하기</v-card-title>
      <v-card-text>
        나의 계정을 공유하면, 치구들이 나를 검색하고, 친구 추가하고, 나의 정보를
        볼 수 있습니다.
      </v-card-text>

      <div class="d-flex justify-center mb-3 mx-4">
        <v-btn variant="tonal" block @click="reveal">공개하기</v-btn>
      </div>
    </v-card>
    <v-card v-else variant="outlined">
      <v-card-title>나의 계정 비공개하기</v-card-title>
      <v-card-text>
        나의 계정을 비공개하면, 치구들이 나를 검색하고, 친구 추가하고, 나의
        정보를 볼 수 없습니다.
      </v-card-text>

      <div class="d-flex justify-center mb-3 mx-4">
        <v-btn variant="tonal" block @click="hide">비공개하기</v-btn>
      </div>
    </v-card>

    <br />

    <div v-if="isRevealed">
      <div class="d-flex justify-center">
        <NuxtLink :to="`/account/view?uid=${userInfo.uid}`">
          나의 페이지 확인하기
          <v-icon end size="small">mdi-open-in-new</v-icon>
        </NuxtLink>
      </div>
      <v-card class="py-3" elevation="0">
        <v-text-field
          label="상태"
          v-model="status"
          variant="outlined"
          clearable
          dense
          class="mx-4"
        ></v-text-field>
        <v-textarea
          label="자기소개"
          v-model="explanation"
          variant="outlined"
          clearable
          dense
          class="mx-4"
        ></v-textarea>
        <v-btn
          @click="updateStatus"
          variant="outlined"
          color="primary"
          width="calc(100% - 33px)"
          class="mx-4 mt-3"
        >
          저장
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const isRevealed = ref(false);
const userInfo = ref({});

const status = ref("");
const explanation = ref("");

const { $auth, $db } = useNuxtApp();

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    userInfo.value = user;

    const userRef = dbRef($db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      isRevealed.value = snapshot.val()?.reveal ?? false;
    });

    onValue(userRef, (snapshot) => {
      status.value = snapshot.val()?.status ?? "";
      explanation.value = snapshot.val()?.explanation ?? "";
    });
  });
});

const logout = () => {
  $auth.signOut();
  router.push("/");
};

function reveal() {
  const userRef = dbRef($db, `users/${userInfo.value.uid}`);
  set(userRef, {
    displayName: userInfo.value.displayName,
    photoURL: userInfo.value.photoURL,
    reveal: true,
  });
}

function hide() {
  const userRef = dbRef($db, `users/${userInfo.value.uid}`);
  set(userRef, {
    displayName: userInfo.value.displayName,
    photoURL: userInfo.value.photoURL,
    reveal: false,
  });
}

function updateStatus() {
  const userRef = dbRef($db, `users/${userInfo.value.uid}`);
  set(userRef, {
    displayName: userInfo.value.displayName,
    photoURL: userInfo.value.photoURL,
    reveal: isRevealed.value,
    status: status.value,
    explanation: explanation.value,
  });
  router.push(`/account/view/?uid=${userInfo.value.uid}`);
}
</script>
