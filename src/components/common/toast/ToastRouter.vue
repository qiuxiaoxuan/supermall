<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: 'ToastRouetr',
  data() {
    return {
      message: '',
      isShow: false,
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  /* 相对于可视窗口移动 */
  top: 50%;
  left: 50%;
  /* 相对于自身移动 */
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
