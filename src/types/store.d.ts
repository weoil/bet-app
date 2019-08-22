declare namespace Store {
  export namespace User {
    export enum Identity {
      Any = 'any', // 所有人
      Customer = '', // 普通用户
      Admin = 'admin', // 管理员
      Vip = 'vip', // 会员
      SuperVip = 'superVip', // 超级会员
    }
    interface Info {
      avatar: string;
      name: string;
      phome: string;
      email: string;
      intro: string;
      isAuthor: boolean;
      identity: Identity;
    }
    interface State {
      id: string;
      token: string;
      info: Info;
    }
  }
  export namespace Tool {
    export interface State {
      refresh: boolean;
    }
  }
}
