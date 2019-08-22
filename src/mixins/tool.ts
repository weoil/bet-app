import Vue from 'vue';
export function findComponent<T extends Vue>(
  ctx: Vue,
  name: string,
  params: AnyObject,
): T | null {
  // 遍历子集查找组件
  for (const $c of ctx.$children) {
    if ($c.$options.name === name) {
      // 名称相同
      let diff = true;
      let tmp: any = $c;
      for (const key of Object.keys(params)) {
        // 比较元素
        diff = key in tmp && params[key] === tmp[key];
        if (!diff) {
          break;
        }
      }
      if (diff) {
        return tmp;
      }
    }
  }
  let parent = ctx.$parent;
  if (parent) {
    return findComponent(parent, name, params);
  }
  return null;
}
export class Tool extends Vue {
  $Toast(options: {
    message: string;
    mask?: boolean;
    delay?: number;
    loading?: boolean;
  }) {
    const modal = findComponent<any>(this, 'i-modal', {
      scope: true,
    });
    if (!modal) {
      throw new Error('找不到modal组件,请确保组件的scope=true');
    }
    return modal.Toast(options);
  }
  $Confirm(options: {
    title: string;
    message: string;
    isShowConfirm?: boolean;
    isShowCancel?: boolean;
    useIcon?: boolean;
    confirmText?: string;
    cancelText?: string;
  }) {
    const modal = findComponent<any>(this, 'i-modal', {
      scope: true,
    });
    if (!modal) {
      throw new Error('找不到modal组件,请确保组件的scope=true');
    }
    return modal.Confirm(options);
  }
}
