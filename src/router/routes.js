var routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Intro",
        component: () => import("pages/intro.vue")
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/index.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
