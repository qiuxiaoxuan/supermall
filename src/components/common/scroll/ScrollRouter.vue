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
      type: Boolean,
      dafault: true,
    },
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 在better-scroll中必须要设置click:true;才能在内部触发点击事件
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2、监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position);
    });

    // 3、监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp');
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
};
</script>
<style scoped></style>
