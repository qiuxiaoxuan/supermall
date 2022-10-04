<template>
  <!-- 因为是公用的，所以使用class不会报错 -->
  <div class="nav-bar">
    <!-- 需要对不同的插槽做布局分布，但是slot中没有class属性，所以可以在外边包一层div，再让它们去布局 -->
    <!-- 使用具名插槽，方便指定不同的替换内容 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
// 封装一个navbar 公用组件 ， navigatorBar 导航栏选项卡
export default {
  name: 'NavBar',
};
</script>
<style scoped>
/* 使用flex布局，左右固定大小，中间占据剩余部分 */
.nav-bar {
  /* 表明其内部为flex布局 */
  display: flex;
  height: 44px;
  line-height: 44px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>
