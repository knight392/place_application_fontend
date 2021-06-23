<template>
  <el-container>
    <el-header class="title"><h3>所有教师</h3></el-header>
    <el-main v-loading="loading" class="main">
      <teacher-list :teachers="teachers" @add-teacher="appendTeacher" />
    </el-main>
  </el-container>
</template>

<script>
import { getAllTeachersRequest } from "network/teacher";
import TeacherList from "./TeacherList.vue";
export default {
  components: { TeacherList },
  data() {
    return {
      teachers: [],
      loading: true,
    };
  },
  // watch: {
  //   teachers(teachers) {
  //     this.teachers = teachers
  //   }
  // },
  created() {
    this.getAllTeachers();
    this.$bus.$on("removeTeacher", (value) => {
      console.log(value);
      this.refreshTeachers();
    });
  },
  methods: {
    getAllTeachers() {
      this.loading = true;
      getAllTeachersRequest().then(
        (res) => {
          if (res.status === 200) {
            this.teachers = res.data;
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
    refreshTeachers() {
      console.log("更新");
      this.getAllTeachers();
    },
    appendTeacher(teacher) {
      console.log(teacher);
      this.refreshTeachers();
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