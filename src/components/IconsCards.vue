<template lang="">
  <div :class="[$style.flexCenter, `wrapper`]">
    <CardsHome size="home" v-for="item in items" :key="item.id" :items="item" />
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  props: {    
    items: VueTypes.array.def()
  },  
  mounted() {
    this.domReady = true
    // //console.log(this.items)
  }
}
</script>
<style lang="scss" module>
  .flexCenter{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:30px auto 40px;
    @media (max-width: 800px){
      margin: 20px auto;
      padding:0 10px;
      padding-bottom: 20px;
      overflow-x:scroll;
      justify-content: flex-start;
    }
  }
</style>