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

// Loading装饰器
export function Loading(
  options: ShowLoadingOptions | string,
  loadingName: string = '',
) {
  const opts = typeof options === 'string' ? { title: options } : options;
  return function $Loading(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ) {
    const origin = descriptor.value;
    if (!origin) {
      return;
    }
    descriptor.value = async function(...args: []) {
      const ctx: any = this;
      if (!loadingName && ctx[loadingName] !== undefined) {
        ctx[loadingName] = true;
      }
      uni.showLoading(opts);
      try {
        const result = await origin.apply(this, args);
        return result;
      } finally {
        uni.hideLoading();
        if (!loadingName && ctx[loadingName] !== undefined) {
          ctx[loadingName] = false;
        }
      }
    };
  };
}
