<template>
  <div class="goods-list">
    <GoodsListItem
      v-for="item of list"
      :key="item.acm"
      :item="item"
      class="item"
    />
  </div>
</template>
<script>
// 引入每个单独的商品展示组件
import GoodsListItem from './GoodsListItem';
export default {
  name: 'GoodList',
  components: {
    GoodsListItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.goods-list {
  display: flex;
  /* flex-wrap 属性指定 flex 元素单行显示还是多行显示 */
  /*wrap 属性值表示 flex 元素 被打断到多个行中 */
  flex-wrap: wrap;
  padding: 5px;
  /* justify-content 属性定义了浏览器之间，如何分配顺着弹性容器主轴 (或者网格行轴) 的元素之间及其周围的空间。 */
  /* space-around表示均匀排列每个元素每个元素周围分配相同的空间 */
  justify-content: space-around;
}

.goods-list .item {
  width: 48%;
}
</style>
