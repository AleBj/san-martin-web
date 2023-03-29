<template lang="">
  <div :class="[$style.content]">    
    <prismic-image v-if="image" :field="image" />
  </div>
</template>
<script>
import VueTypes from 'vue-types'
export default {
  props: {    
    image: VueTypes.object.def()
  },
}
</script>
<style lang="scss" module>
.content { 
  img{
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin:auto
  }
}
</style>