// vue  自定义插件，是对vue的个性化扩展
import ToastRouter from './ToastRouter';
const obj = {};
obj.install = function (Vue) {
  // 1、创建组件构造器
  const toastContrustor = Vue.extend(ToastRouter);
  // 2、new 的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();
  // 3、将组件对象手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  // 4、toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};
export default obj;
