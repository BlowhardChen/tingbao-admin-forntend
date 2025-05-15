<template>
  <CustomDialog v-model="dialogVisible" :title="'修改密码'" :width="'500px'" @on-cancel="onCancel" @on-confirm="onConfirm">
    <span>This is Password</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </CustomDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomDialog from "@/components/custom-dialog/index.vue";

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

// 取消
const onCancel = (): void => {
  dialogVisible.value = false;
};

// 确定
const onConfirm = (): void => {
  onCancel();
};

defineExpose({ openDialog });
</script>
