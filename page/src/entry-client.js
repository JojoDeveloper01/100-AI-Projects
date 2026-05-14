import "./assets/main.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { createApp } from "./main";
import { initVueTradux } from "tradux/vue";

const traduxReady = initVueTradux();

const { app, router } = createApp();
app.use(hljsVuePlugin);

await Promise.all([router.isReady(), traduxReady]);

app.mount("#app");
