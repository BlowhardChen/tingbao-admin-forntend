<template>
  <CustomDialog v-model="dialogVisible" :title="'个人信息'" :width="'500px'" @on-cancel="onCancel" @on-confirm="onConfirm">
    <span>This is userInfo</span>
  </CustomDialog>
</template>

<script setup lang="ts" name="InfoDialog">
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
