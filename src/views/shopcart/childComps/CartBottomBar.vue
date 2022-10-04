<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkedLength }})</div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton';
import { mapGetters } from 'vuex';

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      // 先判断再遍历
      if (this.isSelectAll) {
        // 全部选中的时候点击,遍历数组，checked属性全部改为false
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        // 没有全部选中
        this.cartList.forEach((item) => (item.checked = true));
      }

      /* // 遍历然后将所有的元素的checked属性改变(点击就是要改变全选的状态)，这里不可以，因为两个位置在互相影响，结果会混乱
      this.cartList.forEach((item) => {
        item.checked = !this.isSelectAll;
      }); */
    },
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '￥' +
        this.cartList
          .filter((item) => {
            // 过滤掉没有选中的商品
            return item.checked;
          })
          .reduce((pre, Item) => {
            // 计算总价
            return pre + Item.count * Item.price;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 购物车没有商品的时候应该是不选的
      if (this.cartList.length === 0) return false;
      // 过滤出cartList中checked属性为false的元素，判断它的长度是否为0，为0则全选
      // return !this.cartList.filter((item) => !item.checked).length;// 性能不太好，会全部遍历

      // find 返回第一个符合条件的元素，有就不全选
      return !this.cartList.find((item) => !item.checked);
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>
