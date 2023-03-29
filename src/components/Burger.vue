<template>
    <div
      :class="[$style.burger, isOpen && $style.close]"
      @click="handleClick"
    >
    <!-- <svg fill="currentColor" v-if="!isOpen" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/></svg> -->
    <svg fill="currentColor" v-if="!isOpen" width="30" height="16" viewBox="0 0 30 16" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="16.0004" fill="white"/><path d="M29.0625 15H0.9375V13.25H29.0625V15ZM29.0625 8.87498H0.9375V7.12502H29.0625V8.87498ZM29.0625 2.74996H0.9375V1H29.0625V2.74996Z" fill="#282828"/></svg>
   
    <svg fill="currentColor" v-else xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
     </div>
  </template>
  
  <script>
  import VueTypes from 'vue-types'
  export default {
    name: 'Burger',
    props:{
      isOpen:VueTypes.bool.def(false),
    },
    data() {
      return {
      }
    },
    methods: {
      handleClick() {
        this.$emit("click");
      }
    },
    watch: {
      // isOpen(isOpen) {
      //   console.log(isOpen)
      // }
    },
  }
  </script>
  
  <style lang="scss" module>
  .burger {
    height: 30px;
    width: 40px;
    text-align: right;
    svg {
      height: 100%;
    }
  }
  </style>
  