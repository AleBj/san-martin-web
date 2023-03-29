<template>
  <div :class="$style.fullMediaCard" :style="`background-image:url(${bgImage}?fit=clip&w=1400`">
    <div :class="[`wrapper`, $style.flex]" :data-align="items.alineacion ? `izq` : `der`" v-if="items  && items.titulo_tarjeta.length != 0 && items.titulo_tarjeta[0].text != ''">
      <CardBg 
      :titulo="items.titulo_tarjeta"
      :description="items.descripcion_tarjeta" 
      :link="items.link_boton"
      :cta="items.cta_boton"
      :color="items.color_tarjeta"
      :size="`mid`" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import CardBg from '../../components/blocks/CardBg'
export default {
  name: 'full-media-card',
  components: {
    CardBg,
  },
  props: {    
    data: VueTypes.object.def()
  },  
  data() {
    return {      
      bgImage: this.data.primary.image_bg.url,
      items:this.data.primary
    }
  },
  mounted() {
    //console.log(this.items.titulo_tarjeta)
  }
}
</script>

<style lang="scss" module>
.fullMediaCard{
  background-size: cover;
  background-position: center;
  min-height: 70vh;
  max-height: 700px;
  padding: 50px 0;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  .flex{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &[data-align="der"]{justify-content: flex-end;}
  }
  @media (max-width:800px) {
    max-height: none;
    padding:  0;
    padding-top: 55%;
    min-height: 0vh;
    background-size: auto 75vw;
    background-repeat: no-repeat;
    background-position: top center;
  }
}
</style>