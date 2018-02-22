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
        | 分类列表
      li.addLi.ml
        span.pageDesc
          | 当前页显示数量 : 
        .input-group.searchGroup.inline
          input#setPageSize.form-control.searchInput(name="key", autocomplete="on", type="text",v-model='pageSize',@keypress='setPageSize')
      li.addLi.txtAddSort(@click='showInput($event)')
        | 添加分类
    | 
    .box-content.prolist
          p.noInfo(v-if='length == 0 && !isAdd') 暂无商品分类
          template(v-else)
            table.table.table-striped.table-bordered.bootstrap-datatable.datatable
              thead
                tr
                  th ID
                  |                                   
                  th 类型名
                  th 操作

              |    
              tbody
                tr(v-show='isAdd')
                  td.newId {{bId}}
                  |                                 
                  td.center.tc
                    input.addSortName(type='text' v-model='newSortName' placeholder='点击输入类别名称' ) 
                  td.center
                    .btn.btn-info.addSort(@click='addSort')
                      i.halflings-icon.white.edit
                      | 添加
                tr.sortTr(v-for='sort in sorts')
                  td {{sort.id}}
                  |                                 
                  td.center
                    input.sortName(type='text' v-model='sort.name' disabled) 
                  td.center
                    .btn.btn-danger(@click='delConfirmAlert("/api/manage/delSort/"+pageSize+"/"+pageNum+"/"+sort.id)')
                      i.halflings-icon.white.trash
            v-pagination(:total="pageCount" ,:current-page='pageNum' @pagechange="getSortsVal")
</template>

<script>
  import pagination from "../common/paging.vue"

  export default {
    name:'products',
    data(){
      return {
        pageNum:this.initPageNum('sortsPageNum'),
        pageCount:-1,
        pageSize:this.initPageSize('sortsPageSize'),
        sorts:[],
        newSortName:'',
        bId:-1, 
        isAdd:false,
        length:0,
      }
    },
    components:{
      'v-pagination': pagination,
    },
    created(){
      // this.pageSize = parseInt(localStorage.getItem('pageSize'))
      this.getSortsVal()

    },
    methods:{
      setPageSize(event){
        if(event.code == 'Enter'){
          this.setCurPageSize('sortsPageSize',this.pageSize)
          this.getSortsVal(1)
        }
      },
      getSortsVal(curPage){
        let curPageNum = curPage || this.pageNum
        if(curPageNum != 1){
          this.isAdd = false
        }
        this.$http.post('/api/manage/editSorts/'+this.pageSize+'/'+curPageNum).then(res=>{
          let vals = JSON.parse(res.bodyText)
          this.length = vals.length
          if(vals.code == 0){
            this.sorts = vals.sorts
            this.pageNum = vals.pageNum
            this.pageCount = vals.pageCount
            if(this.sorts.length > 0){
              this.bId = +this.sorts[0].id + 1
            }else{
              this.bId = '新加类别'
            }
          }else if(vals.code == -2){
            this.pageNum  = vals.pageNum
            this.getSortsVal()
          }
          this.setCurPage('sortsPageNum',this.pageNum)
        },err=>{
          this.autoAlert(err.statusText,'red')
        })
      },
      delConfirmAlert(url){
        this.delConfirm(url,this.getSortsVal)
      },
      showInput(event){
        this.isAdd = true
        this.pageNum = 1
        this.getSortsVal()
      },
      addSort(){
        if(this.newSortName.length > 0){

          this.$http.post('/api/manage/addSort',{
            text:this.newSortName,
            pageSize:this.pageSize,
            pageNum:this.pageNum

          }).then(res=>{
            let code = JSON.parse(res.bodyText).code
            let msg = JSON.parse(res.bodyText).msg
            if(code == 0){
              this.isAdd = false
              this.newSortName = ''
              this.autoAlert(msg,'orange')
              this.getSortsVal()
            }else{
              this.autoAlert(msg,'orange')
            }
          },error=>{
            this.autoAlert(error.statusText,'red')
          })
        }else{
          this.autoAlert('添加内容不可为空！','orange')
        }
      }
    },
  }
</script>

<style scoped>
  /*@import url("../../assets/css/style-responsive.css");*/
</style>
