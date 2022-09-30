<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners" />
    <HomeRecommmendView :recommends="recommends" />
    <HomeFeatureView />

    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>
<script>
// 主页_home
// 引入封装好的NavBar_导航栏组件
import NavBar from 'components/common/navbar/NavBar';
// 引入封装home中网络请求的组件
import { getHomeMultidata } from 'network/home';
// 引入home轮播图子组件
import HomeSwiper from './childComps/HomeSwiper.vue';
// 导入主页推荐视图子组件
import HomeRecommmendView from './childComps/HomeRecommendView.vue';
//
import HomeFeatureView from './childComps/HomeFeatureView.vue';

export default {
  name: 'HomeRouter',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommmendView,
    HomeFeatureView,
  },
  data() {
    return {
      // 创建一个变量用于保存请求过来的数据
      banners: [], // 给轮播图的
      recommends: [], // 给主页推荐的
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
#home {
  /* 因为主页导航栏是固定定位，且优先级很高，就会遮住下面的盒子，所以给一个上内边距44(导航栏的高度) */
  padding-top: 44px;
}
.home-nav {
  /* 设置背景颜色，直接使用css中定义好的变量 */
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>
