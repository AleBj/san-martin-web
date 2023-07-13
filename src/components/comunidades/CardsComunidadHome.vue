<template lang="">
  <div :class="[$style.card, $style[size]]" :style="{backgroundImage:`url(${items.data.thumb_card.url})`,backgroundColor:color}">
    <nuxt-link :to="`/comunidades/interna/${items.uid}`">
      <h3>{{ $prismic.asText(items.data.titulo) }}</h3>
      <p>{{ $prismic.asText(items.data.descripcion) }}</p>
      <span>
        SEGUIR LEYENDO
        <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" />
        </svg>
      </span>
    </nuxt-link>

  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  name:'CardComunidadHome',
  props: {    
    items: VueTypes.object.def(),
    color: VueTypes.string.def(),
    size: VueTypes.string.def()
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
  },
  watch: {
  },
  methods:{
  }
}
</script>
<style lang="scss" module>
.card{
  border-radius: 25px;
  background-size: cover;
  background-blend-mode: multiply;
  background-position: center;
  height: 480px;
  width: calc(33.33% - 15px);
  margin:15px 0;
  &.big{
    width: calc(66.66% - 15px);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
  }
  a{
    padding: 40px;
    height:100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    color:#FFF;
    h3{font-size: 22px;margin: 10px 0 20px;}
    p{font-size: 16px;line-height: 1.5;font-weight: 400;margin-bottom: 26px;}
    span{
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      svg{margin-left: 10px;fill: #fff;}
    }
  }
  @media (max-width:800px) {
    min-height: 400px;
    height: auto;
    width: 100%;
    margin:10px 0;
    &.big{
      width: 100%;
      background-size: cover;
      background-blend-mode: multiply;
      background-position: center;
    }
    a{padding: 30px;}
    
  }
}
</style>