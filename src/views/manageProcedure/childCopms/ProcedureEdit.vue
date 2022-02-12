<template>
  <el-container>
    <el-header class="header">
      <el-page-header @back="goBack" content="流程详情信息"> </el-page-header>
    </el-header>

    <el-main class="main" v-loading="loading">
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
        <el-form-item label="包含场地" :label-width="formLabelWidth">
          <el-transfer
            v-model="places_target"
            :data="places_src"
            :titles="['可选场地', '已选场地（无序）']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            target-order="push"
          ></el-transfer>
        </el-form-item>
        <el-form-item label="包含职位" :label-width="formLabelWidth">
          <el-transfer
            v-model="positions_target"
            :data="positions_src"
            :titles="['可选职位', '已选职位（有序）']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            target-order="push"
          ></el-transfer>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button
            class="submit-btn"
            type="primary"
            @click="submitProcedure('form')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {
  updateProcedureRequest,
  setenceProcedureDuplicatedRequest,
  getApplicationsIngNumberRequest,
} from 'network/procedure'
import { getPlacesWithoutProcedureRequest } from 'network/place'
import { getPositionsWithoutProcedureRequest } from 'network/position'

export default {
  props: {
    initProcedure: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.procedure = this.initProcedure
    if (this.procedure) {
      // 保存本地
      sessionStorage.setItem('procedure', JSON.stringify(this.procedure))
    } else {
      // 本地提取
      try {
        const p = JSON.parse(sessionStorage.getItem('procedure'))
        if (!p) {
          throw null
        }
        this.procedure = p
      } catch (e) {
        this.$router.replace({ path: '/wrongPage' })
      }
    }
    this.form = {
      pro_name: this.procedure.pro_name,
      pro_form_name: this.procedure.pro_form_name,
    }
    this.places_target = this.procedure.places.map((place) => place.place_no)
    this.positions_target = this.procedure.positions.map(
      (position) => position.position_no
    )
    this.loadPlacesAndPositions().then((res) => {
      // 设置备选场地
      this.places_src = res[0].data.map((place) => {
        return {
          key: place.place_no,
          label: place.place_name,
        }
      })
      // 加入之前已选
      this.procedure.places.forEach((place) => {
        this.places_src.push({
          key: place.place_no,
          label: place.place_name,
        })
      })
      this.positions_src = res[1].data.map((position) => {
        return {
          key: position.position_no,
          label: position.position_name,
        }
      })
      // 加入之前已选
      this.procedure.positions.forEach((position) => {
        this.positions_src.push({
          key: position.position_no,
          label: position.position_name,
        })
      })
      this.loading = false
    })
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('流程名不能为空'))
      } else {
        if (value != this.procedure.pro_name) {
          setenceProcedureDuplicatedRequest({ pro_name: value }).then((res) => {
            if (res.data) {
              return callback(new Error('该流程名已存在'))
            } else {
              callback()
            }
          })
        } else {
          callback()
        }
      }
    }
    var checkFormName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入流程所对应申请表名'))
      } else {
        if (value != this.procedure.pro_form_name) {
          setenceProcedureDuplicatedRequest({ pro_form_name: value }).then(
            (res) => {
              if (res.data) {
                return callback(new Error('该申请表名已存在'))
              } else {
                callback()
              }
            }
          )
        } else {
          callback()
        }
      }
    }

    return {
      procedure: null,
      form: null,
      formLabelWidth: '120px',
      rules: {
        pro_name: [{ validator: checkName, trigger: 'blur' }],
        pro_form_name: [{ validator: checkFormName, trigger: 'blur' }],
      },
      places_src: [],
      positions_src: [],
      places_target: null,
      positions_target: null,
      loading: true,
    }
  },

  methods: {
    goBack() {
      this.$router.replace('/admin/procedureManage')
    },
    submitProcedure(formName) {
      getApplicationsIngNumberRequest(this.procedure.pro_no)
        .then((res) => {
          return new Promise(
            (resolve, reject) => {
              if (res.status == 200) {
                resolve(res.data)
              } else {
                reject()
              }
            },
            (err) => {
              console.log(err)
              this.$message.error('网络异常,请稍后重试')
            }
          )
        })
        .then((num) => {
          const info =
            num > 0
              ? `现有${num}个同学在申请该流程的场地，修改后将会中断这些申请, 是否继续?`
              : '此操作将修改申请流程，是否继续？'
          this.$confirm(info, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              // 确定修改
              this.$refs[formName].validate((valid) => {
                // 前端格式验证通过
                if (valid) {
                  this.updateProcedure(this.form)
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
        })
    },
    updateProcedure({ pro_name, pro_form_name }) {
      const positions = this.positions_target.map((position_no, index) => {
        return {
          position_no,
          pro_order: index + 1,
        }
      })
      const places = this.places_target.map((place_no) => {
        return {
          place_no,
        }
      })
      const procedure = {
        pro_no: this.procedure.pro_no,
        pro_name,
        pro_form_name,
        positions,
        places,
      }
      updateProcedureRequest(procedure).then(
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
          this.$message.error('流程信息更新异常')
        }
      )
    },
    loadPlacesAndPositions() {
      const p1 = new Promise((resolve, reject) => {
        getPlacesWithoutProcedureRequest().then((res) => {
          if (res.status == 200) {
            resolve(res)
          } else {
            reject()
          }
        })
      })
      const p2 = new Promise((resolve, reject) => {
        getPositionsWithoutProcedureRequest().then((res) => {
          if (res.status == 200) {
            resolve(res)
          } else {
            reject()
          }
        })
      })
      return Promise.all([p1, p2])
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

.procedure-tag {
  margin-right: 8px;
}
</style>