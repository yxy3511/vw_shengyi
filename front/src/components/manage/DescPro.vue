<template lang="jade">
  #content.span10
    ul.breadcrumb.realtive
      li
        i.icon-home
        |           
        router-link.toProlist(to="/manage/MProducts") 商品列表
        |  
        | >          
        //- i.icon-angle-right
        | 
      |         
      li
        | 商品详情
      li.addLi
        router-link(:to='"/manage/editPro/"+pid') 编辑商品
    |         
    section.proDescPage.manageSection
      .container.bindWidth
        .row.atlasRow 
          .htmleaf-container.proDetail.col-md-7
            .htmleaf-content.bgcolor-3
              ul.pgwSlideshow
                li(v-for='img in imgs')
                  //- img(src="#{JSON.parse(imgs)[i]}", alt="San Francisco, USA", data-description="Golden Gate Bridge")
                  img(:src="baseUrl+img.src")

              div(style="text-align:center;clear:both")
          .proDesc.col-md-5
            .skills-text
              h2
                |  {{vals.pname}}        
              //- p  
                | ￥#{price.toFixed(2) }
              pre
                |  {{vals.desc_txt}}
</template>

<script>
 import '../../assets/js/lib/pgwslideshow.js'
  export default {
    name:'proDesc',
    data(){
      return {
        vals:{
          pname:'',
          desc_txt:'',
        },
        imgs:[],
        // baseUrl:'http://localhost:3000',
        pid:-1,
      }
    },
    created(){
        this.getProDesc()
        
    },
    methods:{
      getProDesc(){
        let pid = this.$route.params.id
        this.$http.post('/api/manage/descPro/'+pid).then(res=>{
          let code =  JSON.parse(res.bodyText).code
          if(code == 0){
            this.vals = JSON.parse(res.bodyText).vals
            this.imgs = JSON.parse(this.vals.imgs)
            this.pid = this.vals.pid
            $(document).ready(function() {
              $('.pgwSlideshow').pgwSlideshow({
                // transitionEffect:'fading',
                autoSlide:true
              });
            });
          }
        })
      }
    },
  }
</script>

<style scoped>
  @import url('../../assets/css/pgwSlideshow.css');
</style>


