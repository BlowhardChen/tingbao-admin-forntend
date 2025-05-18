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
          <el-button type="primary" :icon="UserFilled" link @click="openMemberCard(scope.row)"> 会员充值 </el-button>
          <el-button type="primary" :icon="WalletFilled" link @click="openMemberDeduction(scope.row)"> 会员扣款 </el-button>
        </template>
      </ProTable>
    </div>
    <MemberDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx">
import ProTable from "@/components/table-pro/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/table-pro/interface";
import { ResPage } from "@/api/interface";
import { WalletFilled, UserFilled } from "@element-plus/icons-vue";
import { getMemberListApi, memberDeductionApi, memberRechargeApi } from "@/api/modules/member";
import MemberDialog from "./components/member-dialog.vue";

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

const dialogRef = ref<InstanceType<typeof MemberDialog> | null>(null);
// 会员开卡
const openMemberCard = async (item): Promise<void> => {
  const params = {
    title: "会员充值",
    row: { ...item },
    api: memberRechargeApi,
    getTableList: proTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

// 会员扣款
const openMemberDeduction = async (item): Promise<void> => {
  const params = {
    title: "会员扣款",
    row: { ...item },
    api: memberDeductionApi,
    getTableList: proTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};
// 获取会员列表
const getMemberListData = (params?: any) => {
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
