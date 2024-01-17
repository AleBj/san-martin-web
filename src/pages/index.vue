<template>
  <div class="page" :class="$style.page">   

    <Html>
    <Head>
      <Title>{{ meta && meta.title }} :: SM</Title>
      <Meta name="description" :content="meta && meta.description"/>
      <Meta property="og:title" :content="meta && meta.title"/>
      <Meta property="og:description" :content="meta && meta.description"/>
      <Meta property="og:image" :content="`${meta && meta.image}&w=1920`"/>
      <Meta property="og:type" content="website"/>
      <Meta property="og:url" :content="`sanmartin.gov.ar`"/>
      <Meta property="twitter:card" content="summary_large_image"/>
      <Meta property="twitter:title" :content="meta && meta.title"/>
      <Meta property="twitter:description" :content="meta && meta.description"/>
      <Meta property="twitter:image" :content="`${meta && meta.image}&w=1920`"/>
      <Meta property="twitter:url" :content="`sanmartin.gov.ar`"/>
      <Meta property="twitter:site" content="@sanmartingob"/>
      <Meta property="twitter:creator" content="@sanmartingob"/>
    </Head>
    </Html>

    <component
      :is="slice.name"
      v-for="(slice, sliceIndex) in slices"
      :key="sliceIndex"
      :data-slice-name="slice.name"
      v-bind="slice.data"
    />
    <NewsHome :news="news" :highlight="highlight" />
    <ComunidadesHome v-if="comunidades && comunidades.length > 0" :comunidades="comunidades" />
  </div>
</template>

<script>
import VueMeta from 'vue-meta'

import PageMixin from '../mixins/page'
import NewsHome from '../components/blocks/NewsHome'
import ComunidadesHome from '../components/blocks/ComunidadesHome'

export default {  
  name: 'Home',
  components:{
    NewsHome,
    ComunidadesHome
  },
  mixins: [PageMixin],
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
    const res = await this.$prismic.api.getByUID('home', 'home', options)
    
    if (res && res.data) {
      const data = res.data
      this.slices = data.body.map(this.prepareData)



      let ids = res.data.comunidades_home.map(e => e.comunidad_home.id)
      this.comunidades = await this.$prismic.api.getByIDs(ids).then( r => r.results)


      this.highlight = res.data.destacado_home
      let news = []

      if(this.highlight.length > 0){
        news = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'novedades'), { pageSize : 4, orderings: '[document.first_publication_date desc]',}).then( response => {
        return response.results
      });
      }else{
        news = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'novedades'), { pageSize : 5, orderings: '[document.first_publication_date desc]',}).then( response => {
        return response.results
      });
      }
      this.news = news
      
      console.log(this.highlight)
      this.meta = {
        title: this.$prismic.asText(data.meta_title),
        description: this.$prismic.asText(data.meta_description),
        image: data.meta_image ? data.meta_image.url : ''
      }      
      

      this.dataReady = true
    }
  },
  data() {
    return {
      meta: [],
      slices: [],
      comunidades: [],
      programas:[],
      news: [],
      highlight: [],
      dataReady: false,
      isMobile: false,
      todo:[]
    }
  },  
  mounted() {
    this.domReady = true
  },
  methods: {
  },
  head() {
    return {
      title: this.meta.title + ' -- SM',
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
.page {
  width: 100%;
  min-height: 100vh;
}
.image{
  padding-top: 56%;
  margin-bottom: 10px;
  border-radius: 20px;
  background-size: cover;
}
.newsContent{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  max-width: 1000px;
  padding: 30px 10px;
  .novedad{
    display: block;
    width: calc(33.33% - 30px);

  }
}
</style>
