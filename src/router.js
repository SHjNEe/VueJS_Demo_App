import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

// import CoachDetail from "./pages/coaches/CoachDetail.vue";
// import CoachesList from "./pages/coaches/CoachesList.vue";
// import CoachRegistation from "./pages/coaches/CoachRegistration.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
// import RequestsReceived from "./pages/requests/RequestsReceived.vue";
// import UserAuth from "./pages/auth/UserAuth.vue";
// import NotFound from "./pages/NotFound.vue";
import store from "./store/index";

const CoachDetail = defineAsyncComponent(async () => {
  return await require("./components/ui/BaseDialog.vue");
});
const CoachesList = defineAsyncComponent(async () => {
  return await require("./pages/coaches/CoachesList.vue");
});
const CoachRegistation = defineAsyncComponent(async () => {
  return await require("./pages/coaches/CoachRegistration.vue");
});
const ContactCoach = defineAsyncComponent(async () => {
  return await require("./pages/requests/ContactCoach.vue");
});
const RequestsReceived = defineAsyncComponent(async () => {
  return await require("./pages/requests/RequestsReceived.vue");
});
const UserAuth = defineAsyncComponent(async () => {
  return await require("./pages/auth/UserAuth.vue");
});
const NotFound = defineAsyncComponent(async () => {
  return await require("./pages/NotFound.vue");
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        { path: "contact", component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    {
      path: "/register",
      component: CoachRegistation,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters["auth/isAuthenticated"]) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
