// 引入Vue
import Vue from 'vue';
// 引入VueRouter
import VueRouter from 'vue-router';

// 路由组件的懒加载引入
// 配好路径别名后的使用方式
const HomeRouter = () => import('views/home/HomeRouter');
const CategoryRouter = () => import('views/category/CategoryRouter');
const ShopcartRouter = () => import('views/shopcart/ShopcartRouter');
const ProfileRouter = () => import('views/profile/ProfileRouter');
// 安装VueRouter
Vue.use(VueRouter);

// 因为在使用$router.push 和$router.replace 的时候，重复点击同一路由的时候回报错，就需要一下代码重写这两个方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  // 重写push方法在挂到原型对象上去
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  // 重写replace方法在挂到原型对象上去
  return originalReplace.call(this, location).catch((err) => err);
};

// 配置路由关系表
const routes = [
  {
    // 重定向，默认展示的路由
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomeRouter,
  },
  {
    path: '/category',
    component: CategoryRouter,
  },
  {
    path: '/shopcart',
    component: ShopcartRouter,
  },
  {
    path: '/profile',
    component: ProfileRouter,
  },
];
// 创建并暴露路由router
export default new VueRouter({
  mode: 'history', // 路由的工作方式为history模式
  routes, // 引入路由表
});
