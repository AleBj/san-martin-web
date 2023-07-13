<template>
<div :style="cssProps">
  <section :class="$style.heroComunidades">
    <div class="wrapper">
      <h4 v-if="madre.data">{{ $prismic.asText(madre.data.titulo) }}</h4>
      <div :style="{color:colorPrimary}">
        <Title :text="comunidad.titulo" :size="`int`" />
      </div>
      <RichText :text="comunidad.descripcion" />
    </div>
  </section>
  <section id="components">
    <component
      :is="slice.name"
      v-for="(slice, sliceIndex) in slices"
      :key="sliceIndex"
      :data-slice-name="slice.name"
      v-bind="slice.data"
      :id="$prismic.asText(slice.data.idAncla)"
   />
  </section>
</div>
</template>

<script>
import VueMeta from 'vue-meta'

import PageMixin from '../../../mixins/page'
import Title from '../../../components/Title'
import RichText from '../../../components/RichText'
import TitleStatics from '../../../components/TitleStatics'
import FullMediaCard from '../../../components/comunidades/FullMediaComunidad'
import CardList from '../../../components/comunidades/CardsListComunidad'
import TextBlock from '../../../components/comunidades/TextBlockComunidad'
import Agenda from '../../../components/programas/AgendaProgramas'
import fullCard from '../../../components/programas/FullCardProgramas'
import CardMiddle from '../../../components/programas/CardsMiddleProgramas'
import CardThird from '../../../components/programas/CardsThirdProgramas'
import cuadricula from '../../../components/programas/CuadriculaProgramas'
import ListIcons from '../../../components/programas/ListIconsProgramas'
import Preformatered from '../../../components/blocks/Preformatered'
import ListSitios from '../../../components/sitios/ListSitios'

export default {
  name: 'Comunidad',
  components: {
    Title,
    RichText,
    TitleStatics,
    FullMediaCard,
    CardList,
    TextBlock,
    Agenda,
    fullCard,
    CardMiddle,
    CardThird,
    cuadricula,
    ListIcons,
    Preformatered,
    ListSitios
  },
  mixins: [PageMixin],
  async fetch() {
    const slug = this.$route.params.slug
    this.slug = slug
    const res = await this.$prismic.api.getByUID('interna_comunidad',slug)

    this.madre = await this.$prismic.api.getByID(res.data.comunidad.id)

    if (res && res.data) {       
      this.comunidad = res.data  
      
      const data = res.data
      this.slices = data.body.map(this.prepareData)
      console.log(this.slices)
      
      this.colorPrimary = this.madre.data.color_primario
      this.colorSecundary = this.madre.data.color_secundario
    }    
    this.meta = {
      title: this.$prismic.asText(this.comunidad.meta_title && this.comunidad.titulo),
      description: this.$prismic.asText(this.comunidad.meta_description),
      image: this.comunidad.meta_image ? `${this.comunidad.meta_image.url}?fit=clip&w=1200` : '',
    }    
  },
  data() {
    return {
      meta: {},
      dataReady: false,
      comunidad: [],
      slices:[],
      madre:[],
      colorPrimary:'',
      colorSecundary:'',
      slug: '',
      bgImage: '',
    }
  },
  mounted() {
    this.domReady = true
    
  },
  computed:{
    cssProps(){
      return {
        '--ColorPrimario':this.colorPrimary,
        '--ColorSecundario':this.colorSecundary,
      }
    }
  },
  watch: {
    comunidad(v){
      //this.bgImage = v.imagen_fondo.url
    }
  },
  methods:{
  },
  head() {
    return {
      title: `Municipalidad de San Martín - ${this.meta.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.meta.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.meta.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.meta.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.meta.description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.meta.image,
        },
      ],
    }
  },
}
</script>

<style lang="scss" module>
.heroComunidades{
  background-color: #fff;
  height: 620px;
  & > div{
    height: 100%;
    display: flex;
    flex-direction: column;
   justify-content: center;
   h4{font-size: 12px;text-transform: uppercase;margin-bottom: 16px;}
   h2{max-width: 540px;}
   p{
    margin: 30px 0 0;
    line-height: 1.6;
    font-size: 18px;
    color: #5E606A;
    max-width: 540px;
   }
  }
}
[data-card-color="Primario"]{
  background-color: var(--ColorPrimario) !important;
  & p, & h4{color:#fff }
  & a{background-color: white;}
}
[data-card-color="Secundario"]{
  background-color: var(--ColorSecundario) !important;
  & p, & h4{color:#fff }
  & a{background-color: white;}
}  
[data-card-color="Blanco"] {
  & p{color:$grey } 
  & h4{color:$black }
  & a{background-color: var(--ColorPrimario);color:#fff }
}
</style>
