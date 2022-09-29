// 引入vue
import Vue from 'vue';
// 引入vuex
import Vuex from 'vuex';
// 安装vuex
Vue.use(Vuex);
const actions = {};
const mutations = {};
const state = {};
const getters = {};
// 创建并暴露一个store对象,要使用Vuex上的Store属性
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
