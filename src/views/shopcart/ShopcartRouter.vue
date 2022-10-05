<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>

    <!-- 购物车商品展示区 -->
    <CartList />
    <!-- 底部的汇总 -->
    <CartBottomBar />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import { mapGetters } from 'vuex';
export default {
  name: 'ShopcartRouter',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 用map
    ...mapGetters(['cartLength']),
    /*  cartLength() {// 自己去导入
      return this.$store.getters.cartLength;
    }, */
  },
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
