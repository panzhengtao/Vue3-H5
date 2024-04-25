import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import Cart from '../views/Cart.vue'
import My from '../views/My.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/my',
      name: 'My',
      component: My
    }
  ]
})

export default router
