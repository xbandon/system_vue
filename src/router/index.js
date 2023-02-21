import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'queryStock',
        name: 'stock',
        component: () =>import('../views/Stock.vue')
      },
      {
        path: 'queryEquipment',
        name: 'equipment',
        component: () =>import('../views/Equipment.vue')
      },
      {
        path: 'queryUser',
        name: 'user',
        component: () =>import('../views/User.vue')
      },
      {
        path: 'queryApply',
        name: 'apply',
        component: () =>import('../views/Apply.vue'),
      },
      {
        path: 'queryChange',
        name: 'change',
        component: () =>import('../views/Change.vue'),
      },
      {
        path: 'queryScrap',
        name: 'scrap',
        component: () =>import('../views/Scrap.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
