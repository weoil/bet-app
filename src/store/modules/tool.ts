import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
export const defaultState: Store.Tool.State = {
  refresh: false,
  cache: {},
};
// h5的测试更改 小程序不生效

const mutations: MutationTree<Store.Tool.State> = {
  setIndexRefreshState(state, status: boolean) {
    state.refresh = status;
  },
  setCache(state, cache: any) {
    state.cache = cache;
  },
};
const actions: ActionTree<Store.Tool.State, any> = {};
const getters: GetterTree<Store.Tool.State, any> = {};
export default {
  state: JSON.parse(JSON.stringify(defaultState)),
  getters,
  mutations,
  actions,
};
