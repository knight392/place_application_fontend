<template>
  <el-card
    :body-style="{ padding: '0px' }"
    shadow="hover"
    class="position-card"
    @mouseenter.native="show = true"
    @mouseleave.native="show = false"
  >
    <el-header height="150" class="header">
      <div class="name">{{ position.position_name }}</div>
      <div class="teacher">
        <div>任职教师</div>
        <div class="tag">
          <el-tag v-if="position.teacher === null" type="warning" size="small"
            >无</el-tag
          >
          <el-tag v-else size="small">{{
            position.teacher.teacher_name
          }}</el-tag>
        </div>
      </div>
      <div class="procedure">
        <div>所属流程</div>
        <div class="tag">
          <el-tag
            v-if="position.aplProcedure === null"
            type="warning"
            size="small"
            >无</el-tag
          >
          <el-tag v-else size="small">{{
            position.aplProcedure.pro_name
          }}</el-tag>
        </div>
      </div>
    </el-header>
    <el-main class="body">
      <div>职位描述</div>
      <div class="position_info">
        {{ position.position_info }}
      </div>
    </el-main>
    <!-- 悬浮显示编辑和删除选项 -->
    <transition name="el-fade-in-linear" class="">
      <div v-show="show" class="hover-pane">
        <el-container class="btns">
          <div class="edit">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="toEditPage"
            ></el-button>
            <div class="text">编辑</div>
          </div>
          <div class="delete">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click.native="deletePosition(position.position_no)"
            ></el-button>
            <div class="text">删除</div>
          </div>
        </el-container>
      </div>
    </transition>
  </el-card>
</template>

<script>
import { deletePositionRequest } from "network/position";
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePosition(position_no) {
      if (
        this.position.aplProcedure != null &&
        this.position.aplProcedure.pro_no != 0
      ) {
        this.$message({
          type: "warining",
          message: "该职位已被添加到流程中，不可被删除",
        });
        return;
      }
      this.$confirm("此操作将永久删除该职位，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定删除
          deletePositionRequest(position_no).then(
            (res) => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: res.info,
                });
                console.log("删除");
                this.$bus.$emit("removePosition", this.position.position_no);
              } else {
                this.$message.error(res.info);
              }
            },
            () => {
              this.$message.error("职位删除异常");
            }
          );
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
        name: "positionEdit",
        params: { position: this.position },
        // params: {teacher:JSON.stringify(this.teacher)}
      });
    },
  },
};
</script>

<style  scoped>
.header .name {
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}
.position-card {
  position: relative;
  margin-bottom: 15px;
  margin-right: 30px;
  padding: 15px;
 width: 270px;
  height: 300px;
  border-radius: 10px;
}

.position_info {
  margin-top: 8px;
  font-size: 14px;
}
.teacher .tag {
  margin-top: 8px;
}
.procedure {
  margin-top: 10px;
}
.procedure .tag {
  margin-top: 8px;
}
.hover-pane {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
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