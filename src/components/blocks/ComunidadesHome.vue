<template lang="">
  <div id="comunidades">
        
        <slick
        ref="slick"
        :options="slickOptions"
        @afterChange="handleAfterChange"
        @beforeChange="handleBeforeChange"
        @breakpoint="handleBreakpoint"
        @destroy="handleDestroy"
        @edge="handleEdge"
        @init="handleInit"
        @reInit="handleReInit"
        @setPosition="handleSetPosition"
        @swipe="handleSwipe"
        @lazyLoaded="handleLazyLoaded"
        @lazyLoadError="handleLazyLoadError">

        <div v-for="(item,index) in comunidades" :key="index" class="content-slide" :style="`background-image:url(${item.data.imagen_fondo.url}?fit=clip&w=900);background-color:${item.data.color_primario}`">
    
            <div class="slide wrapper">
              <h2>{{ $prismic.asText(item.data.titulo) }}</h2>
              <p>{{ $prismic.asText(item.data.texto_interno) }}</p>
              <br/>

              <nuxt-link :to="`/comunidades/${item.uid}`" :class="'btLink'">
                seguir leyendo
                <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#FFFFFF"/>
                </svg>
              </nuxt-link>
            </div>
                    
        </div>

      </slick>

  </div>
</template>
<script>
import VueTypes from 'vue-types'
import TitleStatics from '../../components/TitleStatics'
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
export default {
  name:'comunidades-home',
  components:{
    TitleStatics,
    Slick
  },
  props: {    
    comunidades: VueTypes.array.def()
  },  
  data() {
      return {
          slickOptions: {
              dots: true,
              infinite: true,
              speed: 300,
              slidesToShow: 1,
              centerMode: false
          },
      };
  },
  watch: {
    comunidades(v) {
      this.comunidades = v  
    }
  },
  mounted() {
    
  },
  methods: {
      next() {
          this.$refs.slick.next();
      },

      prev() {
          this.$refs.slick.prev();
      },

      reInit() {
          // Helpful if you have to deal with v-for to update dynamic lists
          this.$nextTick(() => {
              this.$refs.slick.reSlick();
          });
      },
      // Events listeners
      handleAfterChange(event, slick, currentSlide) {
          console.log('handleAfterChange', event, slick, currentSlide);
      },
      handleBeforeChange(event, slick, currentSlide, nextSlide) {
          console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
      },
      handleBreakpoint(event, slick, breakpoint) {
          console.log('handleBreakpoint', event, slick, breakpoint);
      },
      handleDestroy(event, slick) {
          console.log('handleDestroy', event, slick);
      },
      handleEdge(event, slick, direction) {
          console.log('handleEdge', event, slick, direction);
      },
      handleInit(event, slick) {
          console.log('handleInit', event, slick);
      },
      handleReInit(event, slick) {
          console.log('handleReInit', event, slick);
      },
      handleSetPosition(event, slick) {
          console.log('handleSetPosition', event, slick);
      },
      handleSwipe(event, slick, direction) {
          console.log('handleSwipe', event, slick, direction);
      },
      handleLazyLoaded(event, slick, image, imageSource) {
          console.log('handleLazyLoaded', event, slick, image, imageSource);
      },
      handleLazyLoadError(event, slick, image, imageSource) {
          console.log('handleLazeLoadError', event, slick, image, imageSource);
      },
  }
}
</script>

<style lang="scss" scoped>
#comunidades{
  position:relative;
  h3{
    width: 100%;    
    max-width: 1150px;
    padding: 0 20px;
    position: absolute;
    top:100px;
    left: 50%;
    transform: translateX(-50%);
    color:white;
    font-size: 28px;
    z-index: 9;
  }
  h2{
    max-width: 400px;
    margin-top: 16px;
    font-size: 36px;
  }
  p{margin-top: 20px;font-size: 16px;line-height: 1.3;max-width: 400px;}
 
}
</style>

<style lang="scss">
#comunidades{
  .slick-arrow{
    background: none;
    width: 60px;
    height: 60px;
    position: absolute;
    z-index: 3;
    top: 50%;left: 30px;
    transform: translateY(-50%);
    border:none;
    padding: 0;
    font-size: 0;
    &.slick-next{
      transform: translateY(-50%) rotate(180deg);
      left: auto;right: 30px;
    }
    &:before {
      content: "";
      width: 60px;
      height: 60px;
      border-radius: 50px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 1;
      transition: .4s ease-in-out;
      transform: translate(-50%,-50%) scale(1);
    }
    &:after{
      position: relative;
      z-index: 1;
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1.5px solid #007aff;
      border-top: 1.5px solid #007aff;
      border-radius: 1px;
      transform: rotate(-45deg);
      display: block;
      margin: auto;
      left: 3px;
    }
    &:hover:before {
        transform: translate(-50%,-50%) scale(.8);
    }
    @media (max-width:800px) {opacity: 0;pointer-events:none}
  }
  .slick-dots{
    opacity: 0;
    position: absolute;
    padding: 0;
    list-style: none;
    bottom: 14px;
    left: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    button{display: none;}
    li{
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 50%;
      background: #000;
      transition: ease-in 0.2s;
      opacity: .2;
      margin: 0 4px;
      &.slick-active{
        background-color: $blue;
        opacity: 1;
      }
    }
    @media (max-width:800px) {
      opacity: 1;
    }
  }
  .slick-list{padding: 0 !important;}
  .slick-slide{
    height: 70vh;
    overflow: hidden;
    position: relative;
    width: 100%;
    min-height: 650px;    
    & > div{height: 100%;}
    .content-slide{
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      overflow: hidden;
      background-size: cover;
      background-blend-mode: multiply;
      .slide{
          color:white;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
      }
      .btLink{
          margin-top: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #FFF;
          svg{margin-left: 5px;}
      }
      
    }
    @media (max-width:800px) {
      height: 140vw;
      min-height: 450px;
    }
  }
}
</style>