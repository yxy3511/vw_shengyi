<template lang="jade">
  div
    header
      .container
        .slider-container
          .intro-text
            .intro-lead-in Welcome To Our Family!
            |             
            .intro-heading It's Nice To Meet You
            |             
            a#knowMore.page-scroll.btn.btn-xl(href="#about") Know More！
    |     
    section#about.light-bg
      .container
        .row
          .col-lg-12.text-center
            .section-title
              h2 view mode
                //- a(href="/aboutUs") ABOUT US
              |               
              p
                | We don't make shoes, but factory porters.
        |         
        .row
          .col-md-6.text-center
            //- a.noLine(href='/atlas')
            router-link.noLine(to="/atlas")
              .mz-module-about.fs-7
                i.fa.fa-photo.ot-circle
                //- span.glyphicon.glyphicon-screenshot
                //- i.fa.fa-camera-retro.ot-circle
                | 
                h3 随便看看(atlas)
            |               
            p 通过查看图片，了解、选择产品。

          .col-md-6.text-center
            a.noLine(href='#portfolio') 
              .mz-module-about.fs-7
                i.fa.fa-crosshairs.ot-circle
                |        
                h3 有目标的查看
            |               
            p 看自己感兴趣的产品。
    |     
    section#portfolio
      .container
        .row
          .col-lg-12.text-center
            .section-title
              h2
                router-link(to="/products/0") Products
              |             
              p
                | There is no perfection in the world, but we are always pursuing perfection.
        |   
        .imgsList
          .centerDiv
            // start portfolio item
            router-link.imgcard(:to="'/proDesc/'+pro['pid']" v-for='pro in proList' )
              .ot-portfolio-item
                figure.effect-bubba
                  img.img-responsive.lazyload(class="lazyload" ,:src='JSON.parse(pro.imgs)[0]', :data-original='JSON.parse(pro.imgs)[0]'  alt="img02")
                  //- img.img-responsive.lazyload(src='../assets/images/addBg.png', :data-original='JSON.parse(pro.imgs)[0]'  alt="img02")
                  //- img.img-responsive.lazyload(:src='JSON.parse(pro.imgs)[0]'  alt="img02")
                  |               
                  figcaption
                    h2 {{pro.pname}}
                    |                 
                    p {{pro.desc_txt}}
            //- a.imgcard(href="/api/products/0")
            //-   .ot-portfolio-item
            //-     figure.effect-bubba
            //-       img.img-responsive.lazyload(data-original='../assets/images/addBg.png' src="../assets/images/addBg.png", alt="img02")
            //-       |               
            //-       figcaption
            //-         h2 Leather Shoes
            //-         |                 
            //-         p Leather manufacturing
            //- a.imgcard(href="/api/products/0")
            //-   .ot-portfolio-item
            //-     figure.effect-bubba
            //-       img.img-responsive.lazyload(data-original='../assets/images/addBg.png' src="../assets/images/addBg.png", alt="img02")
            //-       |               
            //-       figcaption
            //-         h2 Leather Shoes
            //-         |                 
            //-         p Leather manufacturing
            //- a.imgcard(href="/api/products/0")
            //-   .ot-portfolio-item
            //-     figure.effect-bubba
            //-       img.img-responsive.lazyload(data-original='../assets/images/addBg.png' src="../assets/images/addBg.png", alt="img02")
            //-       |               
            //-       figcaption
            //-         h2 Leather Shoes
            //-         |                 
            //-         p Leather manufacturing
    |     
    p#back-top
      a(href="#top")
        i.fa.fa-angle-up

</template>

<script>
  import {getProducts} from '../assets/js/init.js'
  export default {
    name: 'home',
    data(){
      return {
        proList:{}
      }
    },
    mounted(){
      this.getPro()
    },
    components: { 
      'header-page':this.headerPage,
      'footer-page':this.footerPage
    },
    methods:{
      getPro(){
        getProducts().then((res)=>{
          
          this.proList = res['vals']
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
