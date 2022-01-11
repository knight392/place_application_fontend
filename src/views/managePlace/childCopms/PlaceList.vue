<template>
  <el-container class="place-list">
    <place-item v-for="item in places" :key="item.place_no" :place="item" />
    <el-tooltip
      class="item"
      effect="dark"
      content="点击添加场地"
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
    <el-dialog title="添加场地" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form">
        <el-form-item
          label="场地名称"
          :label-width="formLabelWidth"
          prop="place_name"
        >
          <el-input v-model="form.place_name" autocomplete="off"></el-input>
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
        <el-form-item label="场地照片" :label-width="formLabelWidth">
          <el-upload
            :action="uploadURL"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            style="position: relative; "
            :limit="1"
          >
            <i style="position:static; transform:translate(0px, 11px)" class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPlace('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import PlaceItem from "./PlaceItem.vue";
import { addPlaceRequest, setencePlaceDuplicatedRequest } from "network/place";
import mixin from "../addPlaceImageMixin";
export default {
  components: {
    PlaceItem,
  },
  mixins: [mixin],
  props: {
    places: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("场地名不能为空"));
      } else {
        setencePlaceDuplicatedRequest(value).then((res) => {
          if (res.data) {
            return callback(new Error("该场地名已存在"));
          } else {
            callback();
          }
        });
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
      dialogFormVisible: false,
      form: {
        place_name: "",
        place_info: "",
      },
      formLabelWidth: "120px",
      rules: {
        place_name: [{ validator: checkName, trigger: "blur" }],
        place_info: [{ validator: checkInfo, trigger: "blur" }],
      },
      img_no: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      uploadURL:'/uploadServlet'
    };
  },
  methods: {
    submitPlace(formName) {
      this.$refs[formName].validate((valid) => {
        // 前端格式验证通过
        if (valid) {
          this.addPlace(this.form);
        } else {
          this.$message.error("信息填写错误");
          return false;
        }
      });
    },
    addPlace({place_name, place_info}) {
      addPlaceRequest({
        place_name,
        place_info,
        image: {
          img_no: this.img_no
        }
      }).then(
        (res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: res.info,
            });
            this.dialogFormVisible = false;
            this.img_no = 0;
            this.form.place_name = "";
            this.form.place_info = "";
            this.$emit("add-place", res.data);
          } else {
            this.$message.error(res.info);
          }
        },
        (res) => {
          console.log(res);
          this.$message.error("添加场地异常");
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
.place-list {
  flex-wrap: wrap;
}
</style>