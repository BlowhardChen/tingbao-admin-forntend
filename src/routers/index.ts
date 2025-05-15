import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { HOME_URL, LOGIN_URL } from "@/config";
import { staticRouter, errorRouter } from "@/routers/modules/staticRouter";
import NProgress from "@/config/nprogress";

/**
 * 工具函数：判断是否已登录
 */
function isAuthenticated(): boolean {
  const userStore = useUserStore();
  return Boolean(userStore.token);
}

/**
 * 工具函数：判断是否登录超时（可根据具体业务扩展，如 jwt 解析）
 */
function isTokenExpired(): boolean {
  // 示例：实际项目中你可能需要解析 token 判断是否过期
  return false; // 暂时固定为 false
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 1. 开始加载进度条
  NProgress.start();

  // 2. 设置页面标题
  const appTitle = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${appTitle}` : appTitle;

  // 3. 登录页访问逻辑（已登录则跳转首页）
  if (to.path.toLowerCase() === LOGIN_URL && isAuthenticated()) {
    return next(HOME_URL);
  }

  // 4. 未登录或 Token 过期 → 跳转登录页
  if (!isAuthenticated() || isTokenExpired()) {
    if (to.path !== LOGIN_URL) {
      return next({ path: LOGIN_URL, replace: true });
    } else {
      return next(); // 已经在登录页，就不要跳了
    }
  }

  // 5. [可选] 权限判断 + 动态路由处理（需要时启用）
  // if (!hasPermission(to)) {
  //   return next({ path: "/403" });
  // }

  // 6. 正常访问页面
  next();
});

/**
 * 路由跳转失败处理
 */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误：", error.message);
});

/**
 * 路由后置处理
 */
router.afterEach(() => {
  NProgress.done();
});

/**
 * [可选] 监听多标签页 token 变化
 */
window.addEventListener("storage", e => {
  if (e.key === "token" && !e.newValue) {
    router.push(LOGIN_URL);
  }
});

export default router;
