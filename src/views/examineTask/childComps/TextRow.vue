<template>
  <div class="row">
    <div class="label" :style="{width:labelWidth + 'px'}">{{label}}</div>
    <div class="value" :style="{color: valueColor}">{{value}}</div>
  </div>
</template>

<script>
  export default {
    props:{
      label:{
        type: String,
        require:true
      },
      labelWidth: {
        type: Number,
        default: 100
      },
      value: {
        type:String,
        require:true
      },
      valueColor: {
        type: String,
        default: '#303133'
      }
    }
  }
</script>

<style scoped>
  .row{
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
  }
 
  .value{
    /* 填充剩余宽度 */
    flex-grow: 1; 
  }


</style>