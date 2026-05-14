import "./assets/main.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { createApp } from "./main";
import { initVueTradux } from "tradux/vue";

const pathLanguage = window.location.pathname.split("/").filter(Boolean)[0];
const traduxReady = initVueTradux(pathLanguage);

const { app, router } = createApp();
app.use(hljsVuePlugin);

await Promise.all([router.isReady(), traduxReady]);

app.mount("#app");
