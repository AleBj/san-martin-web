<template lang="">
      
    <div :class="[$style.listCard, shadow && $style.shadowBox]">
    
        <div :class="[$style.listCardImage]" v-if="items.imagen_singlelist && Object.keys(this.items.imagen_singlelist).length > 0">
            
            <a v-if="items.link_externo_imagen && items.link_externo_imagen.url" :class="$style.listCardImageLink" :href="items.link_externo_imagen.url" target="_blank"></a>
            
            <Imagen :image="items.imagen_singlelist" />
        </div>
        <div :class="[$style.listCardCont]">
            <small>{{ $prismic.asText(items.volanta_singlelist) }}</small>
            <Title :text="items.titulo_singlelist" :size="`h2`" />
            <p v-if="items.parrafo_sinflelist && items.parrafo_sinflelist.length > 0">{{$prismic.asText(items.parrafo_sinflelist)}}</p>
      
            <a v-if="items.link_singlelist.url" :href="items.link_singlelist.url" :target="items.link_singlelist.target ? items.link_singlelist.target : '_self'" :class="$style.alink">
                <span>
                    {{$prismic.asText(items.cta_link_singlelist)}}
                    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" />
                    </svg>
                </span>
            </a>
            <nuxt-link :class="$style.alink" v-if="items.link_singlelist.uid" :to="(items.link_singlelist.type == 'sitio') ? `/${items.link_singlelist.uid}` :  (items.link_singlelist.type == 'interna_comunidad') ?`/comunidades/interna/${items.link_singlelist.uid}` :`/${items.link_singlelist.type}/${items.link_singlelist.uid}`">
                <span>
                    {{$prismic.asText(items.cta_link_singlelist)}}
                    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" />
                    </svg>
                </span>
            </nuxt-link>

            <!-- <nuxt-link :to="`/${(items.link_singlelist.type == 'interna_comunidad') ? 'comunidades/d' : items.link_singlelist.type}/${items.link_singlelist.uid}`" v-if="items.cta_link_singlelist && items.cta_link_singlelist.length > 0">
                <span>
                    {{$prismic.asText(items.cta_link_singlelist)}}
                    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" />
                    </svg>
                </span>
            </nuxt-link> -->
        </div>

    </div>
</template>
<script>
import VueTypes from 'vue-types'
import Imagen from '../SingleImage'
import Title from '../Title'

export default {
  name:'CardListSitios',
  components: {
    Imagen,
    Title,
  },
  props: {    
    items: VueTypes.object.def(),
    shadow: VueTypes.bool.def('false')
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
  },
  watch: {
  },
  methods:{
  }
}
</script>
<style lang="scss" module>
.listCard{
    width: 100%;
    margin:15px 0;
    &.shadowBox{
        border-radius: 25px;
        box-shadow: 0px 10px 20px rgb(0,0,0,.05);
        background: #fff;
        .listCardCont{padding: 30px;}
    }
    .listCardImage{
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        width: 100%;
        position: relative;
        padding-bottom: 56.25%;
        background: blue;
        img{
            position: absolute;
            left: 0;top:0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &Link{
            position: absolute;
            top: 0;left: 0;
            width: 100%;
            height: 100%;
            
            z-index: 2;
        }
    }
    &:not(.shadowBox){
        .listCardImage{margin-bottom: 20px;}
    }
    h2{
        margin: 5px 0 20px;
        max-height: 96px;
        line-height: 1.4;
        overflow: hidden;
    }
    small{font-size: 12px;line-height: 1.3;font-weight: 600;margin-bottom: 10px;text-transform: uppercase;color:#209EDE;display: block;}
    p{font-size: 15px;line-height: 1.3;font-weight: 400;margin-bottom: 10px;color:#5E606A;margin-bottom: 16px;}
    .alink{
        display: flex;
        align-items: flex-start;
        color:$black;    
        text-transform: uppercase;
        span{
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            svg{margin-left: 10px;fill: $black;}
        }
    }
}
</style>