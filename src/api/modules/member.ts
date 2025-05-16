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

// 会员管理-会员开卡
export const addMemberApi = (params: any) => {
  return http.post<any>("/weixin/user/insert", params, { noLoading: false });
};
