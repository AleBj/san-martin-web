import Util from '../assets/js/util/util'
import StorageManager from '../assets/js/util/storage-manager'

export default {
  transition: {
    leave(el, done) {
      if(this.loadingTimeOut) clearTimeout(this.loadingTimeOut)
      this.$nuxt.$emit('loading-show')
      setTimeout(() => {
        done()
      }, 1000)
    },
  },
  methods: {
    hideLoading(cb) {
      const $intro = document.getElementById('intro')
      let introDone = $intro && $intro.getAttribute('data-done') === 'true'

      if(introDone) {
        this.loadingTimeOut = setTimeout(() => {
          Util.waitForFont('IvyPrestoHeadline', () => {
            this.$nuxt.$emit('scroll-update-sections')
            this.$nuxt.$emit('loading-hide')
            this.$nuxt.$emit('intro-hide')
            if(cb) cb()
          })
        }, 500)
      }else {
        this.$nuxt.$on('intro-done', () => {
          this.loadingTimeOut = setTimeout(() => {
            Util.waitForFont('IvyPrestoHeadline', () => {
              this.$nuxt.$emit('scroll-update-sections')
              this.$nuxt.$emit('loading-hide')
              this.$nuxt.$emit('intro-hide')
              if(cb) cb()
            })
          }, 500)
        })
      }
      const loading = document.getElementById('loading')
      const first = loading && loading.getAttribute('data-first-load') === 'true'
      if(first) loading.setAttribute('data-first-load', false)
    },
    camelCase(str) {
      return str
        .replace(/_./g, (text) => {
          return text.toUpperCase()
        })
        .replace(/_/g, '')
    },
    prepareData(data) {
      let name = data.slice_type.toLowerCase().replace(/_/g, '-')

      const primary = {}
      Object.keys(data.primary).forEach((key) => {
        const newKey = this.camelCase(key)
        primary[newKey] = data.primary[key]
      })
      return {
        name,
        data: { ...primary, items: data.items, data },
      }
    },
  }
}
