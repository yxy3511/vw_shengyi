<template lang="jade">
  section.light-bg.content
    template(v-if='length > 0')
      .container.yumain
        .row(id='product')
          .col-lg-12.text-center
            .section-title
              h2 Products
              |             
              p
                | There is no perfection in the world, but we are always pursuing perfection.
                
              //- .col-lg-3#searchForm
                //- form.form-horizontal(action="", method="get")
                //- span#searchIcon.glyphicon.glyphicon-search
            #searchInput.input-group.search-input-group
                  input#searchIn.form-control(name="key", autocomplete="on", type="text" placeholder='输入要搜索的内容关键字' , v-model='keyVal',@keyup='enterSearch($event)')
                  span#closeIcon.input-group-addon
                    button.bnt
                      //- span.glyphicon.glyphicon-remove
                      span.glyphicon.glyphicon-search
        .imgsList
          .centerDiv
            router-link.imgcard(:to="'/proDesc/'+pro['pid']" v-for='pro in proList' ,:key="pro.id")
              .ot-portfolio-item
                figure.effect-bubba
                  img.img-responsive(class="lazyload", :src='baseUrl+JSON.parse(pro.imgs)[0]["src"]', :data-original='baseUrl+JSON.parse(pro.imgs)[0]["src"]' , :alt="pro.sort")
                  |               
                  figcaption
                    h2.innerLen {{pro.pname}}
                    |                 
                    p.innerLen {{pro.desc_txt}}
    template(v-else)
      .center
          h2.noContent 
            | 暂无商品    
    v-pagination(:total="pageCount" ,:current-page='pageNum' @pagechange="getPro") 
    //- v-pagination
</template>

<script>
  // require('./assets/js/products.js')
  // import {searchPro} from '../assets/js/products.js'
  // import {getProLists} from '../assets/js/init.js'
  // import "../assets/js/lib/pagination.js"
  import pagination from "./common/paging.vue"
  // import pagination from "./common/page/pagination.vue"
  // import app from '../App.vue'
  export default {
    name:'products',
    data(){
      return {
        proList:{},
        keyVal:'',
        pageNum:$.session.get('userPageSize')?parseInt($.session.get('userPageSize')) : 1,
        pageCount:-1,
        length:0,
        page:{
          pageSize:parseInt(localStorage.getItem('usersPageSize')),
          pageNum:this.pageNum
        },
      }
    },
    components:{
      'v-pagination': pagination,
    },
    created(){
      this.getPro(this.pageNum)
      let key = this.getQueryVal('key')
      if(key){
        this.keyVal = key
      }      
    },
    beforeUpdate(){
      // console.log($.session.get('userPageSize'))
      // if(!$.session.get('userPageSize')){
      //   $.session.set('userPageSize',1)
      // }
    },
    methods:{
      //这个方法名要唯一，并和app.vue中一致
      getPro(curNum){
        let id = this.$route.params.id || 0
        this.page.pageNum = curNum || 1
        // this.page.pageSize = parseInt(localStorage.getItem('usersPageSize'))
        // console.log(33,this.page)
        this.$http.post('/api/products/'+id,{
          pageNum:this.page.pageNum,
          pageSize:this.page.pageSize
        }).then((res)=>{
          // console.log('hahahres:',res)
          res = res.body
          this.length = res.length
          if(res.code == 0){
            this.pageNum = res.pageNum
            this.pageCount = res.pageCount
            if(res['vals']){
              this.proList = res['vals']
            }
            let msg = res['msg']
            if(msg){
              this.autoAlert(msg,'orange')
            }
          }else if(res.code == -2){
            this.pageNum = res.pageNum
            this.getPro(this.pageNum)
          }else{
            // console.log(res)
            this.pageNum = res.pageNum
            this.pageCount = res.pageCount
          }
          $.session.set('userPageSize',this.pageNum)
        },error=>{
          // this.autoAlert(error.statusText,'red')
        })
      },
      getQueryVal(key){
        return this.$route.query[key]
      },
      enterSearch(event){
        if(event.key == 'Enter' && this.keyVal.length > 0){
          // this.keyVal = $('#searchIn').val()
          this.$http.post('/api/proSearch',{
            key:this.keyVal,
            pageNum:1,
            pageSize:this.page.pageSize
          }).then(res=>{
            res = res.body
            this.pageNum = res.pageNum || this.pageNum
            this.pageCount = res.pageCount || this.pageCount
            if(res.vals){
              this.proList = res.vals
            }
            let msg = res['msg']
            if(msg){
              this.autoAlert(msg,'orange')
            }
          },error=>{
            // this.autoAlert(error.statusText,'red')
          })
        }else if(event.key == 'Enter' && this.keyVal.length == 0){
          this.getPro()
        }
       
      }
    },
  }
</script>

<style scoped>

</style>
