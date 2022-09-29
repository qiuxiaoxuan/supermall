<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners" />
  </div>
</template>
<script>
// 引入封装好的NavBar_导航栏组件
import NavBar from 'components/common/navbar/NavBar';
// 引入封装home中网络请求的组件
import { getHomeMultidata } from 'network/home';
// 引入home轮播图子组件
import HomeSwiper from './childComps/HomeSwiper.vue';

export default {
  name: 'HomeRouter',
  components: {
    NavBar,
    HomeSwiper,
  },
  data() {
    return {
      // 创建一个变量用于保存请求过来的数据
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1、请求多个数据
    // 加小括号调用函数，因为最终是封装的axios，所以可以直接使用 .then 和.catch 方法
    getHomeMultidata().then((response) => {
      // 在生命周期中的this是vm实例，将请求到的数据保存到data中的数据中去
      // 用一个不会被回收的变量引用了请求到的数据对象，防止在函数执行结束后response被回收而没有变量引用数据对象，使得数据对象被回收
      this.banners = response.data.banner.list;
      this.recommends = response.data.recommend.list;
    });
  },
};
</script>
<style scoped>
.home-nav {
  /* 设置背景颜色，直接使用css中定义好的变量 */
  background-color: var(--color-tint);
  color: #fff;
}
</style>
