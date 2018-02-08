<template lang="jade">
  #content.span10
    ul.breadcrumb.realtive
      li
        i.icon-home
        |           
        //- a(href="index.html") Home
        |  
        |           
        //- i.icon-angle-right
        | 
      |         
      li
        | 用户列表
      li.addLi.ml
        span.pageDesc
          | 当前页显示数量 : 
        .input-group.searchGroup.inline
          input#setPageSize.form-control.searchInput(name="key", autocomplete="on", type="text",v-model='pageSize',@keypress='setPageSize')
      li.addLi
        router-link(to="/manage/register") 添加用户
    | 
    .box-content.prolist
      p.noInfo(v-if='length == 0') 暂无用户信息
      template(v-else)
        table.table.table-striped.table-bordered.bootstrap-datatable.datatable
          thead
            tr
              th ID
              |                                   
              th 用户名
              //- th 角色
              //-th 密码
              th 操作

          |    
          tbody
            tr.userTr(v-for='user in users') 
              td.userTd.userId(:uid='user.uid') {{user.uid}}
              td.center {{user.val.uname}}
              //- td.center #{JSON.parse(users)[i]['val'].role}
              //- td.center #{JSON.parse(users)[i].pwd}
              td.center
                //- .btn.btn-info.userEdit
                  i.halflings-icon.white.edit
                //- a.btn.btn-danger(href="/manage/delUser/#{userId}")
                  i.halflings-icon.white.trash
                .btn.btn-danger(v-show='length > 1 || pageCount > 1' @click='delConfirmAlert("/api/manage/delUser/"+pageSize+"/"+pageNum+"/"+user.uid)')
                  i.halflings-icon.white.trash
        v-pagination(:total="pageCount" ,:current-page='pageNum' @pagechange="getUserList")

</template>

<script>
  import pagination from "../common/paging.vue"

  export default {
    name:'products',
    data(){
      return {
        pageNum:this.initPageNum('userPageNum'),
        pageCount:-1,
        pageSize:this.initPageSize('userPageSize'),
        users:[],
        length:0,
      }
    },
    components:{
      'v-pagination': pagination,
    },
    created(){
      // this.pageSize = parseInt(localStorage.getItem('pageSize'))
      this.getUserList()
    },
    methods:{
      setPageSize(event){
        if(event.code == 'Enter'){
          this.setCurPageSize('userPageSize',this.pageSize)
          this.getUserList(1)
        }
      },
      getUserList(curPageNum){
        let curPage = curPageNum || this.pageNum
        this.$http.post('/api/manage/getUser/'+this.pageSize+'/'+curPage).then(res=>{
          let vals = JSON.parse(res.bodyText)
          this.length = vals.length
          if(vals.code == 0){
            this.users = vals.users
            this.pageNum = vals.pageNum
            this.pageCount = vals.pageCount
          }else if(vals.code == -2){
            this.pageNum = vals.pageNum
            this.getUserList()
          }
          this.setCurPage('userPageNum',this.pageNum)
        },err=>{
          this.autoAlert(err.statusText,'red')
        })
      },
      delConfirmAlert(url){
        this.delConfirm(url,this.getUserList)
      },
      
    },
  }
</script>

<style scoped>
  /*@import url("../../assets/css/style-responsive.css");*/
</style>
