import http from "@/api";
import { ResPage } from "../interface";
import { Project } from "../interface/project";

/**
 * @name 项目管理
 */

// 项目管理-获取项目列表
export const getProjectListApi = (params: any) => {
  return http.post<ResPage<Project.ProjectList[]>>("/weixin/project/list", params, { noLoading: false });
};

// 项目管理-新增项目
export const addProjectApi = (params: FormData) => {
  return http.post("/weixin/project/add", params, { noLoading: false });
};

// 项目管理-编辑项目
export const editProjectApi = (params: FormData) => {
  return http.post("/weixin/project/update", params, { noLoading: false });
};

// 项目管理-获取项目类型
export const getAppointTypeListApi = (params?: any) => {
  return http.post<Project.ProjectType[]>("/weixin/projectType/list", params, { noLoading: false });
};
