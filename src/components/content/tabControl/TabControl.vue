<template>
  <div class="tab-control">
    <div v-for="(item, index) of titles" :key="item" class="tab-control-item">
      <span
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
<script>
// 选项卡组件的封装
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0, // 保存当前选中的选项卡的index
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
  font-weight: 700;
  flex: 1;
}
.tab-control-item span {
  padding: 6px;
}
.active {
  color: var(--color-height-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
