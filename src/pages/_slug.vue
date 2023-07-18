<template>
<div :style="cssProps">
  <section :class="[$style.heroProgramas]" :style="`background-image:url(${bgImage}?fit=clip&w=1500)`">
    <div :class="[`wrapper`, programa.texto && $style.txtWhite, programa.alineacion && $style.centered]">
      <Title :text="programa.titulo" :size="`int`" />
      <RichText :text="programa.descripcion" />
      <a v-if="programa.link_boton && programa.link_boton.url" :href="programa.link_boton.url" :target="(programa.link_boton.target) ? programa.link_boton.target : `blank`" :class="[$style.boton]">{{$prismic.asText(programa.cta_boton)}}</a>
    </div>
  </section>
  <section :class="[$style.content, noPadding]">
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

import PageMixin from '../mixins/page'
import Title from '../components/Title'
import Button from '../components/Button'
import RichText from '../components/RichText'
import Agenda from '../components/programas/AgendaProgramas'
import fullCard from '../components/programas/FullCardProgramas'
import CardMiddle from '../components/programas/CardsMiddleProgramas'
import CardThird from '../components/programas/CardsThirdProgramas'
import cuadricula from '../components/programas/CuadriculaProgramas'
import ListIcons from '../components/programas/ListIconsProgramas'
import FullMediaCard from '../components/comunidades/FullMediaComunidad'
import CardList from '../components/comunidades/CardsListComunidad'
import TextBlock from '../components/comunidades/TextBlockComunidad'
import Preformatered from '../components/blocks/Preformatered'
import ListSitios from '../components/sitios/ListSitios'
import TableComponent from '../components/blocks/TableComponent'
import DragCiudadPdf from '../components/DragCiudadPdf'

export default {
  name: 'Comunidades',
  components: {
    Title,
    Button,
    RichText,
    Agenda,
    CardMiddle,
    CardThird,
    fullCard,
    cuadricula,
    ListIcons,
    FullMediaCard,
    CardList,
    TextBlock,
    Preformatered,
    ListSitios,
    TableComponent,
    DragCiudadPdf
  },
  mixins: [PageMixin],
  async fetch() {
    const slug = this.$route.params.slug
    //console.log(slug)
    this.slug = slug
    const res = await this.$prismic.api.getByUID('sitio',slug)
    if(res && res.data){
      this.programa = res.data
      //console.log(this.programa)
      const data = res.data
      this.slices = data.body.map(this.prepareData)
     //console.log(this.slices)

      if (res && res.data) {      
        this.colorPrimary = this.programa.color_primario
        this.colorSecundary = this.programa.color_secundario
      }
      this.meta = {
        title: this.$prismic.asText(res.data.meta_title),
        description: this.$prismic.asText(res.data.meta_description),
        image: res.data.meta_image ? `${res.data.meta_image.url}?fit=clip&w=1200` : '',
      }    
    }else{
      this.$router.push('/page/404')
    }
    //console.log( this.programa )
  },
  data() {
    return {
      meta: {},
      dataReady: false,
      programa: [],
      slices:[],
      slug: '',
      bgImage: '',
      colorPrimary:'',
      colorSecundary:'',
      noPadding: ''
    }
  },
  mounted() {
    this.domReady = true
    if(location.hash){
      setTimeout(function(){
        const elem = document.getElementById(`${location.hash.slice(1)}`)
        elem.scrollIntoView();
      },500)
    }
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
    programa(v){
      this.bgImage = v.imagen_de_fondo.url
    },
    slices(v){
      this.noPadding = (this.slices[0].name == 'full-media-card') ? 'no-padding' : ''
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
.heroProgramas{
  max-height:620px;
  height: 100vh;
  background-color:#fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  & > div{
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    &.centered{
      align-items: center;
      p{text-align: center;}
    }
    p{
      margin: 30px 0;
      line-height: 1.6;
      font-size: 18px;
      color: $grey;
      max-width: 450px;
      @media (max-width:800px) {         
        font-size: 16px;
        margin: 20px 0;
      }
    }
    &.txtWhite{ h2,p{color:#fff !important;}}
  }
  h2{max-width: 540px;}
  .buttonDown{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 168px;
    font-size: 16px;
    color:$white;
    border-radius: 25px;
    font-family: $font-sans;
    font-weight: 600;
    height: 50px;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
  }
  .boton{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 168px;
    background: $blue;
    font-size: 12px;
    color:$white;
    border-radius: 25px;
    font-family: $font-sans;
    font-weight: 600;
    height: 50px;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0 30px;
  }
}
.content{
  padding: 130px 0;
  &Cards{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 60px;
  }
  &List{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media (max-width:800px) {   
    padding: 60px 0;  
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
</style>
<style lang="scss">
.no-padding{
  padding-top: 0 !important;
}
</style>
