import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: () => import("@/pages/MainPage.vue"),
  },
  {
    path: "/import",
    name: "import",
    component: () => import("@/pages/ImportHomes.vue"),
  },
  {
    path: "/complex/:id",
    name: "complex",
    component: () => import("@/pages/ComplexPage.vue"),
  },
  {
    path: "/home/:id",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
    children: [
      {
        path: "main",
        name: "homeMain",
        component: () => import("@/pages/HomePage/MainPage.vue"),
      },
      {
        path: "chess",
        name: "chess",
        component: () => import("@/pages/HomePage/ChessPage.vue"),
      },
      {
        path: "viewHome",
        name: "viewHome",
        component: () => import("@/pages/HomePage/ViewHome.vue"),
      },
    ],
  },
  {
    path: "/planLayout",
    name: "planLayoutPage",
    component: () => import("@/pages/HomePage/PlanLayoutPage.vue"),
  },
  {
    path: "/floors/:id",
    name: "floors",
    component: () => import("@/pages/EditPlanFloors.vue"),
  },
  {
    path: "/facades/:id",
    name: "facades",
    component: () => import("@/pages/EditFacades.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
