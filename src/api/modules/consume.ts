import http from "@/api";
import { ResPage } from "../interface";
import { Consume } from "../interface/consume";

/**
 * @name 消费管理
 */
// 消费管理-获取消费列表
export const getConsumeListApi = (params: any) => {
  return http.post<ResPage<Consume.ConsumeList[]>>("/weixin/user/consumeList", params, { noLoading: false });
};
