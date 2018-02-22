<template lang="jade">
#app
  template(v-if='status == "page"')
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
    router-view(ref='pros')  
    footer.footer
      .container.text-center            
          .row
            .footText
              h3 联系我们
              //- p 3422 Street, Barcelona 432, Spain, New Building North, 15th Floor
              |                       
              p
                i.fa.fa-phone
                |  +86 18060608001
              |                       
              p
                i.fa.fa-envelope
                |  cjw@shengyishoes.com
              p 福建省福州市仓山区福峡路上城国际6号楼1403宣
              p  Room 1403, building 6,Shangchengguoji Garden, Fuxia Road, Fuzhou, China
            //-div(style="width:50%;float:left;")
              //-img.QRImg(src='/images/yxy.jpg')
          .row.copy
              p
                | 版权为 Shengyi 所有未经许可不得转载或链接，闵ICP备00123141234号
              p
                router-link(to='/login', target='_blank',title='yxy3511') Admin  
  template(v-else-if='status == "login"')
    router-view
</template>

<script>
  // require('./assets/js/config.js')
  // require('./assets/js/init.js')
  // import {getProLists,getSortsList} from './assets/js/init.js'
  import products from './Products.vue'
  export default {
    name: 'layout',
    data(){
      return{
        sortsList:{},
        pageNum:1,
        pageSize:localStorage.getItem('usersPageSize'),
        pros:{},
        isPageShow:false,
        // showTowMenu:['/atlas','/proDesc/'],
        isShowTLMenu:false,
        status:''
      }
    },
    created(){
      this.setStatus()
    },
    mounted(){
      if(this.status == 'page'){
        this.getSorts()
      }
    },
    beforeUpdate(){
      if(this.status == 'page'){
        this.setPrePage()    
        this.isShowTLMenu = this.isShowTwoMenu
      }
    },
    components:{
      products
    },
    methods:{
      setStatus(){
        if(window.location.pathname.indexOf('/login') != -1){
          this.status = 'login'
        }else if(window.location.pathname.indexOf('/manage') != -1){
          this.status = 'login'
          this.$router.go(0)
        }else{
          this.status = 'page'
        }
      },
      back(){
        // this.$router.go(-1)
        let preUrl = this.preUrl  || this.$route.path
        if(preUrl.indexOf('/products') != -1){
          this.$router.push(preUrl)
        }else{
          this.$router.push('/page')
        }
      },
      setPrePage(){
        let preUrl = this.preUrl  || this.$route.path
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
  @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
  
</style>
