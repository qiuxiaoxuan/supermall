<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :isChecked="product.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-center">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">
          <button class="button" @click="decrement">-</button>
          {{ product.count }}
          <button class="button" @click="increment">+</button>
        </div>
      </div>
      <div class="info-bottom">
        <button class="detail-button" @click="clickDetail">详情</button>
        <button class="delete-button" @click="clickDelete">移除</button>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton';
import { mapMutations } from 'vuex';
export default {
  name: 'CartListItem',
  components: { CheckButton },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapMutations([
      'changeChecked',
      'Increment',
      'Decrement',
      'deleteProduct',
    ]),
    // 勾选或取消勾选
    checkClick() {
      this.changeChecked(this.product);
    },
    // 删除商品
    clickDelete() {
      if (confirm('是否要移除这个商品')) this.deleteProduct(this.product);
    },
    // 增加数量
    increment() {
      this.Increment(this.product);
    },
    // 减少数量
    decrement() {
      if (this.product.count === 1) {
        this.$toast.show('购买量不得少于一件');
        return;
      }
      this.Decrement(this.product);
    },
    // 点击详情跳转到商品详情页
    clickDetail() {
      this.$router.replace('/detail/' + this.product.iid);
    },
  },
};
</script>
<style scoped>
#shop-item {
  width: 100%;
  height: 150px;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-center {
  bottom: 45px;
}
.info-bottom {
  bottom: 5px;
  display: flex;
}

.info-center,
.info-bottom {
  margin-top: 10px;
  position: absolute;
  left: 10px;
  right: 10px;
}

.item-price {
  color: orangered;
  margin-right: 10px;
}
.button {
  width: 20px;
}
.detail-button,
.delete-button {
  flex: 1;
  height: 30px;
  margin-right: 5px;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  background-color: var(--color-tint);
  border: 0;
  border-radius: 16px;
}
.delete-button {
  background-color: red;
}
</style>
