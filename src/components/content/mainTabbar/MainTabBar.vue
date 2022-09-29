<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="red">
      <!-- 在template 标签中使用  v-slot:item-icon 属性 -->
      <!-- <template v-slot:item-icon>
          <img src="./assets/img/tabbar/home.svg" alt="" />
        </template> -->
      <!-- 在html 标签中使用  slot="item-icon" 属性 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/home_active.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/category_active.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/shopcart" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/shopcart_active.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>
