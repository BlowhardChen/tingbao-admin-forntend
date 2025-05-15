import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// pinia持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
