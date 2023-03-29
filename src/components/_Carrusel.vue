<template>
  <div id="carrusel">
      
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
        <div  v-for="(item,index) in items" :key="index">
          <div v-if="item.video_slider && item.video_slider.url" :class="$style.video">
            <VideoBackground :video="item.video_slider.url" :videoMob="item.video_slider_mobile.url" />
          </div>
          <div v-else>
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
      </slick>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import VideoBackground from './VideoBackground.vue';
export default {
  name: 'Carrusel',
  props: {    
    items: VueTypes.array.def()
  },  
  components:{
    Slick,
    VideoBackground
  },
  data() {
      return {
          slickOptions: {
              dots: true,
              infinite: true,
              speed: 300,
              slidesToShow: 1,
              centerMode: true,
              variableWidth: true
              // Any other options that can be got from plugin documentation
          },
      };
  },
  mounted() {    
    //console.log(this.items)
    
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
          //console.log('handleAfterChange', event, slick, currentSlide);
      },
      handleBeforeChange(event, slick, currentSlide, nextSlide) {
          //console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
      },
      handleBreakpoint(event, slick, breakpoint) {
          //console.log('handleBreakpoint', event, slick, breakpoint);
      },
      handleDestroy(event, slick) {
          //console.log('handleDestroy', event, slick);
      },
      handleEdge(event, slick, direction) {
          //console.log('handleEdge', event, slick, direction);
      },
      handleInit(event, slick) {
          //console.log('handleInit', event, slick);
      },
      handleReInit(event, slick) {
          //console.log('handleReInit', event, slick);
      },
      handleSetPosition(event, slick) {
          //console.log('handleSetPosition', event, slick);
      },
      handleSwipe(event, slick, direction) {
          //console.log('handleSwipe', event, slick, direction);
      },
      handleLazyLoaded(event, slick, image, imageSource) {
          //console.log('handleLazyLoaded', event, slick, image, imageSource);
      },
      handleLazyLoadError(event, slick, image, imageSource) {
          //console.log('handleLazeLoadError', event, slick, image, imageSource);
      },
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
<style lang="scss">
#carrusel{
  position: relative;
  padding: 30px 0;
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
  .slick-slide{
    margin: 0 15px;
    border-radius: 30px;
    overflow: hidden;
    height: 480px;
    @media (max-width:800px) {
     margin: 0 10px;
     height: 360px; 
    }
  }
  .slick-dots{
    position: absolute;
    padding: 0;
    list-style: none;
    bottom: -14px;
    left: 0;
    width: 100%;
    display: flex;
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
  }
}
</style>