// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
// import VeeValidate from 'vee-validate';

import Manage from './components/manage/Manage'
import router from './router'
import $ from 'jquery'
import {Menu,defaultPagesize,defaultUserPagesize,manageMenu,baseUrl} from './assets/js/config.js'
import "./assets/css/bootstrap.min.css"
// import "./assets/css/bootstrap.css"
import "./assets/css/jquery-confirm.css"
import "./assets/css/owl.style.css"
import "./assets/css/default.css"
import "./assets/css/pgwslideshow.css"
// import "./assets/css/lrtk.css"
import "./assets/css/component.css"
import "./assets/css/bootstrap-table-expandable.css"
// import "./assets/css/styles.css"
import "./assets/css/glyphicons.css"
import "./assets/css/halflings.css"
import "./assets/css/style-tab.css"
import "./assets/css/uploadify.css"
import "./assets/css/style-forms.css"

//登录
// import "./assets/css/bootstrap-responsive.min.css"
// import "./assets/css/style.css"
// import "./assets/css/style-responsive.css"

import "./assets/js/lib/jquery-1.10.2.min.js"
import "./assets/js/lib/jquery-confirm.js"
import {autoAlert,delConfirm,setNaturalImg,initPageNum,setCurPage,initPageSize,setCurPageSize} from "./assets/js/yuAlert.js"
import {setUrlAct,getSortsList,isShowTwoMenu} from "./assets/js/init.js"
import "./assets/js/lib/jquery-session.js"
import "./assets/js/lib/jquery.cookie.js"
import "./assets/js/lib/jquery.lazyload.js"
import "./assets/js/lib/bootstrap.min.js"
import "./assets/js/lib/bootstrap-table-expandable.js"
import "./assets/js/lib/cbpAnimatedHeader.js"
import "./assets/js/lib/owl.carousel.min.js"
import "./assets/js/lib/ie-emulation-modes-warning.js"
import "./assets/js/lib/ie10-viewport-bug-workaround.js"
import "./assets/js/lib/jquery.imagesloaded.js"
import "./assets/js/lib/jquery.imgbox.pack.js"
// import "./assets/js/lib/base64.js"
import VueResource from 'vue-resource'

Vue.use(VueResource)
// Vue.use(VeeValidate)


// Vue.config.productionTip = false
// Vue.use(getProLists(0))
// 变量
Vue.prototype.baseUrl = baseUrl
Vue.prototype.defaultPagesize = defaultPagesize
Vue.prototype.defaultUserPagesize = defaultUserPagesize
//方法
Vue.prototype.autoAlert = autoAlert
Vue.prototype.delConfirm = delConfirm
Vue.prototype.getSortsList = getSortsList
// Vue.prototype.setPages = setPages
Vue.prototype.setNaturalImg = setNaturalImg
Vue.prototype.initPageNum = initPageNum
Vue.prototype.setCurPage = setCurPage
Vue.prototype.initPageSize = initPageSize
Vue.prototype.setCurPageSize = setCurPageSize
// Vue.prototype.headerPage = headerPage
// Vue.prototype.footerPage = footerPage

// console.log(Vue.http.interceptors.push())

Vue.http.interceptors.push(function(request, next) {
  next(res=>{
    // console.log('mainRes:',res)
    if(res.bodyText && JSON.parse(res.bodyText).code == 1){
      // this.$router.push({
      //   name:'login',
      //   params:{
      //     code:1,
      //     msg: JSON.parse(res.bodyText).msg
      //   }
      // })
      // this.autoAlert(JSON.parse(res.bodyText).msg,'orange')
      this.$router.push('/login')
    }else if(res.bodyText && JSON.parse(res.bodyText).code == 404){
      if(res.url.indexOf('manage')){
        this.$router.push('/manage/404')
      }else{
        this.$router.push('/404')
      }
    }
    return res
  });  
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data(){
    return{
      // temp:'<App/>'
    }
  },
  components: { 
    App ,
    Manage,
    // headerPage,
    // footerPage
  },
  template: '<router-view></router-view>',
  // template: '<App/>',
  created(){
    // if(window.location.pathname.indexOf('/manage') != -1){
    //   this.temp = '<Manage/>'
    //   // this.$options.template = '<Manage/>'
    // }else{
    //   this.temp = '<App/>'
    //   // this.$options.template = '<App/>'
    // }
    // this.$options.template = this.temp
  },
  mounted(){
    setUrlAct(this.$route.path)
  },
  methods:{

  }
})

router.beforeEach((to, from, next) => {　
    Vue.prototype.preUrl = from.path
    Vue.prototype.isShowTwoMenu = isShowTwoMenu(to.path)
    setUrlAct(to.path)
    setTimeout(()=>{
      window.scrollTo(0,0);
    }, 100);
    //login页刷新
    // let isReload = to.params.code != 1
    // let msg = to.params.msg
    /*if((from.path == '/login' || to.path == '/login')){
      router.go(0)
    }else if(((from.path.indexOf('/manage') != -1 && to.path.indexOf('/manage') == -1) || to.path.indexOf('/manage') != -1 && from.path.indexOf('/manage') == -1)){
      router.go(0)
    }*/
　　next()   // 进行下一个钩子函数  

    
}) 


