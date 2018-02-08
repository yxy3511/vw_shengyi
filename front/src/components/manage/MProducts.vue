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
        .toProlist 商品列表
      li.addLi.mml
        span.pageDesc
          | 当前页显示数量 : 
        .input-group.searchGroup.inline
          input#setPageSize.form-control.searchInput(name="key", autocomplete="on", type="text",v-model='pageSize',@keypress='setPageSize')
      li.addLi.ml
        .input-group.searchGroup
          input#inputKey.form-control.searchInput(name="key", autocomplete="on", type="text", placeholder="输入商品名或描述回车搜索" @keypress='searchPro')
      li.addLi
        router-link(to="/manage/MEditPro") 添加商品
    | 
    .box-content.prolist
      p.noInfo(v-if='length == 0') 暂无商品信息
      //- p.noInfo(v-if='JSON.stringify(products) == "{}" || !products') 暂无商品信息
      table.table.table-striped.table-bordered.bootstrap-datatable.datatable(v-else)
        thead
          tr
            th ID
            |                                   
            th 分类
            |                                   
            th 商品名
            |                                   
            //- th 价格
            |                                   
            th 描述
            |                                   
            //- th 库存
            |                                   
            th 更新日期
            |                                   
            th 操作
        |    
        tbody
          tr(v-for='item in products')
            td {{item.pid}}
            //- td #{curId}
            |                                 
            td.center {{sorts[item.sort]}}
            |                                 
            td.center {{item.pname}}
            |                                 
            //- td.center ￥#{JSON.parse(vals)[i].price.toFixed(2) }
            |                                 
            td.center.overHid {{item.desc_txt}}
            |                                 
            //- td.center
              case JSON.parse(vals)[i].state
                when 1
                  span.label.label-success 销 售
                  //- span.label.label-success #{JSON.parse(vals)[i].state}
                when 2
                  //- span.label.label-warning #{JSON.parse(vals)[i].state}
                  span.label.label-warning 待 售
                when 3
                  //- span.label.label-important #{JSON.parse(vals)[i].state}
                  span.label.label-important 停 售
            |                                 
            td.center {{item.up_date.substring(0,10)}}
            |                                 
            td.center.opr6
              router-link.btn.btn-success(:to='"/manage/descPro/"+item.pid')
                i.halflings-icon.white.zoom-in
              |                                   
              router-link.btn.btn-info(:to='"/manage/editPro/"+item.pid')
                i.halflings-icon.white.edit
              |                                   
              //- a.btn.btn-danger(href="/manage/delPro/#{JSON.parse(vals)[i].pid}")
              .btn.btn-danger(@click='delConfirmAlert("/api/manage/delPro/"+pageSize +"/"+pageNum+"/"+item.pid)')
                i.halflings-icon.white.trash
      v-pagination(:total="pageCount" ,:current-page='pageNum' @pagechange="getProList")             
</template>

<script>
  import {getProList} from '../../assets/js/products.js'
  import pagination from "../common/paging.vue"

  export default {
    name:'products',
    data(){
      return {
        proList:{},
        sorts:{},
        keyVal:'',
        pageNum:this.initPageNum('prolistPageNum'),
        pageCount:-1,
        pageSize:this.initPageSize('prolistPageSize'),
        products:null,
        length:0,
      }
    },
    components:{
      'v-pagination': pagination,
    },
    created(){
      /*if(localStorage.getItem('pageSize')){
          this.pageSize = parseInt(localStorage.getItem('pageSize'))
      }else{
          localStorage.setItem('pageSize',this.defaultPagesize)
          this.pageSize = this.defaultPagesize
      }*/
      var prolistPageNum = -1
      if(!$.session.get('curPages')){
        prolistPageNum = 1
      }else{
        prolistPageNum = JSON.parse($.session.get('curPages'))['prolistPageNum']
      }
      // var prolistPageNum = $.session.get('curPages') ? JSON.parse($.session.get('curPages'))['prolistPageNum'] : 1
      // console.log('pagenum:',prolistPageNum)
      this.getProList(prolistPageNum)
      this.getSort()
    },
    methods:{

      getSort(){
        this.$http.get('/api/manage/uploadImg').then(res=>{
          let val = JSON.parse(res.bodyText)
          this.sorts = val.sorts
          // if(this.curSort > 0) return 
          // //设置sort初始值

          // for(let sort in this.sorts){
          //   if(this.pid > 0 ){
          //     if(this.proList.sort && sort == this.proList.sort){
          //       this.curSort = this.sorts[sort]
          //       break
          //     }
          //   }else{
          //     this.curSort = this.sorts[sort]
          //     break
          //   }
          // }
        })
      },
      delConfirmAlert(url){
        this.delConfirm(url,this.getProList)
      },
      getProList(prolistPageNum){
          let pn = prolistPageNum ? prolistPageNum : this.pageNum
          //搜索商品
          this.$http.post('/api/manage/proList/'+this.pageSize+'/'+pn).then(res=>{
            var code = JSON.parse(res.bodyText).code
            let val = JSON.parse(res.bodyText)
            this.length = val.length
            if(code == 0){
              this.pageCount = val.pageCount
              this.pageNum = val.pageNum
              this.products = val.vals
            }else if(code == -2){
              this.pageNum = val.pageNum
              this.getProList()
            }
            this.setCurPage('prolistPageNum',this.pageNum)
          },err=>{
            this.autoAlert(err.statusText,'red')
          })
      },
      setPageSize(event){
        if(event.code == 'Enter'){
          this.setCurPageSize('prolistPageSize',this.pageSize)
        //   localStorage.setItem('pageSize',this.pageSize)
        //   // window.location = '/manage/proList/'+pageSize+'/1'
          this.getProList(1)
        }
      },
      searchPro(event){
         if(event.code == 'Enter'){
            let keyVal = $('#inputKey').val();
            this.$http.post('/api/manage/searchPro/'+this.pageNum+'/'+this.pageSize+'/?key='+keyVal).then(res=>{
              var val = JSON.parse(res.bodyText)
              if(val.vals){
                this.pageCount = val.pageCount
                this.pageNum = val.pageNum
                this.products = val.vals
              }
              if(val.msg){
                this.autoAlert(val.msg,'orange')
              }
            },err=>{
              this.autoAlert(err.statusText,'red')
            })
        } 
      }
      
    },
  }
</script>

<style scoped>
  /*@import url("../../assets/css/style-responsive.css");*/
</style>
