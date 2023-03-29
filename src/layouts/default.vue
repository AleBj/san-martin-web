<template>
  <main id="main">
    <CustomLoading />
    <Header />
    <Nuxt />
    <Footer />
  </main>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import CustomLoading from '../components/customLoading'
export default {
  name: 'Default',
  components: {
    Header,
    Footer,
    CustomLoading
  },
  data() {
    return {
      domReady: false,
      allTramites:[],
    }
  },
  mounted() {
    this.domReady = true
  },
  methods: {
  },
}
</script>

<style lang="scss" module>
html{
  scroll-behavior: smooth;
}
</style>
