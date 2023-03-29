<template>
  <div :class="[$style.blockRelated, `wrapper`]" v-if="relateds">
    <CardsNews v-for="(item, index) in relateds" :key="index" :items="item" :type="`newsHome`" />
  </div>
</template>
<script>
import VueTypes from 'vue-types'

export default {
  name: 'RelatedNews',
  props: {
    relateds: VueTypes.array.def()
  },
}
</script>
<style lang="scss" module>
.blockRelated{
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  @media (max-width:800px) {
    overflow-x: scroll;
    padding-bottom: 20px;
    & > div{
      min-width: 280px;
    }
  }
}
</style>
