<template>
  <div id="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <!-- 指示器插槽，indicator -->
    <div class="indicator">
      <!-- 这个插槽生效的条件是showIndicator为true，且slideCount大于1 -->
      <!-- showIndicator(props)为是否展示指示器，slideCount为元素个数(data) -->
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <!-- 这里面是slot的默认内容 -->
        <!-- 动态绑定类名 active，达到高亮效果；条件是index等于currentIndex -->
        <div
          v-for="index in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  // 轮播图组件(一整个轮播图)
  name: 'SwiperRouter',
  props: {
    // 接收父组件传递过来的props，对象写法，指定类型和默认值，个性化定制
    interval: {
      // 图片轮播的时间间隔
      type: Number,
      default: 3000,
    },
    animDuration: {
      // 开始轮播的时间延迟
      type: Number,
      default: 300,
    },
    moveRatio: {
      // 用户移动图片时不同比例的区域所对应的行为，小于这个数值则复位，大于则下一张
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      // 轮播图片下方的小圆点指示器是否显示
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, // 元素个数
      swiperWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    };
  },
  mounted() {
    // 1.在组件挂载后操作DOM, 在前后添加Slide(滑动)
    setTimeout(() => {
      this.handleDom();

      // 2.调用开启定时器的函数
      this.startTimer();
    }, 100);
  },
  methods: {
    //定时器操作
    startTimer() {
      // 开启定时器，给本组件的实例添加一个属性playTimer，并将定时器赋值给playTimer
      this.playTimer = window.setInterval(() => {
        this.currentIndex++; // 改变当前操作的index
        // this前面的那个是 负号
        this.scrollContent(-this.currentIndex * this.swiperWidth);
      }, this.interval);
    },

    // 关闭定时器
    stopTimer() {
      window.clearInterval(this.playTimer);
    },

    // 滚动到正确的位置
    scrollContent(currentPosition) {
      // currentPosition为轮播图当前应该滚动的距离,即( -this.currentIndex * this.swiperWidth )
      // 0.设置正在滚动
      this.scrolling = true;
      // 1.开始滚动动画，给swiperStyle(swiper样式添加transition样式开始变化的时间延迟(animDuration))
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
      // 3.设置滚动位置
      this.setTransform(currentPosition);
      // 4.判断滚动到的位置，校验正确的位置
      this.checkPosition();
      // 5.滚动完成
      this.scrolling = false;
    },

    // 校验正确的位置
    checkPosition() {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = '0ms';
        // ！！！注意：因为会在前后各添加一个元素，则类数组的长度会比slideCount元素的个数多2
        // 即最后的index会比slideCount大1
        // 判断当前操作的index是否比元素个数大1
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          // 重新设置滚动位置
          this.setTransform(-this.currentIndex * this.swiperWidth);
        }
        // 后面这个 else if 也不知道为啥也是一直不执行的，注释也没看到影响
        else if (this.currentIndex <= 0) {
          console.log('xyu');
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        }
        // 2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex - 1);
      }, this.animDuration);
    },

    // 设置滚动的位置
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle[
        '-webkit-transform'
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

    // 操作DOM, 在DOM前后添加Slide
    handleDom() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper'); // querySelector获取文档中 class="swiper" 的第一个元素，即展示轮播图的div
      let slidesEls = swiperEl.getElementsByClassName('slide'); // 返回所有指定类名的子元素的类数组对象，即每一个SwiperItem
      // 2.保存个数
      this.slideCount = slidesEls.length;
      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        // 在指定父节点(swiperEl的子节点slidesEls[0]的前面插入cloneLast，也就是指定父节点(swiperEl)最前面插入
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        // 将cloneFirst插入到指定父节点(swiperEl)的子节点列表的末尾处
        swiperEl.appendChild(cloneFirst);
        // offsetWidth是一个只读属性，表示元素的布局宽度
        this.swiperWidth = swiperEl.offsetWidth;
        // 将应用到元素的样式赋值给swiperStyle
        this.swiperStyle = swiperEl.style;
      }
      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.swiperWidth);
    },

    // 拖动事件(按下轮播图片未松开)的处理
    touchStart(event) {
      // 1.如果正在滚动, 不可以拖动，直接返回
      if (this.scrolling) return;
      // 如果没有滚动则向下执行
      // 2.关闭定时器
      this.stopTimer();
      // 3.保存开始拖拽的位置(event是正在操作的元素，touches[0]是一个保存了x坐标(pageX)的对象)
      this.startX = event.touches[0].pageX;
    },

    // 拖拽移动中，还未结束
    touchMove(event) {
      // 1.计算出用户拖动的距离
      // (currentX保存的是拖拽过程中的当前x坐标)
      // (startX保存的是开始拖拽时的x坐标)
      this.currentX = event.touches[0].pageX;
      // 用distance 保存已经拖拽的距离
      this.distance = this.currentX - this.startX;
      // 将轮播图拖拽前偏移的位置赋值给currentPosition  那个是负号
      let currentPosition = -this.currentIndex * this.swiperWidth;
      // 最终移动的距离等于拖拽前的偏移量加上已经拖拽的距离
      let moveDistance = this.distance + currentPosition;
      // 2.修正当前的位置
      this.setTransform(moveDistance);
    },

    // 拖拽结束
    touchEnd() {
      // 1.获取移动的距离(绝对值)
      let currentMove = Math.abs(this.distance);
      // 2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (
        // moveRatio是设置好的  用户移动图片时不同比例的区域所对应的行为
        this.distance > 0 &&
        currentMove > this.swiperWidth * this.moveRatio
      ) {
        // 右边移动超过1-moveRatio
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.swiperWidth * this.moveRatio
      ) {
        // 向左移动超过moveRatio
        this.currentIndex++;
      }
      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.swiperWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },

    // 控制上一个, 下一个，不知道干嘛的，后面这三个函数，也没人调用
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      // 1.移除定时器
      this.stopTimer();
      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.swiperWidth);
      // 3.添加定时器
      this.startTimer();
    },
  },
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  /* justify-content 属性定义了浏览器之间，如何分配顺着弹性容器主轴 (或者网格行轴) 的元素之间及其周围的空间。居中 */
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  /* 设置盒子的宽高等于内容区加padding和border */
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
