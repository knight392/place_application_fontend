<template>
  <el-container class="procedure-list">
    <procedure-item
      v-for="item in procedures"
      :key="item.procedure_no"
      :procedure="item"
    />
    <el-tooltip
      class="item"
      effect="dark"
      content="点击添加流程"
      procedurement="right"
    >
      <el-card
        shadow="hover"
        class="add-btn"
        @click.native="dialogFormVisible = true"
      >
        <i class="el-icon-plus"></i>
      </el-card>
    </el-tooltip>
    <el-dialog title="添加流程" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="流程名称"
          :label-width="formLabelWidth"
          prop="pro_name"
        >
          <el-input v-model="form.pro_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="对应申请表名"
          :label-width="formLabelWidth"
          prop="pro_form_name"
        >
          <el-input v-model="form.pro_form_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProcedure('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import ProcedureItem from "./ProcedureItem.vue";
import {
  addProcedureRequest,
  setenceProcedureDuplicatedRequest,
} from "network/procedure";
export default {
  components: {
    ProcedureItem,
  },
  props: {
    procedures: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("流程名不能为空"));
      } else {
        setenceProcedureDuplicatedRequest({pro_name: value}).then((res) => {
          if (res.data) {
            return callback(new Error("该流程名已存在"));
          } else {
            callback();
          }
        });
      }
    };
    var checkFormName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入流程所对应申请表名"));
      } else {
        setenceProcedureDuplicatedRequest({pro_form_name: value}).then((res) => {
          if (res.data) {
            return callback(new Error("该申请表名已存在"));
          } else {
            callback();
          }
        });
      }
    };

    return {
      dialogFormVisible: false,
      form: {
        pro_name: "",
        pro_form_name: "",
      },
      formLabelWidth: "120px",
      rules: {
        pro_name: [{ validator: checkName, trigger: "blur" }],
        pro_form_name: [{ validator: checkFormName, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitProcedure(formName) {
      this.$refs[formName].validate((valid) => {
        // 前端格式验证通过
        if (valid) {
          this.addProcedure(this.form);
        } else {
          this.$message.error("信息填写错误");
          return false;
        }
      });
    },
    addProcedure(procedure) {
      addProcedureRequest(procedure).then(
        (res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: res.info,
            });
            this.dialogFormVisible = false;
            this.$emit("add-procedure", res.data);
          } else {
            this.$message.error(res.info);
          }
        },
        (res) => {
          console.log(res);
          this.$message.error("添加流程异常");
        }
      );
    },
  },
};
</script>

<style scoped>
.add-btn {
  width: 220px;
  height: 250px;
  text-align: center;
  position: relative;
  cursor: pointer;
  margin-bottom: 15px;
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
.procedure-list {
  flex-wrap: wrap;
}
</style>