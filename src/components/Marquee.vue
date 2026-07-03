<template>
  <div class="marquee-container" @click="closeMarquee()" ref="marquee">
    <div 
      class="marquee-content"
      :style="{ animationDuration: speed + 's' }"
    >
      <!-- Duplicamos el texto para que el scroll sea continuo -->
      <span v-for="n in 12" :key="n">
        {{ text }} &nbsp; • &nbsp;
      </span>
    </div>

    <div class="close">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
        </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Marquee',
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 25
    }
  },

  methods: {
   
    closeMarquee() {
      this.$refs.marquee.style.display = 'none';
    }
  }
}
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  background: #209EDE;
  color: white;
  padding: 14px 0;
  white-space: nowrap;
  position: relative;
}
.marquee-container .close {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
}
.marquee-content {
  display: inline-flex;
  animation: marquee linear infinite;
  font-size: 1.1rem;
  font-weight: 500;
  align-items: center;
}

.marquee-content span {
  display: inline-flex;
  align-items: center;
}

/* Animación principal */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Pausa al hacer hover */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}
</style>