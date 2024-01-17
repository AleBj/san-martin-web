<template>
  <div :class="$style.page">
    <Html>
    <Head>
      <Title>{{ res && $prismic.asText(res.data.title) }}</Title>
      <Meta name="description" :content="res && res.data.bajada"/>
      <Meta property="og:title" :content="res && res.data.title"/>
      <Meta property="og:description" :content="res && res.data.bajada"/>
      <Meta property="og:image" :content="`${res && res.data.image.url}&w=1920`"/>
      <Meta property="og:type" content="website"/>
      <Meta property="og:url" :content="`sanmartin.gov.ar`"/>
      <Meta property="twitter:card" content="summary_large_image"/>
      <Meta property="twitter:title" :content="res && res.data.title"/>
      <Meta property="twitter:description" :content="res && res.data.bajada"/>
      <Meta property="twitter:image" :content="`${res && res.data.image.url}&w=1920`"/>
      <Meta property="twitter:url" :content="`sanmartin.gov.ar`"/>
      <Meta property="twitter:site" content="@UNmigration"/>
      <Meta property="twitter:creator" content="@UNmigration"/>
    </Head>
    </Html>
  
    <div :class="$style.content">
      <small v-if="category">{{$prismic.asText(category.data.name)}}</small>
      <Title :text="datos.title" :size="`h1`" />
    </div>
    <div v-if="datos.image" :style="{ backgroundImage: `url(${datos.image.url}?fit=clip&w=1400)` }" :class="$style.hero">
    </div>
    <div :class="$style.content">
      <div :class="$style.bajada">
        <RichText :text="datos.bajada" /> 
      </div>
      <div :class="$style.codigoYT" v-if="datos.codigo_youtube && datos.codigo_youtube.length > 0">
        <iframe :src="`https://www.youtube.com/embed/${$prismic.asText(datos.codigo_youtube)}`" 
          title="YouTube video player" 
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
      </div>
      <RichText :text="datos.text" :class="$style.description" />  
    </div>

    <div :class="[$style.fooNews,`wrapper`]">
      <div :class="$style.date">
        <div :class="$style.iso">
          <svg width="99" height="25" viewBox="0 0 99 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_211_216)">
            <path d="M80.243 9.93696C77.845 8.44472 75.3421 7.12795 72.754 5.99695C68.8341 4.28313 64.7588 2.94968 60.584 2.01496C57.5703 1.32896 54.5186 0.821764 51.445 0.495976C44.137 -0.238576 36.7696 -0.151354 29.481 0.755986C25.841 1.18865 22.2213 1.79929 18.622 2.58796C16.822 2.97262 15.022 3.41164 13.222 3.90497C12.322 4.14997 11.414 4.41199 10.5 4.69599C9.554 4.98699 8.72501 5.24495 7.60001 5.66095L15.745 24.077C16.172 23.811 16.903 23.4229 17.545 23.0909C18.2117 22.7523 18.8943 22.4189 19.593 22.0909C20.979 21.4329 22.404 20.809 23.854 20.213C26.732 19.029 29.698 17.965 32.699 17.053C38.6937 15.2042 44.8759 14.0303 51.131 13.553C55.4211 13.2323 59.7327 13.3536 63.998 13.915C65.926 14.1663 67.8389 14.5228 69.728 14.983C70.868 15.249 72.001 15.588 73.128 15.942C78.0695 17.5035 82.741 19.817 86.978 22.801L90.737 18.2579C87.5748 15.0894 84.0567 12.2972 80.253 9.93696" fill="#209EDE"/>
            </g>
            <defs>
            <clipPath id="clip0_211_216">
            <rect width="98.788" height="43.703" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <div :class="$style.day">
          <strong>Municipalidad de San Martín</strong>
          <span>{{ date }}</span>
        </div>
      </div>
      <div :class="$style.share">
        <strong>COMPARTIR</strong>
        <a :href="`https://www.facebook.com/sharer/sharer.php?u=https://sanmartin.gov.ar${$nuxt.$route.path}`" target="_blank">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.505 12.682L16.032 9.245H12.732V7.015C12.7089 6.75825 12.7438 6.49959 12.8343 6.25819C12.9247 6.01679 13.0683 5.79884 13.2545 5.62049C13.4406 5.44214 13.6645 5.30796 13.9095 5.2279C14.1546 5.14784 14.4145 5.12395 14.67 5.158H16.17V2.232C15.2902 2.08993 14.4011 2.01239 13.51 2C10.791 2 9.019 3.646 9.019 6.626V9.245H6V12.682H9.019V20.99H12.735V12.682H15.505Z" fill="#A7A7A7"/>
          </svg>
        </a>
        <a :href="`https://twitter.com/intent/tweet?text=https://sanmartin.gov.ar${$nuxt.$route.path}`" target="_blank">
          <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.444 4.04794C18.457 4.22594 18.457 4.40294 18.457 4.58094C18.4675 6.11543 18.173 7.63671 17.5906 9.05642C17.0082 10.4761 16.1495 11.766 15.0643 12.851C13.9792 13.936 12.6893 14.7946 11.2696 15.3769C9.8498 15.9592 8.32849 16.2536 6.794 16.2429C4.56256 16.2487 2.37697 15.6097 0.5 14.4029C0.828723 14.4392 1.15929 14.4563 1.49 14.4539C3.3349 14.4587 5.12762 13.8419 6.579 12.7029C5.72354 12.6875 4.89427 12.4052 4.20706 11.8955C3.51985 11.3858 3.00904 10.6741 2.746 9.85994C3.00206 9.90031 3.26079 9.92137 3.52 9.92294C3.88412 9.92177 4.24664 9.87473 4.599 9.78294C3.67096 9.59518 2.8365 9.09201 2.23733 8.35886C1.63816 7.62571 1.31121 6.70778 1.312 5.76094V5.70994C1.88007 6.02685 2.51499 6.20502 3.165 6.22994C2.29569 5.6491 1.68077 4.75845 1.44569 3.73972C1.21061 2.721 1.3731 1.65096 1.9 0.747937C2.92909 2.01487 4.21289 3.05144 5.66822 3.79047C7.12355 4.5295 8.71791 4.95451 10.348 5.03794C10.2827 4.72917 10.2492 4.41453 10.248 4.09894C10.2482 3.2765 10.4958 2.47314 10.9585 1.79322C11.4212 1.1133 12.0777 0.588264 12.8427 0.286317C13.6077 -0.0156304 14.4459 -0.0805278 15.2482 0.100056C16.0506 0.28064 16.7801 0.698357 17.342 1.29894C18.2594 1.12194 19.1392 0.786965 19.942 0.308937C19.6369 1.25588 18.9969 2.05906 18.142 2.56794C18.9555 2.47362 19.7502 2.25824 20.5 1.92894C19.9387 2.74588 19.2436 3.46227 18.444 4.04794Z" fill="#A7A7A7"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="wrapper">
      <TitleStatics :text="`Relacionadas`" :size="`h3`" />
    </div>
    <RelatedNews :relateds="related" />
  </div>
</template>

<script>
import VueMeta from 'vue-meta'

import RichText from "../../components/RichText.vue";
import Title from "../../components/Title.vue";
import RelatedNews from "../../components/RelatedNews.vue";

export default {
  name: 'NewsSingle',
  components: {
    Title,
    RichText,
    RelatedNews
  },
  async asyncData({route,$prismic}){
    const slug = route.params.slug
    const res = await $prismic.api.getByUID('novedades', slug)
    
    if (res) {
      return { res }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  async fetch() {
    const slug = this.$route.params.slug
    const res = await this.$prismic.api.getByUID('novedades', slug)
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.date = new Date(res.first_publication_date).toLocaleDateString('es-AR', optionsDate)
    this.datos = res.data
    
    
    console.log(this.datos)
    const cats = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'tag_news'), { pageSize : 100 }).then( response => {
      return response.results
    });
    //console.log(cats)
    this.category = cats.filter(e => e.uid == this.datos.category.uid).pop()


    const related = await this.$prismic.api.query(this.$prismic.predicates.at('my.novedades.category', this.category.id), { pageSize : 5, orderings: '[document.first_publication_date desc]' }).then( response => {
      return response.results
    });
    this.related = related.filter(e => e.uid != slug).slice(0,3)
    
    //console.log(this.category)
    this.dataReady = true


    this.meta = {
      title: this.$prismic.asText(this.datos.title),
      description: this.$prismic.asText(this.datos.bajada),
      image: this.datos.image ? `${this.datos.image.url}?fit=clip&w=1200` : '',
    }

  },
  data() {
    return {
      meta: {},
      dataReady: false,
      date:'',
      datos: [],
      related: [],
      category:''
    }
  },
  mounted() {
    this.domReady = true
    console.log(window.location.hostname)
  },
  methods: {
  },
  head() {
    return {
      title: this.$prismic.asText(this.datos.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$prismic.asText(this.datos.bajada),
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: this.$prismic.asText(this.datos.title),
        },
        {
          name: 'twitter:description',
          content: this.$prismic.asText(this.datos.bajada),
        },
        {
          name: 'twitter:image',
          content: this.datos.image && `${this.datos.image.url}?fit=clip&w=1200&h=600`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.$prismic.asText(this.datos.title),
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.$prismic.asText(this.datos.bajada),
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.datos.image && `${this.datos.image.url}?fit=clip&w=1200&h=600`,
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
  background-color: white;
  padding: 50px 0;
  small{
    font-size: 12px;
    line-height: 1.3;
    font-weight: 600;
    display: block;
    color:$blue;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  h1{
    font-size: 22px;
    color:$black;
    line-height: 1.4;
    margin-bottom: 20px;
    font-weight: 900;
  }
  .hero{
    display: block;
    width: 100%;
    padding-top: 37%;
    background-size: cover;
    background-position: center;
    margin: 60px 0;
  }
  .content{
    max-width: 760px;
    padding: 20px;
    margin: auto;
    .bajada{
      font-weight: 900;
      font-size: 120%;
      margin: 30px 0;
    }
    .codigoYT{
      position: relative;
      margin: 40px 0;
      width: 100%;
      padding-top: 60%;
      iframe{position: absolute;width: 100%;height: 100%;top:0;left: 0;}
    }
  }
  @media (max-width:800px) {
    .hero{margin: 30px 0;}
    .content{padding-top: 0;}
  }
}
.fooNews{
  display: flex;
  margin-bottom: 80px;
  justify-content: space-between;
  align-items: center;
  border-top:1px solid #E3E3E3;
  padding-top: 20px;
  margin-top: 40px;
  font-size: 12px;
  .date{
    display: flex;
    align-items: center;    
    line-height: 1.6;
    .day{
      strong{display: block;font-size: 14px;}
      span{color:$grey}
    }
    .iso{
      margin-right: 24px;
      width: 65px;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 65px;
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.051);
      svg{max-width: 86%;}
    }
  }
  .share{
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{margin-left: 12px;}
  }
  @media (max-width:800px) {
    flex-direction: column;
    align-items: flex-start;
    .share{
      margin-top: 30px;
    }
  }
}
.description > p{
  margin-bottom: 24px; 
  color: #5e606a;
  line-height: 1.4;
}
</style>