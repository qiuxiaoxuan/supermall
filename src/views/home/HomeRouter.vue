<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners" />
    <HomeRecommmendView :recommends="recommends" />
    <HomeFeatureView />
    <TabControl
      class="tab-control"
      @tabClick="tabClick"
      :titles="['流行', '新款', '精选']"
    />
    <GoodsList :list="showGoods" />
  </div>
</template>
<script>
// 主页_home

// 引入封装好的NavBar_导航栏组件
import NavBar from 'components/common/navbar/NavBar';
// 引入封装好的选项卡组件
import TabControl from 'components/content/tabControl/TabControl';
// 引入封装好的商品展示列表
import GoodsList from 'components/content/goods/GoodsList';

// 引入封装home中网络请求的组件
import { getHomeMultidata, getHomeGoods } from 'network/home';

// 引入home轮播图子组件
import HomeSwiper from './childComps/HomeSwiper.vue';
// 导入主页推荐视图子组件
import HomeRecommmendView from './childComps/HomeRecommendView.vue';
// 导入主页特性视图子组件
import HomeFeatureView from './childComps/HomeFeatureView.vue';

export default {
  name: 'HomeRouter',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommmendView,
    HomeFeatureView,
  },
  data() {
    return {
      // 创建一个变量用于保存请求过来的数据
      banners: [], // 给轮播图的
      recommends: [], // 给主页推荐的
      goods: {
        // 用于保存商品的数据，为了更好的用户体验，数据的加载是分段式的(page来指定)，list指示一共有多少商品数据了
        // 为了更好的处理数据和页面展示，设计了如下的数据结构
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
    };
  },
  methods: {
    // 事件监听的方法
    tabClick(index) {
      console.log(index);
      // 因为不是数组，所以只能用Switch判断语句
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      // 加小括号调用从network/home中引入的函数，因为是最开始封装的axios，所以可以直接使用 .then 和.catch 方法
      getHomeMultidata().then((response) => {
        // 在生命周期中的this是vm实例，将请求到的数据保存到data中的数据中去
        // 用一个不会被回收的变量引用了请求到的数据对象，防止在函数执行结束后response被回收而没有变量引用数据对象，使得数据对象被回收
        this.banners = response.data.banner.list;
        this.recommends = response.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 因为每次请求数据的时候，都会在上一次的基础上再请求30条数据，也就是page要加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((response) => {
          // 把请求到的商品数据push到list中去
          this.goods[type].list.push(...response.data.list);
          // 把页码的数值加1
          this.goods[type].page++;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // 在生命周期钩子中最好只是告诉别人你要做什么，具体的实现逻辑可以放到methods的方法中去实现
    // 而且封装之后可以实现代码的复用
    // 1、请求多个数据
    this.getHomeMultidata();
    // 2、分别请求不同类型的商品的数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
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
.tab-control {
  /* 粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素。 */
  /* 就是在没有到指定的定位的位置时是sticky属性，在到达指定位置后转变为fixed属性，兼容性不好 */
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
