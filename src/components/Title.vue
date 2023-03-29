<template>
  <h2
    v-if="(text && text[0])"
    :class="[$style[size]]"
  >{{ $prismic.asText(text) }}</h2>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'Title',
  props: {
    text: VueTypes.any.def(),
    size: VueTypes.string.def('h2')
  },
  computed: {
    fontSize() {
      // const title = this.$prismic.asText(this.text)
      // const lng = title.split('').length
      // const fs = !this.size ? (100 / parseInt(lng)) * 1 :  (100 / parseInt(lng)) / 2
      // return {
      //   "font-size": `${fs}vw`
      // };
    }
  }
}
</script>

<style lang="scss" module>
.h2{font-size: 22px;}
.h3{font-size: 28px;}
.h1{font-size: 36px;}
.int{font-size: 42px;}
.sec{font-size: 48px;}
@media (max-width:800px){
  .h2{font-size: 18px;}
  .h3{font-size: 22px;}
  .h1{font-size: 28px;}
  .int{font-size: 36px;}
  .sec{font-size: 40px;}

}
</style>
