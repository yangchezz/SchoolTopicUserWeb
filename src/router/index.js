import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Head from '@/components/head'
import Grade from '@/components/grade'
import Answer from '@/components/answer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/Head/Index"
    },
    {
      path:'/Head',
      redirect:"/Head/Index"
    },
    {
      path:"/Head",
      name:'Head',
      component:Head,
      children:[
        {
          path:"Login",
          name:"Login",
          component:Login
        },
        {
          path:"Index",
          name:"Index",
          component:Index
        },
        {
          path:"Answer",
          name:'Answer',
          component:Answer
        },
        {
          path:"Grade",
          name:'Grade',
          component:Grade
        }
      ]
    },


  ]
})
