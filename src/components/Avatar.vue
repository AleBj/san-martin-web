<template lang="">
  <div :class="[$style.contentAvatar, small && $style.small]">    
    <SingleImage :image="image" />
    <h4>{{ $prismic.asText(named) }}</h4>
    <p>
      {{ $prismic.asText(from) }} <br>
      {{ $prismic.asText(since) }}
      
    </p>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import SingleImage from './SingleImage.vue'

export default {
  props: {    
    image: VueTypes.object.def(),
    named: VueTypes.array.def(),
    from: VueTypes.array.def(),
    since: VueTypes.array.def(),
    small: VueTypes.bool.def(false)
  },
  components: {
    SingleImage,
  },
}
</script>
<style lang="scss" module>
.contentAvatar { 
  max-width: 420px;
  position: relative;
  z-index: 1;
  margin: auto;
  &.small{
    max-width: 200px;
  }
  h4{
    font-size: 24px;
    font-family: $font-serif;
    font-weight: 600;
  }
  p{
    font-size: 14px;
  }
  img{
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin:0 auto 14px
  }
}
</style>