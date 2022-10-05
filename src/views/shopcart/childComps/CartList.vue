<template>
  <div class="cart-list">
    <ScrollRouter
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
    >
      <!-- 当没有商品被添加到购物车时展示 -->
      <EmptyShopcart v-if="!cartLength" />
      <CartListItem
        v-else
        v-for="item of cartList"
        :key="item.iid"
        :product="item"
      />
      <div class="bottom-recommend">
        <div class="recommend-text">~·~你可能会喜欢~·~</div>
        <GoodsList ref="recommend" :list="recommends" />
      </div>
    </ScrollRouter>
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

// 引入封装好的滚动组件
import ScrollRouter from 'components/common/scroll/ScrollRouter';
// 引入购物车为空的时候展示的组件
import EmptyShopcart from './EmptyShopcart';
// 购物车商品列表
import CartListItem from './CartListItem.vue';
// 推荐列表
import GoodsList from 'components/content/goods/GoodsList';

// 引入数据请求的方法和类
import { getRecommend } from 'network/detail';

// 引入混入中的全局事件监听的对象
import { backTopMixin } from 'common/mixin';

export default {
  name: 'CartList',
  mixins: [backTopMixin],
  components: {
    ScrollRouter,
    EmptyShopcart,
    CartListItem,
    GoodsList,
  },
  data() {
    return {
      recommends: [], // 推荐数据
    };
  },
  created() {
    getRecommend().then((response) => {
      this.recommends = response.data.list;
    });
  },
  computed: {
    ...mapGetters(['cartList', 'cartLength']),
  },
  activated() {
    // 在重新进入购物车界面的时候刷新可滚动区域的高度，避免用户新添加商品后，高度刷新不及时而导致卡顿
    this.$refs.scroll.refresh();
  },
  methods: {
    // 监听滚动事件，判断回到顶部按钮是否展示是,自定义事件获取数据，$emit('scroll',传递数据)
    contentScroll(position) {
      // 1、判断BackTop是否显示，向下滚动为负数
      this.isShowBackTop = -position.y > 500;
    },
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
.bottom-recommend {
  margin-top: 20px;
  text-align: center;
  color: var(--color-height-text);
}
.recommend-text {
  margin-bottom: 10px;
}
</style>
