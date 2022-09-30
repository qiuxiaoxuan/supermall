<template>
  <div class="recommend">
    <div v-for="item of recommends" :key="item.acm" class="recommend-item">
      <!-- 点击图片的跳转地址 -->
      <a :href="item.link">
        <!-- 图片的获取地址 -->
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
// 主页推荐视图组件
export default {
  name: 'HomeRecommmendView',
  props: {
    recommends: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
