<template lang="">
  <div :class="[$style.button, share && $style.share, sticky && $style.sticky]">  
    <div v-if="externalLink">
      <a :href="link" :target="target">
        {{cta}}
      </a>
    </div>
    <div v-else >
      <nuxt-link :to="link">
        {{cta}} 
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  props: {    
    cta: VueTypes.string.def(),
    link: VueTypes.any.def(),
    share: VueTypes.bool.def(false),
    sticky: VueTypes.bool.def(false),
    externalLink: VueTypes.bool.def(false),
    target: VueTypes.string.def("_self")
  },
  mounted(){
    //console.log(this.link, this.target)
  }
}
</script>
<style lang="scss" module>
.button { 
  a{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    background: $blue;
    font-size: 12px;
    color:$white;
    border-radius: 25px;
    font-family: $font-sans;
    font-weight: 500;
    height: 50px;
    align-items: center;
    padding: 0 24px;
    text-decoration: none;
    text-transform: uppercase;
  }
  &.share{
    pointer-events: none;
  }
  &.sticky{
    a{
      background: $blueDark;
      font-weight: 400;
    }
  }
}
</style>