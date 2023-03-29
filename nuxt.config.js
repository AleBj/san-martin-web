import './env.config';

export default {
  server: {
    port: 1234, // default: 3000
    //host: '0.0.0.0', // default: localhost,
    timing: false
  },
  srcDir: 'src',
  buildDir: 'functions/.nuxt',
  render: {
    resourceHints: false,
  },
  target: 'static',
  ssr: false,
  loading: '~/components/customLoading.vue',
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#12164E',
  //   background: '#12164E'
  // },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    script: [
      {
        src: "https://cdn.agentbot.net/core/0726754ef147e1474c15f96f40aa0b86.js",
        async: true
      },
    ],
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Municipalidad de San Martin',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image:width',
        name: 'og:image:width',
        content: '1200'
      },
      {
        hid: 'og:image:height',
        name: 'og:image:height',
        content: '630'
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16.png'
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
        crossorigin: ''
      },
      {
        rel: 'preconnect',
        href: 'https://sitiosale.prismic.io',
        crossorigin: ''
      },
      {
        rel: 'preconnect',
        href: 'https://images.prismic.io',
        crossorigin: ''
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap'
      }
    ],
  },
  router: {
    base: '/',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/sass/normalize.scss', '~/assets/sass/main.scss'],
  styleResources: {
    scss: ['./assets/sass/util/*.scss', './assets/sass/variables/*.scss']
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module'
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'UA-75299426-1', // Use as fallback if no runtime config is provided
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    [
      "@nuxtjs/prismic",
      {
        "endpoint": "https://sitiosale.prismic.io/api/v2"
      }
    ],
    ["nuxt-sm"]
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ["vue-slicezone", "nuxt-sm"],
    extractCSS: true,
  },
  generate: {
    fallback: true
  }
};