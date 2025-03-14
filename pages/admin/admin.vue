<template>
  <div class="mx-4">
    <h1 class="text-center">관리자 대시보드</h1>
    <p class="text-center">사이트의 데이터를 이 페이지에서 관리합니다.</p>

    <br />

    <div>
      <v-card elevation="0">
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="one">책 추천</v-tab>
          <v-tab value="two">차단된 계정</v-tab>
          <v-tab value="three">기타</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <v-card>
                <v-card-title>책 추천</v-card-title>
                <v-card-text>
                  <p>책 추천 관리 페이지입니다.</p>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="two"> Two </v-tabs-window-item>

            <v-tabs-window-item value="three"> Three </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, set } from "firebase/database";

const tab = ref("one");

const { $db } = useNuxtApp();

function setBooks() {}
</script>
