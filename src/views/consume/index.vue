<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="deptId"
        :indent="20"
        :columns="columns"
        :request-api="getConsumeListData"
        :data-callback="dataCallback"
      >
      </ProTable>
    </div>
  </div>
</template>

<script setup lang="tsx" name="consumeMange">
import ProTable from "@/components/table-pro/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/table-pro/interface";
import { ResPage } from "@/api/interface";
import { getConsumeListApi } from "@/api/modules/consume";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns: ColumnProps<any>[] = [
  { prop: "nickName", label: "会员名称", search: { el: "input" } },
  { prop: "mobile", label: "手机号码", search: { el: "input" } },
  { prop: "amount", label: "消费金额", search: { el: "input" } },
  { prop: "description", label: "备注信息" },
  {
    prop: "createTime",
    label: "创建时间",
    width: 200
  },
  {
    prop: "updateTime",
    label: "更新时间",
    width: 200
  }
];

// 获取消费列表
const getConsumeListData = (params?: any) => {
  console.log("获取消费列表");
  const { ...newParams } = JSON.parse(JSON.stringify(params));
  return getConsumeListApi({
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
