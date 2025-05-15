import { Login } from "@/api/interface/login";
import http from "@/api";

/**
 * @name 登录模块
 */

// 用户登录-密码登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/login", params, { noLoading: false });
};

// 用户登录-退出登录
export const logoutApi = () => {
  return http.post("/logout", {}, { noLoading: false });
};
