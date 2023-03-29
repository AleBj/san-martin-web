<template>
  <h3
    v-if="(text && text[0])"
    :class="[$style.title,$style[size]]"
  >{{ text }}</h3>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'Title',
  props: {
    text: VueTypes.string.def(),
    size: VueTypes.string.def('h1')
  }
}
</script>

<style lang="scss" module>
.title{
  font-weight: 900;
  &.h2{
    font-size: 22px;
  }
  &.h3{
    font-size: 28px;
  }
  &.hero{
    font-size: 42px;
  }
}
</style>
