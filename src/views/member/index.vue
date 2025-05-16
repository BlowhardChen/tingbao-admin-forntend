<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="deptId"
        :indent="20"
        :columns="columns"
        :request-api="getMemberListData"
        :data-callback="dataCallback"
      >
        <!-- 菜单操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="openMemberCard(scope.row)">会员开卡</el-button>
        </template>
      </ProTable>
    </div>
  </div>
</template>

<script setup lang="tsx" name="memberMange">
import ProTable from "@/components/table-pro/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/table-pro/interface";
import { ResPage } from "@/api/interface";
import { addMemberApi, getMemberListApi } from "@/api/modules/member";
import { useHandleData } from "@/hooks/useHandleData";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns: ColumnProps<any>[] = [
  { prop: "nickName", label: "会员名称", search: { el: "input" } },
  { prop: "mobile", label: "会员手机号", search: { el: "input" } },
  { prop: "balance", label: "会员余额（￥）", search: { el: "input" } },
  {
    prop: "createTime",
    label: "创建时间",
    width: 200
  },
  {
    prop: "updateTime",
    label: "更新时间",
    width: 200
  },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];

// 会员开卡
const openMemberCard = async (item): Promise<void> => {
  // await useHandleData(addMemberApi, { nickName: item.nickName, mobile: item.mobile }, "给该会员开卡");
  // proTable.value?.getTableList();
};

// 获取会员列表
const getMemberListData = (params?: any) => {
  console.log("获取会员列表");
  const { ...newParams } = JSON.parse(JSON.stringify(params));
  return getMemberListApi({
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
