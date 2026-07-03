<template>
  <div :class="[$style.tramites]">

    <div class="marquee" v-if="marquee && marquee != ''">
      <Marquee 
        :text="marquee" 
        :speed="20"
      />
    </div>

   <div :class="[$style.hero]">
     <div :class="[$style.copy]">
       <TitleStatics :text="`Trámites`" :size="`hero`" />
       <p>Accedé a todos los trámites municipales, realizá gestiones online y conocé los requisitos, costos, duración y toda la información necesaria.</p>
     </div>
     <div :class="[$style.filtersContent, `wrapper`]">

      <div :class="[`filters`, $style.filtersTramites, {open: isOpen1}]"  @click="dropDown('1')">
        <span class="filters-name">{{inputText1}}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.01999 3.18195L7.03199 0.167951C7.13824 0.062185 7.28206 0.00280762 7.43198 0.00280762C7.58191 0.00280762 7.72573 0.062185 7.83199 0.167951C7.93788 0.275354 7.99725 0.420123 7.99725 0.570951C7.99725 0.72178 7.93788 0.866548 7.83199 0.973951L4.41899 4.38895C4.3155 4.49231 4.17613 4.55176 4.0299 4.55493C3.88367 4.5581 3.74185 4.50473 3.63399 4.40595L0.201986 0.975951C0.106191 0.86771 0.0551819 0.727068 0.0593149 0.582584C0.0634479 0.4381 0.122413 0.300605 0.224238 0.198016C0.326063 0.0954276 0.463115 0.0354363 0.607564 0.0302238C0.752013 0.0250114 0.893031 0.0749688 1.00199 0.169951L4.01999 3.18195Z" fill="#282828"/>
        </svg>
        <div class="filters-dropDown">
          <div v-for="(i, index) in categories" :key="index" @click="filterCats(i.id, i.data.nombre_categoria)" class="filters-items">
            {{ $prismic.asText(i.data.nombre_categoria) }}
          </div>
        </div>
      </div>

       <div :class="[`filters`, $style.filtersTramites, {open: isOpen2}]"  @click="dropDown('2')" :style="`opacity:${(subCatList.length > 0)?1:0.5}`">
        <span class="filters-name">{{inputText2}}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.01999 3.18195L7.03199 0.167951C7.13824 0.062185 7.28206 0.00280762 7.43198 0.00280762C7.58191 0.00280762 7.72573 0.062185 7.83199 0.167951C7.93788 0.275354 7.99725 0.420123 7.99725 0.570951C7.99725 0.72178 7.93788 0.866548 7.83199 0.973951L4.41899 4.38895C4.3155 4.49231 4.17613 4.55176 4.0299 4.55493C3.88367 4.5581 3.74185 4.50473 3.63399 4.40595L0.201986 0.975951C0.106191 0.86771 0.0551819 0.727068 0.0593149 0.582584C0.0634479 0.4381 0.122413 0.300605 0.224238 0.198016C0.326063 0.0954276 0.463115 0.0354363 0.607564 0.0302238C0.752013 0.0250114 0.893031 0.0749688 1.00199 0.169951L4.01999 3.18195Z" fill="#282828"/>
        </svg>
        <div class="filters-dropDown" v-if="subCatList.length > 0">
          <div v-for="(i, index) in subCatList" :key="index" @click="filterTramites(i.id, i.data.nombre_subcategoria)" class="filters-items">
            {{ $prismic.asText(i.data.nombre_subcategoria) }}
          </div>
        </div>
      </div>

      <div :class="[`filters`, $style.filtersTramites, {open: isOpen3}]"  @click="dropDown('3')" :style="`opacity:${(filtraTramites.length > 0)?1:0.5}`">
        <span class="filters-name">Seleccionar trámite</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.01999 3.18195L7.03199 0.167951C7.13824 0.062185 7.28206 0.00280762 7.43198 0.00280762C7.58191 0.00280762 7.72573 0.062185 7.83199 0.167951C7.93788 0.275354 7.99725 0.420123 7.99725 0.570951C7.99725 0.72178 7.93788 0.866548 7.83199 0.973951L4.41899 4.38895C4.3155 4.49231 4.17613 4.55176 4.0299 4.55493C3.88367 4.5581 3.74185 4.50473 3.63399 4.40595L0.201986 0.975951C0.106191 0.86771 0.0551819 0.727068 0.0593149 0.582584C0.0634479 0.4381 0.122413 0.300605 0.224238 0.198016C0.326063 0.0954276 0.463115 0.0354363 0.607564 0.0302238C0.752013 0.0250114 0.893031 0.0749688 1.00199 0.169951L4.01999 3.18195Z" fill="#282828"/>
        </svg>
        <div class="filters-dropDown" v-if="filtraTramites.length > 0">
          <NuxtLink v-for="(i, index) in filtraTramites" :key="index" :to="`/tramites/${i.uid}`" class="filters-items">
            {{ $prismic.asText(i.data.nombre) }}
          </NuxtLink>
        </div>
      </div>
      
       <!-- <div>
          Seleccione Categoría
          <div v-for="(i, index) in categories" :key="index" @click="filterCats(i.id)">
            {{ $prismic.asText(i.data.nombre_categoria) }}
          </div>
       </div>
       <div v-if="subCatList">
          Seleccione SubCategoría
          
          <div v-for="(i, index) in subCatList" :key="index" @click="filterTramites(i.id)" class="filters-items">
            {{ $prismic.asText(i.data.nombre_subcategoria) }}
          </div>
       </div> 
       <div v-if="filtraTramites">
          Seleccione Trámite
          <div>
            <NuxtLink v-for="(i, index) in filtraTramites" :key="index" :to="`/tramites/${i.uid}`">
              {{ $prismic.asText(i.data.nombre) }}
            </NuxtLink>
          </div>
       </div>-->
     </div>
   </div>
   <div :class="['wrapper', $style.banner]" v-if="bannerImage && bannerImage.url || bannerVideo && bannerVideo.url" id="bannerTramites"> 
      <div :class="$style.banner_close" @click="closeBanner">
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
          <path d="M18 6L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      
      <a v-if="bannerLink.link_type == 'Web' || bannerLink.link_type == 'Media'" :href="(bannerLink.url) ? bannerLink.url : `/`" target="_blank" :class="$style.banner_link"></a>
      <nuxt-link v-else-if="bannerLink.link_type !== 'Any'" :to="(bannerLink.type == 'sitio') ? `/${bannerLink.uid}` :  (bannerLink.type == 'interna_comunidad') ?`/comunidades/interna/${bannerLink.uid}` :`/${bannerLink.type}/${bannerLink.uid}`" :class="$style.banner_link"></nuxt-link>

      <div v-if="bannerVideo && bannerVideo.url" :class="$style.bannerVideo">
        <video autoplay muted loop playsinline>
          <source :src="bannerVideo.url" type="video/mp4">
        </video>
      </div>
      <picture v-else :class="$style.bannerImage">
        <source :srcset="bannerImageMobile.url" media="(max-width: 768px)">
        <source :srcset="bannerImage.url">
        <prismic-image :field="bannerImage"/>
      </picture>
   </div>
   <div :class="[`wrapper`]">
     <TitleStatics :text="`Trámites más utilizados`" :size="`h3`" />
     <div :class="$style.contentTra">
       <CardsTramites v-for="(item, index) in tramitesDestacados" :key="index" :items="item" />
     </div>
   </div>
  </div>
</template>

<script>

import { gsap } from 'gsap'
import Marquee from '../../components/Marquee.vue'

export default {
  name: 'Profiles',
  components:{
    Marquee
  },
  head: {
    title: "Municipalidad de San Martin :: Trámites",
    meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Son todos los trámites que ofrece gestionar la Municipalidad de San Martin'
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Municipalidad de San Martin :: Trámites",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Son todos los trámites que ofrece gestionar la Municipalidad de San Martin",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/share-tramites.png",
        },
      ],
    },
  async fetch() {
    let { ref } = this.$route.query
    const options = {}

    if (ref && ref !== '') {
      ref = decodeURIComponent(ref)
      options.ref = ref
    } else {
      const masterRef = this.$prismic.api.refs.find((ref) => {
        return ref.isMasterRef === true
      })
      options.ref = masterRef.ref
    }

    this.categories = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'categorias_tramites'), { pageSize : 100, orderings: '[document.uid desc]' }).then( response => {
      return response.results
    });
    this.categories.sort(this.OrdenarPorNombre)
    this.subCat = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'subcategoria_tramites'), { pageSize : 100 }).then( response => {
      return response.results
    });  

    let pages = await this.$prismic.api.query(
      this.$prismic.predicates.at('document.type','tramites'),
      { pageSize : 100}
    ).then( r => r.total_pages)

    let arr = []
    for (let n = 1; n <= pages; n++) {     
      let m = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'tramites'), { pageSize : 100, page: n }).then( response => {
        return arr = arr.concat(response.results)
      });
    }
    this.p04 = arr
    //console.log(this.p04)

    const res = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'tramites_destac'), { pageSize : 12 }).then( response => {
      return response.results
    });
    this.tramitesDestacados = res[0].data.listado
    this.bannerVideo = res[0].data.banner_tramites_video
    this.bannerImage = res[0].data.banner_tramites_image
    this.bannerImageMobile = res[0].data.banner_tramites_image_mobile
    this.bannerLink = res[0].data.banner_tramites_link
    this.marquee = res[0].data.marquesina
    this.dataReady = true
  },
  data() {
    return {
      tramites: [],
      tramitesDestacados: [],
      bannerVideo: {},
      bannerImage: {},
      bannerImageMobile: {},
      bannerLink : {},
      marquee: '',
      filtraTramites:[],
      categories: [],
      subCat:[],
      subCatList:[],
      p04:[],
      dataReady: false,
      isMobile: false,
      isOpen1:false,
      isOpen2:false,
      isOpen3:false,
      inputText1: 'Seleccionar categoría',
      inputText2: 'Seleccionar subcategoría'
    }
  },
  mounted() {
    this.domReady = true
  },
  watch:{
    tramites(v){
      this.tramites = v
    },
    subCatList(v){
      this.subCatList = v
    },
    p04(v){      
      this.tramites = v
    }
  },
  methods: {
    filterCats(id, n){
      this.subCatList = this.subCat.filter(e => e.data.categoria_padre.id == id)
      this.subCatList.sort(this.OrdenarPorNombre)
      this.inputText1 = this.$prismic.asText(n)
    },
    filterTramites(id, n){
      this.filtraTramites = this.tramites.filter(e => e.data.subcategoria.id == id).reduce((acc,item)=>{
        if(!acc.includes(item)){
          acc.push(item);
        }
        return acc;
      },[])
      this.filtraTramites.sort(this.OrdenarPorNombre)
      this.inputText2 = this.$prismic.asText(n)
    },
    dropDown(n){
      switch (n) {
        case '1':
           this.isOpen1 = !this.isOpen1;
          break;
        case '2':
           this.isOpen2 = !this.isOpen2;
          break;
        case '3':
           this.isOpen3 = !this.isOpen3;
          break;
      
        default:
          break;
      }
      this.isOpen = !this.isOpen;
    },
    OrdenarPorNombre(x, y) {
        return ((x.slugs[0] == y.slugs[0]) ? 0 : ((x.slugs[0] > y.slugs[0]) ? 1 : -1));
    },
    closeBanner(){
      const banner = document.getElementById('bannerTramites')
    
      gsap.to(banner, {opacity:0, duration:0.5, height: 0, onComplete:function(){
        banner.style.display = 'none'
      }})
    }
  },
  head() {
    return {
      title: 'Municipalidad de San Martín - Trámites'
    }
  }
}
</script>

<style lang="scss" module>
.tramites {
  background:#f3f3f3;
  .hero{
    height: 100vh;
    max-height: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    @media (max-width:800px) {    
      max-height: 520px;
    }
    .copy{
      text-align: center;
      p{max-width: 540px;margin: auto;line-height: 1.4;color:$grey;margin-top:20px}
    }
    .filtersContent{
      margin-top:66px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .filtersTramites{
        width: 30%;
      }
      @media (max-width:800px) {    
        flex-direction: column;
        margin-top:30px;
        .filtersTramites{
          width: 100%;
          margin: 10px 0;
        }
      }
    }
  }
  .contentTra{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    padding: 30px 0px;
    align-items: stretch;
    @media (max-width:800px) {   
      grid-template-columns: repeat(1, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 10px;
      padding: 20px 0px; 
      
    }
  }
  .banner{
    position: relative;
    margin-bottom: 40px;
    overflow: hidden;
    &_close{
      position: absolute;
      top: 20px;
      right: 40px;
      z-index: 2;
      display: flex;
      border-radius:100%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 40px;
      height: 40px;
      padding: 5px;
      background-color: white;
      svg{display: block;width: 100%;}
    }
    &_link{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
     .bannerVideo, .bannerImage{
      width: 100%;
      height: auto;
      object-fit: cover;
      overflow: hidden;
      border-radius: 20px;
    }
    .bannerVideo, .bannerImage{
      width: 100%;
      height: auto;
      object-fit: cover;
      overflow: hidden;
      border-radius: 20px;
      display: block;
      img{
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    .bannerVideo{
      video{
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }
  @media (max-width:800px) {
    display: flex;
    flex-direction: column;
    .banner{order: -1;margin-top:50px;margin-bottom: 0px;}
  }
}
</style>
