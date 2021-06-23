<template>
  <el-card
    :body-style="{ padding: '0px' }"
    shadow="hover"
    class="procedure-card"
    @mouseenter.native="show = true"
    @mouseleave.native="show = false"
  >
    <el-header height="100px" class="header">
      <div class="name">{{ procedure.pro_name }}</div>
      <div>
        <div>对应申请表名</div>
        <div class="pro_form_name">
          {{ procedure.pro_form_name }}
        </div>
      </div>
    </el-header>
    <el-main class="body">
      <div class="places">
        <div>包含场地</div>
        <div class="tags">
          <el-tag
            v-for="item in procedure.places"
            :key="item.place_no"
            size="small"
            class="place-tag"
            >{{ item.place_name }}</el-tag
          >
          <el-tag
            v-if="procedure.places.length == 0"
            type="warning"
            size="small"
            >无</el-tag
          >
        </div>
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
              @click.native="deleteProcedure(procedure.pro_no)"
            ></el-button>
            <div class="text">删除</div>
          </div>
        </el-container>
      </div>
    </transition>
  </el-card>
</template>

<script>
import { deleteProcedureRequest } from "network/procedure";
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    procedure: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteProcedure(procedure_no) {
      this.$confirm(
        "此操作将永久删除该流程,可能会影响学生流程申请进度, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 确定删除
          deleteProcedureRequest(procedure_no).then(
            (res) => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: res.info,
                });
                console.log("删除");
                this.$bus.$emit("removeProcedure", this.procedure.pro_no);
              } else {
                this.$message.error(res.info);
              }
            },
            () => {
              this.$message.error("流程删除异常");
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
        name: "procedureEdit",
        params: { procedure: this.procedure },
        // params: {teacher:JSON.stringify(this.teacher)}
      });
    },
  },
};
</script>

<style  scoped>
.header {
  height: 100px;
}
.header .name {
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}
.procedure-card {
  position: relative;
  margin-bottom: 15px;
  margin-right: 30px;
  padding: 15px;
  width: 220px;
  height: 250px;
}
.body {
  height: 100px;
}

.pro_form_name{
  margin-top: 8px;
  font-weight: 700;
}
.places .tags {
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