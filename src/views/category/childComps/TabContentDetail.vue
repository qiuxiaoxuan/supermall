<template>
  <GridView>
    <GoodsListItem v-for="item in categoryDetail" :key="item" :goods="item" />
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
