<template>
  <div>
    <GridView
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="subcategories.list"
    >
      <div class="item" v-for="item in subcategories.list" :key="item.acm">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="imageLoad" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </GridView>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView';

export default {
  name: 'TabContentCategory',
  components: {
    GridView,
  },
  props: {
    subcategories: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('ImageLoad');
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
.panel img {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
