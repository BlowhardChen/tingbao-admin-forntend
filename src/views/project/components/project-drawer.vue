<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps?.title}项目`">
    <el-form
      ref="ruleFormRef"
      label-width="145px"
      label-position="left"
      label-suffix=" :"
      :rules="rules"
      :model="drawerProps.row"
    >
      <el-form-item label="项目图片" prop="imageUrl">
        <UploadImg
          v-model:image-url="drawerProps.row!.imageUrl"
          :width="'255px'"
          :height="'200px'"
          :file-size="5"
          @select="handleUpload"
          @update-image-url="updateImageUrl"
        >
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传图片</span>
          </template>
          <template #tip> 图片大小不能超过 5M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="项目类型" prop="appointTypeId">
        <el-select v-model="drawerProps.row!.appointTypeId" placeholder="请选择项目类型">
          <el-option :label="item.name" :value="item.typeId" v-for="(item, index) in appointTypeList" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="请填写项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目描述" prop="activity">
        <el-input v-model="drawerProps.row!.activity" placeholder="请填写项目描述" clearable></el-input>
      </el-form-item>
      <el-form-item label="服务时间（分钟）" prop="durationMinutes">
        <el-input
          v-model="drawerProps.row!.durationMinutes"
          placeholder="请输入项目服务时间（分钟）"
          type="number"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="项目价格（￥）" prop="price">
        <el-input v-model="drawerProps.row!.price" placeholder="请输入项目价格(￥)" type="number" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否起始价">
        <el-select v-model="drawerProps.row!.up" placeholder="是否起始价">
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" prop="status">
        <el-switch v-model="drawerProps.row!.status" inline-prompt active-text="启用" inactive-text="禁用" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="drawerProps.row!.remark" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false"> 取消 </el-button>
      <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="projectDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import UploadImg from "@/components/upload/img.vue";
import { Project } from "@/api/interface/project";
import { getAppointTypeListApi } from "@/api/modules/project";

const rules = reactive<FormRules>({
  imageUrl: [{ required: true, message: "请上传项目图片", trigger: "change" }],
  name: [{ required: true, message: "请填写项目名称", trigger: "blur" }],
  appointTypeId: [{ required: true, message: "请选择项目类型", trigger: "change" }],
  activity: [{ required: true, message: "请填写项目描述", trigger: "blur" }],
  durationMinutes: [{ required: true, message: "请填写项目服务时间", trigger: "blur" }],
  price: [{ required: true, message: "请填写项目价格", trigger: "blur" }],
  status: [{ required: true, message: "请选择项目是否启用", trigger: "change" }]
});

interface DrawerProps {
  title: string;
  row: Project.ProjectList | {};
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref();

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps): Promise<void> => {
  drawerProps.value = params;
  drawerVisible.value = true;
  await getAppointType();
};

const imageFile = ref();
// 上传图片
const handleUpload = (file: File) => {
  console.log("上传图片", file);
  imageFile.value = file;
};

// 更新图片
const updateImageUrl = (url: string): void => {
  drawerProps.value.row.imageUrl = url;
};

const appointTypeList = ref<Project.ProjectType[]>([]);
// 获取项目类型
const getAppointType = async () => {
  const { data } = await getAppointTypeListApi();
  appointTypeList.value = data;
  console.log("获取项目类型", data);
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = (): void => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;

    try {
      const row = drawerProps.value.row as any;
      const formData = new FormData();
      if (imageFile.value) {
        formData.append("file", imageFile.value);
      }
      if (row.projectId) {
        formData.append("projectId", row.projectId);
      }
      formData.append("name", row.name);
      formData.append("appointTypeId", row.appointTypeId);
      formData.append("activity", row.activity);
      formData.append("durationMinutes", row.durationMinutes);
      formData.append("price", row.price);
      formData.append("up", row.up ? "1" : "0");
      formData.append("status", row.status ? "1" : "0");
      formData.append("remark", row.remark);

      await drawerProps.value.api!(formData);

      ElMessage.success({ message: `${drawerProps.value.title}项目成功！` });
      drawerProps.value.getTableList?.();
      drawerVisible.value = false;
    } catch (error) {
      console.error(error);
    }
  });
};
defineExpose({
  acceptParams
});
</script>
