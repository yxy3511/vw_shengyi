<template lang="jade">
#app
  .navbar.managePage
    .navbar-inner
      .container-fluid
        a.btn.btn-navbar(data-toggle="collapse", data-target="#testid")
          span.icon-bar
          |  
          span.icon-bar
          |  
          span.icon-bar
        a.brand(href="javascript:;")
          span Shengyi
        // start: Header Menu
        .nav-no-collapse.header-nav
          ul.nav.pull-right
            // start: User Dropdown
            li.dropdown
              a.btn.dropdown-toggle(data-toggle="dropdown", href="#")
                i.halflings-icon.white.user
                span.uname.overHid {{userName}}
                |  
                span.caret 
              |  
              ul.dropdown-menu.manageMenu
                li
                  a(@click='setSessionNull()')
                    i.halflings-icon.off
                    |  Logout
                //- ul.dropdown-menu
                  li.dropdown-menu-title
                    span Account Settings
                  |  
                  li
                    a(href="#")
                      i.halflings-icon.user
                      |  Profile
                  |  
                  li
                    a(href="login.html")
                      i.halflings-icon.off
                      |  Logout
                // end: User Dropdown
                // end: Header Menu
                // start: Header
  .container-fluid-full
    .row-fluid
      // start: Main Menu
      #sidebar-left.span2
        #testid.sidebar-nav.collapse.navbar-collapse
          ul.nav.nav-tabs.nav-stacked.main-menu
            li
              //- router-link.toPorlist(:to='"/manage/proList/"+pageSize+"/"+pageNum.prolistPageNum')
              router-link.toPorlist(to="/manage/MProducts")
                //- i.icon-bar-chart
                span.hidden-tablet  商品列表
            |  
            //- li
              a(href="/manage/uploadImg")
                i.icon-dashboard
                span.hidden-tablet  添加商品
            |  
            li
              router-link.toUserlist(to="/manage/userList")
                //- i.icon-envelope
                span.hidden-tablet  用户列表
            |  
            li
              router-link.toSortslist(to="/manage/sortsList")
                //- i.icon-tasks
                span.hidden-tablet  分类列表
            |  
            li
              router-link.toCompList(to="/manage/aboutUs")
                //- i.icon-eye-open
                span.hidden-tablet  公司介绍
            |  
      template
        router-view
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
</template>

<script>
import './assets/js/lib/custom.js'
  export default {
    name: 'manageLayout',
    data(){
      return{
        userName:''
      }
    },
    created(){
      /*var pageNumNames = ['prolistPageNum','userPageNum','sortsPageNum','compPageNum']
      pageNumNames.forEach(name=>{
        this.pageNum[name] = $.session.get('curPages') ? JSON.parse($.session.get('curPages'))[name] : 1
      })*/      
      //userName
      this.userName = $.session.get('userName')
    },
    methods:{
      setSessionNull(){
        $.session.delete('userName')
        this.$router.push('/login')
      }
    }
  }

</script>

<style lang='css'>

  @import url("./assets/css/bootstrap.css");
  @import url("./assets/css/style.css");
  @import url("./assets/css/bootstrap-responsive.css");
  @import url("./assets/css/style-responsive.css");
  @import url("./assets/css/newManage.css");

  .manageMenu li:hover{
    cursor: pointer;
  }

</style>
