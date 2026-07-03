<template>
<div :style="cssProps">
  
  <section :class="$style.heroComunidades" :style="`background-image:url(${bgImage}?fit=clip&w=1500)`">
    <div class="wrapper">
      <Title :text="comunidad.titulo" :size="`sec`" />
      <RichText :text="comunidad.texto_interno" />
      <div :class="$style.buttonDown" @click="ancla()"> VER MAS</div>
    </div>
  </section>
  <section :class="$style.content" id="mainCominidades">
    <div :class="[`wrapper`, $style.contentCards]" v-if="cards">
      <CardsComunidadHome v-for="(item, index) in cards" :items="item" :key="index" :color="(index == 0 || index == 3) ? colorPrimary : colorSecundary" :size="(item.tamano_card == '3 Módulos') ? `full` : (item.tamano_card == '2 Módulos') ? `big` : `small`" />
    </div>
    <div :class="[`wrapper`, $style.contentList]" v-if="lists">
      <ListsComunidadHome v-for="(item, index) in lists" :items="item" :key="index" :color="colorPrimary" :class="$style.list" />
    </div>
  </section>
  <section :class="[$style.content, 'no-padding']">

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
import PageMixin from '../../mixins/page'
import Title from '../../components/Title'
import RichText from '../../components/RichText'
import TitleStatics from '../../components/TitleStatics'
import CardsComunidadHome from '../../components/comunidades/CardsComunidadHome'
import ListsComunidadHome from '../../components/comunidades/ListsComunidadHome'
import FullMediaCard from '../../components/comunidades/FullMediaComunidad'
import ListIcons from '../../components/programas/ListIconsProgramas'
import CardList from '../../components/comunidades/CardsListComunidad'
import TextBlock from '../../components/comunidades/TextBlockComunidad'
import Preformatered from '../../components/blocks/Preformatered'
import ListSitios from '../../components/sitios/ListSitios'
import TableComponent from '../../components/blocks/TableComponent'
import cardThird from '../../components/programas/CardsThirdProgramas'
import cuadricula from '../../components/programas/CuadriculaProgramas'

export default {
  name: 'Comunidades',
  components: {
    Title,
    RichText,
    TitleStatics,
    CardsComunidadHome,
    ListsComunidadHome,
    FullMediaCard,
    ListIcons,
    CardList,
    TextBlock,
    Preformatered,
    ListSitios,
    TableComponent,
    cardThird,
    cuadricula
  },
  mixins: [PageMixin],
  async fetch() {
    const slug = this.$route.params.slug
    //console.log(slug)
    this.slug = slug
    const res = await this.$prismic.api.getByUID('comunidades',slug)

    const cardsData = res.data.cards_comunidades

    let ids = res.data.cards_comunidades.map(e => e.listado_de_cards.id)
    //this.cards = await this.$prismic.api.getByIDs(ids).then( r => r.results)
    const results = await this.$prismic.api.getByIDs(ids).then(r => r.results)
    
    this.cards = ids.map(id => {
      const card = results.find(r => r.id === id)
      const tamano = cardsData.find(e => e.listado_de_cards.id === id).tamano_card
      return { ...card, tamano_card: tamano }
    })

    const data = res.data
    this.slices = data.body.map(this.prepareData)
    console.log(this.slices)

    let idl = res.data.list_comunidades.map(e => e.lista_de_comunidades.id)
    console.log(idl.some(element => element === undefined))
    if(!idl.some(element => element === undefined)){
      this.lists = await this.$prismic.api.getByIDs(idl).then( r => r.results)
    }
    
    if (res && res.data) {      
      this.comunidad = res.data
      this.colorPrimary = this.comunidad.color_primario
      this.colorSecundary = this.comunidad.color_secundario
    }
    this.meta = {
      title: this.$prismic.asText(this.comunidad.meta_title),
      description: this.$prismic.asText(this.comunidad.meta_desciption),
      image: this.comunidad.meta_image ? `${this.comunidad.meta_image.url}?fit=clip&w=1200` : '',
    }    
  },
  data() {
    return {
      meta: {},
      dataReady: false,
      comunidad: [],
      slices:[],
      cards:[],
      lists:[],
      colorPrimary:'',
      colorSecundary:'',
      slug: '',
      bgImage: '',
    }
  },
  mounted() {
    this.domReady = true
    
    ////console.log(this.body)
  },
  computed:{
    cssProps(){
      return {
        '--ColorPrimario':this.comunidad.color_primario,
        '--ColorSecundario':this.comunidad.color_secundario,
      }
    }
  },
  watch: {
    comunidad(v){
      this.bgImage = v.imagen_fondo.url
    }
  },
  methods:{
    ancla(){
      const offsetTop = document.querySelector('#mainCominidades').offsetTop;
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
    }
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
  max-height:800px;
  height: 100vh;
  background-color:#fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width:800px) {
    max-height:550px;
    background-image: none !important;
  }
  & > div{
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    p{
      margin: 30px 0;
      line-height: 1.6;
      font-size: 16px;
      color: $grey;
      max-width: 450px;
    }
  }
  h2{color:var(--ColorPrimario);max-width: 540px;}
  .buttonDown{
    background-color:var(--ColorPrimario);
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
}
.content{
  padding: 130px 0;
  @media (max-width:800px) {
    padding: 50px 0;
  }
  &Cards{
    display: flex;
    gap:22px;
    flex-wrap: wrap;
    margin-bottom: 60px;
    @media (max-width:800px) {
      flex-direction: column;
    }
  }
  &List{
    display: flex;
    gap:22px;
    flex-wrap: wrap;
    .list a{
      justify-content: flex-start !important;
    }
    @media (max-width:800px) {
      flex-direction: column;
    }
  }
}
</style>

<style lang="scss">
.no-padding{
  padding-top: 0 !important;
}
</style>
