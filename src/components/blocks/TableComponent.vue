<template lang="">
  <div :class="[$style.wrapperTable,`wrapper`]">
    <div :class="[$style.table]">
      <div :class="[$style.table_row,$style.head]">
        <div :class="[$style.table_cel]"><strong>{{ $prismic.asText(data.primary.head_column_1)}}</strong></div>
        <div :class="[$style.table_cel]"><strong>{{ $prismic.asText(data.primary.head_column_2)}}</strong></div>
        <div :class="[$style.table_cel]"><strong>{{ $prismic.asText(data.primary.head_column_3)}}</strong></div>
        <div :class="[$style.table_cel,$style.btn]"><strong>{{ $prismic.asText(data.primary.head_column_4)}}</strong></div>
      </div>
      <div :class="[$style.table_row]" v-for="(t,index) in items" :key="index">
        <div :class="[$style.table_cel]" :data-label="$prismic.asText(data.primary.head_column_1)">
         <RichText :text="t.row_1" />
        </div>
        <div :class="[$style.table_cel]" :data-label="$prismic.asText(data.primary.head_column_2)">        
         <RichText :text="t.row_2" />
        </div>
        <div :class="[$style.table_cel]" :data-label="$prismic.asText(data.primary.head_column_3)">        
         <RichText :text="t.row_3" />
        </div>
        <div :class="[$style.table_cel,$style.btn]" :data-label="$prismic.asText(data.primary.head_column_4)">
         <RichText :text="t.row_4" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

import RichText from '../RichText.vue'

export default {
  name:'TableComponent',
  props: {    
    items: VueTypes.array.def(),
    data: VueTypes.object.def()
  },
  components:{
    RichText,
  },
  mounted() {
   // console.log(this.data)
   // console.log(this.items)
  },
  watch: {
  },
  methods:{
  }
}
</script>
<style lang="scss" module>
.wrapperTable{
  padding: 40px;
  border-radius: 12px;
  background: #FFF;
  margin-bottom: 50px;
  @media (max-width:800px) {
    padding: 30px 20px;
  }
}
.table{
  &_row{
    border-radius: 6px;
    display: flex;
    padding: 14px 30px;
    align-items: center;
    justify-content: space-between;
    background: #FFF;
    color:#A7A7A7;
    font-size: 14px;
    strong{color:#5E606A;}
    &:nth-child(odd){background: #f8f8f8;}
    &.head{
      strong{color:$black;}
      text-transform: uppercase;
      font-weight: 700;
      font-size: 12px;
    }
  }
  &_cel{
    width: 28%;
    padding: 0 8px;
    p{line-height: 1.4;}
    &.btn{
      width: 16%;
      text-align: center;
      p > a{
        color:#209EDE;
        em{
          justify-content: center;
          font-size: 12px;
          font-style: normal;
          text-transform: uppercase;
          display: flex;
          font-weight: 500;
          height: 50px;
          align-items: center;
          padding: 0 24px;
          border-radius: 25px;
          color: #FFF;
          background-color: #209EDE;
          @media (max-width:800px) {
            padding: 0 14px;
            height: 40px;
            margin: 5px 0;
          }
        }
      }
    }
  }
  @media (max-width: 800px){
    &_row{
      padding: 10px;
      flex-direction: column;
      font-size: 12px;
    }
    &_cel{
      width: 100%;
      margin:5px 0;
      padding-left: 120px;
      position: relative;
      &:before{
        content: attr(data-label);
        font-size:12px;
        font-weight: 500;
        left: 0;top:0px;
        position: absolute;
        color:$black
      }
      &.btn{
        width: 100%;padding-left: 0;
        &::before{opacity:0;pointer-events: none;}
      }
    }
    & > .head{display: none;}
  }
}
</style>