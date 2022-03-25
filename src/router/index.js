import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import {auth} from "../firebase/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/auth",
    name: "Auth",
    component: ()=>import("../views/Auth")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let loggedUser = auth.currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // let requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  if(requiresAuth && !loggedUser) next({name: 'Auth'});
  // else if(requiresAdmin && !store.getters['user/getUser'].data.is_admin) next('/app')
  else next()
})
export default router;
