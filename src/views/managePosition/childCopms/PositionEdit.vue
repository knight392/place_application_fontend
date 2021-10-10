<template>
  <el-container>
    <el-header class="header">
      <el-page-header @back="goBack" content="职位详情信息"> </el-page-header>
    </el-header>

    <el-main class="main" v-loading="loading">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="职位名称"
          :label-width="formLabelWidth"
          prop="position_name"
        >
          <el-input v-model="form.position_name" autocomplete="off" :readonly="!updateAble"></el-input>
        </el-form-item>
        <el-form-item label="任职教师" :label-width="formLabelWidth">
          <el-select
            v-model="form.teacher_no"
            placeholder="请选择"
            :loading="loading"
            :disabled="!updateAble"
          >
            <el-option
              v-for="item in teachers"
              :key="item.teacher_no"
              :label="item.teacher_name"
              :value="item.teacher_no"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属流程" :label-width="formLabelWidth">
          <div class="tags">
            <el-tag v-if="position.aplProcedure == null" type="warning"
              >无</el-tag
            >
            <el-tag v-else class="procedure-tag">{{
              position.aplProcedure.pro_name
            }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item
          label="职位描述"
          :label-width="formLabelWidth"
          prop="position_info"
        >
          <el-input
            v-model="form.position_info"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            autocomplete="off"
            :readonly="!updateAble"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button
            class="submit-btn"
            type="primary"
            @click="submitPosition('form')"
            :disabled="!updateAble"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {
  updatePositionRequest,
  setencePositionDuplicatedRequest,
} from "network/position";
import { getAllTeachersRequest } from "network/teacher";

export default {
  props: {
    position: {
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
  computed:{
    updateAble(){
      return this.position.aplProcedure == null
    }
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("教师名不能为空"));
      } else {
        // 与原来的名称不同，才需要验证
        if (value != this.position.position_name) {
          setencePositionDuplicatedRequest(value).then((res) => {
            if (res.data) {
              return callback(new Error("该职位名已存在"));
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
        return callback(new Error("请输入职位描述"));
      } else {
        callback();
      }
    };
    return {
      form: {
        position_name: this.position.position_name,
        position_info: this.position.position_info,
        teacher_no:
          this.position.teacher == null
            ? "无"
            : this.position.teacher.teacher_no,
      },
      formLabelWidth: "120px",
      rules: {
        position_name: [{ validator: checkName, trigger: "blur" }],
        position_info: [{ validator: checkInfo, trigger: "blur" }],
      },
      teachers: [],
      loading: true,
    };
  },
  methods: {
    goBack() {
      this.$router.replace("/admin/positionManage");
    },
    submitPosition(formName) {
      this.$confirm("此操作将修改职位信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定修改
          this.$refs[formName].validate((valid) => {
            // 前端格式验证通过
            if (valid) {
              this.updatePosition();
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
    updatePosition() {
      const position = {
        position_no: this.position.position_no,
        position_name: this.form.position_name,
        position_info: this.form.position_info,
        teacher:
          this.form.teacher_no == null || this.form.teacher_no == '无'
            ? null
            : {
                teacher_no: this.form.teacher_no,
              },
      };
      updatePositionRequest(position).then(
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

.position-tag {
  margin-right: 8px;
}
</style>