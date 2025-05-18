<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="deptId"
        :indent="20"
        :columns="columns"
        :request-api="getRechargeListData"
        :data-callback="dataCallback"
      >
      </ProTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import ProTable from "@/components/table-pro/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/table-pro/interface";
import { ResPage } from "@/api/interface";
import { getRechargeListApi } from "@/api/modules/recharge";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns: ColumnProps<any>[] = [
  { prop: "nickName", label: "会员名称", search: { el: "input" } },
  { prop: "mobile", label: "手机号码", search: { el: "input" } },
  { prop: "amount", label: "充值金额" },
  { prop: "paymentChannel", label: "充值来源" },
  { prop: "tradeNo", label: "交易流水号", search: { el: "input" } },
  {
    prop: "updateTime",
    label: "更新时间",
    width: 200
  }
];

// 获取充值列表
const getRechargeListData = (params?: any) => {
  const { ...newParams } = JSON.parse(JSON.stringify(params));
  return getRechargeListApi({
    ...newParams
  });
};

// dataCallback 是对于返回的表格数据做处理
const dataCallback = (data: ResPage<any>) => {
  return {
    rows: data.rows,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};
</script>
