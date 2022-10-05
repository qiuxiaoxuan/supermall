<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) of titles"
          :key="item"
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>
<script>
// 详情的导航栏
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐', '购物车'],
      currentIndex: 0, // 保存被选中的title的index
    };
  },
  methods: {
    titleClick(index) {
      if (index !== 4) {
        this.currentIndex = index;
        // 把被点击的index发送给父组件
        this.$emit('titleClick', index);
      } else {
        this.$router.replace('/shopcart');
      }
    },
    backClick() {
      // 回到首页
      this.$router.back();
    },
  },
  components: {
    NavBar,
  },
};
</script>
<style scoped>
.title {
  display: flex;
}
.back img {
  margin-top: 10px;
}
.title-item {
  flex: 1;
  font-size: 12px;
}
.active {
  color: var(--color-height-text);
}
</style>
