<template>
  <div :class="[$style.profile]">
    <div :class="$style.container">

      <div :class="$style.smallProfiles" v-if="slices && slices.name">
        <div :class="$style.sticky">
          <Title v-if="slices && slices.name" :text="slices.name" :size="true" />
          <div :class="$style.avatar">
            <SingleImage v-if="slices && slices.name" :image="slices.image_small_profile" />
          </div>
          <div :class="$style.copy">
            <RichText v-if="slices && slices.story_small_profile" :text="slices.story_small_profile" :class="$style.h3" />  
          </div>
          <div :class="$style.logo">
            <Logo />
          </div>
        </div>
      </div>

      <div :class="$style.profilesList">
        <div
          v-for="(prof, index) in profiles"
          :key="index"
          @click="carga(prof.uid)"
          :class="$style.cta"
        >
          <Avatar 
          :image="prof.data.image_small_profile"
          :named="prof.data.name"
          :from="prof.data.location"
          :since="prof.data.diagnosed"
          :small="true"
          />
        </div>
        
      </div>

    </div>

    <Footer />
  </div>
</template>

<script>

import Avatar from '../../components/Avatar'
import Footer from '../../components/Footer'
import Title from '../../components/Title'
import SingleImage from '../../components/SingleImage'
import Logo from '../../components/Logo'

export default {
  name: 'SmallProfiles',
  components: {
    Avatar,
    Footer,
    Title,
    SingleImage,
    Logo
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
    const res = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'small_profiles'), { pageSize : 100 }).then( response => {
      return response.results
    });
    //console.log(res)
    this.profiles = res
    this.dataReady = true
  },
  data() {
    return {
      meta: {},
      theme: 'theme',
      title: [],
      profiles: [],
      slices:[],
      dataReady: false,
      isMobile: false,
    }
  },
  mounted() {
    this.domReady = true
  },
  methods: {
    carga: function(slg){
      const res = this.profiles.filter(e => e.uid === slg)

      if (res && res[0].data) {
        this.slices = res[0].data
        this.dataReady = true
      }
      //console.log(this.slices)
    }
  },
  head() {
    return {
      title: 'this.meta.title',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'this.meta.description',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'this.meta.title',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'this.meta.description',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'this.meta.title',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'this.meta.description',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'this.meta.image',
        },
      ],
    }
  },
}
</script>

<style lang="scss" module>
.profile {
  background: $pink;
  width: 100%;

  .container{
    display: flex;
    width: 100%;
    position: relative;
    align-items: stretch;
    min-height: calc(100vh - 200px);
  }

  .profilesList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    transition:$curve 1s;
    .cta{width: 50%;padding: 20px;display: flex;justify-content: flex-start;}
    .cta > div{margin:0}
    .cta:nth-child(4n + 3),
    .cta:nth-child(4n + 4) {
      justify-content: flex-end;
    }
  }
    
  .smallProfiles{
    min-width: 50vw;
    transition:$curve 1s;
    position: relative;
    background: $black;
    .sticky{
      position: sticky;
      top:0px;
      height: 100vh;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    h1{color: $pink;}
    .logo{padding:13px 20px;}
    .avatar{
      position: relative;
      z-index: 2;
      top: -10px;
      img{
        transform: translateX(-100%);
        max-width: 140px;
      }
    }
    .copy{
      font-family: $font-serif;
      max-width: 350px;
      font-size: 28px;
      line-height: 1.2;
      margin: auto;
      color: $pink;
      transform: translateY(40%);
      strong{
        font-weight: 600;
        position: relative;
        z-index: 1;
        display: inline-block;
        &:before{
          content: url('../../assets/images/highlights.svg');
          position: absolute;
          left: 50%;
          top:51%;
          transform: translate(-50%,-50%);
          z-index: -1;
        }
      }
    }
  }

}
</style>
