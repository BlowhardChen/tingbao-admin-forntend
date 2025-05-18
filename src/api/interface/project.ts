// 项目模块
export namespace Project {
  // 项目列表
  export interface ProjectList {
    activity: string;
    createBy: string;
    createTime: string;
    durationMinutes: number;
    imageUrl: string;
    isHome: boolean;
    name: string;
    price: number;
    projectId: number;
    appointTypeId: number;
    remark: string;
    status: string;
    up: boolean;
    updateBy: string;
    updateTime: string;
  }

  export interface ProjectType {
    appointTypeId: number;
    name: string;
    status: string;
    createTime: string;
    updateTime: string;
  }
}
