<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf mask-image">
        <div class="logo flx-center">
          <img class="logo-img" src="/public/logo.svg" alt="logo" />
          <span class="logo-text">{{ title }}</span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
          <el-scrollbar style="padding-top: 16px">
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="accordion"
              :collapse-transition="false"
            >
              <SubMenu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layout-classic">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { filterStaticMenus } from "@/utils/router";
import { staticRouter } from "@/routers/modules/staticRouter";
import { useGlobalStore } from "@/stores/modules/global";
import Main from "@/layouts/components/main/index.vue";
import SubMenu from "@/layouts/components/menu/sub-menu.vue";
import ToolBarLeft from "@/layouts/components/header/tool-bar-left.vue";
import ToolBarRight from "@/layouts/components/header/tool-bar-right.vue";

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const globalStore = useGlobalStore();
const accordion = computed(() => globalStore.accordion);
const isCollapse = computed(() => globalStore.isCollapse);
const layoutRoute = staticRouter.find(route => route.name === "layout");
const menuList = computed(() => (layoutRoute ? filterStaticMenus(layoutRoute.children || []) : []));
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
