<template lang="jade">
#app
  nav.navbar.navbar-default.navbar-fixed-top
    .container
      // Brand and toggle get grouped for better mobile display
      .navbar-header.page-scroll
        button.navbar-toggle(type="button", data-toggle="collapse", data-target="#bs-example-navbar-collapse-1")
          span.sr-only Toggle navigation
          |           
          span.icon-bar
          |           
          span.icon-bar
          |           
          span.icon-bar
          |           
        //- a.navbar-brand.page-scroll(href="/page" )
        .navbar-brand.page-scroll.logo
          //- img(src="../images/logo.png", alt="Lattes theme logo")
          | Shengyi
      // Collect the nav links, forms, and other content for toggling
      #bs-example-navbar-collapse-1.collapse.navbar-collapse
        ul.nav.navbar-nav.navbar-right
          li.hidden
            a(href="#page-top") Home
          |             
          li
            //- a.page-scroll(href="#about") About
            //- a.page-scroll#home(href="/page") Home
            router-link.page-scroll#home(to="/page") Home
          |             
          li
            //- a.page-scroll(href="#about") About
            //- a.page-scroll#aboutUs(href="/aboutUs") About Us
            router-link.page-scroll#aboutUs(to="/aboutUs") About Us
          |             
          //- li
          //-   a.page-scroll(href="#services") Services
          |             
          //- li
          //-   a.page-scroll#products(href="/products") Products
          li
            //- router-link.page-scroll#products(to="/products/0"  data-toggle="dropdown", aria-expanded="false")
            a.page-scroll#products(href="javascript:;", data-toggle="dropdown", aria-expanded="false")
              | Products
              span.caret
            |           
            ul#menus.dropdown-menu.dropdown
              li.txt
                //- a(href="/products/0" sid=0) All
                //- router-link(to="/products/0") All
                div.center
                  li.txt
                    router-link(to='/products/0'  @click.native='getPros' ) All
                  |             
                  li.divider(role="separator")
              //- |             
              //- li.divider.marginT(role="separator")
              |             
              div.center(v-for='(sort,index) in sortsList')
                li.txt
                  router-link(:to='"/products/"+index' v-bind:sid='index' @click.native='getPros') {{sort}}
                |             
                li.divider(role="separator")
              //- |             
              //- li
              //-   router-link(to="/products/2")  Gym Shoes
              //- |             
              //- li.divider(role="separator")
              //- |             
              //- li
              //-   router-link(to="/products/2") Crocs & Beach Shoes
              //- |             
              //- li.divider(role="separator")
              //- |             
              //- li
              //-   router-link(to="/products/2") Sandals
              //- |             
              //- li.divider(role="separator")
              //- |             
              //- li
              //-   router-link(to="/products/2") High-heeled Shoes
          //- |             
          //- li
          //-   a.page-scroll(href="#team") Team
          //- |             
          li
            //- a.page-scroll#contact(href="/contact") Contact 
            router-link.page-scroll#contact(to="/contact" ) Contact
      .towLevelMenu(v-show='isShowTLMenu')
        ul.tlMenuUl
          li.toPage(v-show='isPageShow' @click='back();') 首页
          li.toList(v-show='!isPageShow' @click='back();') 商品列表
          | 
          li
            | >
            | 商品详情       
    
</template>

<script>
  // require('./assets/js/config.js')
  // require('./assets/js/init.js')
  // import {getProLists,getSortsList} from './assets/js/init.js'
  import products from './components/Products.vue'
  export default {
    name: 'header',
    data(){
      return{
        sortsList:{},
        pageNum:1,
        pageSize:localStorage.getItem('usersPageSize'),
        pros:{},
        isPageShow:false,
        // showTowMenu:['/atlas','/proDesc/'],
        isShowTLMenu:false
      }
    },
    mounted(){
      this.getSorts()
    },
    beforeUpdate(){
      this.setPrePage()    
      this.isShowTLMenu = this.isShowTwoMenu

    },
    components:{
      products
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      setPrePage(){
        let preUrl = this.preUrl  || this.$router.path
        if(preUrl.indexOf('/products') != -1){
          this.isPageShow = false
        }else{
          this.isPageShow = true
        }
        // this.isPageShow = this.ispage
      },
      getPros(){
        //方法名唯一，并且和products中方法名一致
        if(this.$refs.pros.getPro){
          this.$refs.pros.getPro()
        }

      },
      getSorts(){
        // this.sortsList = getSortsList()
        this.getSortsList().then((res)=>{
          this.sortsList = res.vals
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
        
      }
    },
  }

</script>

<style scoped>
  /*require('/static/css/bootstrap.min.css');*/
  /*@import url("./assets/css/bootstrap.min.css");*/
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");
  /*@import url("http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext");*/
  /*@import url("./assets/css/jquery-confirm.css");
  @import url("./assets/css/owl.style.css");
  @import url("./assets/css/default.css");
  @import url("./assets/css/pgwslideshow.css");
  @import url("./assets/css/lrtk.css");
  @import url("./assets/css/component.css");
  @import url("./assets/css/bootstrap-table-expandable.css");
  @import url("./assets/css/styles.css");
  @import url("./assets/css/glyphicons.css");
  @import url("./assets/css/halflings.css");
  @import url("./assets/css/style-tab.css");
  @import url("./assets/css/uploadify.css");
  @import url("./assets/css/style-forms.css");
  @import url("./assets/css/page.css");
*/
</style>
