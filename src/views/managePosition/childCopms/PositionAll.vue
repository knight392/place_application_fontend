<template>
  <el-container>
    <el-header class="title"><h3>所有职位</h3></el-header>
    <el-main v-loading="loading" class="main">
      <position-list :positions="positions" @add-position="appendPosition" />
    </el-main>
  </el-container>
</template>

<script>
import { getAllPositionsRequest } from "network/position";
import PositionList from "./PositionList.vue";
export default {
  components: { PositionList },
  data() {
    return {
      positions: [],
      loading: true,
    };
  },
  created() {
    this.getAllPositions();
    this.$bus.$on("removePosition", (value) => {
      console.log(value);
      console.log('删除。。');
      this.refreshPositions();
    });
  },
  methods: {
    getAllPositions() {
      this.loading = true;
      getAllPositionsRequest().then(
        (res) => {
          if (res.status === 200) {
            this.positions = res.data;
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
    refreshPositions() {
      console.log("更新");
      this.getAllPositions();
    },
    appendPosition(position) {
      console.log(position);
      this.refreshPositions();
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