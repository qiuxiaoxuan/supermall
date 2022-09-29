import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [];
export default new VueRouter({
  mode: 'history', // 路由的工作方式为history模式
  routes,
});
