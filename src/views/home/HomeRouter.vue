<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: 'HomeRouter',
  components: {
    NavBar,
  },
};
</script>
<style scoped>
.home-nav {
  /* 设置背景颜色，直接使用css中定义好的变量 */
  background-color: var(--color-tint);
  color: #fff;
}
</style>
