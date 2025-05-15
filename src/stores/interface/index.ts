// 主题状态
export interface ThemeState {
  primary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  headerBgColor: string;
  headerTextColor: string;
}

// 用户信息
export interface UserState {
  token: string;
  userInfo: any;
}

export interface GlobalUser {
  id: number;
  username: string;
  nickname: string;
}
