// 会员模块
export namespace Member {
  // 会员列表
  export interface MemberList {
    userId: string;
    avatar: string;
    nickName: string;
    mobile: string;
    sex: number;
    status: string;
    balance: number;
    createTime: string;
    updateBy: string;
    updateTime: string;
  }
}
