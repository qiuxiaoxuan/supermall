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
const DetailRouter = () => import('views/detail/DetailRouter');
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
    meta: { title: '主页' },
  },
  {
    path: '/home',
    component: HomeRouter,
    meta: { title: '主页' },
  },
  {
    path: '/category',
    component: CategoryRouter,
    meta: { title: '分类' },
  },
  {
    path: '/shopcart',
    component: ShopcartRouter,
    meta: { title: '购物车' },
  },
  {
    path: '/profile',
    component: ProfileRouter,
    meta: { title: '我的' },
  },
  {
    path: '/detail/:iid',
    component: DetailRouter,
    meta: { title: '详情' },
  },
];
// 创建路由router
const router = new VueRouter({
  mode: 'history', // 路由的工作方式为history模式
  routes, // 引入路由表
});
// 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to) => {
  // 在切换组件的时候更换title
  document.title = to.meta.title || '购物商城';
});
export default router;
