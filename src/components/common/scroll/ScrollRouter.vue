<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// 引入BetterScroll 重点解决移动端（已支持 PC）各种滚动场景需求的插件
import BScroll from 'better-scroll';
export default {
  name: 'ScrollRouter',
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    click: {
      // 滚动内部的除button标签外的其他标签的单击事件是否可用，默认为false
      type: Boolean,
      dafault: true,
    },
    probeType: {
      // 引入的BScroll内部的事件
      // 0和1不监听滚动，2监听手指拖拽的滚动，3监听所有的滚动，包含滑动产生的惯性的滚动，默认为0
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      // 引入的BScroll内部的事件
      // 上拉是否加载更多，默认值为false
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 在better-scroll中必须要设置click:true;才能在内部触发点击事件
      click: true,
      // 这两个属性设置为动态属性，由props动态接收使用者传递的数据，减少性能消耗
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2、监听滚动的位置(监听滚动对象上的事件，在合适的地方触发自定义事件)
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // 触发自定义事件，传递数据
        this.$emit('scroll', position);
      });
    }

    // 3、监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // 滚动中回到某个位置的方法
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // 滚动中重置上拉加载的方法
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refresh() {
      // 滚动中重置滚动高度的方法
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
  },
  computed: {
    // 获取滚动此时的位置Y
    scrollY() {
      return this.scroll.y;
    },
  },
};
</script>
<style scoped></style>
