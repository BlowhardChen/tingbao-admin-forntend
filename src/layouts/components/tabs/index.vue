<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
          <template #label>
            <el-icon v-if="item.icon && tabsIcon" class="tabs-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores/modules/global";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { TabsPaneContext, TabPaneName } from "element-plus";
import MoreButton from "./components/more-button.vue";
import { staticRouter } from "@/routers/modules/staticRouter";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const tabsIcon = computed(() => globalStore.tabsIcon);

onMounted(() => {
  tabsDrop();
  initTabs();
});

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix
    };
    tabStore.addTabs(tabsParams);
    route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
  },
  { immediate: true }
);

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
    draggable: ".el-tabs__item",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabStore.tabsMenuList];
      const currRow = tabsList.splice(oldIndex as number, 1)[0];
      tabsList.splice(newIndex as number, 0, currRow);
      tabStore.setTabs(tabsList);
    }
  });
};

// 展平静态路由
const getFlatStaticRoutes = (routes: any[], parentPath = ""): any[] => {
  return routes.flatMap(route => {
    const fullPath = route.path.startsWith("/") ? route.path : `${parentPath}/${route.path}`;
    const current = { ...route, path: fullPath };

    if (route.children && route.children.length) {
      return [current, ...getFlatStaticRoutes(route.children, fullPath)];
    }

    return [current];
  });
};

// 初始化需要固定的 tabs
const initTabs = () => {
  const flatRoutes = getFlatStaticRoutes(staticRouter);

  flatRoutes.forEach(item => {
    if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix
      };
      tabStore.addTabs(tabsParams);
    }
  });
};

// 点击Tab
const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};

// 移除Tab
const tabRemove = (fullPath: TabPaneName) => {
  const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || "";
  keepAliveStore.removeKeepAliveName(name);
  tabStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
