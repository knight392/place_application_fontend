<template>
  <el-container class="teacher-list">
    <teacher-item
      v-for="item in teachers"
      :key="item.teacher_no"
      :teacher="item"
    />
    <el-tooltip
      class="item"
      effect="dark"
      content="点击添加教师"
      placement="right"
    >
      <el-card
        shadow="hover"
        class="add-btn"
        @click.native="dialogFormVisible = true"
      >
        <i class="el-icon-plus"></i>
      </el-card>
    </el-tooltip>
    <el-dialog title="添加教师" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="教师名称"
          :label-width="formLabelWidth"
          prop="teacher_name"
        >
          <el-input v-model="form.teacher_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="教师账号"
          :label-width="formLabelWidth"
          prop="teacher_no"
        >
          <el-input v-model="form.teacher_no" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          prop="teacher_password"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.teacher_password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
          :label-width="formLabelWidth"
        >
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTeacher('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import TeacherItem from "./TeacherItem.vue";
import {
  setenceTeacherDuplicatedRequest,
  addTeacherRequest,
} from "network/teacher";
export default {
  components: {
    TeacherItem,
  },
  props: {
    teachers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    var checkNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        setenceTeacherDuplicatedRequest(value).then((res) => {
          if (res.data) {
            return callback(new Error("该账号已被占用"));
          } else {
            callback();
          }
        });
      }
    };
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("教师名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.teacher_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      line: "h",
      dialogFormVisible: false,
      form: {
        teacher_no: "",
        teacher_name: "",
        teacher_password: "",
        checkPass: "",
      },
      formLabelWidth: "120px",
      rules: {
        teacher_password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        teacher_no: [{ validator: checkNo, trigger: "blur" }],
        teacher_name: [{ validator: checkName, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitTeacher(formName) {
      this.$refs[formName].validate((valid) => {
        // 前端格式验证通过
        if (valid) {
          this.addTeacher(this.form);
        } else {
          this.$message.error("信息填写错误");
          return false;
        }
      });
    },
    addTeacher({ teacher_no, teacher_name, teacher_password }) {
      const teacher = { teacher_no, teacher_name, teacher_password };
      addTeacherRequest(teacher).then(
        (res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: res.info,
            });
            this.dialogFormVisible = false;
            this.$emit("add-teacher", res.data);
          } else {
            this.$message.error(res.info);
          }
        },
        (res) => {
          console.log(res);
          this.$message.error("添加教师异常");
        }
      );
    },
  },
};
</script>

<style scoped>
.add-btn {
  width: 270px;
  height: 300px;
  text-align: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 15px;
  border-radius: 10px;
}
.add-btn:hover .el-icon-plus {
  color: #409eff;
}
.el-icon-plus {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
}
.teacher-list {
  flex-wrap: wrap;
}
</style>