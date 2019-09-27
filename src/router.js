import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './components/Home.vue'
import Card from './components/Card.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/card',
      name: 'card',
      component: Card
    }
  ]
})


      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.