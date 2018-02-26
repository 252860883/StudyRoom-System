// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// // 按需加载element
// import {Select,Option,DatePicker,} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(DatePicker);

import element from 'element-ui';
Vue.use(element);

import DinosaurUI from 'dinosaur-ui';
Vue.use(DinosaurUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
