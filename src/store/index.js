import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const state =  {
  // 管理员
   admin: null,
   // 教师
   teacher: null,
   // 学生
   student: null
}
// 创建实例
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

// 导出实例
export default store