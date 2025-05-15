/**
 * 过滤出可展示的菜单项（适用于静态路由菜单）
 * - 剔除 meta.isHide 的路由
 * - 保留 children 中也符合条件的子路由
 */
export function filterStaticMenus(routes: any[]) {
  return routes
    .filter(route => !route.meta?.isHide)
    .map(route => {
      const newRoute = { ...route };
      if (newRoute.children?.length) {
        newRoute.children = filterStaticMenus(newRoute.children);
      }
      return newRoute;
    })
    .filter(route => route.children?.length || route.component); // 至少要有子路由或页面组件
}
