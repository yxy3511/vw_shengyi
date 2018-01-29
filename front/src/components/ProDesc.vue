<template lang="jade">
  section.proDescPage.content
    .container.bindWidth
      //- .row
      //-   .col-lg-7.text-center
      //-     .section-title
      //-       h2 Our Partners
      //-       |               
      //-       p Mida sit una namet, cons uectetur adipiscing adon elit.
      //- |         
      //- .row
      //-   #carousel.col-lg-12.text-center
      //-     .owl-carousel.owl-theme.owl-loaded
      //-       .owl-stage-outer
      //-         .owl-stage
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-1.png", alt="partners")
      //-             |               
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-2.png", alt="partners")
      //-             |               
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-3.png", alt="partners")
      //-             |               
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-4.png", alt="partners")
      //-             |               
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-5.png", alt="partners")
      //-             |               
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-6.png", alt="partners")
      //-             |               
      //-             .owl-item
      //-               .item
      //-                 .partner-logo
      //-                   img(src="images/demo/partners-7.png", alt="partners") 
      //- ul
      //-   -for(var n in JSON.parse(imgs))
      //-     if( n == 0)
      //-       li #{n}
      //-       li #{pid}
      //-       li #{pname}
      //-       li #{JSON.parse(imgs)[n]}
      //- .row  
      //-   #middleBox1 
      //-     #middleBox 
      //-       .carousel.slide.col-md-7(data-ride="carousel")
      //-         // Indicators
      //-         ol.carousel-indicators
      //-             -for(var i in JSON.parse(imgs))
      //-               - var classTxt = 'slide_'+i
      //-               if(i == 0)
      //-                 li.active.slide-one.slidLi(class=classTxt, data-target="#carousel-example-generic", data-slide-to=i)
      //-                   img.slidImg(src="#{JSON.parse(imgs)[i]}", alt="yxy")
      //-               else
      //-                 li.slide-two.slidLi(class=classTxt, data-target="#carousel-example-generic", data-slide-to=i)
      //-                   img.slidImg(src="#{JSON.parse(imgs)[i]}", alt="yxy")
      //-           //- |     
      //-           //- li.slide-two(data-target="#carousel-example-generic", data-slide-to="1")
      //-           //- |     
      //-           //- li.slide-three(data-target="#carousel-example-generic", data-slide-to="2")
      //-         // Wrapper for slides
      //-         .carousel-inner(role="listbox")
      //-           -for(var i in JSON.parse(imgs))
      //-             if(i == 0)
      //-               .item.active.carouselImg
      //-                 img(src="#{JSON.parse(imgs)[i]}", alt="yxy")
      //-                 |       
      //-                 .carousel-caption
      //-                   //- | 图片1
      //-             -else
      //-               .item.carouselImg
      //-                 img(src="#{JSON.parse(imgs)[i]}", alt="yxy")
      //-                 |       
      //-                 .carousel-caption
      //-                   //- | 图片2


      //-         // Controls
      //-         a.left.carousel-control(href="#carousel-example-generic", role="button", data-slide="prev")
      //-           span.glyphicon.glyphicon-chevron-left(aria-hidden="true")
      //-           |     
      //-           span.sr-only Previous
      //-         |   
      //-         a.right.carousel-control(href="#carousel-example-generic", role="button", data-slide="next")
      //-           span.glyphicon.glyphicon-chevron-right(aria-hidden="true")
      //-           |     
      //-           span.sr-only Next  
      //-       .proDesc.col-md-5
      //-         .skills-text
      //-           h2 #{pname}
      //-           |               
      //-           p  
      //-             | ￥#{price.toFixed(2) }
      //-           pre
      //-             | #{desc_txt}
      .row.atlasRow 
        .htmleaf-container.proDetail.col-md-7
          .htmleaf-content.bgcolor-3
            ul.pgwSlideshow
              //- li(v-for='img in pro.imgs')
              li(v-for='img in pro.imgs') 
                img(:src="img")
            div(style="text-align:center;clear:both")
        .proDesc.col-md-5
          .skills-text
            h2 {{pro.pname}}
            |               
            //- p  
              | ￥#{price.toFixed(2) }
            pre
              | {{pro.desc_txt}}

      //- .row.atlasRow 
        .htmleaf-container.proDetail.col-md-7
          .htmleaf-content.bgcolor-3
            ul.pgwSlideshow
              -for(var i in JSON.parse(imgs))
                li
                  //- img(src="#{JSON.parse(imgs)[i]}", alt="San Francisco, USA", data-description="Golden Gate Bridge")
                  img(src="#{JSON.parse(imgs)[i]}")

            div(style="text-align:center;clear:both")
        .proDesc.col-md-5
          .skills-text
            h2 #{pname}
            |               
            //- p  
              | ￥#{price.toFixed(2) }
            pre
              | #{desc_txt}

</template>

<script>
  // import {setUrlAct,getSortsList} from '../assets/js/init.js'
  import {getProById} from '../assets/js/proDesc.js'
  import "../assets/js/lib/pgwslideshow.js"
  // require('../assets/js/contact.js')
  export default {
    name: 'contact',
    data(){
      return{
        pro:{}
      }
    },
    mounted(){
      // this.setUrlAct()
      // pgw.reload({});
      this.getOnePro(this.$route.params.id).then((res)=>{
        $('.pgwSlideshow').pgwSlideshow({
          // transitionEffect:'fading',
          autoSlide:true
        });
      })
    },
    methods: {
      getOnePro(param){
        // getProById(param.id)
        return getProById(param).then(res=>{
          console.log('getOnePro:',res)
          this.pro = res['vals']
          this.pro.imgs = JSON.parse(res['vals']['imgs'])
          
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
