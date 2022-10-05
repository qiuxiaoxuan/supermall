<template>
  <div>
    <NanBar class="nav-bar"><div slot="center">商品分类</div></NanBar>

    <div class="content">
      <!-- 展示左侧的大分类组件 -->
      <TabMenu :categories="categories" @selectItem="selectItem" />
      <div class="show-scroll">
        <!-- 选项卡组件 -->
        <TabControl
          :titles="['综合', '新品', '销量']"
          ref="tabControl1"
          @tabClick="tabClick"
          class="tab-control"
          v-show="isTabFixed"
        />
        <ScrollRouter
          id="tab-content"
          ref="scroll"
          @scroll="contentScroll"
          :probe-type="3"
        >
          <!-- 展示右侧对应每一个大分类的小分类 -->
          <TabContentCategory
            :subcategories="showSubcategory"
            @ImageLoad="ImageLoad"
          />
          <!-- 选项卡组件 -->
          <TabControl
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
            ref="tabControl2"
          />
          <!-- 每一个分类下的商品 -->
          <GoodsList :list="showCategoryDetail" />
        </ScrollRouter>
      </div>
    </div>
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import NanBar from 'components/common/navbar/NavBar';

import TabMenu from './childComps/TabMenu';
import TabContentCategory from './childComps/TabContentCategory';

import TabControl from 'components/content/tabControl/TabControl';
import ScrollRouter from 'components/common/scroll/ScrollRouter';
import GoodsList from 'components/content/goods/GoodsList';

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from 'network/category';
// 引入混入中的全局事件监听的对象和回到顶部对象
import { itemListenerMixin, backTopMixin } from 'common/mixin';

export default {
  name: 'CategoryRouter',
  components: {
    NanBar,
    TabMenu,
    TabControl,
    ScrollRouter,
    TabContentCategory,
    GoodsList,
  },
  data() {
    return {
      categories: [], // 保存左侧大分类数据(16个)
      categoryData: {}, // 保存所有类别的信息(16个)
      currentIndex: -1, // 保存当前选中的类别index(综合，新品，销量)
      currentType: 'pop', // 保存当前所展示的选项卡
      taboffsetTop: 0, // tabControl应该固定的位置，用于保存tabControl组件的offsetTop属性
      isTabFixed: false, // tabControl是否应该吸顶
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  destroyed() {
    // 销毁组件的时候取消对全局事件总线的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  created() {
    // 1.请求分类数据
    this.getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    contentScroll(position) {
      // 1、判断BackTop是否显示，向下滚动为负数
      this.isShowBackTop = -position.y > 500;
      // 2、决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    // 监听上方小分类组件的图片是否加载完毕(自定义事件)
    ImageLoad() {
      // 获取tabControl的offsetTop属性
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      console.log('100');
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 切换选项卡
    tabClick(index) {
      // 因为不是数组，所以只能用Switch判断语句
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      // 让两个tabControl的展示的选项一样
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    getCategory() {
      getCategory().then((response) => {
        // 1.获取左侧大分类数据
        this.categories = response.data.category.list; //获取里面的maitKey，miniWallkey
        // 2.初始化每个类别的子数据,并一一添加到categoryData中去
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {}, // 每个左侧分类的具体信息
            categoryDetail: {
              // 下方的不同类型的goods商品信息
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据(初次展示)
        this.getSubcategories(0);
      });
    },
    // 获取每个左侧大分类的具体信息
    getSubcategories(index) {
      this.currentIndex = index;
      // maitKey  用于查找不同分类中的上方展示区中小分类的信息的params
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((response) => {
        this.categoryData[index].subcategories = response.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail('pop');
        this.getCategoryDetail('sell');
        this.getCategoryDetail('new');
      });
    },
    getCategoryDetail(type) {
      // miniWallkey, type 用于查找不同分类中的下方详情的信息的params
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((response) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = response;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this.getSubcategories(index);
    },
  },
};
</script>
<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
  overflow: hidden;
}
.show-scroll {
  flex: 1;
}
#tab-content {
  height: 100%;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
