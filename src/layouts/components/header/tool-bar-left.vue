<template>
  <div class="tool-bar-lf">
    <CollapseIcon id="collapseIcon" />
    <!-- <Breadcrumb v-if="globalStore.breadcrumb" id="breadcrumb" /> -->
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import CollapseIcon from "./components/collapseIcon.vue";
import Breadcrumb from "./components/breadcrumb.vue";
const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>
