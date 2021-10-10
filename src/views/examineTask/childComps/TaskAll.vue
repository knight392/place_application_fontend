<template>
  <div class="task-all" >
    <h1>我的审批</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane lazy label="待审批" name="first"><task-list ref="todoTasks" :teacher_no="teacher_no" task-type="todo" tiemstamp-label="产生时间" btn-text="点击审批" empty-desc="暂无待审批任务"/></el-tab-pane>
      <el-tab-pane lazy label="已审批" name="second"><task-list ref="finishedTasks" :teacher_no="teacher_no" task-type="finished" tiemstamp-label="完成时间" btn-text="查看详情" empty-desc="暂无已完成任务"/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TaskList from './TaskList.vue'
export default {
  components:{
    TaskList
  },
  name: 'TaskAll',
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {
    teacher_no(){
      return this.$store.state.teacher ? this.$store.state.teacher.teacher_no : ''
    }
  },
  methods: {
    
  },
  // 挂载实例
  mounted(){
    this.$bus.$on("refresh", () => {
        this.$refs.todoTasks && this.$refs.todoTasks.refresh();
        this.$refs.finishedTasks && this.$refs.finishedTasks.refresh(); // 因为是懒加载，所以一开始为 undefined
    })
  },


};
</script>

<style  scoped>
  .task-all{
    width:100%;
  }
</style>