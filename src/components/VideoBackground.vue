<template lang="">
    <div>
        <video :class="[$style.video_background,$style.desk]" :src="video" id="videobg" autoplay loop muted playsinline>
        </video>
        <video :class="[$style.video_background,$style.mob]" :src="videoMob" id="videobg" autoplay loop muted playsinline>
        </video>
    </div>
</template>
<script>
import VueTypes from 'vue-types';
export default {
    name: 'VideoBackground',
    props:{
        video:VueTypes.string.def(''),
        videoMob:VueTypes.string.def('')
    },
    mounted() {
      let video = document.getElementById('videobg')
      video.play()
    }
}
</script>
<style lang="scss" module>
.video_background{
    position: absolute;
    left: 0;top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    &.desk{display: block;}
    &.mob{display: none;}
    @media (max-width:800px) {
        &.desk{display: none;}
        &.mob{display: block;}        
    }
}
</style>