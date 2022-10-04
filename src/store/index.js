// 引入vue
import Vue from 'vue';
// 引入vuex
import Vuex from 'vuex';

// 引入常量
import { ADD_COUNTER, ADD_TO_CART } from './mutation-types';
// 安装vuex
Vue.use(Vuex);
const actions = {
  addCart(context, payload) {
    // 为了防止重复添加某一商品，先做一个判断
    // 第二种方法使用数组的find方法  array.find(()=>{});会返回数组中第一个符合条件的值
    // 1、查找数组是否已有该商品
    let oldProduct = context.state.cartList.find(
      (item) => item.iid === payload.iid
    );
    // 2、判断oldProduct是否有值(count为商品数量)
    if (oldProduct) {
      // oldProduct.count++;
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
    /* // 第一种方式使用for循环去遍历
  let oldProduct = null;
  for (let item of state.cartList) {
    if (item.iid === payload.iid) {
      oldProduct = item;
    }
  }
  // 判断oldProduct是否有值(count为商品数量)
  if (oldProduct) {
    oldProduct.count++;
  } else {
    payload.count = 1;
    state.cartList.push(payload);
  } */
  },
};
const mutations = {
  [ADD_COUNTER](_, payload) {
    // state我用不上，但是需要payload ,所以用_占个位
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  },
};
const state = {
  // 购物车列表
  cartList: [],
};
const getters = {};
// 创建并暴露一个store对象,要使用Vuex上的Store属性
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
