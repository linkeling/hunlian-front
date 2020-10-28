import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
// 引入antd
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(antd)
// 引入公共样式
import '../static/css/global.less'
// 引入nprogress进度条
import 'nprogress/nprogress.css'
import api from './api'
import {optionalChaining} from "./views/utils/common";
import Router from 'vue-router';
Vue.use(Router);
Vue.prototype.$api = api;
Vue.prototype.$isNot = optionalChaining; // 非空判断，为空返回 "未知"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
