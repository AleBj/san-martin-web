<template lang="">
  <div :class="`wrapper`">
    <div :class="[$style.fullCard]"> 
      <div :class="$style.imageCrop">
        <Imagen :image="data.primary.imagen_fullcard" />
      </div>
      <Title :text="data.primary.titulo_fullcard" :size="`h3`" />
      <div :class="$style.paragraph">
        <RichText :text="data.primary.bajada_fullcard" />

        <div v-if="data.primary.cta_boton_fullcard && data.primary.cta_boton_fullcard.length > 0">
        <a v-if="data.primary.link_boton_fullcard.url" :href="data.primary.link_boton_fullcard.url" :target="(data.primary.link_boton_fullcard.target) ? data.primary.link_boton_fullcard.target : `blank`" :class="$style.button">
          {{$prismic.asText(data.primary.cta_boton_fullcard)}}
        </a>
        <nuxt-link v-else :to="(data.primary.link_boton_fullcard.type == 'sitio') ? `/${data.primary.link_boton_fullcard.uid}` :  (data.primary.link_boton_fullcard.type == 'interna_comunidad') ?`/comunidades/interna/${data.primary.link_boton_fullcard.uid}` :`/${data.primary.link_boton_fullcard.type}/${data.primary.link_boton_fullcard.uid}`" :class="$style.button">
          {{$prismic.asText(data.primary.cta_boton_fullcard)}}
        </nuxt-link>
        </div>
       
      </div>
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import Imagen from '../SingleImage'
import Title from '../Title'
import RichText from '../RichText'
import Button from '../Button'
export default {
  name:'full-card',
  components: {
    Title,
    RichText,
    Imagen,
    Button
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
    console.log(this.data.primary)
  },
  watch: {
  },
  methods:{
    
  }
}
</script>
<style lang="scss" module>
.fullCard{
  margin-bottom: 50px;
  .imageCrop{
    overflow: hidden;
    border-radius: 25px;
    margin-bottom: 46px;
    img{width: 100%;}
  }
  .paragraph{
    margin: 40px 0;
    p{
      font-size: 16px;
      line-height: 1.4;
      color: #5E606A;
      a{
        color:#209EDE;
        text-decoration: underline;
      }
    }
    .button{
      margin-top: 40px;
      font-size: 12px;
      text-transform: uppercase;
      display: inline-flex;
      font-weight: 600;
      height: 50px;
      align-items: center;
      padding: 0 24px;
      border-radius: 25px;
      color:#FFF;
      background-color:#209EDE;
    }
  }
  @media (max-width: 800px){
    margin-bottom: 30px;
    .imageCrop{
      border-radius: 14px;
      margin-bottom: 26px;
    }
    .paragraph{
      margin: top 16px;
      .button{margin-top: 20px;}
    }
  }
}
</style>