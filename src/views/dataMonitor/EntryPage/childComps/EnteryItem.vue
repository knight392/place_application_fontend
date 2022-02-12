<template>
  <el-card shadow="hover">
    <!-- 图像插槽 -->
    <slot></slot>
    <div class="name">{{entryName}}</div>
  </el-card>
</template>

<script>
  export default {
    props:{
      entryName:{
        type:String,
        require:true
      }
    }
  }
</script>

<style  scoped>
.name{
  padding:10px;
  font-weight: bold;
  text-align: center;
}
</style>