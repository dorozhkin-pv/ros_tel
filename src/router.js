import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './components/Home.vue'
import Card from './components/Card.vue'
import Ai from './components/Ai.vue'
import Game from './components/Game.vue'
import Company from './components/Company.vue'
import Sets from './components/Sets.vue'
import Callback from './components/Callback.vue'
import Policy from './components/Policy.vue'
import Article from './components/Article.vue'

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
    },
    {
      path: '/ai',
      name: 'ai',
      component: Ai
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/company',
      name: 'company',
      component: Company
    },
    {
      path: '/sets',
      name: 'sets',
      component: Sets
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    }
  ]
})


      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.