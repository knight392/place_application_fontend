<template>
  <el-container>
    <el-header class="header">
      <el-page-header @back="goBack" content="场地详情信息"> </el-page-header>
    </el-header>

    <el-main class="main" v-loading="loading">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="场地名称"
          :label-width="formLabelWidth"
          prop="place_name"
        >
          <el-input v-model="form.place_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属流程" :label-width="formLabelWidth">
          <el-tag v-if="place.aplProcedure === null" type="warning" size="small"
            >无</el-tag
          >
          <el-tag v-else size="small">{{ place.aplProcedure.pro_name }}</el-tag>
        </el-form-item>
        <el-form-item
          label="场地描述"
          :label-width="formLabelWidth"
          prop="place_info"
        >
          <el-input
            v-model="form.place_info"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button
            class="submit-btn"
            type="primary"
            @click="submitPlace('form')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {
  updatePlaceRequest,
  setencePlaceDuplicatedRequest,
} from "network/place";
import { getAllTeachersRequest } from "network/teacher";

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  created() {
    getAllTeachersRequest().then(
      (res) => {
        if (res.status === 200) {
          this.teachers = res.data;
          this.teachers.push({
            teacher_no: null,
            teacher_name: "置空",
          });
          this.loading = false;
        } else {
          this.$message.error(res.info);
        }
      },
      (err) => {
        console.log(err);
        this.$message.error("网络异常");
      }
    );
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("教师名不能为空"));
      } else {
        // 与原来的名称不同，才需要验证
        if (value != this.place.place_name) {
          setencePlaceDuplicatedRequest(value).then((res) => {
            if (res.data) {
              return callback(new Error("该场地名已存在"));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      }
    };
    var checkInfo = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入场地描述"));
      } else {
        callback();
      }
    };
    return {
      form: {
        place_name: this.place.place_name,
        place_info: this.place.place_info,
      },
      formLabelWidth: "120px",
      rules: {
        place_name: [{ validator: checkName, trigger: "blur" }],
        place_info: [{ validator: checkInfo, trigger: "blur" }],
      },
      teachers: [],
      loading: true,
    };
  },
  methods: {
    goBack() {
      this.$router.replace("/admin/placeManage");
    },
    submitPlace(formName) {
      this.$confirm("此操作将修改场地信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定修改
          this.$refs[formName].validate((valid) => {
            // 前端格式验证通过
            if (valid) {
              this.updatePlace();
            } else {
              this.$message.error("信息填写错误");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    updatePlace() {
      const place = {
        place_no: this.place.place_no,
        place_name: this.form.place_name,
        place_info: this.form.place_info,
      };
      updatePlaceRequest(place).then(
        (res) => {
          if (res.data) {
            this.$message({
              type: "success",
              message: res.info,
            });
          } else {
            this.$message.error(res.info);
          }
        },
        (err) => {
          console.log(err);
          this.$message.error("教师信息更新异常");
        }
      );
    },
  },
};
</script>

<style  scoped>
.header {
  border-bottom: 1px solid #b3c0d1;
}
.main {
  background-color: var(--color-background-main);
  height: 74vh;
}

.place-tag {
  margin-right: 8px;
}
</style>