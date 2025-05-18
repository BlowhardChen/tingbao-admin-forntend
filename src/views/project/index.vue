<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="deptId"
        :indent="20"
        :columns="columns"
        :request-api="getProjectListData"
        :data-callback="dataCallback"
      >
        <!-- 表格 header  -->
        <template #tableHeader>
          <el-button type="primary" :icon="Plus" @click="openDrawer('新增')">新增项目</el-button>
        </template>
        <!-- 菜单操作 -->
        <template #operation="scope">
          <el-button type="primary" :icon="EditPen" link @click="openDrawer('编辑', scope.row)"> 编辑 </el-button>
        </template>
      </ProTable>
      <ProjectDrawer ref="drawerRef" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import ProTable from "@/components/table-pro/index.vue";
import { ColumnProps, ProTableInstance } from "@/components/table-pro/interface";
import { Plus, EditPen } from "@element-plus/icons-vue";
import { ResPage } from "@/api/interface";
import { addProjectApi, editProjectApi, getProjectListApi } from "@/api/modules/project";
import { projectPriceStatus, projectStatus } from "@/utils/serviceDict";
import ProjectDrawer from "./components/project-drawer.vue";
import { useHandleData } from "@/hooks/useHandleData";
import { Project } from "@/api/interface/project";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns: ColumnProps<any>[] = [
  { prop: "name", label: "项目名称", search: { el: "input" } },
  { prop: "projectName", label: "项目类型", search: { el: "input" } },
  { prop: "activity", label: "项目描述", search: { el: "input" } },
  { prop: "price", label: "项目价格（￥）", search: { el: "input" } },
  {
    prop: "imageUrl",
    label: "项目图片",
    render: scope => {
      return (
        <>
          <img style={" width: 55px;height: 45px;"} src={scope.row?.imageUrl ? scope.row?.imageUrl : ""} alt="" />
        </>
      );
    }
  },
  { prop: "durationMinutes", label: "服务时长（分钟）", search: { el: "input" } },
  {
    prop: "up",
    label: "是否起始价",
    tag: true,
    enum: projectPriceStatus,
    search: { el: "tree-select" },
    fieldNames: { label: "label", value: "value" },
    render: scope => {
      return (
        <>
          {
            <el-switch
              model-value={scope.row.up}
              inline-prompt
              active-text="是"
              inactive-text="否"
              onClick={() => changePriceStatus(scope.row)}
            />
          }
        </>
      );
    }
  },
  {
    prop: "status",
    label: "状态",
    enum: projectStatus,
    search: { el: "tree-select" },
    fieldNames: { label: "label", value: "value" },
    render: scope => {
      const isEnabled = scope.row.status === "0"; // 启用是 0，禁用是 1
      return (
        <el-switch
          model-value={isEnabled}
          inline-prompt
          active-text="启用"
          inactive-text="禁用"
          onClick={() => changeProjectStatus(scope.row)}
        />
      );
    }
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 200
  },
  { prop: "remark", label: "备注" },
  { prop: "operation", label: "操作", width: 150, fixed: "right" }
];

// 打开项目drawer(新增、编辑)
const drawerRef = ref<InstanceType<typeof ProjectDrawer> | null>(null);
const openDrawer = (title: string, row?: any | {}) => {
  const params = {
    title,
    row: title === "新增" ? {} : { ...row },
    api: title === "新增" ? addProjectApi : title === "编辑" ? editProjectApi : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};

// 改变起始价状态
const changePriceStatus = async (row: Project.ProjectList): Promise<void> => {
  const formData = toFormData({
    ...row,
    up: row.up ? false : true
  });
  await useHandleData(editProjectApi, formData, `将【${row.name}】${row.status === "0" ? "改为起始价" : "改为固定价"}`);
  proTable.value?.getTableList();
};

// 改变项目状态
const changeProjectStatus = async (row: Project.ProjectList): Promise<void> => {
  const formData = toFormData({
    ...row,
    status: row.status === "1" ? "0" : "1"
  });
  await useHandleData(editProjectApi, formData, `${row.status === "0" ? "启用" : "禁用"}【${row.name}】`);
  proTable.value?.getTableList();
};

// 将对象转换为 FormData
const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

// 获取项目列表
const getProjectListData = (params?: any) => {
  const { ...newParams } = JSON.parse(JSON.stringify(params));
  return getProjectListApi({
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
