<template>
  <div class="empty">
    <div class="imgstyle">
      <img class="shopcart" src="~assets/img/cart/gouwuche.png" alt="" />
    </div>
    <div class="textstyle">
      <p>购物车居然是空的</p>
      <div>再忙，也要买点什么犒劳一下自己</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmptyShopcart',
};
</script>
<style scoped>
.empty {
  margin-top: 64px;
  border: 2px solid var(--color-tint);
  border-radius: 12px;
  padding: 10px;
}
.imgstyle {
  text-align: center;
}
.shopcart {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color-tint);
}
.textstyle {
  margin: 20px auto;
  text-align: center;
  width: 200px;
  font-size: 12px;
}
.textstyle p {
  font-size: 20px;
  margin-bottom: 6px;
}
</style>
