import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "reset-css/reset.css";
import "@/assets/style/global.scss";
import routes from "virtual:generated-pages";
import elementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import checkUpdate from "@/utils/check-update";
import globalComponents from "@/utils/global-components";

import "virtual:svg-icons-register";

checkUpdate(import.meta.env.PROD);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(elementPlus);
app.use(globalComponents);
app.mount("#app");
