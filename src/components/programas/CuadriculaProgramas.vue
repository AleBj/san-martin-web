<template lang="">
  <div :class="`wrapper`">
    <div :class="[$style.cuadricula]" :style="`background-color:${data.primary.color_fondo}`">
      <div :class="$style.rowCuad">
        <div :class="$style.mid">
          <Title :text="data.primary.titulo_bloque_1" :size="`h3`" />
          <RichText :text="data.primary.bajada_bloque_1" />

          <a v-if="data.primary.link_boton_bloque_1.url" :href="`${data.primary.link_boton_bloque_1.url}`" :class="$style.button" :target="`${data.primary.link_boton_bloque_1.target}`">
            <strong>{{$prismic.asText(data.primary.cta_boton_bloque_1)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#ffffff"/>
            </svg>
          </a>
          <nuxt-link v-if="data.primary.link_boton_bloque_1.slug" :to="(data.primary.link_boton_bloque_1.type == 'sitio') ? `/${data.primary.link_boton_bloque_1.uid}` :  (data.primary.link_boton_bloque_1.type == 'interna_comunidad') ?`/comunidades/interna/${data.primary.link_boton_bloque_1.uid}` :`/${data.primary.link_boton_bloque_1.type}/${data.primary.link_boton_bloque_1.uid}`" :class="$style.button">
            <strong>{{$prismic.asText(data.primary.cta_boton_bloque_1)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#ffffff"/>
            </svg>
          </nuxt-link>
        </div>
        <div :class="[$style.mid,$style.image]" :style="`background-image:url(${data.primary.imagen_bloque_1.url}?fit=clip&w=700)`">
        </div>
      </div>  
      <div :class="$style.rowCuad">
        <div :class="[$style.mid,$style.image]" :style="`background-image:url(${data.primary.imagen_bloque_2.url}?fit=clip&w=700)`">
        </div>
        <div :class="$style.mid">
          <Title :text="data.primary.titulo_bloque_2" :size="`h3`" />
          <RichText :text="data.primary.bajada_bloque_2" />

          <a v-if="data.primary.link_boton_bloque_2.url" :href="`${data.primary.link_boton_bloque_2.url}`" :class="$style.button" :target="`${data.primary.link_boton_bloque_2.target}`">
            <strong>{{$prismic.asText(data.primary.cta_boton_bloque_2)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#ffffff"/>
            </svg>
          </a>
          
          <nuxt-link v-if="data.primary.link_boton_bloque_2.slug" :to="(data.primary.link_boton_bloque_2.type == 'sitio') ? `/${data.primary.link_boton_bloque_2.uid}` :  (data.primary.link_boton_bloque_2.type == 'interna_comunidad') ?`/comunidades/interna/${data.primary.link_boton_bloque_2.uid}` :`/${data.primary.link_boton_bloque_2.type}/${data.primary.link_boton_bloque_2.uid}`" :class="$style.button">
            <strong>{{$prismic.asText(data.primary.cta_boton_bloque_2)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#ffffff"/>
            </svg>
          </nuxt-link>
        </div>
      </div>  

    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import Title from '../Title'
import RichText from '../RichText'
export default {
  name:'full-card',
  components: {
    Title,
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
.cuadricula{
  margin-bottom: 50px;
  overflow: hidden;
  border-radius: 25px;
  background: #e5e5e5;
  .rowCuad{
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    min-height: 390px;
    color:#fff;
    .mid{
      width: 50%;
      padding: 60px;
      &.image{background-size: cover;background-position: center;}
    }
    h2{margin-bottom: 30px;}
    p{
    line-height: 1.4;
    color: inherit;
    }
    .button{
      text-transform: uppercase;
      display: block;
      font-size: 12px;
      letter-spacing: .03em;
      margin-top: 30px;
    }
  }
  @media (max-width:800px) {
    margin-bottom: 30px;
    border-radius: 15px;
    .rowCuad{
      flex-direction: column;
      .mid{
        width: 100%;
        padding: 40px;
        &.image{padding-bottom: 75%;}
      }
      h2{margin-bottom: 20px;}
      .button{
        margin-top: 20px;
      }
    }
    
  }
}
</style>