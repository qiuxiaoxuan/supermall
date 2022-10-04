//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';

//引入路由器
import router from './router';
// 引入vuex
import store from './store';
// 图片懒加载
import LazyLoad from 'vue-lazyload';
// 引入toast插件
import toast from 'components/common/toast';
// 安装自定义插件toast
Vue.use(toast);
// 安装懒加载插件，并配置图片未加载的背景图
Vue.use(LazyLoad, {
  loading: require('assets/img/common/placeholder.png'),
});

//关闭Vue的生产提示
Vue.config.productionTip = false;
//创建vm
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线，将vm当做全局事件总线
  },
});
