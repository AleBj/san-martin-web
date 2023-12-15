<template>
  <div :class="$style.page">
    <div :class="[`wrapper`,$style.topNov]">
      <TitleStatics :text="`Novedades`" size="h3" />
      <div :class="[`filters`, $style.filtersNews, {open: isOpen}]"  @click="dropDown()">
        <span class="filters-name">{{textFilter}}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.01999 3.18195L7.03199 0.167951C7.13824 0.062185 7.28206 0.00280762 7.43198 0.00280762C7.58191 0.00280762 7.72573 0.062185 7.83199 0.167951C7.93788 0.275354 7.99725 0.420123 7.99725 0.570951C7.99725 0.72178 7.93788 0.866548 7.83199 0.973951L4.41899 4.38895C4.3155 4.49231 4.17613 4.55176 4.0299 4.55493C3.88367 4.5581 3.74185 4.50473 3.63399 4.40595L0.201986 0.975951C0.106191 0.86771 0.0551819 0.727068 0.0593149 0.582584C0.0634479 0.4381 0.122413 0.300605 0.224238 0.198016C0.326063 0.0954276 0.463115 0.0354363 0.607564 0.0302238C0.752013 0.0250114 0.893031 0.0749688 1.00199 0.169951L4.01999 3.18195Z" fill="#282828"/>
        </svg>
        <div class="filters-dropDown">
          <div @click="filterByCategories('todas')" class="filters-items">Todas</div>
          <div v-for="(cat, index) in categories" :key="index" @click="filterByCategories(`${cat.uid}`)" class="filters-items">{{$prismic.asText(cat.data.name)}}</div>
        </div>
      </div>
    </div>
    <div :class="[`wrapper`,$style.newsContent]">
      {{ news.lenght }}
      <CardsNews v-for="(item, index) in newsFilter" :key="index" :items="item" :type="`news`" />
    </div>
  </div>
</template>
<script>
import RichText from "../../components/RichText.vue";
import Title from "../../components/Title.vue";
import TitleStatics from '../../components/TitleStatics';
import CardsNews from '../../components/CardsNews';
export default {  
  name: 'News',
  components:{
    RichText,
    Title,
    TitleStatics,
    CardsNews
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

    // const news = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'novedades'), { pageSize : 200, orderings: '[document.first_publication_date desc]' }).then( response => {
    //   return response.results
    // });

    let pages = await this.$prismic.api.query(
      this.$prismic.predicates.at('document.type','novedades'),
      { pageSize : 100}
    ).then( r => r.total_pages)

    let arrNews = []
    for (let n = 1; n <= pages; n++) {     
      let m = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'novedades'), { pageSize : 100, page: n }).then( response => {
        return arrNews = arrNews.concat(response.results)
      });
    }
    
    this.news = arrNews
    console.log(this.news.length)

    const resCats = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'tag_news'), { pageSize : 200 }).then( response => {
      return response.results
    });
    this.categories = resCats.sort(this.OrdenarPorNombre)


    this.newsFilter = this.news

    this.dataReady = true
  },
  data() {
    return {
      news: [],
      newsFilter: [],
      categories: [],
      dataReady: false,
      isMobile: false,
      textFilter: 'Filtrar por:',
      isOpen: false
    }
  },  
  mounted() {
    this.domReady = true
  },
  methods:{
    filterByCategories(n){
      //console.log(n)
      if(n == 'todas'){
        this.newsFilter = this.news
        this.textFilter = 'Filtrar por:'
      }else{
        this.newsFilter = this.news.filter( e => e.data.category.uid == n)
        const cat = this.categories.filter(e => e.uid == this.newsFilter[0].data.category.uid)
        this.textFilter = this.$prismic.asText(cat[0].data.name)
      }
    },
    dropDown(){
      this.isOpen = !this.isOpen;
    },
    OrdenarPorNombre(x, y) {
        return ((x.slugs[0] == y.slugs[0]) ? 0 : ((x.slugs[0] > y.slugs[0]) ? 1 : -1));
    }
  },
  head() {
    return {
      title: 'Municipalidad de San Martín - Novedades',
      // meta: [
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'this.meta.description',
      //   },
      //   {
      //     hid: 'twitter:title',
      //     name: 'twitter:title',
      //     content: 'this.meta.title',
      //   },
      //   {
      //     hid: 'twitter:description',
      //     name: 'twitter:description',
      //     content: 'this.meta.description',
      //   },
      //   {
      //     hid: 'og:title',
      //     name: 'og:title',
      //     content: 'this.meta.title',
      //   },
      //   {
      //     hid: 'og:description',
      //     name: 'og:description',
      //     content: 'this.meta.description',
      //   },
      //   {
      //     hid: 'og:image',
      //     name: 'og:image',
      //     content: 'this.meta.image',
      //   },
      // ],
    }
  },
}
</script>

<style lang="scss" module>
.page {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 120px 0;
  @media (max-width:800px) {
    padding: 60px 0;
  }
}
.topNov{
  margin-bottom: 60px;
  position: relative;
  @media (max-width:800px) {
    margin-bottom: 30px;
  }
}
.image{
  padding-top: 56%;
  margin-bottom: 10px;
  border-radius: 20px;
  background-size: cover;
}
.newsContent{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  padding: 30px 20px;
  align-items: stretch;
  @media (max-width:800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    padding: 20px 16px;
  }
}
.filtersNews{
  position: absolute;
  right: 0;
  top: 0;
  @media (max-width:800px) {
    position: relative;
    z-index: 99;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
