<template>
  <el-container>
    <el-header class="header">
      <el-page-header @back="goBack" content="教师详情信息"> </el-page-header>
    </el-header>

    <el-main class="main">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="教师账号"
          :label-width="formLabelWidth"
          prop="teacher_no"
        >
          <el-input
            v-model="form.teacher_no"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="教师名称"
          :label-width="formLabelWidth"
          prop="teacher_name"
        >
          <el-input v-model="form.teacher_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <div class="tags">
            <el-tag
              v-for="item in positions"
              :key="item.positon_name"
              class="position-tag"
              >{{ item.position_name }}</el-tag
            >
            <el-tag v-if="positions.length == 0" type="warning">无</el-tag>
          </div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button
            class="submit-btn"
            type="primary"
            @click="submitTeacher('form')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {updateTeacherRequest} from 'network/teacher'
export default {
  props: {
    teacher_no: {
      type: String,
      required: true,
    },
    teacher_name: {
      type: String,
      required: true,
    },
    positions: {
      type: Array,
      required: true,
    },
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("教师名不能为空"));
      } else {
        callback();
      }
    };
    return {
      form: {
        teacher_no: this.teacher_no,
        teacher_name: this.teacher_name,
      },
      formLabelWidth: "120px",
      rules: {
        teacher_name: [{ validator: checkName, trigger: "blur" }],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.replace("/admin/teacherManage");
    },
    submitTeacher(formName) {
      this.$confirm("此操作将修改教师个人信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定修改
          this.$refs[formName].validate((valid) => {
            // 前端格式验证通过
            if (valid) {
              this.updateTeacher(this.form)
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
    updateTeacher({teacher_no, teacher_name}) {
      updateTeacherRequest({teacher_no, teacher_name}).then(res => {
        if (res.data) {
          this.$message({
            type:"success",
            message:res.info
          })
        }else{
          this.$message.error(res.info)
        }
      },err => {
        console.log(err);
        this.$message.error("教师信息更新异常")
      })
    }
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