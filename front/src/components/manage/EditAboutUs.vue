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
        span(v-if='params.id > 0')
          | 编辑介绍
        span(v-else)
          | 添加介绍
    |   
    section.manageSection
      .box-content.upload
        form.form-horizontal(name='aboutUsForm' ,method='post', @submit.prevent="submit")
            fieldset.manageFieldset#getImgIndex
              .control-group(v-show='false')
                label.control-label(for="id") ID
                .controls
                  input#id.span4.typeahead(type="text" name='id' v-model="formData.id")
              .control-group
                label.control-label(for="typeahead") 
                  span.required * 
                  | 介绍页大标题
                .controls
                  input#typeahead.span4.typeahead(type="text" v-model='formData.title' value="title")
                  //- p.help-block Start typing to activate auto complete!
              .control-group.hidden-phone
                label.control-label(for="desc_txt") 
                  span.required * 
                  | 介绍页描述
                .controls
                  textarea#desc_txt.span66(name='desc_txt' class='cleditor' rows='8' v-model.lazy='formData.desc_txt')

              .infoBlock.light-bg(v-for='(item,index) in formData.content')
                .control-group
                  label.control-label(for="curImg") 介绍图片
                  .controls#imgsBox
                    .upload_warp_img
                      .upload_warp_img_div(v-if='item.img')
                        .upload_warp_img_div_top
                          .upload_warp_img_div_text
                            //- | {{image.file.name}}
                            | {{item.img.name}}
                          |             
                          img.upload_warp_img_div_del(src="../../assets/images/del.png", @click="fileDel(index)")
                        |           
                        //- img(:src="image.file.src")
                        img(:src="baseUrl+item.img.src")

                        //- .upload_warp_img_div_bottom
                          .upload_warp_img_div_text
                            | desc
                      #upBox.upload-container.upBox(v-else)
                        .upTex(@click='addImg')
                          span.upIcon
                            span.glyphicon.glyphicon-plus
                            //- i.fa.fa-plus
                          span 点击上传
                        //- input(name='inputFile',id='j_imgfile', type='file', multiple='mutiple',class="fileupload" @change="saveImgs")
                        input#imgFile(name='inputFile', type='file',class="fileupload" @change="fileChange($event,index)")
                        //- input(name='allImg' id='allImg' type='text' style='visibility:hidden' v-model='proList.imgs')

                |     
                .control-group.hidden-phone
                  label.control-label(for="subTile") 介绍小标题
                  |                               
                  .controls
                    input.subTile.span66(name='subTitle' type='text' v-model='item.title') 
                    //- input.subTile.span66(name='subTile' type='text' value="#{subTitle ? subTitle : ''}") 
                |                        
                .control-group.hidden-phone
                  label.control-label(for="info") 介绍详情
                  |                               
                  .controls
                    textarea.info.span66(name='info' class='cleditor' rows='8' v-model.lazy='item.value')            
            .againRow(@click='addContent') 再增加一段
            //- input#allImg(name='allImg' type='text' style='visibility:hidden')
            .form-actions.upBtns
              //- button.btn.btn-primary.subBtn(type='button') Save changes
              button.btn.btn-primary.subBtn(type="submit") Save changes
              |                               
              button.btn.cancelBtn(@click='cancel($event)') Cancel
</template>

<script>
  import pagination from "../common/paging.vue"

  export default {
    name:'products',
    data(){
      return {
        pageNum:1,
        pageCount:-1,
        pageSize:-1,
        params:{},
        formData:{
          id:null,
          title:'',
          desc_txt:'',
          content:[{
            img:null,
            title:'',
            value:''
          }]
        },
        contentTemp:{
          img:null,
          title:'',
          value:''
        },
      }
    },
    components:{
      'v-pagination': pagination,
    },
    created(){
      this.pageSize = parseInt(localStorage.getItem('pageSize'))
      if(this.$route.query.id){
        let curId = this.$route.query.id
        this.params.id = curId
        this.getAbout()
      }
      // /manage/addAboutUs/pageSize/compPageNum
    },
    methods:{
      isComplate(){
        if(this.formData.title.length == 0){
            this.autoAlert('介绍页大标题不能为空！','orange')
            return false
        }else if(this.formData.desc_txt.length == 0){
            this.autoAlert('介绍页描述不能为空！','orange')
            return false
        }
        return true
      },
      submit(){
        if(!this.isComplate()){
          return
        }
        // console.log('formdata:',this.formData)
        this.$http.post('/api/manage/addAboutUs',{
          data:this.formData,
          pageSize:this.pageSize,
          pageNum: this.pageNum,
        }).then(res=>{
          let code = JSON.parse(res.bodyText).code
          let msg = JSON.parse(res.bodyText).msg
          this.autoAlert(msg,'orange')
          if(code == 0 && this.$route.query.id > 0){
            //到详情页
            // this.$router.push({
            //   path:'/manage/descAbout/'+this.$route.query.id
            // })
            this.$router.push({
              path:'/manage/viewAboutus/'+this.params.id
            })
          }else{
            //列表页
            this.$router.push({
              path:'/manage/aboutUs'
            })
          }
        })
      },
      addContent(){
        this.formData.content.push(Object.assign({}, this.contentTemp))
      },
      getAbout(){
        this.$http.post('/api/manage/editAboutUs',this.params).then(res=>{
          console.log('haha:',res)
          let code = JSON.parse(res.bodyText).code
          let vals = JSON.parse(res.bodyText).vals
          if(code == 0){
            vals.content = JSON.parse(vals.content)
            this.formData = vals
            if(this.formData.content.length == 0){
              this.addContent()
            }
            // this.formData.content = JSON.parse(this.formData.content )
            this.pageNum = vals.pageNum ? vals.pageNum  : this.pageNum
            this.pageCount = vals.pageCount ?vals.pageCount : this.pageCount

          }
        })
      },
      fileDel(index) {
          // this.size = this.size - this.proList.imgs[index].file.size;//总大小
          // delete this.formData.content[index].img
          this.formData.content[index].img = null

      },
      addImg(){
        $('#imgFile').click()
      },
      fileChange(el,index) {
          if (!el.target.files[0].size) return;
          var formData = new FormData(document.forms.namedItem("aboutUsForm"));
          this.saveImgs(formData).then(res=>{
            setTimeout(()=>{
              this.formData.content[index].img = res[0]
            },100);
          })
          el.target.value = ''
      },
      saveImgs(formData){
        return $.ajax({
            type : 'post',
            url : '/api/manage/upAboutUs',
            data: formData ,
            processData:false,
            async:false,
            cache: false,  
            contentType: false, 
            success:function(re){
                // creatImgs(re.imgs)                
                // $('#allImg').attr('value',re.allImgs)
            },
            error:function(re){
                // window.autoAlert(JSON.stringify(re),'red')
                // alert(JSON.stringify(re))
                // console.log(re);
            }

        });  
      },
      cancel(e){
        if ( e && e.preventDefault ){
            e.preventDefault(); 
        }else{
            //IE中阻止函数器默认动作的方式 
            window.event.returnValue = false;
        }
        this.$router.push({path:'/manage/aboutUs'})
      }
    },
  }
</script>

<style scoped>
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
      padding: 14px 0 0 14px;
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

    .hello {
      width: 650px;
      margin-left: 34%;
      text-align: center;
    }
</style>
