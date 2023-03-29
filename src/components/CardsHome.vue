<template lang="">
  <div :class="[$style.card, $style[size]]">
    
    <a v-if="items.link_card.link_type == 'Web'" :href="(items.link_card.url) ? items.link_card.url : `/`" target="_blank">
      <prismic-image :field="items.icon_card" />
      <span>{{ $prismic.asText(items.title_card) }}</span>
    </a>
    <nuxt-link v-else :to="(items.link_card.type == 'sitio') ? `/${items.link_card.uid}` :  (items.link_card.type == 'interna_comunidad') ?`/comunidades/interna/${items.link_card.uid}` :`/${items.link_card.type}/${items.link_card.uid}`">
      <prismic-image :field="items.icon_card" />
      <span>{{ $prismic.asText(items.title_card) }}</span>
    </nuxt-link>

  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  name:'Card',
  props: {    
    items: VueTypes.object.def(),
    size: VueTypes.string.def()
  },  
  mounted() {
    this.domReady = true
    //console.log(this.items)
  }
}
</script>
<style lang="scss" module>
.card{
  background: white;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.051);
  border-radius: 25px;
  margin: 15px;
  @media (max-width: 800px){
    margin: 5px;
  }
  &.home{
    width: 160px;
    min-width: 160px;
    height: 160px;
    a{
      height:100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 8px;
      img{margin-bottom: 10px;filter:grayscale(100);transition:ease-in 0.5s}
      span{font-size: 12px;line-height: 1.3;font-weight: 600;padding: 0 10px;text-align: center;min-height: 33px;}
      &:hover{
        img{filter:grayscale(0)}
      }
    }
  }
}
</style>