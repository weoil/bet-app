import Vue from 'vue';
/**
 * 通过对象转换为url请求体->name=a&age=1
 *
 * @export
 * @param {{ [key: string]: any }} [query={}]
 * @returns
 */
export function formatRouterParams(query: { [key: string]: any } = {}) {
  if (!query) {
    return '';
  }
  let r = '';
  const keys = Object.keys(query);
  const len = keys.length;
  keys.forEach((key, index) => {
    r += `${key}=${query[key]}`;
    if (index < len - 1) {
      r += '&';
    }
  });
  return r;
}

export async function Sleep(delay: number): Promise<number> {
  return new Promise(resolve => {
    let timer = setTimeout(() => {
      resolve(timer);
      clearTimeout(timer);
    }, delay);
  });
}

export function getRefElement<T>(ctx: Vue, name: string): T {
  const ref: any = ctx.$refs[name];
  return ref;
}
