<template>
  <el-container class="position-list">
    <position-item
      v-for="item in positions"
      :key="item.position_no"
      :position="item"
    />
    <el-tooltip
      class="item"
      effect="dark"
      content="点击添加职位"
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
    <el-dialog title="添加职位" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="职位名称"
          :label-width="formLabelWidth"
          prop="position_name"
        >
          <el-input v-model="form.position_name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item
          label="职位描述"
          :label-width="formLabelWidth"
          prop="position_info"
        
        >
          <el-input v-model="form.position_info" type="textarea"   :autosize="{ minRows: 2, maxRows: 4}" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPosition('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import PositionItem from "./PositionItem.vue";
import {
  addPositionRequest,setencePositionDuplicatedRequest
} from "network/position";
export default {
  components: {
    PositionItem
  },
  props: {
    positions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("职位名不能为空"));
      } else {
        setencePositionDuplicatedRequest(value).then((res) => {
          if (res.data) {
            return callback(new Error("该职位名已存在"));
          } else {
            callback();
          }
        });
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
      dialogFormVisible: false,
      form: {
        position_name: "",
        position_info: ""
      },
      formLabelWidth: "120px",
      rules: {
        position_name: [{ validator: checkName, trigger: "blur" }],
        position_info: [{ validator: checkInfo, trigger: "blur" }]
      },
    };
  },
  methods: {
    submitPosition(formName) {
      this.$refs[formName].validate((valid) => {
        // 前端格式验证通过
        if (valid) {
          this.addPosition(this.form);
        } else {
          this.$message.error("信息填写错误");
          return false;
        }
      });
    },
    addPosition(position) {
      addPositionRequest(position).then(
        (res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: res.info,
            });
            this.dialogFormVisible = false;
            this.$emit("add-position", res.data);
          } else {
            this.$message.error(res.info);
          }
        },
        (res) => {
          console.log(res);
          this.$message.error("添加职位异常");
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
.position-list{
  flex-wrap: wrap;
}
</style>