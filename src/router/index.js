import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import("../components/demo.vue")
    },
    {
      path: '/demo',
      name: 'demo',
      component: ()=>import("../components/demo.vue")
    },
    {
      path: '/cans2',
      name: 'cans2',
      component: ()=>import("../components/cans2.vue")
    },
    {
      path: '/activitycentercopy',
      name: 'activitycentercopy',
      component: ()=>import("../components/activitycentercopy.vue")
    },
    {
      path: '/test',
      name: 'test',
      component: ()=>import("../components/test.vue")
    }
  ]
})
