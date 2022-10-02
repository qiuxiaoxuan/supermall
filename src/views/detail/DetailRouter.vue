<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <DetailSwiper :top-images="topImages" />
    <DetailBaseInfo :goods="goods" />
    <DetailShopInfo :shop="shop" />
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

// 引入封装数据请求的方法
import { getDetial, Goods, Shop } from 'network/detail';

export default {
  name: 'DetailRouter',
  data() {
    return {
      iid: null,
      topImages: [], // 顶部的轮播图片数据
      goods: {}, // 是一个保存商品信息的整合对象
      shop: {}, // 保存店铺信息的整合对象
    };
  },
  created() {
    // 1、保存转入的iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求数据
    getDetial(this.iid).then((response) => {
      console.log(response);
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
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
};
</script>
