import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import EstudentsTable from "../components/MiTablaEstudiantes.vue";
import CursosTable from "../components/CursosTable.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/estudiantes",
    name: "Estudents-Table",
    component: EstudentsTable
  },
  {
    path: "/cursos",
    name: "Cursos-Table",
    component: CursosTable
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
