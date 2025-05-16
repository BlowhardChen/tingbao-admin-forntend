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
        <el-switch v-model="drawerProps.row!.up" inline-prompt active-text="是" inactive-text="否" />
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

const rules = reactive<FormRules>({
  imageUrl: [{ required: true, message: "请上传项目图片", trigger: "change" }],
  name: [{ required: true, message: "请填写项目名称", trigger: "blur" }],
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
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 上传图片
const handleUpload = (file: File) => {
  console.log("上传图片", file);
  drawerProps.value.row.imageUrl = file;
};

// 更新图片
const updateImageUrl = (url: string) => {
  console.log("更新图片", url);
  drawerProps.value.row.imageUrl = url;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = (): void => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;

    try {
      const row = drawerProps.value.row as any;
      const formData = new FormData();
      if (row.imageFile) {
        formData.append("file", row.imageFile);
      }
      formData.append("name", row.name);
      formData.append("activity", row.activity);
      formData.append("durationMinutes", row.durationMinutes);
      formData.append("price", row.price);
      formData.append("up", row.up);
      formData.append("status", row.status);
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
