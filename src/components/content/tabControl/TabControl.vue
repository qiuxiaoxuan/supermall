<template>
  <div class="tab-control">
    <div v-for="(item, index) of titles" :key="item" class="tab-control-item">
      <span
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
        >{{ item }}</span
      >
    </div>
  </div>
</template>
<script>
// 选项卡组件的封装
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    },
  },
  props: {
    titles: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 6px;
}
.active {
  color: var(--color-heigh-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
