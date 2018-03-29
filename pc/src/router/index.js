import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'
import roomDetail from '@/pages/roomDetail'
import login from '@/pages/login'
import user from '@/pages/user'
import userChange from '@/pages/userChange'
import ranklists from '@/pages/rankLists'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/roomdetail',
      name: 'home',
      component: roomDetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user',
      name: 'home',
      component: user
    },
    {
      path: '/userinfo',
      name: 'userinformation',
      component: userChange
    },
    {
      path:"/ranklists",
      component:ranklists
    }
  ]
})
