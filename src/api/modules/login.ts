import { Login } from "@/api/interface/login";
import http from "@/api";
import { ResultData } from "../interface";

/**
 * @name 登录模块
 */

// 用户登录-密码登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/login", params, { noLoading: false });
};

// 用户登录-密码登录
export const loginSmsApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/smsLogin", params, { noLoading: false });
};

// 用户登录-获取验证码
export const getLoginSms = (params: { username: string }) => {
  return http.post<ResultData>("/getValidCode", params, { noLoading: false });
};

// 忘记密码-获取验证码
export const getForgetPwdSms = (params: { username: string }) => {
  return http.post<ResultData>("/getValidCodeForRestPwd", params, { noLoading: false });
};

// 忘记密码-校验验证码
export const verifyForgetPwdSms = (params: { username: string; code: string }) => {
  return http.post<ResultData>("/verifyCodeForRestPwd", params, { noLoading: false });
};

// 忘记密码-对比新旧密码是否相同
export const verifyPassword = (params: { username: string; password: string }) => {
  return http.post<Login.ResloginVerifyPwd>("/verifyRepetitionPwd", params, { noLoading: false });
};

// 忘记密码-保存
export const savePassword = (params: Login.SavePasswordParams) => {
  return http.post("/resetPwd", params, { noLoading: false });
};

// 获取菜单列表
export const getAuthMenuListApi = () => {
  return http.get<Menu.MenuOptions[]>(`/getRouters`, {});
};

// 用户退出登录
export const logoutApi = () => {
  return http.post(`/logout`);
};
