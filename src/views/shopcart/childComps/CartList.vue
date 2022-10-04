<template>
  <div class="cart-list">
    <ScrollRouter class="content" ref="scroll">
      <CartListItem v-for="item of cartList" :key="item.iid" :product="item" />
    </ScrollRouter>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

// 引入封装好的滚动组件
import ScrollRouter from 'components/common/scroll/ScrollRouter';
import CartListItem from './CartListItem.vue';

export default {
  name: 'CartList',
  components: {
    ScrollRouter,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    // 在重新进入购物车界面的时候刷新可滚动区域的高度，避免用户新添加商品后，高度刷新不及时而导致卡顿
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
