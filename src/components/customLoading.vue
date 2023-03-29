<template>
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      loading: false,
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      },
    },
  }
</script>
<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem;
    text-align: center;
    font-size: 3rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;height: 100%;
    /*background-color: rgba(32, 158, 222, .5);*/
    background-color: rgba(0, 0, 0, .8);
    backdrop-filter: blur(5);
  }
  .loading {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 4px solid rgba(26, 132, 185, 0.5);
    border-radius: 50%;
    border-top-color: rgba(32, 158, 222, 1);
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
