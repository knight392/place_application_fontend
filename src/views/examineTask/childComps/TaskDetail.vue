<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="审批详情" />
    </el-header>
    <el-main class="main">
      <!-- 再审标签 -->
      <el-tag class="reSentenceTag" effect="plain" type="warning"  v-if="task.is_reSentence == 1 && result == '待审批'">再审</el-tag>

      <!-- 申请人 -->
      <div class="field">
        <div class="title">申请人</div>
        <div class="content">
          <text-row label="姓名" :value="stu.s_name" />
          <text-row label="学号" :value="stu.s_no" />
          <text-row label="学院" :value="stu.s_dwmc" />
        </div>
      </div>
      <!-- 申请信息 -->
      <div class="field">
        <div class="title">申请内容</div>
        <div class="content">
          <text-row label="场地名" :value="placeName" />
          <text-row label="开始时间" :value="beginTime" />
          <text-row label="结束时间" :value="endTime" />
          <text-row label="申请目的" :value="apl.purpose" />
          <text-row label="申请组织" :value="apl.org_name" />
          <text-row label="联系电话" :value="apl.s_phone" />
        </div>
      </div>
      <!-- 审批操作按钮 -->
      <div class="option-box" v-if="result === '待审批'">
        <el-popconfirm
          @confirm="approve"
          confirm-button-text="是的"
          cancel-button-text="不了"
          title="确定要通过该申请吗？"
        >
          <el-button type="success" class="btn" slot="reference"
            >通过</el-button
          >
        </el-popconfirm>

        <el-button
          type="warning"
          @click="rewriteDialogVisible = true"
          class="btn"
          >打回</el-button
        >
        <el-button type="danger" @click="refuseDialogVisible = true" class="btn"
          >拒绝</el-button
        >
      </div>

      <!-- 审批结果 -->
      <div class="field" v-if="result != '待审批'">
        <div class="title">审批结果</div>
        <div class="content">
          <text-row label="审批结果" :value="status" :valueColor="fontColor" />
          <text-row
            v-if="result === '已打回'"
            label="打回原因"
            :value="task.refuse_reason"
          />
          <text-row
            v-if="result === '已拒绝'"
            label="拒绝原因"
            :value="task.refuse_reason"
          />
        </div>
      </div>

      <!-- 填写打回理由对话框 -->
      <el-dialog title="打回原因" :visible.sync="rewriteDialogVisible">
        <el-form :model="rewriteReason" ref="rewriteForm" :rules="rewriteRules">
          <el-form-item prop="value">
            <el-input
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="输入打回原因（60字以内）"
              v-model="rewriteReason.value"
              autocomplete="off"
              size="medium"
              show-word-limit
              maxlength="60"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="rewriteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitRewriteForm">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 填写拒绝理由对话框 -->
      <el-dialog title="拒绝原因" :visible.sync="refuseDialogVisible">
        <el-form :model="refuseReason" ref="refuseForm" :rules="refuseRules">
          <el-form-item prop="value">
            <el-input
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="输入拒绝原因（60字以内）"
              v-model="refuseReason.value"
              autocomplete="off"
              size="medium"
              show-word-limit
              maxlength="60"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="refuseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitRefuseForm">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 审批成功结果面板 -->
      <transition name="el-fade-in-liner">
        <div class="success-pane" v-show="showSuccessResult">
          <el-result
            class="result"
            icon="success"
            title="审批成功"
            :subTitle="secondInfo"
          >
            <template slot="extra">
              <el-button type="primary" size="medium" @click="goBackRefresh">返回</el-button>
            </template>
          </el-result>
        </div>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import TextRow from "./TextRow.vue";
import { sentenceTaskRequest } from "network/task.js";
export default {
  components: { TextRow },
  props: {
    task: {
      type: Object,
      require: true,
    },
  },
  data() {
    var validateRewriteReason = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入打回原因"));
      } else {
        // 验证成功
        callback();
      }
    };
    var validateRefuseReason = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入拒绝原因"));
      } else {
        // 验证成功
        callback();
      }
    };
    return {
      rewriteDialogVisible: false,
      refuseDialogVisible: false,
      rewriteReason: {
        value: "",
      },
      refuseReason: {
        value: "",
      },
      rewriteRules: {
        value: [{ validator: validateRewriteReason, trigger: "blur" }],
      },
      refuseRules: {
        value: [{ validator: validateRefuseReason, trigger: "blur" }],
      },
      second: 3,
      showSuccessResult: false,
      timer: null,
    };
  },
  computed: {
    stu() {
      return this.task.placeApplication.student;
    },
    beginTime() {
      return this.task.placeApplication.begin_time.slice(0, -5);
    },
    endTime() {
      return this.task.placeApplication.end_time.slice(0, -5);
    },
    placeName() {
      return this.task.placeApplication.place.place_name;
    },
    apl() {
      return this.task.placeApplication;
    },
    secondInfo(){
      return this.second + "s 后返回上一页"
    },
    // 审批结果
    result() {
      let res = "";
      const a = this.task.is_finished;
      if (a == 0) {
        res = "待审批";
      } else if (a == 1) {
        res = "已通过";
      } else if (a == 2) {
        res = "已打回";
      } else if (a == 3) {
        res = "已拒绝";
      } else if (a == 4) {
        res = '已中断'
      }
      return res;
    },
    status() {
      if(this.task.is_reSentence){
        return `${this.result} (再审)`
      }
      return this.result
    },
    fontColor() {
      let color = "";
      const a = this.task.is_finished;
      if (a == 1) {
        color = "#67C23A"; // 绿
      } else if (a == 2) {
        color = "#E6A23C"; // 黄
      } else if (a == 3 || a == 4) {
        color = "#F56C6C"; // 红
      }
      return color;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 通过申请
    approve() {
      console.log("提交");
      sentenceTaskRequest(this.task.task_no, 1)
        .then((res) => {
          this.handleReponse(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 打回
    rewrite() {
      sentenceTaskRequest(this.task.task_no, 2, this.rewriteReason.value)
        .then((res) => {
          this.handleReponse(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 拒绝
    refuse() {
      sentenceTaskRequest(this.task.task_no, 3, this.refuseReason.value)
        .then((res) => {
          this.handleReponse(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 提交打回表单
    submitRewriteForm() {
      this.$refs.rewriteForm.validate((valid) => {
        if (valid) {
          this.rewrite();
        } else {
          return false;
        }
      });
    },

    // 提交拒绝表单
    submitRefuseForm() {
      this.$refs.refuseForm.validate((valid) => {
        if (valid) {
          this.refuse();
        } else {
          return false;
        }
      });
    },

    // 处理请求结果
    handleReponse(res) {
      if (res.status == 200) {
        this.refuseDialogVisible = false;
        this.rewriteDialogVisible = false;
        this.showSuccessResult = true;
        this.showSuccess()
        // 审批成功提示（结果板块）， 返回上层
      } else {
        // 审批失败提示
        this.$message.error("审批失败");
      }
    },
    // 展示成功面板
    showSuccess(){
      this.timer = setTimeout(()=>{
        this.second = this.second - 1;
        if(this.second == 0){
          this.goBackRefresh()
        }else{
          this.showSuccess()
        }
      }, 1000)
    },

    // 返回上一页并刷新页面
    goBackRefresh(){
      clearTimeout(this.timer)
      this.$bus.$emit("refresh")
      this.goBack()
    }
  },
};
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 72vh;
  overflow: auto;
  background-color: var(--color-background-main);
}
.field {
  padding: 10px;
}
.field .title {
  line-height: 45px;
}
.field .content {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.option-box {
  padding: 10px;
}
.option-box .btn {
  margin-right: 20px;
}

.success-pane {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
}
.success-pane .result{
  position: absolute;
  left:40%;
  top: 35%;
  transform: translate(-50%, -50%);
}

.reSentenceTag{
  position: absolute;
  right:30px;
  top:20px;
}
</style>