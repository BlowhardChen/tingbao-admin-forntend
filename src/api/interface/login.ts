// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password?: string;
    code?: string;
  }
  export interface ResLogin {
    token: string;
  }

  export interface ResloginVerifyPwd {
    pwdStatus: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
  export interface UserAccountInfo {
    rememberMe: boolean;
    username: string;
    password: string;
  }
  export interface ResPassword {
    password: string;
    rePassword: string;
  }
  export interface SavePasswordParams {
    username: string;
    password: string;
    code: string;
  }
}
