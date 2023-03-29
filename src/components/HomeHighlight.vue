<template lang="">
  <div :class="[$style.flexCenter, `wrapper`]">
    <div v-for="(item, index) in items" :key="index" :class="[$style.destacado, index == 9 && $style.big]">
      <a v-if="item.link_destacados.link_type == 'Web'" :href="item.link_destacados.url" target="_blank">        
        <prismic-image :field="item.image_destacados" :class="$style.dsk" />
        <prismic-image :field="(item.image_mobile && Object.keys(item.image_mobile).length > 0) ? item.image_mobile : item.image_destacados" :class="$style.mbl" />
      </a>
      <nuxt-link v-else :to="(item.link_destacados.type == 'sitio') ? `/${item.link_destacados.uid}` :  (item.link_destacados.type == 'interna_comunidad') ?`/comunidades/interna/${item.link_destacados.uid}` :`/${item.link_destacados.type}/${item.link_destacados.uid}`">
        <prismic-image :field="item.image_destacados" :class="$style.dsk" />
        <prismic-image :field="(item.image_mobile && Object.keys(item.image_mobile).length > 0) ? item.image_mobile : item.image_destacados" :class="$style.mbl" />
      </nuxt-link>
    </div>    
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  name:'home-highlight',
  props: {    
    items: VueTypes.array.def()
  },  
  mounted() {
    // //console.log(this.items)
  }
}
</script>
<style lang="scss" module>
  .flexCenter{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width:800px){
      padding: 0 10px;
    }
  }
  .destacado{
    overflow: hidden;
    border-radius: 25px;
    margin:15px 0;
    display: block;
    width: calc(33.33% - 15px);
    @media (max-width:800px){
      width: calc(50% - 10px);
      margin:8px 4px;
    }
    img{
      display: block;
      width: 100%;
      &.dsk{display: block;}
      &.mbl{display: none;}
      @media (max-width:800px){
        &.mbl{display: block;}
        &.dsk{display: none;}
      }
    }
    &.big{
      width: calc(100% - 15px);
      @media (max-width:800px){
        width: calc(50% - 10px);
        margin:8px 4px;
      }
    }
  }
</style>