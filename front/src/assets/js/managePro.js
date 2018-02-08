$(function(){
    //上传图片
    /*$('#j_imgfile').on('change',function(){
        //判断上传控件的选定是否为空，空则返回
        if (document.getElementById("j_imgfile").files.length == 0) return;

        // 判断上传文件类型  
        var imgs = $('#j_imgfile')[0].files
        var imgObj = {}
        for(var i=0;i<imgs.length;i++){
            imgObj[i] = imgs[i].name
        }
        for(var j in imgObj){
            var objType = imgObj[j].substring(imgObj[j].lastIndexOf(".")).toLowerCase();
            if(!(objType == '.jpg'||objType == '.png')){
                // alert("请上传jpg、png类型图片");
                window.autoAlert("请上传jpg、png类型图片",'orange')
                return false;
            }
        }
        // var objFile = $('#j_imgfile').val();
        // var objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
        var formData = new FormData(document.forms.namedItem("picForm"));
        $.ajax({
            type : 'post',
            url : '/manage/uploading',
            data: formData ,
            processData:false,
            async:false,
            cache: false,  
            contentType: false, 
            success:function(re){
                creatImgs(re.imgs)                
                $('#allImg').attr('value',re.allImgs)
            },
            error:function(re){
                window.autoAlert(JSON.stringify(re),'red')
                // alert(JSON.stringify(re))
                console.log(re);
            }

        });    
        
    })*/
})