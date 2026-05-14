import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import Projects from "@/views/Projects.vue";
import Contact from "@/views/Contact.vue";
import Tradux from "@/views/Tradux.vue";
import { routesConfig } from "@/config/routes.js";

const routes = routesConfig.map((route) => ({
  ...route,
  component:
    route.name === "Projects"
      ? Projects
      : route.name === "Contact"
        ? Contact
        : route.name === "Tradux"
          ? Tradux
          : null,
}));

export function createAppRouter() {
  return createRouter({
    history:
      typeof window !== "undefined"
        ? createWebHistory()
        : createMemoryHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth",
        };
      }
      if (savedPosition) {
        return savedPosition;
      }
      return { top: 0 };
    },
  });
}

export default createAppRouter();
