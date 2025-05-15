<template>
  <IconSvg class="collapse-icon" :icon-class="'collapse'" @click="changeCollapse" />
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import IconSvg from "@/components/icon-svg/index.vue";

const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  cursor: pointer;
  fill: var(--el-header-text-color);
}
</style>
