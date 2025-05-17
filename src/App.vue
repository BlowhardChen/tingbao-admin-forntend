<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";
import { ElConfigProvider } from "element-plus";

// 初始化主题
const { initTheme } = useTheme();
initTheme();
</script>
