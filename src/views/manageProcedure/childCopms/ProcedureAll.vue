<template>
  <el-container>
    <el-header class="title"><h3>所有流程</h3></el-header>
    <el-main v-loading="loading" class="main">
      <procedure-list :procedures="procedures" @add-procedure="appendProcedure" />
    </el-main>
  </el-container>
</template>

<script>
import { getAllProceduresRequest } from "network/procedure";
import ProcedureList from "./ProcedureList.vue";
export default {
  components: { ProcedureList },
  data() {
    return {
      procedures: [],
      loading: true,
    };
  },
  created() {
    this.getAllProcedures();
    this.$bus.$on("removeProcedure", (value) => {
      console.log(value);
      console.log('删除。。');
      this.refreshProcedures();
    });
  },
  methods: {
    getAllProcedures() {
      this.loading = true;
      getAllProceduresRequest().then(
        (res) => {
          if (res.status === 200) {
            this.procedures = res.data;
            console.log(res.data);
          } else {
            this.$message.error(res.info);
          }
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.$message.error("网络异常");
          this.loading = false;
        }
      );
    },
    // 刷新教师列表
    refreshProcedures() {
      console.log("更新");
      this.getAllProcedures();
    },
    appendProcedure(procedure) {
      console.log(procedure);
      this.refreshProcedures();
    },
  },
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