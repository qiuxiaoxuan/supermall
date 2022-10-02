<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) of titles"
          :key="index"
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
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
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
