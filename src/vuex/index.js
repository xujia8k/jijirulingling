import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
  suocang: '',
  is_seos_tibi: '',
  duihuan: '',
  indexInfo:{},  /*首页数据缓存*/
  levelList: [], /*升级缓存*/
  routersArr: [1, 2, 3],  //设置进入页面的数组
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
