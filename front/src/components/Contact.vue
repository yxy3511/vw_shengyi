<template lang="jade">
  section
    .container
      .row
        .col-lg-12.text-center
          .section-title
            h2 Contact Us
      |         
      //- .row
      //-   .col-md-5
      //-     h3 Our Business Office
      //-     |             
      //-     p 3422 Street, Barcelona 432, Spain, New Building North, 15th Floor
      //-     |             
      //-     p
      //-       i.fa.fa-phone
      //-       |  +101 377 655 22125
      //-     |             
      //-     p
      //-       i.fa.fa-envelope
      //-       |  mail@yxy3511.com
      //-   |           
      //-   .col-md-3
      //-     h3 Business Hours
      //-     |             
      //-     p
      //-       i.fa.fa-clock-o
      //-       |  
      //-       span.day Weekdays:
      //-       span 9am to 8pm
      //-     |             
      //-     p
      //-       i.fa.fa-clock-o
      //-       |  
      //-       span.day Saturday:
      //-       span 9am to 2pm
      //-     |             
      //-     p
      //-       i.fa.fa-clock-o
      //-       |  
      //-       span.day Sunday:
      //-       span Closed
        |   
      //- .row        
      //-   .col-md-12
      //-     form#contactForm(name="sentMessage", novalidate="")
      //-       .row
      //-         .col-md-6
      //-           .form-group
      //-             input#name.form-control(type="text", placeholder="Your Name *", required="", data-validation-required-message="Please enter your name.")
      //-             |                     
      //-             p.help-block.text-danger
      //-         |                 
      //-         .col-md-6
      //-           .form-group
      //-             input#email.form-control(type="email", placeholder="Your Email *", required="", data-validation-required-message="Please enter your email address.")
      //-             |                     
      //-             p.help-block.text-danger
      //-       |               
      //-       .row
      //-         .col-md-12
      //-           .form-group
      //-             textarea#message.form-control(placeholder="Your Message *", required="", data-validation-required-message="Please enter a message.")
      //-             |                     
      //-             p.help-block.text-danger
      //-         |                 
      //-         .clearfix
      //-       |               
      //-       .row
      //-         .col-lg-12.text-center
      //-           #success
      //-           |                   
      //-           button.btn(type="submit") Send Message
      .row#Coolwpimg
        .col-md-4#address
          h3 Our Business Office
          |             
          p Room 1403, building6,shangchengguoji Garden, Fuxia Road, Fuzhou, China
          |             
          p
            i.fa.fa-phone
            |  +86 18060608001
          |             
          p
            i.fa.fa-envelope
            |  cjw@shengyishoes.com
          h3 Business Hours
          |             
          p
            i.fa.fa-clock-o
            |  
            span 9am to 6am ,
            span.day  7 days a week
        .col-md-8
          #allmap(style='height:500px;')

</template>

<script>
  import {setMap} from '../assets/js/init.js'
  // require('../assets/js/contact.js')
  export default {
    name: 'contact',
    mounted(){
      this.setMap()
    },
    methods: {
      setMap(){
        setMap()
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
