import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Login from './components/Login';
import store from './store.js';
import Post from './components/Post';
import Showpost from './components/Showpost';
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/showblog/Pid',
      name: 'Showblog',
      component: Showpost,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
 
  ],
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router