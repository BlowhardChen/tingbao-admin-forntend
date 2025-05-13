import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import directives from "@/directives/index"; // 自定义指令
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);

// 注册 element Icons
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus, { locale: zhCn }).use(directives).mount("#app");
