<template>
  <el-container>
    <el-header class="title"><h3>所有场地</h3></el-header>
    <el-main v-loading="loading" class="main">
      <place-list :places="places" @add-place="appendPlace" />
    </el-main>
  </el-container>
</template>

<script>
import { getAllPlacesRequest } from "network/place";
import PlaceList from "./PlaceList.vue";
export default {
  components: { PlaceList },
  data() {
    return {
      places: [],
      loading: true,
    };
  },
  created() {
    this.getAllPlaces();
    this.$bus.$on("removePlace", (value) => {
      console.log(value);
      console.log('删除。。');
      this.refreshPlaces();
    });
  },
  methods: {
    getAllPlaces() {
      this.loading = true;
      getAllPlacesRequest().then(
        (res) => {
          if (res.status === 200) {
            this.places = res.data;
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
    refreshPlaces() {
      console.log("更新");
      this.getAllPlaces();
    },
    appendPlace(place) {
      console.log(place);
      this.refreshPlaces();
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