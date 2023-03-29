<template lang="">
  <div :class="$style.contentNews">
    <div :class="[$style.topNews, `wrapper`]">
       <TitleStatics :text="`Novedades`" size="h3" />
       <Button :cta="`Ver Más`" :class="$style.btnMobile" :link="`/novedades/`" />
    </div>
    <div :class="[$style.contentCards, `wrapper`]">
      <CardsNews v-for="(item, index) in news" :key="index" :items="item" :type="`newsHome`" />
      <div :class="[$style.highlight]" v-if="highlight.length > 0" :style="`background-color:${highlight[0].color_fondo};background-image:url(${highlight[0].imagen.url}?fit=clip&w=900)`" >
        
        <a v-if="highlight[0].link.url" :href="highlight[0].link.url" :target="highlight[0].link.target && highlight[0].link.target">
            <small>{{ $prismic.asText(highlight[0].volanta) }}</small>
            <h2>{{ $prismic.asText(highlight[0].titulo) }}</h2>
            <span>
              seguir leyendo
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#FFFFFF"/>
              </svg>
            </span>
        </a>
        <nuxt-link v-if="highlight[0].link.uid" :to="(highlight[0].link.type == 'sitio') ? `/${highlight[0].link.uid}` :  (highlight[0].link.type == 'interna_comunidad') ?`/comunidades/interna/${highlight[0].link.uid}` :`/${highlight[0].link.type}/${highlight[0].link.uid}`">
            <small>{{ $prismic.asText(highlight[0].volanta) }}</small>
            <h2>{{ $prismic.asText(highlight[0].titulo) }}</h2>
            <span>
              seguir leyendo
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#FFFFFF"/>
              </svg>
            </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
import Button from '../Button'
import TitleStatics from '../TitleStatics'

export default {
  name:'news-home',
  components:{
    Button,
    TitleStatics
  },
  props: {    
    news: VueTypes.array.def(),
    highlight: VueTypes.array.def()
  },  
  mounted() {
    
  },
  watch: {
    news(v) {
      this.news = v
      // //console.log(this.news)  
    },
    highlight(v) {
      this.highlight = v
    }
  },
}
</script>
<style lang="scss" module>
  .contentNews{
    margin-top: 40px;
    background: white;
    padding: 96px 0;
    .topNews{display: flex;align-items: center;justify-content: space-between;}
    .contentCards{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 50px;
      @media (min-width:800px) {
        
        & > div:first-child{
          order:0;
          width: calc(66.66% - 7px);
          position: relative;
          a{padding-bottom: 0;}
          div{margin-bottom: 0;}
          &::after{
            content: '';
            position: absolute;
            left: 0;top:0;
            height: 100%;
            width: 100%;
            border-radius: 12px;
            background: linear-gradient(180deg, rgba(255,255,255,0) 34%, rgba(0,0,0,0.5816920518207283) 83%);
          }
          div[data-card="copy"]{
            position:absolute;
            width: 100%;
            padding: 40px 60px;
            bottom:0;
            color:white;
            z-index: 1;
            small, h2{color:white;}
            span{position: static;path{fill:white}}
          }
        }

      }
    }
    @media (max-width:800px){
      padding: 40px 0;
      .btnMobile a{min-width: 120px !important;}
    }
  }
  .highlight{
    width: calc(33.33% - 15px);
    margin: 15px 0;
    order:1;
    border-radius: 25px;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    a{
    outline: none;
    height:100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    padding-bottom: 20px;
    padding: 30px;
    color: #FFF;
    span{
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: #FFF;
    }
    small{
      font-size: 12px;
      line-height: 1.3;
      font-weight: 600;
      display: block;
      color:$blue;
      text-transform: uppercase;
      margin-bottom: 14px;
      color: #FFF;
    }
    h2{
      font-size: 22px;
      color:$black;
      line-height: 1.4;
      margin-bottom: 20px;
      color: #FFF;
    }
  }
  @media (max-width:800px){
    width: 100%;
    aspect-ratio: 4/5;
  }
}
</style>