<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <ThemeSetting id="themeSetting" />
      <Fullscreen id="fullscreen" />
    </div>
    <Avatar />
    <span class="username">{{ username }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/modules/user";
import ThemeSetting from "./components/theme-setting.vue";
import Fullscreen from "./components/fullscreen.vue";
import Avatar from "./components/avatar.vue";

const userStore = useUserStore();
const username = computed(() => userStore.userInfo.userName);
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
  .header-icon {
    display: flex;
    align-items: center;
    margin-right: 20px;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
