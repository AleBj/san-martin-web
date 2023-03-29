<template>
  <div class="page error" :class="$style.page">
    <header :class="$style.header">
      <div class="container">
        <div :class="$style.content">
          error
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import PageMixin from '../mixins/page'
import Util from '../assets/js/util/util'

export default {
  layout: 'Error',
  mixins: [PageMixin],
  props: {
    error: {
      type: Object,
      default: null,
    },
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
    const res = await this.$prismic.api.getByUID(
      'error_404',
      'error-404',
      options
    )
    if (res && res.data) {
      const data = res.data
      this.subtitle = data.small_text
      this.title = data.title
      this.text = data.text
      this.items = data.links

      this.meta = {
        title: this.$prismic.asText(data.meta_title),
        description: this.$prismic.asText(data.meta_description),
        image: data.meta_image ? data.meta_image.url : '',
      }
      this.dataReady = true
      this.init()
    }
  },
  data() {
    return {
      meta: {},
      subtitle: [],
      title: [],
      text: [],
      items: [],
      domReady: false,
      dataReady: false,
      introDone: false,
    }
  },
  computed: {
    links() {
      return this.items.filter((item) => item.link_page && item.link_page.uid)
    },
  },
  mounted() {
    this.domReady = true
    window.addEventListener('resize', this.resize)
    this.resize()
    this.init()
  },
  methods: {
    init() {
      if (this.dataReady && this.domReady && !this.inited) {
        this.inited = true
        Util.loadImages(
          Array.from(this.$el.querySelectorAll('img')),
          () => {
            this.$nuxt.$emit('footer-show')
            this.$nuxt.$emit('scroll-reset')
            this.$nuxt.$emit('bg-update')

            this.hideLoading()
          },
          5
        )
      }
    },
    linkResolver(link) {
      const uid = link.uid
      const type = link.type
      switch (type) {
        case 'featured_projects':
          return `/work/featured/`
          break
        case 'job_offers':
          return `/careers/${uid}/`
          break
        case 'project':
          return `/work/${uid}/`
          break
        case 'home':
          return `/`
          break
        default:
          return `/${uid}/`
          break
      }
    },
    resize() {
      this.isMobile = window.innerWidth < 768
    },
  },
  head() {
    return {
      title: this.meta.title,
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
  .header {
    width: 100%;
    min-height: 100vh;
    background: $dark-blue !important;
    padding-top: 200px;
    padding-bottom: 138px;
    color: white;
    border-bottom: 1px solid white;
  }
  .content {
    max-width: 1114px;
    margin: 0 auto;
  }
  .subtitle {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.5px;
    margin: 0;
    margin-bottom: 40px;
  }
  .text {
    max-width: 775px;
    font-weight: normal;
    font-size: 26px;
    line-height: 36px;
    letter-spacing: -0.464286px;
    margin-top: 80px;
  }
  .items {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 80px;
  }
  .item {
    margin-bottom: 32px;
    &:not(:last-child) {
      margin-right: 63px;
    }
  }
}
</style>
