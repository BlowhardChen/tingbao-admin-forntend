import http from "@/api";
import { ResPage } from "../interface";
import { Member } from "../interface/member";

/**
 * @name 会员管理
 */

// 会员管理-获取会员列表
export const getMemberListApi = (params: any) => {
  return http.post<ResPage<Member.MemberList[]>>("/weixin/user/list", params, { noLoading: false });
};

// 会员管理-会员充值
export const memberRechargeApi = (params: any) => {
  return http.post("/weixin/user/recharge", params, { noLoading: false });
};

// 会员管理-会员扣款
export const memberDeductionApi = (params: any) => {
  return http.post("/weixin/user/consume", params, { noLoading: false });
};
