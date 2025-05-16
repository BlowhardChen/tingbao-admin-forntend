import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config";

/**
 * staticRouter (静态路由)
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    redirect: HOME_URL,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          isAffix: true,
          icon: "HomeFilled",
          isLink: "",
          isHide: false,
          isKeepAlive: true
        }
      },
      {
        path: "/member",
        name: "member",
        component: () => import("@/views/member/index.vue"),
        meta: {
          title: "会员管理",
          isAffix: false,
          icon: "UserFilled",
          isLink: "",
          isHide: false,
          isKeepAlive: true
        }
      },
      {
        path: "/project",
        name: "project",
        component: () => import("@/views/project/index.vue"),
        meta: {
          title: "项目管理",
          isAffix: false,
          icon: "GoodsFilled",
          isLink: "",
          isHide: false,
          isKeepAlive: true
        }
      },
      {
        path: "/recharge",
        name: "recharge",
        component: () => import("@/views/recharge/index.vue"),
        meta: {
          title: "充值管理",
          isAffix: false,
          icon: "WalletFilled",
          isLink: "",
          isHide: false,
          isKeepAlive: true
        }
      },
      {
        path: "/consume",
        name: "consume",
        component: () => import("@/views/consume/index.vue"),
        meta: {
          title: "消费统计",
          isAffix: false,
          icon: "Histogram",
          isLink: "",
          isHide: false,
          isKeepAlive: true
        }
      }
    ]
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/error-message/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/error-message/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/error-message/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // 解决刷新页面、路由警告
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/error-message/404.vue")
  }
];
