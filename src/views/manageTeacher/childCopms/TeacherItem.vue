<template>
  <el-card
    :body-style="{ padding: '0px' }"
    shadow="hover"
    class="teacher-card"
    @mouseenter.native="show = true"
    @mouseleave.native="show = false"
  >
    <el-header height="100px" class="header">
      <div class="img">
        <el-avatar :size="80" :src="teacherImg"></el-avatar>
      </div>
      <div class="name">{{ teacher.teacher_name }}</div>
    </el-header>
    <el-main class="body">
      <div>职位</div>
      <div class="tags">
        <el-tag
          v-for="item in teacher.positions"
          :key="item.positon_name"
          size="small"
          class="position-tag"
          >{{ item.position_name }}</el-tag
        >
        <el-tag v-if="teacher.positions.length == 0" type="warning" size="small"
          >无</el-tag
        >
      </div>
    </el-main>
    <!-- 悬浮显示编辑和删除选项 -->
    <transition name="el-fade-in-linear" class="">
      <div v-show="show" class="hover-pane">
        <el-container class="btns">
          <div class="edit">
            <el-button type="primary" icon="el-icon-edit" circle @click="toEditPage"></el-button>
            <div class="text">编辑</div>
          </div>
          <div class="delete">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click.native="deleteTeacher(teacher.teacher_no)"
            ></el-button>
            <div class="text">删除</div>
          </div>
        </el-container>
      </div>
    </transition>
  </el-card>
</template>

<script>
import { deleteTeacherRequest } from "network/teacher";
export default {
  data() {
    return {
      teacherImg:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      show: false,
    };
  },
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTeacher(teacher_no) {
      this.$confirm(
        "此操作将永久删除该教师却可能会影响学生场地进度, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 确定删除
          deleteTeacherRequest(teacher_no).then((res) => {
            if (res.data) {
              this.$message({
                type: "success",
                message: res.info,
              });
              this.$bus.$emit("removeTeacher", this.teacher.teacher_no)
            }else{
              this.$message.error(res.info)
            }
          },() => {
            this.$message.error("教师删除异常")
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toEditPage() {
      // 跳转到编辑页面
      this.$router.replace({
        name: "teacherEdit",
        params: {teacher_no: this.teacher.teacher_no,teacher_name:this.teacher.teacher_name,positions:this.teacher.positions}
        // params: {teacher:JSON.stringify(this.teacher)}
      })
    }
  },
};
</script>

<style  scoped>
.header {
  height: 100px;
  text-align: center;
}
.teacher-card {
  position: relative;
  margin-bottom: 15px;
  width: 220px;
  height: 250px;
  margin-right: 30px;
  padding: 15px;
}
.body {
  height: 100px;
}
.tags {
  margin-top: 10px;
}
.position-tag {
  margin-right: 8px;
}

.hover-pane {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
}

.btns {
  display: flex;
  justify-content: space-evenly;
  font-size: 13px;
  text-align: center;
}
.btns .text {
  margin-top: 5px;
}
</style>