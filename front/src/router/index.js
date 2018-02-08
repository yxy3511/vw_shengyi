import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '@/components/common/404'
import Page from '@/components/Page'
import AboutUs from '@/components/AboutUs'
import Products from '@/components/Products'
import Contact from '@/components/Contact'
import ProDesc from '@/components/ProDesc'
import Atlas from '@/components/Atlas'
import Login from '@/components/Login'
import MProducts from '@/components/manage/MProducts'
import MEditPro from '@/components/manage/MEditPro'
import DescPro from '@/components/manage/DescPro'
import UserList from '@/components/manage/UserList'
import Register from '@/components/manage/Register'
import SortsList from '@/components/manage/SortsList'
import MAboutUs from '@/components/manage/AboutUs'
import EditAboutUs from '@/components/manage/EditAboutUs'
import ViewAboutus from '@/components/manage/ViewAboutus'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },{
      path:'/login',
      name:'login',
      component: Login,

    },{
      path:'/404',
      name:'404',
      component: NotFound,

    },{
      path:'/manage/404',
      name:'NotFound',
      component: NotFound,

    },{
      path:'/manage/MProducts',
      name:'MProducts',
      // component: Manage,
      component: MProducts,
      children: []
    },{
      path:'/manage/MEditPro',
      name:'MEditPro',
      // component: Manage,
      component: MEditPro
    },{
      path:'/manage/descPro/:id',
      name:'DescPro',
      component: DescPro
    },{
      path:'/manage/editPro/:id',
      name:'EditPro',
      component: MEditPro
    },{
      path:'/manage/userList',
      name:'UserList',
      component: UserList,
      children: []
    },{
      path:'/manage/register',
      name:'Register',
      component: Register,
    },{
      path:'/manage/sortsList',
      name:'SortsList',
      component: SortsList,
      children: []
    },{
      path:'/manage/aboutUs',
      name:'MAboutUs',
      component: MAboutUs,
      children: []
    },{
      path:'/manage/editAboutUs',
      name:'EditAboutUs',
      component: EditAboutUs,
    },{
      path:'/manage/viewAboutus/:id',
      name:'ViewAboutus',
      component: ViewAboutus,
    }]
})
