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
      path: "/information/:id",
      name: "Information",
      component: import("../pages/Information.vue"),
    },
    {
      path: "/Creation",
      name: "Creation",
      component: import("../pages/Creation.vue"),
    },
    {
      path: "/Admin",
      name: "Admin",
      component: import("../pages/Admin.vue"),
    },
    {
      path: "/Profile",
      name: "Profile",
      component: import("../pages/profile.vue"),
    },
    {
      path: "/MyEvent",
      name: "MyEvent",
      component: import("../pages/MyEvent.vue")
    }
  ],
});

export { router };
