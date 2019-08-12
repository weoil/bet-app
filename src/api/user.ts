import { post } from './index';

export interface ILoginResult {
  id: string;
  sessionKey: string;
  token: string;
  info: {
    avatar: string;
    nickName: string;
    isAuthor: boolean;
  };
}
// 登录
export async function Login(code: string): Promise<ILoginResult> {
  const result: any = await post<any>(`/login`, { code }, { safe: true });
  return result;
}
