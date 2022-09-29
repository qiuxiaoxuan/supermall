<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  background-color: #f2f2f2;
  /* 使用固定定位，将其放置到页面的底部 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 设置阴影 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
</style>
