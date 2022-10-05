<template>
  <div class="goods-list-item" @click="itemClick">
    <!-- 引入图片懒加载插件并使用后，用v-lazy='图片路径'  来实现图片的懒加载-->
    <img v-lazy="showImage" alt="" @load="imageLoad" :key="showImage" />
    <div class="item-info">
      <p>{{ item.title }}</p>
      <span class="price">{{ item.price }}</span>
      <!-- cfav就是商品的收藏数 -->
      <span class="collect">{{ item.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsListItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imageLoad() {
      // 加载完一张图片就触发一次事件
      // 触发绑定在全局事件总线上的自定义事件
      this.$bus.$emit('itemImageLoad');
      /* 第二种方法，在接收的组件中，设置离开组件时取消监听 */

      /* 
     // 第一种解决方法，使用路由判断分别通知对应组件
     if (this.$router.path.indexOf('/home')) {
        // 路由判断是否在HomeRouter组件，是，就在图片加载完后通知HomeRouter组件
        this.$bus.$emit('HomeItemImageLoad');
      } else if (this.$router.path.indexOf('/detail')) {
        // 路由判断是否在DetailRouter组件，是，就在图片加载完后通知DetailRouter组件
        this.$bus.$emit('detailItemImageLoad');
      } */
    },

    itemClick() {
      this.$router.push('/detail/' + this.item.iid);
    },
  },
  computed: {
    showImage() {
      return this.item.img || this.item.image || this.item.show.img;
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.item-info p {
  /* text-overflow 属性并不会强制“溢出”事件的发生，因此为了能让文本能够溢出容器，
  你需要在元素上添加几个额外的属性：  overflow 和 white-space。
  text-overflow CSS 属性用于确定如何提示用户存在隐藏的溢出内容 
  ellipsis属性值表示溢出的时候显示 省略号... */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.item-info .price {
  color: var(--color-height-text);
  margin-right: 20px;
}

.item-info .collect {
  position: relative;
}

.item-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
