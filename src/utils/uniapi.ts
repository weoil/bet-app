import { formatRouterParams } from './index';
// 下载文件
export const DownloadFile = (fileUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: fileUrl,
      success: res => {
        resolve(res.tempFilePath);
      },
      fail: () => {
        reject();
      },
    });
  });
};
// 打开文件
export const openDocument = (fileUrl: string) => {
  return new Promise((resolve, reject) => {
    uni.openDocument({
      filePath: fileUrl,
      success: () => {
        resolve();
      },
      fail: () => {
        reject();
      },
      complete: (): void => {
        resolve();
      },
    });
  });
};
// 路由相关
export const Router = {
  to: (url: string, options = {}) => {
    return new Promise((resolve, reject) => {
      uni.navigateTo({
        url: url + '?' + formatRouterParams(options),
        success: () => {
          resolve();
        },
        fail: () => {
          reject();
        },
      });
    });
  },
  back: (delta: number) => {
    uni.navigateBack({
      delta,
    });
  },
  switch: (url: string) => {
    return new Promise((resolve, reject) => {
      uni.switchTab({
        url,
        success: () => {
          resolve();
        },
        fail: () => {
          reject();
        },
      });
    });
  },
  reLaunch: (url: string, options = {}) => {
    return new Promise((resolve, reject) => {
      uni.reLaunch({
        url: url + '?' + formatRouterParams(options),
        success: () => {
          resolve();
        },
        fail: () => {
          reject();
        },
      });
    });
  },
  redirectTo: (url: string, options = {}) => {
    return new Promise((resolve, reject) => {
      uni.redirectTo({
        url: url + '?' + formatRouterParams(options),
        success: () => {
          resolve();
        },
        fail: () => {
          console.log();
          reject();
        },
      });
    });
  },
};

export const Loading = {
  show: (title = '', mask = true) => {
    return new Promise(resolve => {
      uni.showLoading({
        title,
        mask,
      });
      resolve();
    });
  },
  hide: () => {
    return new Promise(resolve => {
      uni.hideLoading();
      resolve();
    });
  },
};

export const Login = (timeout = 10000): Promise<LoginRes> => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    resolve({
      code: '123',
    });
    return;
    // #endif
    uni.login({
      timeout,
      success: result => {
        resolve(result);
      },
      fail: () => {
        console.log('ffff');
        reject();
      },
    });
  });
};

export const Update = () => {
  try {
    // 实例化对象
    const updateManager = uni.getUpdateManager();
    // 判断是否有新版本更新
    // updateManager.onCheckForUpdate((res) => {
    //   console.log('check_update', res)
    // })
    // 有新的版本需要更新
    updateManager.onUpdateReady(() => {
      updateManager.applyUpdate();
    });
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
    });
  } catch (res) {
    // pass
  }
};
