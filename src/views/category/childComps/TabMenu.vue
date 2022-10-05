<template>
  <ScrollRouter id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </ScrollRouter>
</template>

<script>
import ScrollRouter from 'components/common/scroll/ScrollRouter';

export default {
  name: 'TabMenu',
  components: {
    ScrollRouter,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index);
    },
  },
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  background-color: #eee;
}

.active {
  font-weight: 700;
  font-size: 20px;
  color: var(--color-height-text);
  background-color: #fff;
  border-left: 3px solid var(--color-height-text);
  border-radius: 8px;
}
</style>
