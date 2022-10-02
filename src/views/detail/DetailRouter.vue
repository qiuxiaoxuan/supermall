<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" />
    <ScrollRouter class="centent" ref="scroll">
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <DetailParamInfo :paramInfo="paramInfo" />
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
    </ScrollRouter>
  </div>
</template>
<script>
// 引入详情页的导航栏组件
import DetailNavBar from './childComps/DetailNavBar.vue';
//引入顶部轮播图组件
import DetailSwiper from './childComps/DetailSwiper.vue';
// 引入展示商品信息的组件
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
// 引入展示店铺信息的组件
import DetailShopInfo from './childComps/DetailShopInfo.vue';
// 引入商品的详细信息
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
// 引入商品的参数信息
import DetailParamInfo from './childComps/DetailParamInfo.vue';
// 引入商品的评论信息
import DetailCommentInfo from './childComps/DetailCommentInfo';

// 引入滚动组件
import ScrollRouter from 'components/common/scroll/ScrollRouter';

// 引入封装数据请求的方法
import { getDetial, Goods, Shop, GoodsParam } from 'network/detail';

export default {
  name: 'DetailRouter',
  data() {
    return {
      iid: null,
      topImages: [], // 顶部的轮播图片数据
      goods: {}, // 是一个保存商品信息的整合对象
      shop: {}, // 保存店铺信息的整合对象
      detailInfo: {}, // 保存店铺信息下方的商品详细信息
      paramInfo: {}, // 保存参数信息的对象
      commentInfo: {}, // 保存评论数据
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
  created() {
    // 1、保存转入的iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求数据
    getDetial(this.iid).then((response) => {
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
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
  height: calc(100% - 44px);
}
</style>
