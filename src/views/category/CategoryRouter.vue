<template>
  <div>
    <NanBar class="nav-bar"><div slot="center">商品分类</div></NanBar>

    <div class="content">
      <!-- 展示左侧的大分类组件 -->
      <TabMenu :categories="categories" @selectItem="selectItem" />
      <!-- 选项卡组件 -->

      <ScrollRouter id="tab-content" ref="scroll">
        <!-- 展示右侧对应每一个大分类的小分类 -->
        <TabContentCategory :subcategories="showSubcategory" />
        <!-- 选项卡组件 -->
        <TabControl :titles="['综合', '新品', '销量']" @tabClick="tabClick" />
        <!-- 每一个分类下的商品 -->
        <GoodsList :list="showCategoryDetail" />
      </ScrollRouter>
    </div>
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
    };
  },
  created() {
    // 1.请求分类数据
    this.getCategory();

    // 2.监听图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      this.$refs.scroll.refresh();
    });
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

#tab-content {
  height: 100%;
  flex: 1;
}
</style>
