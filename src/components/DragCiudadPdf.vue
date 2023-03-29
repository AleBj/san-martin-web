<template>
    <div
      :class="[$style.drag]"
    >
    <iframe :src="pdfCiudad.url" :class="[$style.object]"></iframe>
    </div>
  </template>
  
  <script>
  import VueTypes from 'vue-types'
  export default {
    name: 'drag-ciudad-pdf',
    props:{   
        pdfCiudad: VueTypes.object.def(),
    },
    data() {
      return {
      }
    },
    mounted() {
        console.log(this.pdfCiudad)
    },
    methods: {
    },
    watch: {
    },
  }
  </script>
  
  <style lang="scss" module>
  .drag {
    width: 100%;
    height: 800px;
    .object{
        width: 100%;
        height: 700px;
        border:none;
        appearance: none;
        @media (max-width:800px) {
            height: 60vh;
        }
    }
  }
  </style>
  