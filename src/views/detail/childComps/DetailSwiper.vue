<template>
  <SwiperRouter class="detail-swiper">
    <SwiperItem v-for="item of topImages" :key="item">
      <img :src="item" alt="" />
    </SwiperItem>
  </SwiperRouter>
</template>
<script>
// 详情的轮播图
import { SwiperRouter, SwiperItem } from 'components/common/swiper';
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SwiperRouter,
    SwiperItem,
  },
};
</script>
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
