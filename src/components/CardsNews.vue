<template lang="">
  <div :class="[$style.card, $style[type]]">
    
    <nuxt-link :to="`/novedades/${items.uid}`">
      <div :class="$style.thumbnail" :style="`background-image:url(${items.data.image.url}?fit=clip&w=900`"></div> 
      <div data-card="copy">  
        <small v-if="cat">{{cat}}</small>
        <h2>{{ $prismic.asText(items.data.title) }}</h2>

        <span>
          seguir leyendo
          <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.88 4.24312C17.9174 4.27466 17.9476 4.314 17.9682 4.3584C17.9889 4.40279 17.9996 4.45116 17.9996 4.50012C17.9996 4.54908 17.9889 4.59745 17.9682 4.64184C17.9476 4.68624 17.9174 4.72558 17.88 4.75712L13.789 8.39412C13.709 8.46374 13.6061 8.50147 13.5 8.50012C13.3977 8.50587 13.2973 8.47093 13.2207 8.40292C13.1441 8.33492 13.0974 8.23937 13.091 8.13712C13.0916 8.08822 13.1027 8.04003 13.1234 7.99572C13.1441 7.95141 13.1739 7.91201 13.211 7.88012L16.6 4.86412H0.409C0.306549 4.86986 0.205996 4.83478 0.129345 4.76657C0.0526939 4.69835 0.0061864 4.60254 0 4.50012C0.00643975 4.39787 0.0530568 4.30232 0.12968 4.23432C0.206303 4.16631 0.306712 4.13137 0.409 4.13712H16.6L13.211 1.12112C13.1739 1.08923 13.1441 1.04983 13.1234 1.00552C13.1027 0.961215 13.0916 0.913015 13.091 0.86412C13.0972 0.761695 13.1437 0.665892 13.2203 0.597674C13.297 0.529456 13.3975 0.49438 13.5 0.50012C13.606 0.49914 13.7088 0.536824 13.789 0.60612L17.88 4.24312Z" fill="#282828"/>
          </svg>
        </span>
      </div>
    </nuxt-link>

  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  name:'Card',
  props: {    
    items: VueTypes.object.def(),
    type: VueTypes.string.def()
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
    const res = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'tag_news'), { pageSize : 100 }).then( response => {
      return response.results
    });
    ////console.log(res)
    this.categories = res

    if(this.items.data.category.uid)
      this.cat = this.$prismic.asText(this.verCat(this.items.data.category.uid))
    
    this.dataReady = true
  },
  data(){
    return{
      categories:[],
      cat:'',
    }
  },
  methods: {
   verCat(x){
     const tag = this.categories.filter(e => e.uid == x)
     return tag[0].data.name
   }
  },
  mounted() {
    this.domReady = true
  },
  watch:{
    items(n){
      this.items = n
      this.cat = this.$prismic.asText(this.verCat(this.items.data.category.uid))
    }
  }
}
</script>
<style lang="scss" module>
.card{
  background: white;
  border-radius: 25px;
  &.newsHome{width: calc(33.33% - 15px);margin: 15px 0;order:2}
  a{
    outline: none;
    height:100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 20px;
    span{
      font-size: 12px;
      font-weight: 600;
      position: absolute;
      bottom: 1px;
      left: 0px;
      text-transform: uppercase;
      svg{margin-left: 10px;}
    }
    .thumbnail{
      padding-top: 64%;
      width: 100%;
      border-radius: 12px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin-bottom: 30px;
    }
    small{
      font-size: 12px;
      line-height: 1.3;
      font-weight: 600;
      display: block;
      color:$blue;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    h2{
      font-size: 22px;
      color:$black;
      line-height: 1.4;
      margin-bottom: 20px;
    }
  }
  @media (max-width:800px) {
   &.newsHome{width: calc(50% - 10px);margin: 10px 5px;order:2}
  a{
    padding-bottom: 20px;
    span{
      font-size: 12px;
      font-weight: 600;
      bottom: 5px;
      svg{margin-left: 8px;}
    }
    .thumbnail{
      padding-top: 70%;
      border-radius: 10px;
      margin-bottom: 16px;
    }
    small{
      font-size: 10px;
      margin-bottom: 10px;
    }
    h2{
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  }
}
</style>