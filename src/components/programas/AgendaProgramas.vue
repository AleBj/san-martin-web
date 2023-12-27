<template lang="">
  <div :class="[`wrapper`, $style.wrapperAgenda]">
    <div :class="[$style.headTitle]">
      <Title :text="data.primary.titulo_agenda" :size="`h2`" />
      <Button v-if="data.primary.cta_link && data.primary.cta_link.length > 0" :cta="`${$prismic.asText(data.primary.cta_link)}`" :externalLink="true" :link="`${data.primary.url_link.url}`" :target="`${data.primary.url_link.target}`" :class="$style.button" />   
    </div>
    <!-- <div :class="[$style.wrapCards]">
      <div v-for="(c, index) in items" :key="index" :style="`background-image:url(${c.imagen_item.url}?fit=clip&w=700)`" :class="[$style.card, data.primary.tamano_agenda && $style.agendaSmall]"> 
        <div :class="$style.date" v-if="c.lugar_agenda && c.lugar_agenda.length > 0">
          {{muestraMes(c.fecha_hora)}} 
          <strong> {{muestraDia(c.fecha_hora)}} </strong>
        </div>
        <div v-if="c.lugar_agenda && c.lugar_agenda.length == 0"></div>
        <div :class="$style.info">
          <h5>{{$prismic.asText(c.volanta_agenda)}} </h5>
          <h2>{{$prismic.asText(c.titulo_agenada)}} </h2>
          <div :class="[$style.icon, $style.hora]"  v-if="c.lugar_agenda && c.lugar_agenda.length > 0">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 1.62502C7.46418 1.62502 8.40672 1.91093 9.20841 2.4466C10.0101 2.98227 10.6349 3.74365 11.0039 4.63444C11.3729 5.52523 11.4694 6.50542 11.2813 7.45108C11.0932 8.39674 10.6289 9.26538 9.94715 9.94716C9.26537 10.6289 8.39672 11.0932 7.45107 11.2813C6.50541 11.4694 5.52521 11.3729 4.63442 11.0039C3.74363 10.635 2.98226 10.0101 2.44659 9.20842C1.91091 8.40673 1.625 7.4642 1.625 6.50002C1.625 5.20709 2.13861 3.96711 3.05285 3.05287C3.96709 2.13863 5.20707 1.62502 6.5 1.62502ZM6.5 0.542017C5.12905 0.548543 3.8027 1.02981 2.74657 1.90395C1.69044 2.77808 0.969748 3.99111 0.707095 5.33667C0.444443 6.68224 0.656049 8.07724 1.30592 9.28439C1.95579 10.4915 3.00379 11.4363 4.27164 11.9579C5.53949 12.4795 6.9489 12.5458 8.26011 12.1455C9.57132 11.7451 10.7034 10.9029 11.4636 9.76209C12.2239 8.62126 12.5655 7.25227 12.4303 5.888C12.2951 4.52372 11.6914 3.24841 10.722 2.27902C10.167 1.72614 9.50844 1.28814 8.78397 0.990085C8.05951 0.692028 7.28338 0.539768 6.5 0.542017Z" fill="white"/>
              <path d="M9.209 8.66696C9.1124 8.66909 9.01758 8.64075 8.938 8.58596L5.959 6.79796V3.79196C5.95586 3.71889 5.96754 3.64594 5.99334 3.57751C6.01913 3.50907 6.05851 3.44657 6.10911 3.39375C6.1597 3.34094 6.22046 3.29891 6.28772 3.2702C6.35498 3.24149 6.42736 3.22668 6.5005 3.22668C6.57364 3.22668 6.64602 3.24149 6.71328 3.2702C6.78054 3.29891 6.8413 3.34094 6.89189 3.39375C6.94249 3.44657 6.98187 3.50907 7.00766 3.57751C7.03346 3.64594 7.04514 3.71889 7.042 3.79196V6.20196L9.48 7.66396C9.57937 7.725 9.65631 7.81657 9.69931 7.92496C9.74231 8.03336 9.74906 8.15277 9.71856 8.26533C9.68806 8.37789 9.62194 8.47755 9.53009 8.5494C9.43824 8.62126 9.32559 8.66145 9.209 8.66396V8.66696Z" fill="white"/>
            </svg>
            {{muestraHora(c.fecha_hora)}}
          </div>
          <div :class="[$style.icon, $style.lugar]" v-if="c.lugar_agenda && c.lugar_agenda.length > 0">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.496 1.62499C5.97944 1.63239 6.45639 1.73759 6.89809 1.93424C7.33979 2.1309 7.73711 2.41494 8.0661 2.76925C8.39509 3.12356 8.64895 3.54081 8.81237 3.99586C8.9758 4.45091 9.0454 4.93433 9.017 5.41699C9.017 7.58399 6.688 9.93999 5.496 11.159C4.309 9.94199 1.979 7.44799 1.979 5.41699C1.94438 4.44825 2.29506 3.50527 2.95424 2.79454C3.61343 2.08381 4.5274 1.66326 5.496 1.62499ZM5.496 0.541992C4.87079 0.550068 4.25359 0.683745 3.68107 0.935078C3.10855 1.18641 2.5924 1.55027 2.16329 2.00504C1.73418 2.4598 1.40087 2.99619 1.18316 3.58232C0.965456 4.16845 0.867801 4.79237 0.896 5.41699C0.896 8.09799 4.011 11.186 5.121 12.296C5.16923 12.3484 5.22782 12.3903 5.29306 12.4189C5.35829 12.4475 5.42876 12.4623 5.5 12.4623C5.57124 12.4623 5.64171 12.4475 5.70694 12.4189C5.77218 12.3903 5.83077 12.3484 5.879 12.296C6.989 11.186 10.104 8.15199 10.104 5.41699C10.1368 4.79063 10.042 4.16413 9.82547 3.57547C9.60893 2.98681 9.27511 2.44825 8.84426 1.99243C8.4134 1.53661 7.89448 1.17302 7.31893 0.923699C6.74339 0.674379 6.12322 0.54452 5.496 0.541992Z" fill="white"/>
            </svg>
            {{$prismic.asText(c.lugar_agenda)}} 
          </div>
        </div>
      </div>
    </div> -->

    <div :class="[$style.wrapCards]" id="agendaCarousel">

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
        @lazyLoadError="handleLazyLoadError"
      >

      <div v-for="(c, index) in items" :key="index" :style="`background-image:url(${c.imagen_item.url}?fit=clip&w=700)`" :class="[$style.card, data.primary.tamano_agenda && $style.agendaSmall, (dateParse(c.fecha_hora) < dateParse(currentDate) && $style.pasada)]"> 
        <figure v-if="isMobile" :style="`background-image:url(${c.imagen_item.url}?fit=clip&w=700)`"></figure>
        <div :class="$style.date" v-if="c.lugar_agenda && c.lugar_agenda.length > 0">
          {{muestraMes(c.fecha_hora)}} 
          <strong> {{muestraDia(c.fecha_hora)}} </strong>
        </div>
        <div v-if="c.lugar_agenda && c.lugar_agenda.length == 0"></div>
        <div :class="$style.info">
          <h5>{{$prismic.asText(c.volanta_agenda)}} </h5>
          <h2>{{$prismic.asText(c.titulo_agenada)}} </h2>
          <div :class="[$style.icon, $style.hora]"  v-if="c.lugar_agenda && c.lugar_agenda.length > 0">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 1.62502C7.46418 1.62502 8.40672 1.91093 9.20841 2.4466C10.0101 2.98227 10.6349 3.74365 11.0039 4.63444C11.3729 5.52523 11.4694 6.50542 11.2813 7.45108C11.0932 8.39674 10.6289 9.26538 9.94715 9.94716C9.26537 10.6289 8.39672 11.0932 7.45107 11.2813C6.50541 11.4694 5.52521 11.3729 4.63442 11.0039C3.74363 10.635 2.98226 10.0101 2.44659 9.20842C1.91091 8.40673 1.625 7.4642 1.625 6.50002C1.625 5.20709 2.13861 3.96711 3.05285 3.05287C3.96709 2.13863 5.20707 1.62502 6.5 1.62502ZM6.5 0.542017C5.12905 0.548543 3.8027 1.02981 2.74657 1.90395C1.69044 2.77808 0.969748 3.99111 0.707095 5.33667C0.444443 6.68224 0.656049 8.07724 1.30592 9.28439C1.95579 10.4915 3.00379 11.4363 4.27164 11.9579C5.53949 12.4795 6.9489 12.5458 8.26011 12.1455C9.57132 11.7451 10.7034 10.9029 11.4636 9.76209C12.2239 8.62126 12.5655 7.25227 12.4303 5.888C12.2951 4.52372 11.6914 3.24841 10.722 2.27902C10.167 1.72614 9.50844 1.28814 8.78397 0.990085C8.05951 0.692028 7.28338 0.539768 6.5 0.542017Z" fill="white"/>
              <path d="M9.209 8.66696C9.1124 8.66909 9.01758 8.64075 8.938 8.58596L5.959 6.79796V3.79196C5.95586 3.71889 5.96754 3.64594 5.99334 3.57751C6.01913 3.50907 6.05851 3.44657 6.10911 3.39375C6.1597 3.34094 6.22046 3.29891 6.28772 3.2702C6.35498 3.24149 6.42736 3.22668 6.5005 3.22668C6.57364 3.22668 6.64602 3.24149 6.71328 3.2702C6.78054 3.29891 6.8413 3.34094 6.89189 3.39375C6.94249 3.44657 6.98187 3.50907 7.00766 3.57751C7.03346 3.64594 7.04514 3.71889 7.042 3.79196V6.20196L9.48 7.66396C9.57937 7.725 9.65631 7.81657 9.69931 7.92496C9.74231 8.03336 9.74906 8.15277 9.71856 8.26533C9.68806 8.37789 9.62194 8.47755 9.53009 8.5494C9.43824 8.62126 9.32559 8.66145 9.209 8.66396V8.66696Z" fill="white"/>
            </svg>
            {{muestraHora(c.fecha_hora)}}
          </div>
          <div :class="[$style.icon, $style.lugar]" v-if="c.lugar_agenda && c.lugar_agenda.length > 0">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.496 1.62499C5.97944 1.63239 6.45639 1.73759 6.89809 1.93424C7.33979 2.1309 7.73711 2.41494 8.0661 2.76925C8.39509 3.12356 8.64895 3.54081 8.81237 3.99586C8.9758 4.45091 9.0454 4.93433 9.017 5.41699C9.017 7.58399 6.688 9.93999 5.496 11.159C4.309 9.94199 1.979 7.44799 1.979 5.41699C1.94438 4.44825 2.29506 3.50527 2.95424 2.79454C3.61343 2.08381 4.5274 1.66326 5.496 1.62499ZM5.496 0.541992C4.87079 0.550068 4.25359 0.683745 3.68107 0.935078C3.10855 1.18641 2.5924 1.55027 2.16329 2.00504C1.73418 2.4598 1.40087 2.99619 1.18316 3.58232C0.965456 4.16845 0.867801 4.79237 0.896 5.41699C0.896 8.09799 4.011 11.186 5.121 12.296C5.16923 12.3484 5.22782 12.3903 5.29306 12.4189C5.35829 12.4475 5.42876 12.4623 5.5 12.4623C5.57124 12.4623 5.64171 12.4475 5.70694 12.4189C5.77218 12.3903 5.83077 12.3484 5.879 12.296C6.989 11.186 10.104 8.15199 10.104 5.41699C10.1368 4.79063 10.042 4.16413 9.82547 3.57547C9.60893 2.98681 9.27511 2.44825 8.84426 1.99243C8.4134 1.53661 7.89448 1.17302 7.31893 0.923699C6.74339 0.674379 6.12322 0.54452 5.496 0.541992Z" fill="white"/>
            </svg>
            {{$prismic.asText(c.lugar_agenda)}} 
          </div>
        </div>
      </div>
      
      </slick>

    </div>

  </div>
</template>
<script>
import VueTypes from 'vue-types'
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';

export default {
  name:'Agenda',
  props: {    
    items: VueTypes.array.def(),
    data: VueTypes.object.def()
  },
  components:{
    Slick,
  },
  data() {
    return {
      dataReady: false,
      isMobile: false,
      mes:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
      currentDate: new Date(),
      slickOptions: {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
            }
          }
        ]
      },
    }
  }, 
  mounted() {
   this.isMobile = window.innerWidth < 800;

   //this.items = this.items.filter(i => this.dateParse(i.fecha_hora) > this.dateParse(this.currentDate))

    //  console.log(Date.parse(this.currentDate))
    //  console.log(Date.parse(this.items[0].fecha_hora))
    console.log('cuantos?:',this.items)
  },
  watch: {
    items(v) {
      this.items = v  
      this.handleInit()
      console.log('cuantos?:',this.items)
    }
  },
  methods:{
    muestraDia(n){
      const f = new Date(n);
      return f.getDate()
    },
    muestraMes(n){
      const m = new Date(n);
      let mes = this.mes[m.getMonth()];
      return mes
    },
    muestraHora(n){
      const h = new Date(n);      
      return `${h.getHours()}:${h.getMinutes() != 0 ? h.getMinutes() : h.getMinutes()+'0'} Hs`
    },
    dateParse(d){
      return Date.parse(d)
    },

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
    }
  }
}
</script>
<style lang="scss" module>
.wrapperAgenda{margin-bottom: 50px;position: relative;}
.headTitle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 44px;
}
.wrapCards{
  position: relative;
  .card{
    border-radius: 25px;
    background-size: cover;
    background-blend-mode: multiply;
    background-position: center;
    height: 480px;
    // width: calc(33.33% - 15px);
    margin:15px 0;
    display: flex !important;
    padding: 32px;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    figure{
      position: absolute;
      z-index: -1;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      background-size: cover;
    }
    &:after{
      content: '';
      width: 100%;
      height: 60%;
      position: absolute;
      z-index: 0;
      left: 0;
      bottom: 0;
      background: linear-gradient(0deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 62%);
    }
    &.pasada{
      pointer-events: none;
      opacity: .5;
    }
    &.agendaSmall{height: 350px;}
    .date{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #FFF;
      border-radius: 6px;
      width: 80px;
      height: 80px;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 12px;
      line-height: 1;
      strong{font-size: 36px;}
    }
  }
  .info{
    color: #fff;
    position: relative;
    z-index: 1;
    h5{
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    h2{
      font-size: 22px;
      line-height: 1.2;
      margin-bottom: 16px;
    }
    .icon{
      font-size: 12px;
      font-weight: 600;
      margin: 4px 0;
      display: flex;
      align-items: flex-start;
      svg{min-width: 16px;width: 16px;margin-right: 6px;}
    }
  }
  @media (max-width:800px){
    .card{
      min-width: 300px;
      height: 430px;
      margin-right: 20px;
    }
  }
}

</style>

<style lang="scss">
#agendaCarousel{
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
    height: auto;
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