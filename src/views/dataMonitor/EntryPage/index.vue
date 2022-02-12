<template>
  <el-container>
    <el-header class="title">
      <h3>数据监控</h3>
    </el-header>
    <!-- 使用网格布局 2 * 2 -->
    <el-main>
      <!-- 场地申请数据 -->
      <entery-item entryName="场地申请数据">
        <!-- 折线图 -->
        <chart-view :autoResize="true" width="100%" height="400px" id="line" :chartOption="lineOpt"/>
      </entery-item>
      <!-- 学生申请提交数据 -->
      <entery-item entryName="学生申请提交数据">
        <!-- 条形图 -->
           <chart-view id="hBar" :chartOption="hBarOpt"/>
      </entery-item>
      <!-- 教师审批数据 -->
      <entery-item entryName="教师审批数据">
        <!-- 柱状图 -->
            <chart-view id="bar" :chartOption="barOpt"/>
      </entery-item>
      <!-- 反馈信息数据 -->
      <entery-item entryName="反馈信息数据">
        <!-- 词云图 -->
            <chart-view id="wordcloud" :chartOption="wordcloudOpt"/>
      </entery-item>
    </el-main>
  </el-container>
</template>

<script>
import EnteryItem from './childComps/EnteryItem.vue'

export default {
  components:{
    EnteryItem
  },
  data(){
    return {
      barOpt:{},
      hBarOpt:{},
      lineOpt:{},
      wordcloudOpt:{}
    }
  },
  created(){
    this.barOpt = this.$echartFn.getBarEntryOpt();
    this.hBarOpt = this.$echartFn.gethBarEntryOpt();
    this.lineOpt = this.$echartFn.getLineEntryOpt();
    this.wordcloudOpt = this.$echartFn.getWordCloudOpt();
    console.log(this.barOpt, this.hBarOpt, this.lineOpt, this.wordcloudOpt);
  }
};
</script>

<style  scoped>
.title {
  border-bottom: 1px solid #b3c0d1;
}
.main {
  background-color: var(--color-background-main);
  height: 74vh;
}
</style>