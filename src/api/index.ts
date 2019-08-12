import axios, { AxiosRequestConfig } from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';
import Vue from 'vue';
import Store from '@/store';
import { formatRouterParams } from '../../../utils';
import { baseUrl } from '../../../config';
const Instance = axios.create({
  baseURL: baseUrl,
});
// #ifdef MP-WEIXIN
const a: any = mpAdapter; // 微信需要更改适配器
axios.defaults.adapter = a;
// #endif

Instance.interceptors.request.use(config => {
  config.headers.version = Store.state.version;
  // if (Store.state.userState.authorization) {
  //   config.headers['x-authorization'] = Store.state.userState.authorization;
  // }
  // // #ifdef H5
  // config.headers['x-authorization'] = 'Store.state.userState.authorization';
  // #endif
  return config;
});
// 取出resp中的data 返回result
Instance.interceptors.response.use(
  resp => {
    const data: { code: number; result: any; message: string } = resp.data;
    const code = Number(data.code);
    if (code !== 0) {
      uni.showToast({
        icon: 'none',
        duration: 2000,
        title: data.result || data.message,
      });
      throw new Error(data.message);
    }
    return data.result;
  },
  err => {
    uni.showToast({
      icon: 'none',
      duration: 2000,
      title: err.message,
    });
  },
);
interface IData {
  [key: string]: any;
}
interface IRequestConfig extends AxiosRequestConfig {
  safe: boolean;
}

export async function get<T = any>(
  url: string,
  data?: IData,
  config?: IRequestConfig,
): Promise<T> {
  const realUrl = `${url}?${formatRouterParams(data)}`;
  const r: any = await Instance.get<T>(realUrl, config);
  return r;
}
export async function del<T>(
  url: string,
  data?: IData,
  config?: IRequestConfig,
): Promise<T> {
  const realUrl = `${url}?${formatRouterParams(data)}`;
  const r: any = Instance.delete<T>(realUrl, config);
  return r;
}
export async function post<T>(
  url: string,
  data?: IData,
  config?: IRequestConfig,
): Promise<T> {
  const r: any = Instance.post<T>(url, data, config);
  return r;
}
export async function put<T>(
  url: string,
  data?: IData,
  config?: IRequestConfig,
): Promise<T> {
  const r: any = Instance.put<T>(url, data, config);
  return r;
}
export default Instance;
