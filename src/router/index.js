import Vue from 'vue'
import VueRouter from 'vue-router'
import ManageView from "@/views/ManageView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: ManageView,
        children: [
            {
                path: 'stock',
                name: 'stock',
                component: () => import('../views/Stock.vue')
            },
            {
                path: 'equipment',
                name: 'equipment',
                component: () => import('../views/Equipment.vue')
            },
            {
                path: 'apply',
                name: 'apply',
                component: () => import('../views/Apply.vue')
            },
            {
                path: 'change',
                name: 'change',
                component: () => import('../views/Change.vue')
            },
            {
                path: 'scrap',
                name: 'scrap',
                component: () => import('../views/Scrap.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../views/User.vue')
            },
            {
                path: 'dictionary',
                name: 'dictionary',
                component: () => import('../views/Dictionary.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/userView',
        name: 'userView',
        component: () => import('../views/UserView.vue'),
        children: [
            {
                path: '/userEquipment',
                name: 'userEquipment',
                component: () => import('../views/UserEquipment.vue')
            },
            {
                path: '/userApply',
                name: 'userApply',
                component: () => import('../views/UserApply.vue')
            },
            {
                path: '/userChange',
                name: 'userChange',
                component: () => import('../views/UserChange.vue')
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
