<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator
    color="linear-gradient(to right, #ffeae3 0%, #db1306 100%)"
  />

  <v-app>
    <NuxtLayout>
      <v-main>
        <br v-if="route.path !== '/community/share-emotion'" />

        <div class="d-flex justify-center">
          <NuxtPage />
        </div>

        <br /><br /><br />
        <br /><br /><br />
      </v-main>

      <WindowsBottomNavigation :options="options" v-model="selected">
        <template #icon="{ props }">
          <v-icon v-if="props.icon">{{ props.icon }}</v-icon>
          <v-img v-else :src="props.img" width="40" />
          
        </template>
      </WindowsBottomNavigation>
    </NuxtLayout>
  </v-app>
</template>

<script setup>
import { WindowsBottomNavigation } from "bottom-navigation-vue";
import "bottom-navigation-vue/dist/style.css";

import { useWindowScroll } from "@vueuse/core";
import { useTitle } from "@vueuse/core";
import { onAuthStateChanged } from "firebase/auth";

const route = useRoute();
const router = useRouter();
const drawer = ref(false);
const userInfo = ref({});

const selected = ref(1);
const options = [
  { id: 1, icon: "mdi-home", to: "/", color: "#1FABFF" },
  {
    id: 2,
    icon: "mdi-account-group-outline",
    to: "/community/share-emotion",
    color: "#e31b23",
  },
  { id: 3, icon: "mdi-head-cog", to: "/test" },
  { id: 4, icon: "mdi-coffee", to: "/cafe/", color: "#724e2c" },
  { id: 5, img: "https://www.wee.go.kr/home/images/h1_logo.png", to: "/wee" },
];

watch(selected, (value) => {
  const option = options.find((option) => option.id === value);
  if (option && option.to && option.to !== route.path) {
    router.push(option.to);
  }
});

const { $auth } = useNuxtApp();

const { x, y } = useWindowScroll();

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    userInfo.value = user;
  });
});

useTitle("마인즈");
</script>
