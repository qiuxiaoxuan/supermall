// 混入

// 引入debounce防抖函数
import { debounce } from 'common/utils';
// 函数防抖的混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null, // 保存组件监听全局事件总线上自定义事件的函数
      newRefresh: null,
    };
  },
  mounted() {
    // 监听给$bus 绑定监听item图片加载完成的自定义事件(goodsListItem组件中的图片)
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50);
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  },
};

// 回到顶部的混入
// 引入回到顶部的组件
import BackTop from 'components/content/backTop/BackTop';
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false, // 回到顶部组件是否展示
    };
  },
  methods: {
    // 回到顶部
    backClick() {
      // 在组件的$refs上可以访问到注册过的scroll拿到组件实例对象，然后访问这个实例上的方法scrollTo(滚动到的位置)
      // 参数，滚动的终点的x，y坐标，以及滚动的时间
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
  components: {
    BackTop,
  },
};
