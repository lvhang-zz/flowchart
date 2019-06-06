import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: ()=>import("../components/demo.vue")
    },
    {
      path: '/cans2',
      name: 'cans2',
      component: ()=>import("../components/cans2.vue")
    }
  ]
})