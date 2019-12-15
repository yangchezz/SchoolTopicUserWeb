import Vue from 'vue'
import Router from 'vue-router'
import Head from '@/components/head'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/Head/Login"
    },
    {
      path: '/Head',
      redirect: "/Head/Login"
    },
    {
      path: "/Head",
      name: 'Head',
      component: Head,
      children: [
        {
          path: "Login",
          name: "Login",
          component: resolver => require(['@/components/login'], resolver)
        },
        {
          path: "Index",
          name: "Index",
          component: resolver => require(['@/components/index'], resolver)
        },
        {
          path: "Answer",
          name: 'Answer',
          component: resolver => require(['@/components/answer'], resolver)
        },
        {
          path: "Grade",
          name: 'Grade',
          component: resolver => require(['@/components/grade'], resolver)
        }
      ]
    },


  ]
})
