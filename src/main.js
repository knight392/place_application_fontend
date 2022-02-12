import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import eChartFn from './components/chart/index.js'
import ChartPanel from './components/chart/index.vue'

// 注册 charView 全局组件
Vue.component(ChartPanel.name, ChartPanel)
Vue.prototype.$echartFn = eChartFn

Vue.use(ElementUI)
// 原型方式创建事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
