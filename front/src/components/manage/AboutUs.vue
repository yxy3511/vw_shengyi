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
        | 公司介绍
      li.addLi.ml
        span.pageDesc
          | 当前页显示数量 : 
        .input-group.searchGroup.inline
          input#setPageSize.form-control.searchInput(name="key", autocomplete="on", type="text",v-model='pageSize',@keypress='setPageSize')
      li.addLi
        router-link(to="/manage/editAboutUs") 添加介绍
      //- li.addLi.ml
        a(href="/manage/delAboutus") 清空介绍
    section.manageSection
      .box-content.prolist
        p.noInfo(v-if='length == 0') 暂无公司介绍
        template(v-else)
          table.table.table-striped.table-bordered.bootstrap-datatable.datatable
            thead
              tr
                th ID
                |                                   
                th 大标题
                |                                   
                th 概述
                |                                   
                //- th 价格
                |                                   
                //- th 描述
                |                                   
                //- th 库存
                |                                   
                th 更新日期
                |                                   
                th 操作
            |    
            tbody
              tr(v-for='item in aboutUs') 
                td {{getId(item.id)}}
                //- td #{curId}
                |                                 
                td.center.overHid {{item.title}}
                |                                 
                td.center.overHid {{item.desc_txt}}
                |                                 
                //- td.center ￥#{JSON.parse(vals)[i].price.toFixed(2) }
                |                                 
                //- td.center.overHid #{JSON.parse(vals)[i]['id']}
                |                                 
                td.center {{item.up_date.substring(0,10)}}
                //- td.center #{JSON.parse(vals)[i]['up_date']}
                |                                 
                td.center.opr5
                  router-link.btn.btn-success(:to="'/manage/viewAboutus/'+item.id")
                    i.halflings-icon.white.zoom-in
                  |                                   
                  router-link.btn.btn-info(:to='"/manage/editAboutUs/?id="+item.id')
                    i.halflings-icon.white.edit
                  |                                  
                  //- a.btn.btn-danger(href="/manage/delOneAboutus/?id=#{JSON.parse(vals)[i]['id']}")
                    //- i.halflings-icon.white.trash
                  .btn.btn-danger(v-show='getId(item.id) != "demo"' @click='delConfirmAlert("/api/manage/delOneAboutus/"+pageSize+"/"+pageNum+"/"+item.id)')
                    i.halflings-icon.white.trash
          v-pagination(:total="pageCount" ,:current-page='pageNum' @pagechange="getAboutUs")
</template>

<script>
  import pagination from "../common/paging.vue"

  export default {
    name:'products',
    data(){
      return {
        pageNum:this.initPageNum('compPageNum'),
        pageCount:-1,
        pageSize:this.initPageSize('compPageSize'),
        aboutUs:[],
        length: 0,
      }
    },
    components:{
      'v-pagination': pagination,
    },
    created(){
      // this.pageSize = parseInt(localStorage.getItem('pageSize'))
      this.getAboutUs()
      // var curDate = new Date(JSON.parse(vals)[i]['up_date']).Format("yyyy-MM-dd")
    },
    methods:{
      setPageSize(event){
        if(event.code == 'Enter'){
          this.setCurPageSize('compPageSize',this.pageSize)
          this.getAboutUs(1)
        }
      },
      getId(id){
        if(id > 0){
          return id
        }else{
          return 'demo'
          // return Math.abs(id)
        }
      },
      getAboutUs(curPage){
        let curPageNum = curPage || this.pageNum
        this.$http.post('/api/manage/aboutUs',{
          pageSize:this.pageSize,
          pageNum:curPageNum
        }).then(res=>{
          let vals = JSON.parse(res.bodyText)
          this.length = vals.length
          if(vals.code == 0){
            this.aboutUs = vals.vals
            this.pageNum = vals.pageNum
            this.pageCount = vals.pageCount
          }else if(vals.code == -2){
            console.log('vals:',vals)
            this.pageNum = vals.pageNum
            this.getAboutUs()
          }
          this.setCurPage('compPageNum',this.pageNum)
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
      },
      delConfirmAlert(url){
        this.delConfirm(url,this.getAboutUs)
      },
      
    },
  }
</script>

<style scoped>
  /*@import url("../../assets/css/style-responsive.css");*/
</style>
