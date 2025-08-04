// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["vuetify-nuxt-module", "@vite-pwa/nuxt"],
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  experimental: {
    payloadExtraction: true,
    viewTransition: true,
    typedPages: true,
  },

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {},
  },

  pwa: {
    manifest: {
      name: "마인즈",
      short_name: "마인즈",
      description: "판교고 학생들을 위한 맞춤형 서비스",
      lang: "ko",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      dir: "ltr",
      icons: [
        {
          src: "/mga.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
