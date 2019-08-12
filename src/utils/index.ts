import Vue from 'vue';

export function formatRouterParams(query: { [key: string]: any } = {}) {
  if (!query) {
    return '';
  }
  const keys = Object.keys(query);
  const map = keys.map(key => {
    return `${key}=${query[key]}`;
  });
  return map.join('&');
}

export async function Sleep(delay: number): Promise<number> {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      resolve(timer);
      clearTimeout(timer);
    }, delay);
  });
}

export function getRefElement<T>(ctx: Vue, name: string): T {
  const ref: any = ctx.$refs[name];
  return ref;
}
