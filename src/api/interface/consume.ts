// 消费模块
export namespace Consume {
  // 消费列表
  export interface ConsumeList {
    userId: number;
    id: number;
    amount: number;
    description: string;
    createTime: string;
  }
}
