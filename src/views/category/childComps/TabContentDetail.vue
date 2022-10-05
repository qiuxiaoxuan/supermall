<template>
  <GridView>
    <GoodsListItem
      v-for="(item, index) in categoryDetail"
      :key="index"
      :goods="item"
    ></GoodsListItem>
  </GridView>
</template>

<script>
import GridView from 'common/gridView/GridView';
import GoodsListItem from 'views/home/childComps/GoodsListItem';

export default {
  name: 'TabContentDetail',
  components: {
    GridView,
    GoodsListItem,
  },
  props: {
    categoryDetail: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
