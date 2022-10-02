<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl
      @tabClick="tabClick"
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <ScrollRouter
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <HomeRecommmendView :recommends="recommends" />
      <HomeFeatureView />
      <TabControl
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
      />
      <GoodsList :list="showGoods" />
    </ScrollRouter>

    <!-- 监听组件的原生事件在vue2中可以在后面加上  .native -->
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
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
// 引入封装好的滚动组件
import ScrollRouter from 'components/common/scroll/ScrollRouter';
// 引入回到顶部的组件
import BackTop from 'components/content/backTop/BackTop';

// 引入封装home中网络请求的组件
import { getHomeMultidata, getHomeGoods } from 'network/home';
// 引入debounce防抖函数
import { debounce } from 'common/utils';

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
    ScrollRouter,
    BackTop,
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
      currentType: 'pop', // 保存当前所展示的选项卡
      isShowBackTop: false, // 回到顶部组件是否展示
      taboffsetTop: 0, // tabControl应该固定的位置，用于保存tabControl组件的offsetTop属性
      isTabFixed: false, // tabControl是否应该吸顶
      saveY: 0, // 保存离开home组件的时候滚动停留的位置
    };
  },
  methods: {
    // 事件监听的方法

    // 切换选项卡
    tabClick(index) {
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
      // 让两个tabControl的展示的选项一样
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回到顶部
    backClick() {
      // 在组件的$refs上可以访问到注册过的scroll拿到组件实例对象，然后访问这个实例上的方法scrollTo(滚动到的位置)
      // 参数，滚动的终点的x，y坐标，以及滚动的时间
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听滚动事件，判断回到顶部按钮是否展示是,自定义事件获取数据，$emit('scroll',传递数据)
    contentScroll(position) {
      // 1、判断BackTop是否显示，向下滚动为负数
      this.isShowBackTop = -position.y > 1000;
      // 2、决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    // 监听滚动事件(自定义事件)
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 监听轮播图组件的图片是否加载完毕(自定义事件)
    swiperImageLoad() {
      // 获取tabControl的offsetTop属性
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
      getHomeGoods(type, page).then((response) => {
        // 把请求到的商品数据push到list中去
        this.goods[type].list.push(...response.data.list);
        // 把页码的数值加1
        this.goods[type].page++;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
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
  mounted() {
    // 监听给$bus 绑定监听item图片加载完成的自定义事件
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on('itemimageLoad', () => {
      refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    // 组件活跃，进入组件
    // 调用滚动对象中的scrollTo回到离开时的位置(saveY)
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 回来之后要进行一次刷新，防止一些小bug
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开组件  将离开组件时组件中滚动所在的位置保存到saveY中去
    this.saveY = this.$refs.scroll.scrollY;
  },
};
</script>
<style scoped>
#home {
  /* 因为主页导航栏是固定定位，且优先级很高，就会遮住下面的盒子，所以给一个上内边距44(导航栏的高度) */
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  /* 设置背景颜色，直接使用css中定义好的变量 */
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时为了让导航栏不一起滚动而设置固定定位
  但使用better-scroll之后就不需要了 */
  /*  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  /* 确定滚动窗口的大小，第一种方式使用相对定位 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  第二种方式，使用css3计算方式，父级盒子的100% 减去上面盒子的高再减去下面盒子的高
  height: calc(100% - 93px);
  margin-top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
