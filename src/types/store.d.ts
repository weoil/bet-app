declare namespace Store {
  export namespace User {
    interface Info {
      avatar: string;
      nickName: string;
      isAuthor: boolean;
    }
    interface State {
      id: string;
      sessionKey: string;
      token: string;
      info: Info;
    }
  }
}
