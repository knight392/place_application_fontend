<template>
  <div class="container">
    <div
      class="infinite-list-wrapper"
      style="overflow: auto"
      v-infinite-scroll="load"
    >
      <!-- 骨架屏 -->
      <el-skeleton
        style="width: 100%"
        :rows="6"
        animated
        :throttle="500"
        :loading="!inited"
      />
      <!-- 空状态 -->
      <el-empty v-if="empty" :description="emptyDesc"></el-empty>
      <!-- 内容 -->
      <el-timeline v-if="inited" style="margin: 10px">
        <el-timeline-item
          v-for="item in taskList"
          :key="item.task_no"
          type="primary"
          :timestamp="`${tiemstampLabel}：${
            taskType == 'finished'
              ? item.finished_time.slice(0, -2)
              : item.generate_time.slice(0, -2)
          }`"
          placement="top"
        >
          <task-card :btn-text="btnText" :task="item" />
        </el-timeline-item>
      </el-timeline>
      <p class="load-tip loading-tip" v-if="inited && loading">
        加载中
        <i class="el-icon-loading"></i>
      </p>
      <p class="load-tip nomore-tip" v-if="inited && noMore">没有更多了</p>
    </div>
    <!-- 刷新按钮 -->
     <el-tooltip  class="refresh-btn" effect="dark" content="刷新任务" placement="left">
       <el-button
      type="primary"
      icon="el-icon-refresh"
      circle
      @click="refresh"
    ></el-button>
    </el-tooltip>
   
  </div>
</template>

<script>
import { getTodoTasksRequest, getFinishedTasksRequest } from "network/task";
import TaskCard from "./TaskCard";

export default {
  components: {
    TaskCard,
  },
  props: {
    teacher_no: {
      type: String,
      require: true,
    },
    taskType: {
      type: String,
      default: "finished",
    },
    tiemstampLabel: {
      type: String,
      default: "完成时间",
    },
    btnText: {
      type: String,
      default: "查看详情",
    },
    emptyDesc: {
      type: String,
      default: "任务为空",
    },
  },
  data() {
    return {
      inited: false,
      loading: false,
      noMore: false,
      empty: false,
      taskList: [],
    };
  },
  computed: {
    // 是否可以加载新数据
    disabled() {
      return this.empty || this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      console.log("加载");
      if (this.disabled) {
        return;
      }
      if (this.taskList.length == 0) {
        // 初始化任务
        this.getTasks(0);
      } else {
        // 加载更多
        // 找到最后一个任务 的 task_no
        const last_task_no = this.taskList[this.taskList.length - 1].task_no;
        this.getTasks(last_task_no);
      }
    },
    /**
     * 获取待审批数据
     */
    getTasks(task_no) {
      this.loading = true;
      setTimeout(() => {
        if (this.taskType === "finished") {
          getFinishedTasksRequest(this.teacher_no, task_no)
            .then((res) => {
              // 处理结果
              this.handleData(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
              this.inited = true;
            });
        } else if (this.taskType == "todo") {
          getTodoTasksRequest(this.teacher_no, task_no)
            .then((res) => {
              // 处理结果
              this.handleData(res);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
              this.inited = true;
            });
        }
      }, 100);
    },

    /**
     * 处理响应结果
     */
    handleData(res) {
      if (res.status == 200) {
        if (res.data != null) {
          // 有数据则添加
          this.taskList.push(...res.data);
          // 数据小于5个，没有更多
          if (res.data.length < 5) {
            this.noMore = true;
          }
        } else {
          if (this.taskList.length == 0) {
            // 无数据则设置为空,只有在第一次加载后数据为空执行，后面不会再执行
            this.empty = true;
          } else {
            // 当最后一次加载恰好是5条时，需要再加载一次
            this.noMore = true;
          }
        }
      } else {
        console.log(res.info);
      }
    },

    /**
     *  清空重置数据，给外部调用，可以重新加载里面的数据
     */
    refresh() {
      this.inited = false;
      this.loading = false;
      this.noMore = false;
      this.empty = false;
      this.taskList = [];
      console.log("刷新");
      if (this.load) {
        this.load();
      }
    },
  },
  // 创建实例后
  created() {},
};
</script>

<style  scoped>
.container{
  position: relative;
}
.infinite-list-wrapper {
  box-sizing: border-box;
  height: 70vh;
  background-color: var(--color-background-main);
}
.infinite-list-item {
  height: 40px;
}
.load-tip {
  line-height: 40px;
  width: 100%;
  text-align: center;
}
.loading-tip {
  position: sticky;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
}

.refresh-btn {
  position: absolute;
  right: 40px;
  bottom: 30px;
}
</style>