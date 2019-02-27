import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home'
// import Add from '../components/Add'
// import Collect from '../components/Collect'
// import List from '../components/List'
// import Detail from '../components/Detail'


Vue.use(Router);

export default new Router({
  routes: [
    {path: '', redirect: '/home'},
    {
      path: '/home',
      component: () => import('../components/Home.vue'),
      meta: {keepAlive: true},
    }, // this.$route.meta.keepAlive
    {
      path: '/add',
      component: () => import('../components/Add.vue')
    },
    {
      path: '/list',
      component: () => import('../components/List.vue'),
      meta: {keepAlive: true}
    },
    {
      path: '/collect',
      component: () => import('../components/Collect.vue')
    },
    {
      path: '/detail/:bid',
      component: () => import('../components/Detail.vue'),
      name: 'detail',
      meta: {keepAlive: true}
    },
    {
      path: '*',
      redirect: '/home'
    },
  ],
  mode: 'history'
})
