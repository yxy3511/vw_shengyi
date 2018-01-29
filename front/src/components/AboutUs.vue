<template lang="jade">
    section#aboutMe.light-bg.content
      .container
        .row
          .col-lg-12.text-center
            .section-title
              h2 {{info.title}}
              |               
              p {{info.desc_txt}}
        .row(v-for='(val,index) in info.content')
          template(v-if='index%2 == 0')
            .col-md-3.text-center.marginB
              .mz-module-about.aboutImg
                //- i.fa.fa-briefcase.ot-circle
                img.isLittleImg(:src='val.img')
                |   
            .col-md-9.aboutLeft         
              h3 {{val.title}}
              |               
              pre {{val.value}}
          template(v-else='index%2 != 0')
            // about module
            .col-md-9.aboutLeft         
              h3 {{val.title}}
              |               
              p {{val.value}}
            .col-md-3.text-center.marginB
              .mz-module-about.aboutImg
                //- i.fa.fa-briefcase.ot-circle
                img.isLittleImg(:src='val.img')
                |   
        //- .row
          // about module
          .col-md-9.aboutLeft         
            h3 Web Development
            |               
            p At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          .col-md-3.text-center.marginB
            .mz-module-about.aboutImg
              //- i.fa.fa-briefcase.ot-circle
              img.isLittleImg(src='../assets/images/addBg.png')
              |   
          //- .col-md-12.aboutLeft  
            h3
            pre

</template>

<script>
import {getAboutUs} from '../assets/js/editAboutUs.js'
export default {
  name: 'aboutUs',
  data(){
    return {
      info:{}
    }
  },
  mounted(){
    this.getInfo()
  },
  methods:{
    getInfo(){
      getAboutUs().then(res=>{
        this.info = res.vals
        res.vals.content = JSON.parse(res.vals.content)
        console.log(res)
      },error=>{
        // console.log(error)
        this.autoAlert(error.statusText,'red')
        // this.autoAlert(error.responseText,'red')
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
