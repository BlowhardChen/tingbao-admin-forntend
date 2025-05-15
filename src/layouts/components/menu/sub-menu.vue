<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <!-- 使用el-icon占位，避免收起菜单时svg图标消失 -->
        <el-icon>
          <IconSvg :icon-class="subItem.meta.icon" class="menu-icon" />
        </el-icon>
        <span class="sle sub-title">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <IconSvg :icon-class="subItem.meta.icon" class="menu-icon" />
      <template #title>
        <span class="sle sub-title">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import IconSvg from "@/components/icon-svg/index.vue";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  .menu-icon {
    color: #898988;
  }
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    .menu-icon {
      color: var(--el-menu-active-color);
    }

    font-weight: bold;
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.el-sub-menu__title {
  font-size: 16px;
  .menu-icon {
    color: #898988;
  }
}
.sub-title {
  height: 40px;
  line-height: 40px;
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    .menu-icon {
      color: #898988;
    }
    &.is-active {
      .menu-icon {
        color: var(--el-menu-active-color);
      }
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    .menu-icon {
      color: #898988;
    }
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
.classic,
.transverse {
  #driver-highlighted-element-stage {
    background-color: #606266 !important;
  }
}
</style>
