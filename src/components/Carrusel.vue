<template>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div  v-for="(item,index) in items" :key="index" :style="item.style" class="swiper-slide">
          
          <a v-if="item.video_slider && item.video_slider.url" :href="(item.link.url) ? item.link.url : `/`" :class="$style.video">
            <VideoBackground :video="item.video_slider.url" :videoMob="item.video_slider_mobile.url" />
          </a>
          <a v-if="item.link.link_type == 'Web' || item.link.link_type == 'Media'" :href="(item.link.url) ? item.link.url : `/`" target="_blank">      
  
            <picture>
              <source :srcset="item.imagen_mobile.url" media="(max-width: 768px)">
              <source :srcset="item.imagen_desktop.url">
              <prismic-image :field="item.imagen_desktop"/>
            </picture>
          </a>
          <nuxt-link v-else-if="item.link.id" :to="(item.link.type == 'sitio') ? `/${item.link.uid}` :  (item.link.type == 'interna_comunidad') ? `/comunidades/interna/${item.link.uid}` : `/${item.link.type}/${item.link.uid}`">          
            <picture>
              <source :srcset="item.imagen_mobile.url" media="(max-width: 768px)">
              <source :srcset="item.imagen_desktop.url">
              <prismic-image :field="item.imagen_desktop"/>
            </picture>
          </nuxt-link>
          <a v-else>
            <picture>
              <source :srcset="item.imagen_mobile.url" media="(max-width: 768px)">
              <source :srcset="item.imagen_desktop.url">
              <prismic-image :field="item.imagen_desktop"/>
            </picture>
          </a>
  
        </div>
      </div>
      <!-- If pagination is needed -->
      <div class="swiper-pagination"></div>
  
      <!-- If navigation buttons are needed -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </template>
  
  <script>
  import VueTypes from 'vue-types'
  // import Swiper JS
  // add or remove unused modules
  import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
  import 'swiper/swiper-bundle.min.css'
  export default {
    name: 'Carrusel',
    props: {    
      items: VueTypes.array.def()
    },  
    components:{
    },
    mounted() {
      // configure Swiper to use modules. The modules were tested with SwiperJS v6.8.4 with NuxtJS v2.15.7
      // previously it was before export default. Moved here for performance issues. Move back in case of problems.
      // add or remove unused modules
      Swiper.use([Navigation, Pagination, Autoplay])
      
      // init Swiper:
      /* eslint-disable no-unused-vars */
      const swiper = new Swiper('.swiper', {
        // Optional parameters
        // @see https://swiperjs.com/swiper-api#parameters
        direction: 'horizontal',
        loop: true,
        // remove unused modules if needed
        modules: [Navigation, Pagination, Autoplay],
        // Pagination if needed
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        // Autoplay if needed
        autoplay: {
          delay: 7000
        },
        // Navigation arrows if needed
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // Configure other options. Not tested
        ,slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30
      })
      console.log(this.items)
    }
  }
  </script>
<style lang="scss" module>
.video{
  width: 1110px;
  height: 480px;
  position: relative;
  @media (max-width:800px) {
     width: 350px;
     height: 360px; 
  }
}
</style>
  
  <style scoped lang="scss">
  .swiper {
    padding-top: 30px;
    height: auto;
    overflow: hidden;
    position: relative;
    width: auto;
    padding-bottom: 30px;
  }
  .swiper-slide {
    align-items: center;
    display: flex;
    justify-content: center;
    max-width:1100px;
    border-radius: 30px;
    overflow: hidden;  
    @media (max-width:800px) {
      border-radius: 0px;
      & img{display: block;width: calc(100vw - 32px);object-fit: cover;}
      & a{
        display: block;
        overflow: hidden;
        border-radius: 20px;
      }
    }
  }
  .swiper-button-next{
      background-color: #FFF;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      right: 50px;
      @media (max-width:800px) {display: none;}
  }
  .swiper-button-prev{
      background-color: #FFF;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      left: 50px;
      @media (max-width:800px) {display: none;}
  }
  .swiper-button-prev:after,
  .swiper-button-next:after{
    font-size: 20px;
  }
  </style>