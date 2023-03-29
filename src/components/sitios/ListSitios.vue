<template lang="">
  <div :class="[`wrapper`, $style.wrapperListSitios]">
        <div :class="[$style.headTitle]" v-if="data.primary.titulo_list && data.primary.titulo_list.length > 0">
            <Title :text="data.primary.titulo_list" :size="`h3`" /> 
        </div>
      
      <div :class="[$style.list]">
        
        <CardListSitios v-for="item in items" :key="item.id" :items="item" :shadow="data.primary.shadow" />
        
      </div>

  </div>
</template>
<script>
import VueTypes from 'vue-types'
import Title from '../Title'
import CardListSitios from './CardListSitios'

export default {
  name:'ListSitios',
  components: {
    Title,
    CardListSitios
  },
  props: {    
    items: VueTypes.array.def(),
    data: VueTypes.object.def()
  },
  data() {
    return {
      subCat:[],
      dataReady: false,
      isMobile: false,
    }
  }, 
  mounted() {
    this.domReady = true
    //console.log(this.items)
    //console.log(this.data)
  },
  watch: {
  },
  methods:{
  }
}
</script>
<style lang="scss" module>
.wrapperListSitios{
    padding-top: 40px;
    padding-bottom: 40px;
    .list{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 30px;
        grid-row-gap: 0px;
    }
    @media (max-width:800px) {
      padding-top: 20px;
      padding-bottom: 20px;      
      .list{
        grid-template-columns: repeat(1, 1fr);
        grid-column-gap: 20px;        
      }
    }
}
</style>