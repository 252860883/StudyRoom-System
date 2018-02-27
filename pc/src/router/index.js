import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import roomDetail from '@/components/roomDetail'
import login from '@/components/login'
import message from '@/components/message'
import user from '@/components/user'
import isSelected from '@/components/isSeleted'
import userChange from '@/components/userChange'
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
      path: '/message',
      name: 'home',
      component: message
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
      path: '/isselected',
      name: 'isSeleted',
      component: isSelected
    },

  ]
})