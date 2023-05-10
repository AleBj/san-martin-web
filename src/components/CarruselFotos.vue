<template>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div  v-for="(item,index) in items" :key="index" :style="item.style" class="swiper-slide">

          <prismic-image :field="item.imagen_desktop"/>
  
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
    name: 'CarruselFotos',
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
    max-width:100vw;
    overflow: hidden;  
    img{
      display: block;
      object-fit: cover;
      width: 100%;
      height: 90vh;
      min-height: 700px;
      aspect-ratio: 16/9;
    }
    @media (max-width:800px) {
      border-radius: 0px;
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
  .swiper-pagination{bottom:40px}
  .swiper-button-prev:after,
  .swiper-button-next:after{
    font-size: 20px;
  }
  </style>