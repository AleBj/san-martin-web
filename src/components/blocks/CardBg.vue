<template lang="">
  <div :class="[$style.card, $style[size]]" :data-card-color="color">
    <h4>{{ $prismic.asText(titulo) }}</h4>
    <RichText v-if="description" :text="description" :class="$style.parag" />
  
    <a v-if="link.url" :href="link.url" :class="$style.linksBt" :target="link.link_type == 'Media' ? '_blank' : link.target ? link.target : `_self`">
      {{$prismic.asText(cta)}}
    </a>
    <nuxt-link v-if="link.uid" :class="$style.linksBt" :to="(link.type == 'sitio') ? `/${link.uid}` :  (link.type == 'interna_comunidad') ?`/comunidades/interna/${link.uid}` :`/${link.type}/${link.uid}`">
      {{$prismic.asText(cta)}}
    </nuxt-link>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import RichText from '../RichText.vue'

export default {
  name:'card-bg',
  components:{
    RichText
  },
  props: {    
    titulo: VueTypes.array.def(),
    description: VueTypes.array.def(),
    link: VueTypes.object.def(),
    cta: VueTypes.array.def(),
    color: VueTypes.string.def(),
    size: VueTypes.string.def()
  },  
  mounted() {
    this.domReady = true
    //console.log(this.link)
  }
}
</script>
<style lang="scss" module>
.card{
  background: white;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.051);
  border-radius: 25px;
  padding: 90px;
  h4{
    font-size: 28px;
    line-height: 1.2;
    font-weight: 900;
  }
  .parag{
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    margin: 30px 0 40px;
  }
  a{
    font-size: 12px;
    text-transform: uppercase;
    display: inline-flex;
    font-weight: 600;
    height: 50px;
    align-items: center;
    padding: 0 24px;
    border-radius: 25px;
  }
  &.mid{
    width: calc(50% - 15px);
  }
  &[data-card-color="Blanco"] a{
    background-color: #209EDE;
    color:#FFF;
  }
  @media (max-width:800px) {
    padding: 30px;
    border-radius: 15px;
    &.mid{ width:100%;}
  }
}
</style>