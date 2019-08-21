import { ILoginResult, Author } from '@/api/user';
import { post } from '@/api/index';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
import Vue from 'vue';
import { Login } from '@/api/user';
import { Loading, Login as ApiLogin } from '@/utils/uniapi';
export enum Identity {
  Any = 'any', // 所有人
  Customer = '', // 普通用户
  Admin = 'admin', // 管理员
  Vip = 'vip', // 会员
  SuperVip = 'superVip', // 超级会员
}
const defaultUserInfo = {};
export const defaultState: Store.User.State = {
  id: '',
  token: '',
  info: JSON.parse(JSON.stringify(defaultUserInfo)),
};
// h5的测试更改 小程序不生效

const mutations: MutationTree<Store.User.State> = {
  // 设置用户(包含sessionKey)
  SET_USER(state, payload: ILoginResult) {
    const { id, token, info } = payload;
    state.id = id;
    if (token) {
      state.token = payload.token;
    }
    state.info = info;
  },
};
const actions: ActionTree<Store.User.State, any> = {
  async Login(ctx) {
    let result;
    // await Loading.show('正在登录');
    const { code } = await ApiLogin();
    if (!code) {
      throw new Error('login error');
    }
    result = await Login(code);
    ctx.commit('SET_USER', result);
    // Loading.hide();
    return result;
  },
  async Author(
    { commit, state },
    payload: { detail: { iv: string; encryptedData: string } },
  ) {
    if (!payload.detail.iv) {
      return;
    }
    // const sessionKey = state.sessionKey;
    const { iv, encryptedData } = payload.detail;
    const result = await Author(encryptedData, iv);
    commit('SET_USER', {
      info: result,
      id: state.id,
      token: state.id,
    });
    // if (!iv || !encryptedData || !sessionKey) {
    //   throw new Error();
    // }
    // const result = await UserAuthor(sessionKey, iv, encryptedData);
    // commit('SET_USER', { sessionKey, user: result });
    // return result;
  },
};
const getters: GetterTree<Store.User.State, any> = {};
export default {
  state: JSON.parse(JSON.stringify(defaultState)),
  getters,
  mutations,
  actions,
};
