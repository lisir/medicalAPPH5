// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import $ from 'jquery'
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
Vue.use(YDUI);
import dateFns from 'date-fns';
Vue.prototype.dateFns = dateFns;

Vue.prototype.path = "http://172.30.128.39:8090/";
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});
// Vue.prototype.token = "9f6fab5da62a4985b96c217761ca9c6d";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
