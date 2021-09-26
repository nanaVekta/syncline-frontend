import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const Dashboard = () => import("./components/Dashboard.vue");
const AddBook = () => import("./components/AddBook.vue");
const Book = () => import("./components/Book.vue");
const UpdateBook = () => import("./components/UpdateBook.vue");

const routes = [
    {
        path: "/",
        component: Home,
        name: "home"
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/dashboard",
        component: Dashboard,
        name: "dashboard",
    },
    {
        path: "/book/add",
        component: AddBook,
        name: "add-book",
    },
    {
        path: "/book/:id",
        component: Book,
        name: "book",
    },
    {
        path: "/book/edit/:id",
        component: UpdateBook,
        name: "update-book",
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
  
export default router;