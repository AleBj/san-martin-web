<template>
<div>
  <div :class="$style.heroTramite">
    <div class="wrapper">
      <small v-if="category">{{$prismic.asText(category.data.nombre_categoria)}}</small>
      <Title :text="tramite.nombre" :size="`h1`" />
      <RichText :text="tramite.descripcion" />
    </div>
  </div>
  <div :class="$style.bodyTramite">
    <!-- nav -->
    <div :class="$style.navTramites" style="display:none">
      <div class="wrapper">
        <span>trámites</span> <span>></span> <span v-if="category">{{$prismic.asText(category.data.nombre_categoria)}}</span> <span>></span> <strong>{{$prismic.asText(tramite.nombre)}}</strong>
      </div>
    </div>
    <!-- content -->
    <div :class="[`wrapper`, $style.contentCols]">
      <div :class="$style.colTramite">
        <!-- PARRAFOS -->
        <div v-for="(parrafo, index) in tramite.parrafos" :key="index" :class="[$style.parrafosTramite, $style.blocks]">
          <Title :text="parrafo.title" :size="`h3`" />
          <RichText :text="parrafo.texto" />
        </div>
        <!-- FAQS -->
        <div :class="[$style.faqsTramite, $style.blocks]" v-if="tramite.preguntas_frecuentes && tramite.preguntas_frecuentes.length > 0">
          <TitleStatics :text="`Preguntas frecuentes`" :size="`h3`"/> 
          <RichText :text="tramite.texto_faq" />
          <div v-for="(faqs, index) in tramite.preguntas_frecuentes" :key="index" :data-accordeon-id="index" :class="[$style.modulo_faq, `modulo_faq`]" @click="acordeon(index)">
            <div :class="$style.headFaq">
              <strong>{{$prismic.asText(faqs.pregunta)}}</strong>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.01999 3.18195L7.03199 0.167951C7.13824 0.062185 7.28206 0.00280762 7.43198 0.00280762C7.58191 0.00280762 7.72573 0.062185 7.83199 0.167951C7.93788 0.275354 7.99725 0.420123 7.99725 0.570951C7.99725 0.72178 7.93788 0.866548 7.83199 0.973951L4.41899 4.38895C4.3155 4.49231 4.17613 4.55176 4.0299 4.55493C3.88367 4.5581 3.74185 4.50473 3.63399 4.40595L0.201986 0.975951C0.106191 0.86771 0.0551819 0.727068 0.0593149 0.582584C0.0634479 0.4381 0.122413 0.300605 0.224238 0.198016C0.326063 0.0954276 0.463115 0.0354363 0.607564 0.0302238C0.752013 0.0250114 0.893031 0.0749688 1.00199 0.169951L4.01999 3.18195Z" fill="#282828"/>
              </svg>
            </div>
            <div :class="[$style.bodyFaq, `bodyFaq`]">
              <p>{{$prismic.asText(faqs.respuesta)}}</p>
            </div>
          </div>
        </div>
        <!-- INFO UTIL -->
        <div :class="[$style.utilTramite, $style.blocks]" v-if="tramite.texto_informacion_util && tramite.texto_informacion_util[0].text !== ''">
          <TitleStatics :text="`Información útil`" :size="`h3`"/> 
          <RichText :text="tramite.texto_informacion_util" />
        </div>
      </div>
      <div :class="$style.stickyTramite">

        <Title :text="tramite.nombre" :size="`h3`" />
        <RichText :text="tramite.descripcion" />
        <div v-if="isProv == true" :class="$style.checkTramite">
          <input type="checkbox" v-model="checkTramite" name="checktramite">
          <label for="checktramite"> He descargado y leído el <a href="https://sitiosale.cdn.prismic.io/sitiosale/aEBoOLh8WN-LVmnl_C%C3%B3digode%C3%A9ticayconducta.pdf" target="_blank"> Código de Ética </a> y Conducta y las <a href="https://sitiosale.cdn.prismic.io/sitiosale/aDneridWJ-7kSv17_Pol%C3%ADticaAntisoborno-T02.pdf" target="_blank"> Políticas Antisoborno </a></label>
          <div v-if="checkTramite == false" :class="$style.disabled"></div>
        </div>
        <Button :cta="`Iniciar Tramite`" 
        :link="tramite.iniciar_tramite_link.url"  
        :externalLink="true" :target="`_blank`"
        :sticky="true" v-if="tramite.iniciar_tramite_link && tramite.iniciar_tramite_link.url" /> 
      </div>
    </div>
  </div>
  <div :class="[`wrapper`,$style.relatedTramite]" v-if="related && related.length > 0">
    <TitleStatics :text="`Trámites relacionados`" :size="`h3`"/> 
    <div :class="[$style.flex]">
      <CardsTramitesRelated v-for="(item, index) in related" :key="index" :item="item" :category="category && category.data.nombre_categoria" />
    </div>
  </div>
</div>
</template>

<script>
import Title from '../../components/Title'
import RichText from '../../components/RichText'
import Button from '../../components/Button'
import TitleStatics from '../../components/TitleStatics'
import CardsTramitesRelated from '../../components/CardsTramitesRelated'

export default {
  name: 'SingleTramites',
  components: {
    Title,
    RichText,
    TitleStatics,
    Button,
    CardsTramitesRelated
  },
  async fetch() {
    const slug = this.$route.params.slug
    //console.log(slug)
    this.slug = slug
    const res = await this.$prismic.api.getByUID('tramites',slug)

    this.isProv = this.slug == 'san-martin-compra-inscripcion-proveedores' ? true : false
    
    if (res && res.data) {      
      this.tramite = res.data
    }
    this.categories = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'categorias_tramites'), { pageSize : 100, orderings: '[document.uid desc]' }).then( response => {
      return response.results
    });
    
    
    this.meta = {
      title: this.$prismic.asText(this.tramite.meta_title),
      description: this.$prismic.asText(this.tramite.meta_description),
      image: this.tramite.meta_image ? `${this.tramite.meta_image.url}?fit=clip&w=1200` : '',
    }
    //Todos los tramites

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
    let arrFil = arr.filter(t => t.data.categoria.uid == this.tramite.categoria.uid)
    arrFil = arrFil.filter(uid => uid.uid != res.uid)

    let min = this.random(0,(arrFil.length - 3));
    let max = min+3

    this.related = arrFil.slice(min,max)
    console.log(this.related)
    console.log(this.category)
    
  },
  data() {
    return {
      meta: {},
      dataReady: false,
      tramite: [],
      categories: [],
      related:[],
      category:'',
      slug: '',
      isProv: false,
      checkTramite: false
    }
  },
  mounted() {
    this.domReady = true
  },
  watch: {
    categories() {
      this.showCat(this.tramite.categoria.id)
    },
    tramite(t){
      this.tramite = t
    }
  },
  methods:{
    showCat(n){
      this.category = this.categories.filter(e => e.id == n)[0]
    },
    acordeon(id){
        const itemAccordeon = document.querySelectorAll('[data-accordeon-id="' + id + '"]')[0]
        //console.log(itemAccordeon)
        if (itemAccordeon.classList.contains('open')) {
          itemAccordeon.classList.remove('open')
        } else {
          itemAccordeon.classList.add('open')
        }
    },
    random(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
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
          content: `Municipalidad de San Martín - ${this.meta.title}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.meta.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Municipalidad de San Martín - ${this.meta.title}`,
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
.heroTramite{
  max-height: 620px;
  height: 100vh;
  background: white;
  & > div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    small{
      font-size: 12px;
      line-height: 1.3;
      font-weight: 600;
      display: block;
      color:$blue;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    h2{margin-bottom: 20px;}
    & > div{
      max-width: 542px;
    }
  }
  @media (max-width:800px) {
    max-height: 500px;
  }
}
.bodyTramite{
  background: #f8f8f8;
  position: relative;
  padding-bottom: 80px;
  @media (max-width:800px) {
    padding-bottom: 40px;
  }
  .navTramites{
    position: sticky;
    top:0;
    width: 100%;
    height: 64px;
    background: #E3E3E3;
    z-index: 3;
    & > div{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 100;
      font-size: 14px;
      text-transform: uppercase;
      color:#A7A7A7;
      span{margin-right:10px}
      strong{font-weight: 400;color:$black}
    }
  }
  .contentCols{
    display: flex;
    align-items: flex-start;
    position: relative;
    .colTramite{
      max-width: 600px;
      padding-top: 80px;
      .blocks{
        margin-bottom: 48px;
        & > h2{margin-bottom: 20px;}
        & > h3{margin-bottom: 20px;}
        ul{
          font-size:16px;
          line-height: 1.4;
          margin-bottom: 10px;
          color: #5e606a;
        }
      }
      @media (max-width:800px) {
        padding-top: 40px;
      }
    }
    .stickyTramite{
      position: sticky;
      z-index: 2;
      top: 120px;
      transform: translateX(60px);
      margin-top: 80px;
      max-width: 540px;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.051);
      border-radius: 25px;
      background: white;
      padding: 90px;
      & > div{
        margin-top: 30px;
      }      
      .checkTramite{
        display: flex;
        align-items: flex-start;
        position: relative;
        gap:10px;
        font-size: 12px;
        line-height: 1.2;
        input{margin-top: 2px;}
        a{text-decoration: underline;font-weight: bold;}
        .disabled{
          position: absolute;
          z-index: 99;
          background: white;
          opacity: .3;
          width: 100%;
          height: 100px;
          top: 100%;left: 0;

          @media (max-width:800px) {
            top: 0%;left: 100%;
          }
        }
      }
      @media (max-width:800px) {
        position: fixed;
        transform: translateX(0px);
        margin:0;
        width: 100%;
        bottom: 0;top:auto;
        left: 0;
        margin-top: 80px;
        max-width: 100%;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
        border-radius: 2px;
        background: white;
        padding: 10px;
        display: flex;
        justify-content: center;
        & > div{margin:0}
        & > h2, & > div:nth-child(2){display: none !important;}
      }
    }
  }
  .modulo_faq{
    font-size:16px;
    line-height: 1.4;
    color:$grey;
    border-bottom: 1px solid #E3E3E3;
    .headFaq{
      display: flex;
      min-height: 60px;
      padding: 10px 0;
      align-items: center;
      justify-content: space-between;
      color:$black;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.4;
      cursor: pointer;
      svg{min-width: 16px;margin-left: 10px;}
      strong{font-weight: 600;}
    }
    .bodyFaq{display:none;   
      p{ 
        font-size: 16px;
        line-height: 1.4;
      }
    }
  }

  ul li > a{
    color:#209EDE;
    em{
      display: inline-flex;
      font-size: 12px;
      font-style: normal;
      text-transform: uppercase;
      display: inline-flex;
      font-weight: 500;
      height: 50px;
      align-items: center;
      padding: 0 24px;
      border-radius: 25px;
      color: #FFF;
      background-color: #209EDE;
      @media (max-width:800px) {
        padding: 0 14px;
        height: 30px;
        margin: 5px 0;
      }
    }
  }
}

.relatedTramite{
  margin-top: 30px;
  margin-bottom: 50px;
  .flex{
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
    @media (max-width:800px) {
      display: flex;
      overflow: scroll;
      padding-bottom: 40px;
      grid-column-gap: 16px;
      &>div{min-width: 300px;}
    }
  }
}
.parrafosTramite, 
.utilTramite{
  & p{margin-bottom: 14px !important;}
}
</style>
<style lang="scss">
  .modulo_faq{
    &.open{
      .bodyFaq{
        padding-bottom: 20px;
        display: block;
      }
      svg{transform:scale(-1)}
    }
  }
  .prismicParagraph{
    margin-bottom: 10px;
    color:$grey;
    font-size: 16px;
    line-height: 1.4;
    a{
      color:$blue;
    }
  }
  p > a{
    color:#209EDE;
    em{
      display: inline-flex;
      font-size: 12px;
      font-style: normal;
      text-transform: uppercase;
      display: inline-flex;
      font-weight: 500;
      height: 50px;
      align-items: center;
      padding: 0 24px;
      border-radius: 25px;
      color: #FFF;
      background-color: #209EDE;
      @media (max-width:800px) {
        padding: 0 14px;
        height: 30px;
        margin: 5px 0;
      }
    }
  }
</style>
