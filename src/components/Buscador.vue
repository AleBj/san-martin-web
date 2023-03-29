<template>
    <div :class="$style.buscador" v-if="busca">
      <div :class="$style.buscador__wrap">
        <h2>Buscar en San Martín</h2>
        <input type="text" name="buscador" ref="buscador" :class="$style.buscador__input" placeholder="Ejemplo: Tasas municipales" v-model="buscador">
        <div :class="$style.buscador__resultados">
          <div id="resultados">
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VueTypes from 'vue-types'
import Title from './Title.vue';
  export default {
    name: "Buscador",
    props: {
      busca: VueTypes.bool
    },
    data() {
        return {
            allDocuments: [],
            buscador: ""
        };
    },
    async fetch() {
        let pages = await this.$prismic.api.query(this.$prismic.predicates.any("document.type", ["sitio", "programas", "novedades", "comunidades", "interna_comunidad", "tramites"]), { pageSize: 100 }).then(r => r.total_pages);
        let arr = [];
        for (let n = 1; n <= pages; n++) {
            await this.$prismic.api.query(this.$prismic.predicates.any("document.type", ["sitio", "programas", "novedades", "comunidades", "interna_comunidad", "tramites"]), { pageSize: 100, page: n }).then(response => {
                return arr = arr.concat(response.results);
            });
        }
        this.allDocuments = arr;
        //console.log(this.allDocuments)
    },
    mounted() {
    },
    methods: {
        filter(v) {
          let resultado = document.getElementById("resultados");
          resultado.innerHTML = "";
          if (v > 1) {
            for (let doc of this.allDocuments) {
                let uid = doc.uid.toLowerCase().replaceAll('-', ' ');
                
                if (uid.indexOf(this.buscador.toLowerCase()) !== -1) {
                    let tag = (doc.type == "interna_comunidad") ? "comunidades" : doc.type;
                    let title = "";
                    let url = "/";
                    if (doc.type == "tramites") {
                        title = doc.data.nombre;
                    }
                    else if (doc.type == "novedades") {
                        title = doc.data.title;
                    }
                    else {
                        title = doc.data.titulo;
                    }
                    if (doc.type == "sitio") {
                        url = `/${doc.uid}`;
                    }
                    else if (doc.type == "interna_comunidad") {
                        url = `/comunidades/interna/${doc.uid}`;
                    }
                    else {
                        url = `/${doc.type}/${doc.uid}`;
                    }
                    resultado.innerHTML += `
                    <a href="${url}">
                      <strong>${tag.replace('tramites','trámites')}</strong>  <br>
                      <h4>${this.$prismic.asText(title)} </h4>
                    </a>
                  `;
                }
            }
          }
        }
    },
    watch: {
        buscador(v) {
            this.filter(v.length);
        },
        busca(){
          if(!this.$refs.buscador){
            setTimeout(()=>{this.$refs.buscador.focus()}, 500)
          }
          
        }
    },
    components: { Title }
}
  </script>
  
  <style lang="scss" module>
  .buscador {
    position: fixed;
      background: #fff;
    backdrop-filter: blur(2px);
    width: 100%;height: 100%;
    top: 0;left: 0;
    z-index: 9;
    &__wrap{
      width: 100%;
      max-width:1150px;
      padding: 40px 20px;
      margin: auto;
      position: relative;
      @media (max-width:800px){
        padding: 20px;
      }
      h2{
        font-size: 22px;
        margin: 30px 0;
      }
    }
    &__close{
      position: absolute;
      right: 0;top:40px;
      cursor: pointer;
    }
    &__input{
      display: block;
      outline: none;
      width: 100%;
      border:none;
      border-bottom: 1px solid #5E606A;
      padding-left: 56px;
      background-image: url(../assets/images/lupa.svg);
      background-repeat: no-repeat;
      background-position: left center;
      font-family: inherit;
      font-size: 14px;
      height: 50px;
      margin-bottom: 60px;
    }
    &__resultados{
      max-height: calc(90vh - 250px);
      overflow-y: scroll;
      padding-right: 20px;
      &::-webkit-scrollbar {width: 2px;}
      
      &::-webkit-scrollbar-track {
          background: rgba($color: $blue, $alpha: .2);
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: $blue;
      }

      & > div{
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        & > a{
          width: 33.33%;
          display: block;
          padding: 30px 10px;
          border-bottom: 1px solid #E3E3E3;
          strong{
            text-transform: uppercase;
            display: block;
            color:$blue;
            font-size: 12px;
            letter-spacing: .02em;
          }
          h4{line-height: 1.3;}
          @media (max-width:800px){
            width: 100%;
          }
        }
      }
    }
  }
  </style>
  