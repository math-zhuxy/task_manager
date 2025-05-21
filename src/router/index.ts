import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    routes:[
        {
            path: "/",
            name: "home",
            component: () => import('../view/Home.vue')
        },
        {
            path: "/calendar",
            name: "calendar",
            component: () => import('../view/calendar.vue')
        },
        {
            path: "/table",
            name: "table",
            component: () => import('../view/table.vue')
        },
        {
            path: "/setting",
            name: "setting",
            component: () => import('../view/setting.vue')
        }
    ],
    history: createWebHistory()
});

export default router