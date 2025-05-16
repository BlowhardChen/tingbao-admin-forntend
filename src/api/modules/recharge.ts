import http from "@/api";
import { ResPage } from "../interface";
import { Recharge } from "../interface/recharge";

/**
 * @name 充值管理
 */
// 充值管理-获取充值列表
export const getRechargeListApi = (params: any) => {
  return http.post<ResPage<Recharge.RechargeList[]>>("/weixin/user/rechargeList", params, { noLoading: false });
};
