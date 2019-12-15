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

const path = 'http://172.17.3.10:80/Topic/';
// axios.defaults.baseURL = path;

// axios.defaults.withCredentials = true; // 这行不要
axios.defaults.baseURL = path;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//导入md5包
import MD5 from 'js-md5';

Vue.prototype.$MD5 = MD5;


import URL from './util/url'

Vue.prototype.$URL = URL;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
