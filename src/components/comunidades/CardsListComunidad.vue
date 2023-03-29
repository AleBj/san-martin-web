<template>
  <div :class="[$style.flex, `wrapper`]">
      <CardBg v-for="(item, index) in items"
      :key="index"
      :titulo="item.titulo_card"
      :description="item.descripcion_card" 
      :link="item.link_boton_card"
      :cta="item.cta_card"
      :color="item.color_card"
      :size="`mid`" />    
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import CardBg from '../../components/blocks/CardBg'
export default {
  name: 'card-list',
  props: {    
    items: VueTypes.array.def()
  },  
  components:{
    CardBg
  },
  mounted() {
    //console.log(this.items)
  }
}
</script>

<style lang="scss" module>
.flex{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 50px;
  padding-bottom: 50px;
  & > div{
    margin-top: 15px;
    margin-bottom: 15px;
  }
  @media (max-width:800px) {
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
    & > div{
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>