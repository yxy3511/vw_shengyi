<template lang="jade">
  #content.span10
    ul.breadcrumb.realtive
      li
        i.icon-home
        |           
        router-link.toUserlist(to="/manage/userList") 用户列表
        |  
        | >          
        //- i.icon-angle-right
        | 
      |         
      li
        | 添加用户
      //- li.addLi
        a(href="/manage/uploadImg") 添加商品
    | 
    section.manageSection
      .container                    
        .logo_box
          //- h3 添加用户
          |                       
          form(@submit.prevent="submit", name="registerForm", method="post")
            .input_outer
              |  
              span.required * 
              |  
              span.u_user
              |                               
              //- input.text(name="rename", style="color: #FFFFFF !important", type="text",autofocus placeholder="请输入账户" autocomplete="off")
              input.text.unameText(v-model="formData.rename", type="text",autofocus placeholder="请输入用户名" autocomplete="off" v-verify='formData.rename')
              |  
              label(class="errorInfo" v-remind="formData.rename")
            |                             
            .input_outer
              |  
              span.required * 
              |  
              span.us_uer
              |                               
              input.text(v-model="formData.repass", style="position:absolute; z-index:100;", value="",onfocus="this.type='password'" type="text", placeholder="请输入密码" autocomplete="off" v-verify='formData.repass')
              |  
              label(class="errorInfo" v-remind="formData.repass")
              //- input.text(name="repass", style="color: #FFFFFF !important; position:absolute; z-index:100;", value="", type="password", placeholder="请输入密码" autocomplete="off")
            |                             
            .input_outer
              |  
              span.required * 
              |  
              span.us_uer
              |                               
              input.text(v-model="formData.againpass", style="position:absolute; z-index:100;", value="",onfocus="this.type='password'" type="text", placeholder="请确认密码" autocomplete="off" v-verify='formData.againpass')
              |  
              label(class="errorInfo" v-remind="formData.againpass")
              //- input.text(name="againpass", style="color: #FFFFFF !important; position:absolute; z-index:100;", value="", type="password", placeholder="请再次输入密码" autocomplete="off")
            |           
            .form-actions.upBtns
              //- button.btn.btn-primary.subBtn(type='button') Save changes
              button.btn.btn-primary.subBtn(type="submit") Save changes
              |                               
              router-link.btn.cancelBtn(to="/manage/userList") Cancel   
</template>

<script>
  export default {
    name:'products',
    data(){
      return {
        pageNum:1,
        pageCount:-1,
        pageSize:-1,
        formData:{
          rename:'',
          repass:'',
          againpass:''
        }
      }
    },
    verify:{
        formData:{
          rename:['need'],
          repass:['need'],
          againpass:['need'],
        }
    },
    created(){
      this.pageSize = parseInt(localStorage.getItem('pageSize'))
    },
    methods:{
      submit(){
        if(!this.$verify.check()){
          return false
        }
        var formData = JSON.stringify(this.formData);
        this.$http.post('/api/manage/registering',formData).then(res=>{
          let code = JSON.parse(res.bodyText).code
          let msg = JSON.parse(res.bodyText).msg
          if(code == 0){
            this.autoAlert(msg,'orange')
            this.setCurPage('userPageNum',1)
            this.$router.push({
              path:'/manage/userList'
            })
          }else{
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
  /*@import url("../../assets/css/style-responsive.css");*/
  .errorInfo{
    /*color: red;*/
    margin-top:-17px;
    margin-left: 60px;
  }
  input.err{
    border-color: red;
  }
  input::-webkit-input-placeholder{
    color:#e5e5e5;
  }
  textarea::-webkit-input-placeholder{
    color:#e5e5e5;
  }
</style>
