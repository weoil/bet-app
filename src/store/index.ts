import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    version: '0.0.1',
  },
  mutations: {},
  modules: {
    user: User,
  },
});
