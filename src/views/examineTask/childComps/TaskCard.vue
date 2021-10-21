<template>
  <div class="card">
    <!-- 图片 -->
    <div class="img-box">
      <el-image
        :lazy="true"
        style="width: 240px; height: 200px; border-radius: 10px"
        :src="imgPath"
        fit="cover"
      ></el-image>
    </div>
    <!-- 文字内容 -->
    <div class="text-box">
      <text-row
        label="场地名称"
        :value="pName"
      />
      <text-row label="申请人" :value="stu" />
      <text-row label="使用时间" :value="duration" />
      <div class="btn-box">
        <el-button type="primary"  @click.native="toDetail">{{btnText}}</el-button>
      </div>
    </div>
    <!-- 状态 -->
    <div class="status-text" :style="{color: fontColor}">{{status}}{{reSentence}}</div>
  </div>
</template>

<script>
import TextRow from "./TextRow.vue";
import { baseURL } from "network/request.js";
export default {
  components: { TextRow },
  props: {
    task: {
      type: Object,
      require: true,
    },
    btnText:{
      type: String,
      require: true
    }
  },
  data() {
    return {
      targetSrc:baseURL // 后端路径
    };
  },
  computed: {
    imgPath() {
      return this.targetSrc + this.task.placeApplication.place.image.path;
    },
    pName(){
      return this.task.placeApplication.place.place_name
    },
    duration(){
      const from = this.task.placeApplication.begin_time.slice(0, -5);
      const to = this.task.placeApplication.end_time.slice(0,-5);
      return `${from} ~ ${to}`
    },
    stu(){
      return this.task.placeApplication.student.s_name
    },
     status() {
      let res = "";
      const a = this.task.is_finished;
      if (a == 0) {
        res = "待审批";
      } else if (a == 1) {
        res = "已通过";
      } else if (a == 2) {
        res = "已打回";
      } else if (a == 3) {
        res = "已拒绝";
      } else if (a == 4) {
        res = "已中断"
      }
      return res;
    },
    fontColor() {
      let color = "";
      const a = this.task.is_finished;
      if(a == 0){
        color = '#606266' // 黑
      }else if (a == 1) {
        color = "#67C23A"; // 绿
      } else if (a == 2) {
        color = "#E6A23C"; // 黄
      } else if (a == 3 || a == 4) {
        color = "#F56C6C"; // 红
      }
      return color;
    },
    reSentence(){
      if(this.task.is_reSentence == 1){
        return ' (再审)'
      }
      return ''
    }
  },
  methods: {
    // 去详情页
    toDetail(){
      console.log('点击');
      this.$router.push({
        name: 'TaskDetail',
        params: {task: this.task}
      })
    }
  },
};
</script>

<style  scoped>
.card {
  position: relative;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 12px;
  transition: all ease 0.5s;
}
.card:hover {
  box-shadow: 0 0 10px 2px #ccc;
}
.img-box {
  box-sizing: border-box;
  padding: 10px;
  flex-grow: 0;
  /* border: 1px solid #f00; */
}
.text-box {
  box-sizing: border-box;
  padding: 10px;
  flex-grow: 18;
  /* border: 1px solid #123; */
}
.btn-box {
  margin-top: 10px;
}

.status-text{
  position: absolute;
  right:40px;
  top:15px;
  font-weight: bold;
}
</style>