<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="detailNav" />
    <ScrollRouter
      class="centent"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
    >
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <DetailParamInfo :paramInfo="paramInfo" ref="param" />
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
      <GoodsList ref="recommend" :list="recommends" />
    </ScrollRouter>
    <DetailBottomBar @addCart="addToCart" />
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
// 引入详情页的导航栏组件
import DetailNavBar from './childComps/DetailNavBar.vue';
//引入顶部轮播图组件
import DetailSwiper from './childComps/DetailSwiper.vue';
// 引入展示商品基础信息的组件
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
// 引入展示店铺信息的组件
import DetailShopInfo from './childComps/DetailShopInfo.vue';
// 引入商品的详细信息
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
// 引入商品的参数信息
import DetailParamInfo from './childComps/DetailParamInfo.vue';
// 引入商品的评论信息
import DetailCommentInfo from './childComps/DetailCommentInfo';
// 引入底部的工具栏组件
import DetailBottomBar from './childComps/DetailBottomBar';

// 引入滚动组件
import ScrollRouter from 'components/common/scroll/ScrollRouter';
// 商品展示(用于展示推荐商品的)
import GoodsList from 'components/content/goods/GoodsList';

// 引入数据请求的方法和类
import {
  getDetail,
  Goods,
  getRecommend,
  Shop,
  GoodsParam,
} from 'network/detail';
// 引入混入中的全局事件监听的对象和回到顶部对象
import { itemListenerMixin, backTopMixin } from 'common/mixin';
// 引入防抖函数
import { debounce } from 'common/utils';
// 引入一些常量
import { TOP_DISTANCE } from 'common/const';

import { mapActions } from 'vuex';

export default {
  name: 'DetailRouter',
  data() {
    return {
      iid: null,
      topImages: [], // 顶部的轮播图片数据
      goods: {}, // 是一个保存商品信息的整合对象
      shop: {}, // 保存店铺信息的整合对象
      detailInfo: {}, // 保存商品详细信息
      paramInfo: {}, // 保存参数信息的对象
      commentInfo: {}, // 保存评论数据
      recommends: [], // 推荐数据
      themeTopYs: [-44], // 每个主题的顶部在可滚动区域的Y值(内部保存的值是正值)
      getThemeTopY: null, // 保存获取主题offsetTop的防抖函数
      currentIndex: 0, // 记录当前的主题的index
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    ...mapActions(['addCart']),
    // 监听商品图片是否加载完的自定义事件(DetailGoodsInfo组件触发)
    imageLoad() {
      // 重置一下可滚动的高度
      this.newRefresh(); // 混入中获得的被debounce包裹的刷新可滚动页面高度的函数
      this.getThemeTopY(); // 保存获取主题offsetTop的防抖函数
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index] - 44), 500);
    },
    contentScroll(position) {
      // 1、获取滚动的Y值
      const positinY = -position.y;

      // 2、positionY和主题中的值进行对比
      // 遍历出每个主题的Y值
      let n = this.themeTopYs.length;
      // 方法二，在数组的末尾加上无穷大，然后少遍历一位
      for (let i = 0; i < n - 1; i++) {
        if (this.currentIndex !== i) {
          if (
            // 判断区间
            positinY >= this.themeTopYs[i] - 44 &&
            positinY < this.themeTopYs[i + 1] - 44
          ) {
            // 将currentIndex的值更新用作判断
            this.currentIndex = i;
            // 将currentIndex的值赋值给DetailNavBar组件的currentIndex,用于改变导航栏的高亮
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }
        }
      }

      /* 
      // 方法一：普通写法，不给数组的末尾添加无限大的值，分两种情况去判断
      for (let i = 0; i < n; i++) {
        // 先判断是否一致，不一致再进入下一个判断
        if (this.currentIndex !== i) {
          // 第一个条件防止过于频繁的的执行赋值和后续的判断
          if (i < n - 1) {
            if (
              // 判断区间
              positinY >= this.themeTopYs[i] - 44 &&
              positinY < this.themeTopYs[i + 1] - 44
            ) {
              // 将currentIndex的值更新用作判断
              this.currentIndex = i;
              // 将currentIndex的值赋值给DetailNavBar组件的currentIndex,用于改变导航栏的高亮
              this.$refs.detailNav.currentIndex = this.currentIndex;
            }
          } else if (i === n - 1) {
            if (positinY >= this.themeTopYs[i] - 44) {
              this.currentIndex = i;
              this.$refs.detailNav.currentIndex = this.currentIndex;
            }
          }
        }
      } */

      // 3、是否显示回到顶部
      // 1、判断BackTop是否显示，向下滚动为负数
      this.isShowBackTop = -position.y > TOP_DISTANCE;
    },
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {};
      // 商品的图片，取轮播图的第一张
      product.image = this.topImages[0];
      // 商品的介绍，是商品信息对象中的title
      product.title = this.goods.title;
      // 商品的描述信息，是商品信息对象中的desc
      product.desc = this.goods.desc;
      // 商品的真实价格
      product.price = this.goods.realPrice;
      // 商品的唯一标识
      product.iid = this.iid;

      // 2、将商品添加到购物车界面
      // 将商品信息添加到vuex中state的cartList中去
      // 在vuex中做完某些操作想让发起者知道，可以使用返回一个Promise对象(store/index.js  文件的action中的addCart方法)
      // mapActions mapMutations mapState mapGetters 映射操作
      this.addCart(product).then((response) => {
        this.$toast.show(response);
      });
      // 不映射的写法
      /* this.$store.dispatch('addCart', product).then((response) => {
        console.log(response);
      }); */
    },
  },
  created() {
    // 1、保存转入的iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求数据
    getDetail(this.iid).then((response) => {
      // 0、获取数据
      const data = response.result;
      // 1、获取顶部的轮播图片数据
      this.topImages = data.itemInfo.topImages;
      // 2、获取商品信息的对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5、获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.保存评论数据
      if (data.rate.list) this.commentInfo = data.rate.list[0];

      /* this.$nextTick(() => {
        // 根据最新的数据，DOM已经渲染并挂载了
        // 但是图片依然是没有加载完的
        // offsetTop的值不对，大部分原因是因为图片还未加载完
        this.themeTopYs = [-44];
        // 获取每个主题的offsetTop,并添加到themeTopYs中去
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      }); */
    });

    // 3、请求推荐数据
    getRecommend().then((response) => {
      this.recommends = response.data.list;
    });

    // 4、给getThemeTopY 进行赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [-44];
      // 获取每个主题的offsetTop,并添加到themeTopYs中去
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  destroyed() {
    // 销毁组件的时候取消对全局事件总线的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,
    DetailCommentInfo,
    GoodsList,
    ScrollRouter,
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  /* 为了盖住tabbar选项卡组件，给整个DetailRouter组件添加相对定位，层级和背景颜色 */
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.centent {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
