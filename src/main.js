// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false;

import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.199.169:8080/Topic/';
// axios.defaults.withCredentials = true; // 这行不要
// axios.defaults.baseURL="http://localhost:8080/Question/";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//导入md5包
import MD5 from 'js-md5';
Vue.prototype.$MD5 = MD5;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
