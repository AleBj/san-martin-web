<template lang="">
    <div class="wrapper">
        <div id="html" :class="[$style.content]">
        </div>
    </div>
</template>
<script>
import VueTypes from 'vue-types'


export default {
  name:'preformatered',
  props: {    
    data: VueTypes.any.def(),
  },  
  mounted() {
    this.domReady = true

    document.getElementById('html').appendChild(this.ConvertStringToHTML(this.data.primary.preformatered[0].text))
  },
  methods: {
    ConvertStringToHTML(str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        
        return doc.body.firstChild;
    }
  }
}
</script>
<style lang="scss" module>
.content{
    padding-bottom: 20px;
    p{
        font-size: 14px;
        line-height: 1.5;
    }
    h4{color: #209EDE;font-size: 18px;margin-bottom: 13px;}
}
</style>