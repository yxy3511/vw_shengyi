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
        | 编辑商品
      //- li.addLi
        a(href="/manage/uploadImg") 添加商品
    |    
    section.manageSection
        //-.container-fluid-full
          //- #content.span10            
              //-.row-fluid.sortable
                //-.box.span12
                  //-.box-header(data-original-title="")
                    //-h2
                      //-i.halflings-icon.white.user
                      //-span.break
                      //-| Members  */           
        .box-content.upload
          form.form-horizontal(name='picForm' ,method='post',@submit.prevent="submit" )
              fieldset.manageFieldset
                //- .control-group
                //-   label.control-label(for="typeahead") Auto complete 
                //-   |                               
                //-   .controls
                //-     input#typeahead.span6.typeahead(type="text", data-provide="typeahead", data-items="4", data-source='["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]')
                //-     |                               
                //-     p.help-block Start typing to activate auto complete!
                //- |     
                .control-group
                  label.control-label(for="typeahead") 
                    span.required * 
                    | 商品名称
                  |                               
                  .controls
                    input#typeahead.typeahead.commonInput(type="text" name='pname' v-model="proList.pname" v-verify="proList.pname" placeholder='最多输入20个字符' maxlength=20)
                    |  
                    label(class="errorInfo" v-remind="proList.pname")                        
                    //- span.instructions 最多输入50个字符      
                    //- p.help-block Start typing to activate auto complete!
                |  
                //- .control-group
                  label.control-label(for="price") 商品价格
                  |                               
                  .controls
                    input#price.span4.typeahead(type="number" name='price' value="#{price ? price : '' }")
                |   
                .control-group
                  label.control-label(for="psort") 
                    span.required * 
                    | 商品分类
                  |                               
                  .controls
                    select#psort.form-control(name='sort' v-model='curSort')
                      //- option( selected) sort
                      option(v-for='(sort,index) in sorts' ,:class="{ selected: index == 0 }") {{sort}}
                      //- option(v-for='sort in sorts' ,:class="{ selected: sort == proList.sort }") {{sort}}
                    //- input#psort.span4.typeahead(type="number" name='sort' value="#{sort ? sort : '' }")
                |   
                //- .control-group
                  label.control-label(for="pstate") 商品状态
                  |                               
                  .controls
                    input#pstate.span4.typeahead(type="number" name='state' value="#{state ? state : '' }")
                |                             
                //- .control-group
                //-   label.control-label(for="date01") Date input
                //-   |                               
                //-   .controls
                //-     input#date01.input-xlarge.datepicker(type="text", value="02/16/12")
                //- |                           
                //- .control-group
                //-   label.control-label(for="fileInput") File input
                //-   |                               
                //-   .controls
                //-     input#fileInput.input-file.uniform_on(type="file")
                //- |                           
                //- .control-group
                //-   label.control-label(for="j_imgfile") 商品图片
                //-   .controls
                //-       .upload-container.upImgs
                //-         a(href='#{path0}')
                //-           img.upImg(src="#{path0 ? path0 : '/images/addBg.png' }")
                //-       .input-group-addon.searchAddon.imgDelBtn
                //-         button.searchClose.closeBtn
                //-         span.glyphicon.glyphicon-remove.iconSpan
                //-       .upload-container.upImgs
                //-         img.upImg(src="#{path1 ? path1 : '/images/addBg.png' }")
                //-       .input-group-addon.searchAddon.imgDelBtn
                //-         button.searchClose.closeBtn
                //-         span.glyphicon.glyphicon-remove.iconSpan
                //-       .upload-container.upImgs
                //-         img.upImg(src="#{path2 ? path2 : '/images/addBg.png' }")
                //-       .input-group-addon.searchAddon.imgDelBtn
                //-         button.searchClose.closeBtn
                //-         span.glyphicon.glyphicon-remove.iconSpan
                //-       .upload-container
                //-         .upTex
                //-           span.upIcon
                //-               i.fa.fa-plus
                //-           span 点击上传
                //-         input(name='inputFile',id='j_imgfile', type='file', multiple='mutiple',class="fileupload")
                |          
                .control-group
                  label.control-label(for="j_imgfile") 
                    span.required * 
                    | 商品图片
                  .controls#imgsBox
                    .upload_warp_img
                      .upload_warp_img_div(v-for='(image,index) in proList.imgs')
                        .upload_warp_img_div_top
                          .upload_warp_img_div_text
                            //- | {{image.file.name}}
                            | {{image.name}}
                          |             
                          img.upload_warp_img_div_del(src="../../assets/images/del.png", @click="fileDel(index)")
                        |           
                        //- img(:src="image.file.src")
                        img(:src="baseUrl+image.src")

                        //- .upload_warp_img_div_bottom
                          .upload_warp_img_div_text
                            | desc
                      #upBox.upload-container.upBox(v-show='proList.imgs.length < 5')
                        .upTex(@click='addImg')
                          span.upIcon
                            span.glyphicon.glyphicon-plus
                            //- i.fa.fa-plus
                          span 点击上传
                        //- input(name='inputFile',id='j_imgfile', type='file', multiple='mutiple',class="fileupload" @change="saveImgs")
                        input(name='inputFile',id='j_imgfile', type='file', multiple='mutiple',class="fileupload" @change="fileChange($event)")
                        input(name='allImg' id='allImg' type='text' style='visibility:hidden' v-model='proList.imgs'  v-verify.img='proList.imgs')
                      |  
                      label(class="errorInfo" v-remind="proList.imgs")
                      //- label(class="errorInfo") 哈哈哈
                      
                    //- |  
                    //- div.instructions 最多添加5张图片
                //- .control-group
                  label.control-label(for="j_imgfile") 
                    span.required * 
                    | 商品图片
                  .controls#imgsBox
                    .upload-container.upImgs
                      a(href='#{path0}')
                        img.upImg(src="#{path0 ? path0 : '/images/addBg.png' }")
                    .input-group-addon.searchAddon.imgDelBtn
                      button.searchClose.closeBtn
                      span.glyphicon.glyphicon-remove.iconSpan
                    .upload-container.upImgs
                      img.upImg(src="#{path1 ? path1 : '/images/addBg.png' }")
                    .input-group-addon.searchAddon.imgDelBtn
                      button.searchClose.closeBtn
                      span.glyphicon.glyphicon-remove.iconSpan
                    .upload-container.upImgs
                      img.upImg(src="#{path2 ? path2 : '/images/addBg.png' }")
                    .input-group-addon.searchAddon.imgDelBtn
                      button.searchClose.closeBtn
                      span.glyphicon.glyphicon-remove.iconSpan
                    .upload-container
                      //- script.
                        var imgs = $('#imgsBox').attr('value') ? JSON.parse($('#imgsBox').attr('value')) : null
                        console.log(imgs)
                        // -for(var i in imgs)
                        .upload-container.upImgs
                          a(href='#{imgs[i]}')
                            img#imgId.upImg(src="#{imgs[i] ? imgs[i] : '/images/addBg.png' }")
                      #upBox.upload-container.upBox
                        .upTex(@click='addImg')
                          span.upIcon
                            span.glyphicon.glyphicon-plus
                            //- i.fa.fa-plus
                          span 点击上传
                        input(name='inputFile',id='j_imgfile', type='file', multiple='mutiple',class="fileupload")
                        input(name='allImg' id='allImg' type='text' style='visibility:hidden' v-model='proList.imgs')

                |                           
                .control-group
                  label.control-label(for="textarea") 
                    span.required * 
                    | 商品描述
                  |                               
                  .controls
                    textarea#textarea.span66(name='desc' class='cleditor' rows='8' ,v-model='proList.desc_txt' v-verify='proList.desc_txt' placeholder='最多输入200个字符' maxlength=200 ) 
                    |  
                    //- span.instructions 最多输入200个字符   
                    label(class="errorInfo" v-remind="proList.desc_txt")
                |                           
                .form-actions.upBtns
                  //- button.btn.btn-primary.subBtn(type='button') Save changes
                  button.btn.btn-primary.subBtn(type="submit") Save changes
                  |                               
                  button.btn.cancelBtn(@click='cancel($event)') Cancel
</template>

<script>
  import managePro from '../../assets/js/managePro.js'
  import Vue from "vue";
  import verify from "vue-verify-plugin";
  Vue.use(verify,{
      blur:true,
      rules:{
        need:{
          test:function(val){
                if(val.length == 0) {
                    return false
                }
                return true;
            },
            message:"此处不可为空"
        }
      }
  });
  export default {
    name:'products',
    data(){
      return {
        proList:{
          pname:'',
          imgs:[],
          sort:-1,
          desc_txt:''
        },
        sorts:{},
        curSort:-1,
        baseUrl:'http://localhost:3000',
        pid:0,
      }
    },
    verify:{
        proList:{
          pname:['need',{
            maxLength:20,
            message: "不能大于20个字符"
          }],
          imgs:[{
            maxLength:5,
            message: "最多上传5张图片"
          },{
            minLength:1,
            message: "此处不可为空"
          }],
          desc_txt:['need',{
            maxLength:200,
            message: "不能大于200个字符"
          }]
        }
        // regInfo: {
        //     phone: ["required","mobile"]
        // }
    },
    mounted(){
      this.proList.imgs = []
      this.pid = this.$route.params.id || 0
      if(this.pid > 0){
        this.getProInfo()
      }
      this.getSort()
    },
    methods:{
      getProInfo(){
        this.$http.post('/api/manage/descPro/'+this.pid).then(res=>{
          let code = JSON.parse(res.bodyText).code
          let vals = JSON.parse(res.bodyText).vals
          if(code == 0){
            vals.imgs = JSON.parse(vals.imgs)
            this.proList = vals
          }
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
      },
      // isComplate(){
      //   if(!this.proList.pname){
      //       this.autoAlert('商品名称不能为空！','red')
      //       return false
      //   }else if(this.proList.imgs.length == 0){
      //       this.autoAlert('商品图片不能为空！','red')
      //       return false
      //   }else if(!this.proList.desc_txt){
      //       this.autoAlert('商品描述不能为空！','red')
      //       return false
      //   }
      //   return true
      // },
      getSort(){
        this.$http.get('/api/manage/uploadImg').then(res=>{
          let val = JSON.parse(res.bodyText)
          if(val.length == 0){
            this.autoAlert('请先添加商品分类！','orange')
            this.$router.push({
              path:'/manage/sortsList'
            })
          }
          this.sorts = val.sorts
          if(this.curSort > 0) return 
          //设置sort初始值

          for(let sort in this.sorts){
            if(this.pid > 0 ){
              if(this.proList.sort && sort == this.proList.sort){
                this.curSort = this.sorts[sort]
                break
              }
            }else{
              this.curSort = this.sorts[sort]
              break
            }
          }
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
      },
      getSortIdByName(name){
        for(let id in this.sorts){
          if(this.sorts[id] == name){
            return id
          }
  
        }
      },
      submit(){
        this.$verify.check()
        this.proList.sort = this.getSortIdByName(this.curSort)
        this.$http.post('/api/manage/savePro?id='+this.pid,this.proList).then(res=>{
          // console.log('保存成功：',res)
          let msg = JSON.parse(res.bodyText).msg
          let code = JSON.parse(res.bodyText).code
          if(code == 0){
            this.autoAlert(msg,'orange')
            if(this.pid == 0){
              this.setCurPage('prolistPageNum',1)
            }
            this.$router.push({path:'/manage/MProducts'})
          }
        },error=>{
          this.autoAlert(error.statusText,'red')
        })
        // if(this.isComplate()){
        // }
      },
      addImg(){
        $('#j_imgfile').click()
      },
      fileChange(el) {
          if (!el.target.files[0].size) return;
          var formData = new FormData(document.forms.namedItem("picForm"));
          // this.saveImgs(formData).then(res=>{
          //   console.log('res:',res)
          //   setTimeout(()=>{

          //     res.forEach(img=>{
          //       this.proList.imgs.push(img)
          //     })
          //   },100);
          // })
          this.$http.post('/api/manage/uploading',formData).then(res=>{
            try{
              
              // console.log('res:',res)
              let resVal = JSON.parse(res.bodyText)
              setTimeout(()=>{
                resVal.forEach(img=>{
                  // console.log('img:',img)
                  this.proList.imgs.push(img)
                  //校验图片是否为空
                  this.$verify.check('img')
                })
              },100);
            }catch(err){
              console.log(err)
            }
          },error=>{
            this.autoAlert(error.statusText,'red')
          })
          el.target.value = ''
      },
      // fileList(fileList) {
      //     let files = fileList.files;
      //     for (let i = 0; i < files.length; i++) {
      //         //判断是否为文件夹
      //         if (files[i].type != '') {
      //             this.fileAdd(files[i],i);
      //         } else {
      //             //文件夹处理
      //             this.folders(fileList.items[i]);
      //         }
      //     }
      // },
      // //文件夹处理
      // folders(files) {
      //     let _this = this;
      //     //判断是否为原生file
      //     if (files.kind) {
      //         files = files.webkitGetAsEntry();
      //     }
      //     files.createReader().readEntries(function (file) {
      //         for (let i = 0; i < file.length; i++) {
      //             if (file[i].isFile) {
      //                 _this.foldersAdd(file[i]);
      //             } else {
      //                 _this.folders(file[i]);
      //             }
      //         }
      //     })
      // },
      // foldersAdd(entry) {
      //     let _this = this;
      //     entry.file(function (file) {
      //         _this.fileAdd(file)
      //     })
      // },
      // fileAdd(file,index) {
        
      //     //总大小
      //     this.size = this.size + file.size;
      //     //判断是否为图片文件
      //     if (file.type.indexOf('image') == -1) {
      //         file.src = 'wenjian.png';
      //         this.proList.imgs.push({
      //             file
      //         });
      //     } else {
      //         let reader = new FileReader();
      //         reader.vue = this;
      //         reader.readAsDataURL(file);
      //         reader.onload = function () {
      //             // console.log('result:',this.result)
      //             // file.src = reader.vue.imgSrc[index];
      //             file.src = this.result
      //             reader.vue.proList.imgs.push({
      //                 file
      //             });
      //         }
      //     }
      // },
      fileDel(index) {
          // this.size = this.size - this.proList.imgs[index].file.size;//总大小
          this.proList.imgs.splice(index, 1);
          //校验图片是否为空
          this.$verify.check('img')
      },
      // saveImgs(formData){
      //   /*this.$http.post('/api/manage/uploading',{
      //     data:formData
      //   }).then(res=>{
      //     console.log('uploading:',res)
      //   })*/
      //   return $.ajax({
      //       type : 'post',
      //       url : '/api/manage/uploading',
      //       data: formData ,
      //       processData:false,
      //       async:false,
      //       cache: false,  
      //       contentType: false, 
      //       success:function(re){
      //         console.log(re);
      //           // creatImgs(re.imgs)                
      //           // $('#allImg').attr('value',re.allImgs)
      //       },
      //       error:function(re){
      //         console.log(re);
      //           // window.autoAlert(JSON.stringify(re),'red')
      //           // alert(JSON.stringify(re))
      //           // console.log(re);
      //       }

      //   });  
      // },
      cancel(e){
        if ( e && e.preventDefault ){
            e.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        this.$router.push({path:'/manage/MProducts'})
      }
    },
  }
</script>

<style scoped>
  /*@import url("../../assets/css/style-responsive.css");*/
  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }
  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }
  .upload_warp_img_div_bottom {
    position: absolute;
    bottom: 0;
    width: 102%;
    margin-left: -1px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 100px;
    /*width: 120px;*/
    /*border: 1px solid #ccc;*/
    margin: 0px 30px 10px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
  }

  .upload_warp_img {
    /*border-top: 1px solid #D2D2D2;*/
    padding: 14px 0 0 0px;
    overflow: hidden
  }

  .upload_warp_text {
    text-align: left;
    margin-bottom: 10px;
    padding-top: 10px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }

  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
  }

  .upload_warp_left img {
    margin-top: 32px;
  }

  .upload_warp_left {
    float: left;
    width: 40%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    cursor: pointer;
  }

  .upload_warp {
    margin: 14px;
    height: 130px;
  }

  /* .upload {
    border: 1px solid #ccc;
    background-color: #fff;
    width: 650px;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
  } */
  .instructions{
    color: #E5E5E5;
  }
  .commonInput{
    width: 220px;
  }
  .errorInfo{
    color: red;
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


