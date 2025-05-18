import http from "@/api";

/**
 * @name 首页
 */

// 首页-获取预约订单数据
export const getAppointmentOrderApi = (params?: any) => {
  return http.get<string[]>("/weixin/home/orderNum", params, { noLoading: false });
};

// 首页-获取项目分类数据
export const getProjectCategoryApi = (params?: any) => {
  return http.get<{ name: string; value: string }[]>("/weixin/home/projectTypeOneMonth", params, { noLoading: false });
};
