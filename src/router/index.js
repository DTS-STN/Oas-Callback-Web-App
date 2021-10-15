import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Splash from "../views/Splash.vue";
import { i18n } from "./../../i18n";

const NotFound = () => import("../views/NotFound.vue");

const locales = "en|fr";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "splash",
      component: Splash,
    },
    {
      path: "/:lang(en|fr)",
      component: Home,
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
      ],
    },
    {
      path: "/404",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: {
        name: "not-found",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = "en";
  }

  // set the current language for vuex-i18n. note that translation data
  // for the language might need to be loaded first
  i18n.global.locale.value = language;

  // sets the page lang attribute
  const html = document.documentElement; // returns the html tag
  html.setAttribute("lang", language);

  if (language === "fr") {
    document
      .getElementsByTagName("meta")
      ["dcterms.title"].setAttribute("content", "L’assistant virtuel Modele");
    document
      .getElementsByTagName("meta")
      ["dcterms.language"].setAttribute("content", "fra");
    document
      .getElementsByTagName("meta")
      ["dcterms.creator"].setAttribute(
        "content",
        "Emploi et Développement social Canada"
      );
  }
  next();
});
