<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator
    color="linear-gradient(to right, #ffeae3 0%, #db1306 100%)"
  />

  <v-app>
    <NuxtLayout>
      <v-app-bar v-if="!route.path.includes('easy')" :elevation="y === 0 || drawer ? 0 : 4">
        <NuxtLink to="/">
          <v-avatar class="ml-3">
            <v-img src="/mga.png"></v-img>
          </v-avatar>
        </NuxtLink>
        <NuxtLink to="/" class="text-decoration-none text-black ml-2">
          <v-app-bar-title>마인즈</v-app-bar-title>
        </NuxtLink>

        <template v-slot:append>
          <v-btn v-if="userInfo" to="/account" icon="mdi-account"></v-btn>
          <v-btn v-else to="/login" icon="mdi-account"></v-btn>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-if="!route.path.includes('easy')" v-model="drawer" location="end" temporary>
        <v-list-item to="/" title="홈" prepend-icon="mdi-home"></v-list-item>
        <v-list-item
          title="커뮤니티"
          prepend-icon="mdi-account-group-outline"
          append-icon="mdi-menu-down"
        >
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                to="/community/share-emotion"
                title="감정 나누기"
                prepend-icon="mdi-heart"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <v-list-item
          title="마음신호등"
          prepend-icon="mdi-magnify"
          append-icon="mdi-menu-down"
        >
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                to="/test/"
                title="심리검사"
                prepend-icon="mdi-head-cog"
              ></v-list-item>
              <v-list-item
                to="/test/easy"
                title="EASY검사"
                prepend-icon="mdi-chart-line"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <v-list-item
          title="마음처방약국"
          prepend-icon="mdi-hospital"
          append-icon="mdi-menu-down"
        >
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                to="/cafe/recommendation/user"
                title="사용자 추천"
                prepend-icon="mdi-account-group"
              ></v-list-item>
              <v-list-item
                to="/cafe/recommendation/admin"
                title="전문가 추천"
                prepend-icon="mdi-account-child-circle"
              ></v-list-item>
              <v-list-item
                to="/cafe/recommendation/ai"
                title="AI 추천"
                prepend-icon="mdi-robot"
              ></v-list-item>

              <v-list-item
                to="/cafe/stress-management"
                title="스트레스 관리법"
                prepend-icon="mdi-emoticon-happy"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
        <v-list-item
          to="/wee"
          title="Wee 클래스"
          prepend-icon="mdi-hospital-building"
        ></v-list-item>
      </v-navigation-drawer>

      <v-main>
        <div
          :class="`${
            route.path !== '/test/easy/admin' ?? 'd-flex justify-center'
          }`"
        >
          <NuxtPage />
        </div>

        <br /><br /><br />
      </v-main>

      <v-footer
        v-if="route.path === '/'"
        style="
          position: absolute;
          bottom: 0;
          width: 100%;
          background-color: #ffeae4;
        "
      >
        <NuxtLink to="/thanks" style="color: black; text-decoration: none">
          <div>
            {{ new Date().getFullYear() }} —
            <strong>심장박동 x 코딩인싸이트</strong>
          </div>
        </NuxtLink>
      </v-footer>
    </NuxtLayout>
  </v-app>
</template>

<script setup>
import { useWindowScroll } from "@vueuse/core";
import { useTitle } from "@vueuse/core";
import { onAuthStateChanged } from "firebase/auth";

const route = useRoute();
const router = useRouter();
const drawer = ref(false);
const userInfo = ref({});

const { $auth } = useNuxtApp();

const { x, y } = useWindowScroll();

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    userInfo.value = user;
  });
});

useTitle("마인즈");
</script>
