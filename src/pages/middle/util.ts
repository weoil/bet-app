import { Identity } from '@/store/modules/user';
/**
 * scene转换为参数
 *
 * @param {string} [query=""]
 * @returns target=目标;source=来源;detail:参数
 */
export function scene2Obj(query: string = '') {
  let detail: string[] = [];
  if (!query || typeof query !== 'string') {
    return {
      target: 0,
      source: 0,
      detail,
    };
  }
  // 如果没有( ->没有detail
  if (!query.includes('(')) {
    let [$target, $source] = query.split(':');
    return {
      target: Number($target),
      source: Number($source),
      detail,
    };
  }
  const splits = query.split(':(');
  const left = splits[0].split(':');
  let $detail: string[] = [];
  try {
    $detail = splits[1].replace(')', '').split(':');
  } catch (err) {
    console.error(err);
  }
  const [target, source] = left;
  return {
    target: Number(target),
    source: Number(source),
    detail: $detail,
  };
}
// target=0 首页 1 详情页
export function target2Path(target: number = 0, detail: string[]) {
  const { Vip, Customer, SuperVip, Admin, Any } = Identity;
  const map: {
    path: string; // 地址
    roles: Identity[]; // 允许的身份
    detail: { [key: string]: any }; // 携带信息
    replace: boolean; // 是否关闭中间页(不可返回首页)
  } = {
    path: '/pages/index/index',
    roles: [Any],
    detail: {},
    replace: true,
  };
  let id: string;
  let timestamp: string | number;
  switch (target) {
    case 0:
      map.path = `/pages/index/index`;
      map.roles = [Any];
      break;
    case 1:
      map.path = `/pages/bet/info`;
      map.detail = { id: detail[0] };
      map.replace = false;
  }
  return map;
}

export function matchRoute(identity: Identity) {
  switch (identity) {
    case Identity.Admin:
      return '/pages/admin/index';
    case Identity.Vip:
      return '/pages/index/index';
    case Identity.SuperVip:
      return '/pages/index/index';
  }
  return '/pages/index/index';
}
