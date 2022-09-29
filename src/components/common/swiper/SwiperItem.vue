<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
// 轮播图中轮播的每个小片段
export default {
  name: 'SwiperItem',
};
</script>

<style scoped>
.slide {
  width: 100%;
  /*  flex-shrink指定 flex 元素的收缩规则 */
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>
