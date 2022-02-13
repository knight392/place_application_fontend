<template>
  <el-card
    :body-style="{ padding: '0px' }"
    shadow="hover"
    class="place-card"
    @mouseenter.native="show = true"
    @mouseleave.native="show = false"
  >
    <img
      width="268px"
      height="200px"
      fit="fill"
      :src="imgPath"
    />
    <div style="padding: 14px; position:relative">
      <div class="available-tag">
        <el-tag v-if="place.available
 == 0" type="danger" size="small"
          >禁</el-tag
        >
       
      </div>
      <span>{{ place.place_name }}</span>
      <div class="bottom clearfix">
        <span>所属流程：</span>

        <el-tag v-if="place.aplProcedure === null" type="warning" size="small"
          >无</el-tag
        >
        <el-tag v-else size="small">{{ place.aplProcedure.pro_name }}</el-tag>
      </div>
    </div>
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
              @click.native="deletePlace(place.place_no)"
            ></el-button>
            <div class="text">删除</div>
          </div>
        </el-container>
      </div>
    </transition>
  </el-card>
</template>

<script>
import { deletePlaceRequest } from "network/place";
import { baseURL } from "network/request.js";
export default {
  data() {
    return {
      show: false,
      baseURL
    };
  },
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  computed:{
    imgPath(){
      return this.baseURL + this.place.image.path;
    }
  },
  methods: {
    deletePlace(place_no) {
      if (
        this.place.aplProcedure != null &&
        this.place.aplProcedure.pro_no != 0
      ) {
        this.$message({
          type: "warning",
          message: "该场地已被添加到流程中，不可被删除",
        });
        return;
      }
      this.$confirm(
        "此操作将永久删除该场地,可能会影响学生场地申请进度, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 确定删除
          deletePlaceRequest(place_no).then(
            (res) => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: res.info,
                });
                console.log("删除");
                this.$bus.$emit("removePlace", this.place.place_no);
              } else {
                this.$message.error(res.info);
              }
            },
            () => {
              this.$message.error("场地删除异常");
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
        name: "placeEdit",
        params: { place: this.place },
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
.place-card {
  position: relative;
  margin-bottom: 15px;
  margin-right: 30px;
  width: 270px;
  height: 300px;
  border-radius: 10px;
}

.available-tag{
  position: absolute;
  top:14px;
  right:14px;
}

.image {
  width: 100%;
  display: block;
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

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>