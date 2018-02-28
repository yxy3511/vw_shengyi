<template lang='jade'>
    .container-fluid-full
      .row-fluid
        .row-fluid
          .login-box
            .icons
              //- router-link(to="/page")
                i.halflings-icon.home
              |                         
              //- a(href="#")
                i.halflings-icon.cog
            |                   
            h2 Login to your account
            |                   
            form.form-horizontal#loginForm(@submit.prevent="submit" name='loginForm' method="post")
              fieldset
                .input-prepend(title="Username")
                  span.add-on
                    i.halflings-icon.user
                  |                                 
                  input.uname.input-large#username(name="uname", type="text", autofocus placeholder="请输入用户名" v-model='formData.uname')
                |                           
                .clearfix
                |                           
                .input-prepend(title="Password")
                  span.add-on
                    i.halflings-icon.lock
                  |                                 
                  input#password.input-large.pwd(name="pwd", type="text", onfocus="this.type='password'", placeholder="请输入密码" v-model='formData.pwd')
                |                           
                .clearfix
                |                           
                |                           
                label.remember(for="remember")
                  input#rmbUser(type="checkbox" @click='setRemember()')
                  | Remember me
                |                           
                .button-login
                  button.btn.btn-primary(type="submit") Login
                |                           
                .clearfix.bm

</template>
<script>
  // import '../assets/css/bootstrap-responsive.min.css'
  // import '../assets/css/styles.css'
  import {decode,encode} from '../assets/js/lib/base64.js'
  export default{
      name:'login',
      data(){
        return{
          isRmb:false,
          formData:{
            uname:'',
            pwd:''
          },
        }
      },
      created(){
        this.$http.post('/api/login').then(res=>{
          console.log('res:',res)
        })
      },
      mounted(){
        // var minHeight = $(document).height()
        var minHeight = $(window).height()
        $(".container-fluid-full").height(minHeight)
        //是否记住密码
        this.setInitVal()
        this.isRmb = JSON.stringify(localStorage.getItem("rmbUser")) == 'null' ? 0 : parseInt(localStorage.getItem("rmbUser"))
      },
      methods:{
        setInitVal(){
          //删除session
          // this.$http.get('/api/login')
          if(parseInt(localStorage.getItem("rmbUser"))) { 
                $("#rmbUser").attr("checked", true); 
                $(".pwd").attr('type','password')
                // $(".us_uer").append("<input name='pwd', class = 'pwd text', style='color: #FFFFFF !important; position:absolute; z-index:100;', value="", type='password', placeholder='请输入密码'/>"); 
                // $("#password").val($.cookie("password"));
                if(localStorage.getItem("useInfo") != 'null'){
                  let uname = JSON.parse(localStorage.getItem("useInfo")).uname
                  // var b = new Base64()
                  let pass = decode(JSON.parse(localStorage.getItem("useInfo")).pwd)
                  //赋值
                  // $('.uname').val(uname)
                  // $('.pwd').val(pass)
                  this.formData.uname = uname
                  this.formData.pwd = pass
                }else{
                  //清空
                  // $('.uname').val('')
                  // $('.pwd').val('')
                  this.formData.uname = ''
                  this.formData.pwd = ''
                  $(".pwd").attr('type','text')
                }
            }else{
              $("#rmbUser").attr("checked",false); 
            }
        },
        setRemember(){
          if(this.isRmb == 0){
            this.isRmb = 1
          }else{
            this.isRmb = 0
          }
        },
        saveVal(){
          if(this.isRmb){
            // var b = new Base64();  
            // var pass = encode($('.pwd').val());  
            // let useInfo = {'uname':$('.uname').val(),'pwd':pass}
            let pass = encode(this.formData.pwd)
            let useInfo = {'uname':this.formData.uname,'pwd':pass}
            localStorage.setItem("useInfo",JSON.stringify(useInfo)) 
          }else{
            localStorage.setItem("useInfo",null)
          }
          localStorage.setItem("rmbUser",this.isRmb) 
        },
        submit(){
          this.saveVal()
          var formData = JSON.stringify(this.formData); // 这里才是你的表单数据
          this.$http.post('/api/logging',formData).then((res) => {
              // success callback
              let msg = JSON.parse(res.bodyText).msg
              let code = JSON.parse(res.bodyText).code
              if(code != 0){
                this.autoAlert(msg,'orange')
              }else{
                // this.$router.push({
                //   path:'/manage/MProducts'
                // })
                $.session.set('userName', this.formData.uname)
                this.$router.replace({
                  path: '/manage/MProducts',
                })
              }
              
          }, (err) => {
              // error callback
              this.autoAlert(err.statusText,'red')
          });
          /*$.ajax({
            url:this.actionUrl,
            data:{
              uname: $('.uname').val(),
              pwd: $('.pwd').val()
            },
            type:'POST',
            dataType:'JSON',
            success:(res)=>{
              console.log('res:',res)
            },
            error:(err)=>{
              this.autoAlert(err.statusText,'red')
            }
          })*/
        }
      }
  }
</script>

<!--     @import url('../assets/css/bootstrap-responsive.min.css');
    @import url('../assets/css/styles.css');
    @import url('../assets/css/style-responsive.css'); -->
<style scoped lang='scss'>
  @import '../assets/css/bootstrap-responsive.min.css';
  /*@import url("../assets/css/styles.css");*/
  @import '../assets/css/style-responsive.css';
  .container-fluid-full{
    background: url(../assets/images/bg-login.jpg);
    .login-box h2{
      color: #646464;
      margin-left: 30px;
      font-family: monaco;
      font-weight: normal;
      line-height: 28px !important;
      font-size: 16px;
    }
    input:focus{
      outline: none;  
    }
    input.input-large{
      height:45px;
      line-height: 45px;
      width:80%;
    }
    span.add-on{
      height:45px;
      line-height: 45px;
      background-color: transparent;
      i{
        margin-top: 10px;
      }
    }
    label.remember{
      font-size: 14px;
      font-weight: normal;
      input#rmbUser{
        margin-top: 0px;
      }
    }
    .btn:hover,.btn:focus,.btn:active{
      background-color: #585858;
      border-color: #585858;
      outline: none;
    }
    .bm{
      margin-bottom: 30px;
    }
  }

  
    
    
</style>