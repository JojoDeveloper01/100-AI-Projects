import { createApp as createVueApp } from "vue";
import { createAppRouter } from "./router";
import App from "./App.vue";
import Tres from "@tresjs/core";
import "highlight.js/styles/tokyo-night-dark.css";
import "highlight.js/lib/common";

export function createApp() {
  const app = createVueApp(App);
  const router = createAppRouter();

  app.use(router);
  app.use(Tres);

  return { app, router };
}
