<template>
<div :class="[`wrapper`, $style.listIcons]">
    <Title :text="data.primary.titulo_listicons" :size="`h2`" />

    <div :class="$style.content_slide" id="carruselIcon">

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
      
      <div v-for="(item,index) in items" :key="index" :class="[$style.icon]">

        <Imagen :image="item.image_icon" />
        <strong>{{$prismic.asText(item.titulo_icon)}}</strong>

      </div>

      </slick>

    </div>

  </div>
</template>

<script>
import VueTypes from 'vue-types'
import Title from '../Title'
import Imagen from '../SingleImage'
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
export default {
  name: 'ListIcons',
  props: {    
    items: VueTypes.array.def(),
    data: VueTypes.object.def()
  },  
  components:{
    Slick,
    Title,
    Imagen
  },
  data() {
    return {      
      slickOptions: {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
                slidesToShow: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
          }
        ]
      },
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
.listIcons{
  .icon{
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.051);
    border-radius: 25px;
    height: 160px;
    img{max-width: 60px;margin-bottom: 10px;}
  }
  .content_slide {
    padding-top: 40px;
    height: auto;
    overflow: hidden;
    position: relative;
    width: auto;
    padding-bottom: 30px;
  }
}
</style>

<style lang="scss">
#carruselIcon{
  position: relative;
  padding: 30px 0;
  .slick-arrow{
    display: none !important;
  }
  .slick-track{padding-bottom: 16px;}
  .slick-slide{
    margin: 0 15px;
    border-radius: 30px;
    overflow: hidden;
    @media (max-width:800px) {
     margin: 0 10px;
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