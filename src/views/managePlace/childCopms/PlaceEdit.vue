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
          <el-input
            v-model="form.place_name"
            autocomplete="off"
            :readonly="!updateAble"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-tag v-if="updateAble" type="danger" size="small">{{
            status
          }}</el-tag>
          <el-tag v-else size="small">{{ status }}</el-tag>
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
            :readonly="!updateAble"
          ></el-input>
        </el-form-item>
        <el-form-item label="场地照片" :label-width="formLabelWidth">
          <el-upload
            :action="uploadURL"
            list-type="picture-card"
            :file-list="imgList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            style="position: relative"
            :limit="1"
            :disabled="!updateAble"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button
            class="submit-btn"
            type="primary"
            @click="submitPlace('form')"
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
  updatePlaceRequest,
  setencePlaceDuplicatedRequest,
} from 'network/place'
import { getAllTeachersRequest } from 'network/teacher'
import { baseURL } from "network/request.js";

export default {
  props: {
    initPlace: {
      type: Object,
      required: true,
    },
  },

  created() {
    // 判断有没有传入
    this.place = this.initPlace
    if (this.place) {
      // 保存本地
      sessionStorage.setItem('place', JSON.stringify(this.place))
    } else {
      // 本地提取
      try {
        const p = JSON.parse(sessionStorage.getItem('place'))
        if (!p) {
          throw null
        }
        this.place = p
      } catch (e) {
        this.$router.replace({ path: '/wrongPage' })
      }
    }
    this.form = {
      place_name: this.place.place_name,
      place_info: this.place.place_info,
    }
    // 仅用来初次显示图片
    this.imgList = this.place.image ? [{ url: this.baseURL + this.place.image.path }] : []
    this.img_no = this.place.image ? this.place.image.img_no : 0
    getAllTeachersRequest().then(
      (res) => {
        if (res.status === 200) {
          this.teachers = res.data
          this.teachers.push({
            teacher_no: null,
            teacher_name: '置空',
          })
          this.loading = false
        } else {
          this.$message.error(res.info)
        }
      },
      (err) => {
        console.log(err)
        this.$message.error('网络异常')
      }
    )
  },

  computed: {
    updateAble() {
      return this.place.available === 0
    },
    status() {
      return this.place.available === 1
        ? '可申请 （不可修改场地信息）'
        : '不可申请'
    },
  },

  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('教师名不能为空'))
      } else {
        // 与原来的名称不同，才需要验证
        if (value != this.place?.place_name) {
          setencePlaceDuplicatedRequest(value).then((res) => {
            if (res.data) {
              return callback(new Error('该场地名已存在'))
            } else {
              callback()
            }
          })
        } else {
          callback()
        }
      }
    }
    var checkInfo = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入场地描述'))
      } else {
        callback()
      }
    }
    return {
      place: null,
      form: null,
      formLabelWidth: '120px',
      rules: {
        place_name: [{ validator: checkName, trigger: 'blur' }],
        place_info: [{ validator: checkInfo, trigger: 'blur' }],
      },
      teachers: [],
      loading: true,
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
      img_no: 0,
      uploadURL: '/uploadServlet',
      baseURL
    }
  },

  methods: {
    goBack() {
      this.$router.replace('/admin/placeManage')
    },
    submitPlace(formName) {
      this.$confirm('此操作将修改场地信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 确定修改
          this.$refs[formName].validate((valid) => {
            // 前端格式验证通过
            if (valid) {
              this.updatePlace()
            } else {
              this.$message.error('信息填写错误')
              return false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改',
          })
        })
    },
    updatePlace() {
      const place = {
        place_no: this.place.place_no,
        place_name: this.form.place_name,
        place_info: this.form.place_info,
        image: {
          img_no: this.img_no,
        },
      }
      updatePlaceRequest(place).then(
        (res) => {
          if (res.data) {
            this.$message({
              type: 'success',
              message: res.info,
            })
          } else {
            this.$message.error(res.info)
          }
        },
        (err) => {
          console.log(err)
          this.$message.error('教师信息更新异常')
        }
      )
    },
    handleRemove() {
      console.log('删除')
      this.img_no = 0
    },
    handlePictureCardPreview(file) {
      console.log('预览')
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response) {
      console.log('添加')
      this.img_no = response.data
    },
  },
}
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