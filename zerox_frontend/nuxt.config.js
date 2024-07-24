export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ZeroX - ishonch kafolati",
    htmlAttrs: {
      lang: "uz",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "ZeroX - ishonch kafolati",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "theme-color",
        content: "#4F92D4",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo.ico" },
      {
        rel: "stylesheet",
        href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
        integrity:
          "sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p",
        crossorigin: "anonymous",
      },
    ],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-J26T5ZP6TZ",
      },
    ],
  },
  ssr: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/style/style.css",
    "@/assets/styles.scss",
    "@/styles/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/pagination.js", ssr: false },
    { src: "@/plugins/datepicker.js", ssr: false },
    { src: "@/plugins/html2Pdf.js", ssr: false },
    { src: "@/plugins/main.js", ssr: false },
    { src: "@/plugins/v-icon.js", ssr: false },
    { src: "./plugins/v-mask.js" },
    { src: "./plugins/v-format.js" },
    { src: "./plugins/swiper.js" },
    { src: "./plugins/axios.js" },
    { src: "@/plugins/vue-apexchart.js", ssr: false },
    { src: "./plugins/eimzo.js", ssr: false },
    { src: "./plugins/vuelidate.js", ssr: false },
    { src: "./plugins/vue-tel-input.js", ssr: false },
  ],

  router: {
    middleware: "auth",
    linkActiveClass: "your-custom-active-link",
    linkExactActiveClass: "your-custom-exact-active-link",
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  target: "static",
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/fontawesome",
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-socket-io",
    "@nuxtjs/i18n",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    [
      "@nuxtjs/yandex-metrika",
      {
        id: "90314930",
        webvisor: true,
        // clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      },
    ],
  ],

  // loadingIndicator: "~/static/loading.html",
  // loading: "~/components/LoadingBar.vue",
  io: {
    // module options
    sockets: [
      {
        name: "home",
        // url: "http://localhost:5000",

        url: "https://app.zerox.uz",

      },
    ],
  },

  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }

      const findEl = async (hash, x) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve();
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1));
            }, 100);
          })
        );
      };

      if (to.hash) {
        let el = await findEl(to.hash);
        if ("scrollBehavior" in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        } else {
          return window.scrollTo(0, el.offsetTop);
        }
      }

      return { x: 0, y: 0 };
    },
    linkActiveClass: "nuxt-link-active",
  },
  i18n: {
    locales: [
      {
        code: "uz",
        file: "uz.js",
      },
      {
        code: "ru",
        file: "ru.js",
      },
      {
        code: "kr",
        file: "kr.js",
      },
    ],
    lazy: false,
    defaultLocale: "uz",
    langDir: "lang/",
    detectBrowserLanguage: false,
    prefix_except_default: "uz",
    strategy: 'no_prefix'
  },

  toast: {
    duration: "3000",
    pauseOnHover: true,
  },
  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      brands: true,
    },
  },
  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/",
      callback: "/",
      // home: false,
    },
    strategies: {
      local: {
        user: {
          property: "data",
          global: true,
          autoFetch: true,
        },
        endpoints: {
          login: { url: "user/login", method: "post" },
          user: { url: "/user/me", method: "get" },
          logout: false,
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: "http://localhost:5000/api/v1",
    baseURL: "https://app.zerox.uz/api/v1",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
