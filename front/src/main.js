// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import headerPage from './components/common/header-page.vue'
// import footerPage from './components/common/footer-page.vue'
import router from './router'
import $ from 'jquery'
import {Menu,defaultPagesize,defaultUserPagesize,manageMenu} from './assets/js/config.js'
import "./assets/css/bootstrap.min.css"
import "./assets/css/jquery-confirm.css"
import "./assets/css/owl.style.css"
import "./assets/css/default.css"
import "./assets/css/pgwslideshow.css"
import "./assets/css/lrtk.css"
import "./assets/css/component.css"
import "./assets/css/bootstrap-table-expandable.css"
import "./assets/css/styles.css"
import "./assets/css/glyphicons.css"
import "./assets/css/halflings.css"
import "./assets/css/style-tab.css"
import "./assets/css/uploadify.css"
import "./assets/css/style-forms.css"
// import "./assets/css/page.css"


import "./assets/js/lib/jquery-1.10.2.min.js"
import "./assets/js/lib/jquery-confirm.js"
import {autoAlert,setPages} from "./assets/js/yuAlert.js"
import {setUrlAct,getProLists,getSortsList,isShowTwoMenu} from "./assets/js/init.js"
import "./assets/js/lib/jquery-session.js"
import "./assets/js/lib/jquery.cookie.js"
import "./assets/js/lib/jquery.lazyload.js"
import "./assets/js/lib/bootstrap.min.js"
import "./assets/js/lib/bootstrap-table-expandable.js"
import "./assets/js/lib/cbpAnimatedHeader.js"
import "./assets/js/lib/owl.carousel.min.js"
// import "http://api.map.baidu.com/api?v=2.0&ak=dOB5qvSfCfKnKaHGjQMgbXODENzZ1E3f"
import "./assets/js/lib/ie-emulation-modes-warning.js"
import "./assets/js/lib/ie10-viewport-bug-workaround.js"
import "./assets/js/lib/jquery.imagesloaded.js"
// import "http://static.runoob.com/assets/jquery-validation-1.14.0/dist/jquery.validate.min.js"
// import "http://static.runoob.com/assets/jquery-validation-1.14.0/dist/localization/messages_zh.js"
import "./assets/js/lib/jquery.imgbox.pack.js"
// import "./assets/js/lib/pgwslideshow.min.js"
// import "./assets/js/lib/pgwslideshow.js"
// import "./assets/js/lib/pagination.js"

// console.log('menu:',Menu)
// Vue.prototype.$config = {
//     defaultUserPagesize,
//     Menu,
//     defaultUserPagesize,
//     manageMenu
// }
Vue.config.productionTip = false
// Vue.use(getProLists(0))
Vue.prototype.getProLists = getProLists
Vue.prototype.getSortsList = getSortsList
Vue.prototype.autoAlert = autoAlert
Vue.prototype.setPages = setPages
// Vue.prototype.headerPage = headerPage
// Vue.prototype.footerPage = footerPage

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App ,
    // headerPage,
    // footerPage
  },
  template: '<App/>',
  mounted(){
    let path = window.location.hash;
    setUrlAct(path)
  },
  methods:{

  }
})
router.beforeEach((to, from, next) => {　
    Vue.prototype.preUrl = from.path
    Vue.prototype.isShowTwoMenu = isShowTwoMenu(to.path)
    setUrlAct(to.path)
　　next()   // 进行下一个钩子函数  
}) 
