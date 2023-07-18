<template>
  <prismic-rich-text
    class="prismicText"
    :class="[margin ? 'margin' : 'noMargin']"
    :field="text"
    ref="text"
    :html-serializer="htmlSerializer"
  />
</template>

<script>
import VueTypes from 'vue-types'
import PrismicDOM from 'prismic-dom'
let Elements = PrismicDOM.RichText.Elements

export default {
  name: 'RichText',
  props: {
    text: VueTypes.array.def([]),
    margin: VueTypes.bool.def(true)
  },
  mounted () {
    //this.resize();
  },
  methods: {
    resize(){
      //text
     const html = this.$refs.text.innerHTML
      this.$refs.text.innerHTML = html.replace(/\.|\?/g, (x) => {
        return `<strong>${x}</strong>`
      })
    },
    htmlSerializer(type, element, content, children) {
      let childs = children.join('')
      switch (type) {
        case Elements.paragraph:
          if (this.breakLetters) {
            childs = children
              .map((child) => {
                return Array.from(child)
                  .map((letter) => {
                    if (letter === '.')
                      return `<strong class="letter">${letter}</strong>`
                    if (letter === ' ')
                      return `<span class="letter space">${letter}</span>`
                    return `<span class="letter">${letter}</span>`
                  })
                  .join('')
              })
              .join('')
            return `<p class="prismicParagraph line"><span class="text">${childs}</span></p>`
          } else {
            if (this.fadeInY)
              childs = `<span class="paragraphContent">${children.join(
                ''
              )}</span>`

            return `<p class="prismicParagraph" ${
              this.fadeInY ? 'data-fade-in-y' : ''
            }>${childs}</p>`
          }
          break
        case Elements.listItem:
          if (this.fadeInY) childs = `<span class="liContent">${childs}</span>`

          return `<li class="liParagraph" ${
            this.fadeInY ? 'data-fade-in-y' : ''
          }>${childs}</li>`
          break
        case Elements.oListItem:
          if (this.fadeInY) childs = `<span class="liContent">${childs}</span>`

          return `<li class="liParagraph" ${
            this.fadeInY ? 'data-fade-in-y' : ''
          }>${childs}</li>`
          break
        case Elements.hyperlink:
          if(element.data.link_type == "Media"){
            return `<a href="${element.data.url}" class="sin" target="_blank">${childs}</a>`
          }else if(element.data.link_type == "Document"){
            if(element.data.type == 'sitio'){
              return `<a href="/${element.data.uid}" class="sin" target="_blank">${childs}</a>`
            }else if(element.data.type == 'interna_comunidad'){
              return `<a href="/comunidades/interna/${element.data.uid}" class="sin" target="_blank">${childs}</a>`
            }else{
              return `<a href="${element.data.type}/${element.data.uid}" class="sin" target="_blank">${childs}</a>`
            }
          }
          break
        default:
          return null
      }
    },
  },
}
</script>

<style lang="scss">
.prismicText {
  &:not(:global(.paragraph)) {
    font-weight: inherit;
    font-family: inherit;
    text-align: inherit;
    text-decoration: inherit;
  }
  & {
    margin: 0;
  }
  & > * {
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    line-height: inherit;
    text-align: inherit;
    text-decoration: inherit;
    color: inherit;
    margin: 0;
  }
  ol,
  ul {
    padding-left: 1em;
  }
  &.noMargin {
    p,
    & > * {
      margin: 0 !important;
    }
    p:empty {
      margin-bottom: 34px !important;
    }
  }
  &.fadeInY {
    p,
    .liParagraph {
      @include fade-in-y();
    }
    p > .paragraphContent {
      display: inline-block;
    }
    .liParagraph > .liContent {
      display: inline-table;
    }
  }
  .dot{
    color: $orange;
  }
  & > p a{
    font-size: inherit;
    text-transform: inherit;
    display: inline;
    font-weight: inherit;
    height: auto;
    align-items: inherit;
    padding: 0;
    border-radius:0;
    background: transparent !important;
    color: $blue !important;
  }
}
</style>
