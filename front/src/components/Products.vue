<template lang="jade">
  section.light-bg.content
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
                img.img-responsive(class="lazyload", :src='baseUrl+JSON.parse(pro.imgs)[0]["src"]', :data-original='baseUrl+JSON.parse(pro.imgs)[0]["src"]' , alt="商品图片")
                |               
                figcaption
                  h2 {{pro.pname}}
                  |                 
                  p {{pro.desc_txt}}
          //- a.imgcard(href="/proDesc/3511")
          //-   .ot-portfolio-item
          //-     figure.effect-bubba
          //-       img.img-responsive(class="lazyload" data-original="../assets/images/addBg.png" src="../assets/images/addBg.png", alt="img02")
          //-       |               
          //-       figcaption
          //-         h2 Leather Shoes
          //-         |                 
          //-         p Leather manufacturing
          //- a.imgcard(href="/proDesc/3511")
          //-   .ot-portfolio-item
          //-     figure.effect-bubba
          //-       img.img-responsive(class="lazyload" data-original="../assets/images/addBg.png" src="../assets/images/addBg.png", alt="img02")
          //-       |               
          //-       figcaption
          //-         h2 Leather Shoes
          //-         |                 
          //-         p Leather manufacturing
          //- a.imgcard(href="/proDesc/3511")
          //-   .ot-portfolio-item
          //-     figure.effect-bubba
          //-       img.img-responsive(class="lazyload" data-original="../assets/images/addBg.png" src="../assets/images/addBg.png", alt="img02")
          //-       |               
          //-       figcaption
          //-         h2 Leather Shoes
          //-         |                 
          //-         p Leather manufacturing

      //- .row#d1(v-show='pageCount > 1')
        div.page-contain
          a.goPre(href="")
          .page-box
            a.page-pre(href="")
          a.goNext(href="")
      v-pagination(:total="pageCount" ,:current-page='pageNum' @pagechange="getPro") 
      //- v-pagination
</template>

<script>
  // require('./assets/js/products.js')
  import {searchPro} from '../assets/js/products.js'
  import {getProLists} from '../assets/js/init.js'
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
        pageNum:1,
        pageCount:-1,
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
      this.getPro()
      let key = this.getQueryVal('key')
      if(key){
        this.keyVal = key
      }      
    },
    methods:{
      //这个方法名要唯一，并和app.vue中一致
      getPro(curNum){
        let id = this.$route.params.id || 0
        this.page.pageNum = curNum || 1
        // this.page.pageSize = parseInt(localStorage.getItem('usersPageSize'))
        getProLists(id,this.page).then((res)=>{
          this.pageNum = res.pageNum
          this.pageCount = res.pageCount
          if(res['vals']){
            this.proList = res['vals']
          }
          let msg = res['msg']
          if(msg){
            this.autoAlert(msg,'orange')
          }
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
      },
      getQueryVal(key){
        return this.$route.query[key]
      },
      enterSearch(event){
        if(event.key == 'Enter' && this.keyVal.length > 0){
          // this.keyVal = $('#searchIn').val()
          searchPro(this.keyVal).then(res=>{
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
            this.autoAlert(error.statusText,'red')
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
