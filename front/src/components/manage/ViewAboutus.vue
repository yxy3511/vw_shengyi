<template lang="jade">
  #content.span10
    ul.breadcrumb.realtive
      li
        i.icon-home
        |           
        router-link.toComplist(to="/manage/aboutUs") 公司介绍
        |  
        | >          
        //- i.icon-angle-right
        | 
      |         
      li
        | 介绍详情
      li.addLi(v-if='JSON.stringify(vals) != {}')
        router-link(v-if='curId > 0' ,:to='"/manage/editAboutUs/?id="+curId') 编辑介绍
        router-link(v-else ,:to='"/manage/editAboutUs/?id="+curId') 套用此模板
        //- li.addLi
          a(href="/manage/delOneAboutus/?id=#{JSON.parse(vals)['id']}") 删除介绍
    | 
    section.manageSection#aboutMe
      .container(v-if='JSON.stringify(vals) != {}')
        .row
          .mc.wall
            .section-title.text-center
              h2 {{vals.title}}
              |   
              p                        
                span.slevel {{vals.desc_txt}}
        .row.yu_center
          .noWidth
            .yu_row(v-for='(val,index) in content')
              template(v-if='index%2 == 0')
                .text-center.marginB(v-show='val.img.src')
                  .mz-module-about.aboutImg
                    //- i.fa.fa-briefcase.ot-circle
                    img.isLittleImg(:src='baseUrl+val.img.src' )
                    |   
                .aboutLeft         
                  h3 {{val.title}}
                  |               
                  pre {{val.value}}
              template(v-else='index%2 != 0')
                // about module
                .aboutLeft         
                  h3 {{val.title}}
                  |               
                  pre {{val.value}}
                .text-center.marginB(v-show='val.img.src')
                  .mz-module-about.aboutImg
                    //- i.fa.fa-briefcase.ot-circle
                    img.isLittleImg(:src='baseUrl+val.img.src')

      .center(v-else)
        h1.noContent 
          | 暂无介绍
</template>

<script>

  export default {
    name:'products',
    data(){
      return {
        pageNum:1,
        pageCount:-1,
        pageSize:-1,
        curId: -1,
        content:[],
        vals:{}
      }
    },
    created(){
      this.pageSize = parseInt(localStorage.getItem('pageSize'))
      if(this.$route.params.id){
        this.curId = this.$route.params.id
        this.getAbout()
      }
    },
    beforeUpdate(){
      try{
        
        setTimeout(()=>{
          this.setNaturalImg('.isLittleImg')
        },100);
      }catch(err){
        console.log(err)
      }
    },


    methods:{

      getAbout(){
        this.$http.post('/api/manage/viewAboutus',{
          id:this.curId
        }).then(res=>{
          console.log('res:',res)
          let code = JSON.parse(res.bodyText).code
          if(code == 0){
            this.vals = JSON.parse(res.bodyText).vals
            this.content = JSON.parse(this.vals.content)
            // this.formData.content = JSON.parse(this.formData.content )
            this.pageNum = this.pageNum
            this.pageCount = this.pageCount

          }else{
            let msg = JSON.parse(res.bodyText).msg
            this.autoAlert(msg,'orange')
          }
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
      },
    },
  }
</script>


<style scoped>
  #content {
    background-color: #f8f8f8;
  }
  /*.yu_row{
    display: flex;
    align-items: center;
  }
  .yu_center{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .aboutImg{
    margin: 10px;
  }
  .noWidth{
    float: left;
  }*/
 /* .wall{
    width: 100%;
  }
  .slevel{
    overflow: hidden;
  }
  .section-title h2{
    height: 45px;
    line-height: 45px;
    margin-bottom: 15px;
  }
  p span.slevel{
    display: inline-block;
    text-align: left;
  }*/
</style>
