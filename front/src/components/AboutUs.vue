<template lang="jade">
    section#aboutMe.light-bg.content
      .container
        .row
          .col-lg-12.text-center
            .section-title
              h2 {{info.title}}
              |               
              p {{info.desc_txt}}
        .row.yu_center
          .noWidth
            .yu_row(v-for='(val,index) in info.content')
              template(v-if='index%2 == 0')
                .text-center.marginB(v-show='val.img.src')
                  .mz-module-about.aboutImg
                    //- i.fa.fa-briefcase.ot-circle
                    img.isLittleImg.lazyload(:src='baseUrl+val.img.src' ,:data-original='baseUrl+val.img.src')
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
                    img.isLittleImg.lazyload(:src='baseUrl+val.img.src' ,:data-original='baseUrl+val.img.src')


</template>

<script>
import {getAboutUs} from '../assets/js/editAboutUs.js'
export default {
  name: 'aboutUs',
  data(){
    return {
      info:{},
    }
  },
  mounted(){
    this.getInfo()
  },
  // updated(){
  //   this.setNaturalImg('.isLittleImg')
    
  // },
  beforeUpdate(){
    setTimeout(()=>{
      this.setNaturalImg('.isLittleImg')
    },100);
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
