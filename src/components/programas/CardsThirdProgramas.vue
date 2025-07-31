<template lang="">
  <div :class="[`wrapper`, $style.wrapperMiddle]">
    <div :class="$style.titleCardThird">
      <Title :text="data.primary.titulo_cardthird" :size="`h3`" />
    </div>
    <div :class="$style.gridCards">
      <div v-for="(c, index) in items" :key="index" :class="[$style.cardthird]"> 
        <div :class="$style.imageCrop">
          <Imagen :image="c.imagen_cardthrid" />
        </div>
        <Title :text="c.titulo_cardthird" :size="`h3`" />
        <div :class="$style.paragraph">
          <RichText :text="c.bajada_cardthird" />
          
          <a v-if="c.link_boton_cardthird.url && c.link_boton_cardthird.link_type === 'Web'" :href="`${c.link_boton_cardthird.url}`" :class="$style.button" :target="`${c.link_boton_cardthird.target}`">
            <strong>{{$prismic.asText(c.cta_boton_cardthird)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#282828"/>
            </svg>
          </a>
          <a v-else-if="c.link_boton_cardthird.url && c.link_boton_cardthird.link_type === 'Media'" :href="`${c.link_boton_cardthird.url}`" :class="$style.button" :target="`_blank`">
          <strong>{{$prismic.asText(c.cta_boton_cardthird)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#282828"/>
            </svg>
          </a>
          <nuxt-link v-else :to="(c.link_boton_cardthird.type == 'sitio') ? `/${c.link_boton_cardthird.uid}` :  (c.link_boton_cardthird.type == 'interna_comunidad') ?`/comunidades/interna/${c.link_boton_cardthird.uid}` :`/${c.link_boton_cardthird.type}/${c.link_boton_cardthird.uid}`" :class="$style.button" :target="`${c.link_boton_cardthird.target}`">
            <strong>{{$prismic.asText(c.cta_boton_cardthird)}}</strong>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#282828"/>
            </svg>
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
  name:'card-third',
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
    // console.log(this.items)
    // console.log(this.data)
  },
  watch: {
  },
  methods:{
    
  }
}
</script>
<style lang="scss" module>
.titleCardThird{width: 100%;margin-bottom:20px;margin-top: 40px;}
.wrapperMiddle{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;  
  margin-bottom: 35px;
  .gridCards{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 30px;
    grid-column-gap: 30px;
    @media (max-width:800px) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 16px;
      grid-column-gap: 16px;
    }
  }
  .cardthird{
    width: 100%;
    .imageCrop{
      overflow: hidden;
      border-radius: 25px;
      margin-bottom: 30px;
    }
    .paragraph{
      margin: 10px 0;
      p{
        font-size: 16px;
        line-height: 1.4;
        color: #5E606A;
      }
      .button{
        display: block;
        font-size: 12px;
        letter-spacing: .03em;
        margin-top: 30px;
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
}
</style>