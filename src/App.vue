<template>
  <div id="app">
    <!-- 让home组件不要随便销毁，keep-alive -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';
export default {
  name: 'App',
  components: { MainTabBar },
};
</script>
<style>
@import './assets/css/base.css';
</style>
