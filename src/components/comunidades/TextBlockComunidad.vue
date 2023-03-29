<template lang="">
  <div :class="[`wrapper`, $style.textBlock, data.primary.columnas && $style.columnas]">
    <RichText :text="data.primary.text_block" />
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import RichText from '../RichText.vue'
export default {
  name:'TextBlock',
  components:{
    RichText
  },
  props: {    
    items: VueTypes.array.def(),
    data: VueTypes.object.def()
  },
  data() {
    return {
      dataReady: false,
      isMobile: false,
    }
  }, 
  mounted() {
    this.domReady = true
    //console.log(this.data.primary.text_block)
  },
  watch: {
  },
  methods:{
  }
}
</script>
<style lang="scss" module>
.textBlock{
  padding: 30px 20px;
  font-size:16px;
  line-height: 1.6;
  color:#282828;
  @media (max-width:800px) {    
    padding: 16px;
  }
  &.columnas{
    & > div{
      column-count: 2;
      column-gap: 20px;
    }
  }
  h2{
    font-size: 26px;
    font-weight: 600;
    color: var(--ColorPrimario);
    margin: 0px 0 5px;
  }
  h3{
    font-size: 22px;
    font-weight: 600;
    color: var(--ColorPrimario);
    margin: 10px 0 5px;
  }
  p{
    margin-bottom: 20px;
    color: #5E606A;
  }
  h4{
    font-size: 18px;
    font-weight: 600;
    color: var(--ColorPrimario);
    margin: 10px 0 5px;
  }
  div[data-oembed-type="video"]{
    width:100%;
    padding-top:56.25%;
    position: relative;
    margin-bottom:30px;
    iframe{
      position: absolute;
      top:0;left: 0;
      width: 100%;
      height: 100%;
    }
  }
  p > a{
    color:#209EDE;
    em{
      display: inline-flex;
      font-size: 12px;
      font-style: normal;
      text-transform: uppercase;
      display: inline-flex;
      font-weight: 500;
      height: 50px;
      align-items: center;
      padding: 0 24px;
      border-radius: 25px;
      color: #FFF;
      background-color: #209EDE;
      @media (max-width:800px) {
        padding: 0 14px;
        height: 30px;
        margin: 5px 0;
      }
    }
  }
  ul li > a{
    color:#209EDE;
    text-decoration: underline;
    em{
      display: inline-flex;
      text-decoration: none;
      font-size: 12px;
      font-style: normal;
      text-transform: uppercase;
      display: inline-flex;
      font-weight: 500;
      height: 50px;
      align-items: center;
      padding: 0 24px;
      border-radius: 25px;
      color: #FFF;
      background-color: #209EDE;
      @media (max-width:800px) {
        padding: 0 14px;
        height: 30px;
        margin: 5px 0;
      }
    }
  }
}
</style>