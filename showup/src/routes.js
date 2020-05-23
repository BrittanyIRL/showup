import { Contributor, Landing, Login, Signup } from "./views";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Landing,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "contributor",
    component: Contributor,
    routes: [
      {
        path: "/contributor/manage",

        component: Contributor,
      },
      {
        path: "/contributor/settings",

        component: Contributor,
      },
    ],
  },
];
