import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "reset-css/reset.css";
import "@/assets/style/global.scss";
import routes from "virtual:generated-pages";
import elementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(elementPlus);
app.mount("#app");
