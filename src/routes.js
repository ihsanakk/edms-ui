import Router from 'vue-router';
import Vue from "vue";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/login', component:  import("./components/LoginPage")},
        {path: '/register', component: import("./components/RegisterPage")}
    ]
})

