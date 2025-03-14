<template>
  <div class="mx-4">
    <h1>고민 나누기</h1>

    <br />

    <v-select
      v-model="variety"
      label="고민 종류 선택하기"
      variant="outlined"
      :items="[
        '일반 고민',
        '학업',
        '진학',
        '교우관계',
        '외모',
        '가족',
        '학교폭력',
        '용돈 또는 돈',
      ]"
    ></v-select>

    <v-text-field
      v-model="title"
      variant="outlined"
      label="제목 입력하기"
    ></v-text-field>
    <v-textarea
      v-model="content"
      variant="outlined"
      label="내용 입력하기"
    ></v-textarea>

    <v-checkbox v-model="anonymous" label="비공개로 등록하기"></v-checkbox>

    <br />

    <div class="d-flex justify-center">
      <v-btn variant="outlined" @click="write">
        <v-icon start>mdi-pencil</v-icon> 글 등록하기
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, set, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const anonymous = ref(false);
const variety = ref("");
const title = ref("");
const content = ref("");
const userInfo = ref({});

const { $db, $auth } = useNuxtApp();
const router = useRouter();

async function write() {
  await onAuthStateChanged($auth, (user) => {
    userInfo.value = user;
  });

  const time = new Date().getTime();
  const db = dbRef($db, `/community/share-emotion/${variety.value}/${time}`);
  set(db, {
    title: title.value,
    content: content.value,
    anonymous: anonymous.value,
    time,
    userInfo: {
      photoURL: userInfo.value.photoURL,
      displayName: userInfo.value.displayName,
      email: userInfo.value.email,
    },
  });
  router.push(`./content/?time=${time}`);

  const db_number = dbRef($db, `/community/share-emotion/number`);
  //get value
  let number = 0;
  onValue(db_number, (snapshot) => {
    number = snapshot.val();
  });
  //set value
  set(db_number, number + 1);
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}

.v-select,
.v-text-field,
.v-textarea {
  margin-bottom: 16px;
}

.v-select {
  width: 100%;
}

.v-text-field,
.v-textarea {
  width: 100%;
}

.v-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.v-icon {
  font-size: 1.2rem;
}
</style>
