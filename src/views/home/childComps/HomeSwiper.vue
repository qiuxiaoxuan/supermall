<template>
  <SwiperRouter>
    <!-- 根据获取到的数据循环遍历得到每一个小的轮播项目 -->
    <!-- <SwiperItem v-for="(item, index) in banners" :key="index"> -->
    <SwiperItem v-for="item of banners" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </SwiperItem>
  </SwiperRouter>
</template>
<script>
// 主页轮播图组件
// 引入轮播图组件
import { SwiperRouter, SwiperItem } from 'components/common/swiper';
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      // 数组和对象的默认值需要设置为一个函数返回的数组或者对象
      default: () => [],
    },
  },
  components: {
    SwiperRouter,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false, // 判断是否有轮播图加载完毕,只执行一次
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    },
  },
};
</script>
