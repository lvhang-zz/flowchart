import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import("../components/demo.vue"),
      beforeEnter:(to,from,next)=>{
        next()
      }
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
      component: ()=>import("../components/activitycentercopy.vue"),
      beforeEnter(to,from,next){
        next();
      }
    },
    {
      path: '/test',
      name: 'test',
      component: ()=>import("../components/test.vue")
    },
    {
      path: '/test3',
      name: 'test3',
      component: ()=>import("../components/test3.vue")
    }
  ]
})
