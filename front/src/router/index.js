import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page from '@/components/Page'
import AboutUs from '@/components/AboutUs'
import Products from '@/components/Products'
import Contact from '@/components/Contact'
import ProDesc from '@/components/ProDesc'
import Atlas from '@/components/Atlas'
// import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page'
    },{
      path: '/page',
      name: 'page',
      component: Page,
      children: []
    },{
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs
    },{
      path: '/products/:id',
      name: 'products',
      component: Products
    },{
      path: '/contact',
      name: 'contact',
      component: Contact
    },{
      path: '/proDesc/:id',
      name: 'proDesc',
      component: ProDesc
    },{
      path: '/atlas',
      name: 'atlas',
      component: Atlas,
    },/*{
      path:'/login',
      name:'login',
      component: Login
    }*/
  ]
})
