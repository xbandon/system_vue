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
        path: 'Stock',
        name: 'stock',
        component: () =>import('../views/Stock.vue')
      },
      {
        path: 'Equipment',
        name: 'equipment',
        component: () =>import('../views/Equipment.vue')
      },
      {
        path: 'User',
        name: 'user',
        component: () =>import('../views/User.vue')
      },
      {
        path: 'Apply',
        name: 'apply',
        component: () =>import('../views/Apply.vue')
      },
      {
        path: 'Change',
        name: 'change',
        component: () =>import('../views/Change.vue')
      },
      {
        path: 'Scrap',
        name: 'scrap',
        component: () =>import('../views/Scrap.vue')
      },
      {
        path: 'Dictionary',
        name: 'dictionary',
        component: () =>import('../views/Dictionary.vue')
      }
    ]
  },
  {
    path: 'Login',
    name: 'login',
    component: () =>import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
