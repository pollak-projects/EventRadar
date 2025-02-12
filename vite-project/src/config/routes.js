import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: import("../pages/Home.vue"),
    },
    {
      path: "/events",
      name: "Events",
      component: import("../pages/Events.vue"),
    },
    {
      path: "/information",
      name: "Information",
      component: import("../pages/Information.vue"),
    },
    {
      path: "/Creation",
      name: "Creation",
      component: import("../pages/Creation.vue"),
    },
  ],
});

export { router };
