import { post } from './index';

export interface ILoginResult {
  id: string;
  token: string;
  info: Store.User.Info;
}
// 登录
export async function Login(code: string): Promise<ILoginResult> {
  console.log(code);
  const result: any = await post<any>(
    `/author/login`,
    { code },
    { safe: true },
  );
  return result;
}
// 授权
export async function Author(
  encryptedData: string,
  iv: string,
): Promise<ILoginResult> {
  const result: any = await post<any>(`/author`, { encryptedData, iv });
  return result;
}
