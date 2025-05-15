// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    token: string;
    userinfo: UserAccountInfo;
  }

  export interface UserAccountInfo {
    userId: string;
    userName: string;
    number: string;
    avatar: string;
    createTime: string;
    isAdmin: boolean;
  }
}
