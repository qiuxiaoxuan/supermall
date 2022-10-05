<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div @click="clickThis">
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div @click="clickThis">
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="changeStyle" :class="{ active: isActive }">
        <i class="icon select"></i>
        <span class="text" v-show="!isActive">收藏</span>
        <span class="text" v-show="isActive">已收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="clickThis">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    // 添加购物车
    addToCart() {
      this.$emit('addCart');
    },
    // 点击未开发的功能区
    clickThis() {
      this.$toast.show('非常抱歉，该功能尚未开发');
    },
    // 修改收藏图标的背景色
    changeStyle() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 58px;
  background-color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  bottom: 0; */
  /* 两种方式都可以 */
  position: relative;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}

.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}

.active {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
