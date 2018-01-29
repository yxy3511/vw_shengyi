

var pageNumNames = ['prolistPageNum','userPageNum','sortsPageNum','compPageNum']
var pageNums =  {
    'prolistPageNum':1,
    'userPageNum':1,
    'sortsPageNum':1,
    'compPageNum':1
}
var urls = ['/manage/proList','/manage/getUser','/manage/editSorts','/manage/aboutUs']

//前端网页提示框
export function autoClose(content){
    $.alert({
        title: '提示',
        content: content,
        icon: 'fa fa-exclamation',
        closeIconClass:'null',
        autoClose: 'ok|1000',
        type:'orange',
        animation: 'scale',
        closeAnimation: 'scale',
        buttons: []
    });
}

export function autoAlert(content,type){
    var title = '提示'
    var autoClose = 'ok|1000'

    var icon = ''
    if(type == 'red'){
        icon = 'fa fa-close'
    }else if(type == 'green'){
        icon = 'fa fa-check'
    }else{
        icon = 'fa fa-exclamation'
    }
    
    $.alert({
        title: title,
        content: content,
        icon: icon,
        closeIconClass:'null',
        autoClose: autoClose,
        animation: 'scale',
        type: type,
        closeAnimation: 'scale',
        buttons: []
    });
    
}

// 删除时出现确认框
export function delConfirm(url,index){
    /*window.wxc.xcConfirm('确认删除？', window.wxc.xcConfirm.typeEnum.confirm,{
        onOk:function(){
            success()
        }
    });*/
    $.confirm({
        title:'确定删除？',
        content:'',
        icon: 'fa fa-question',
        theme: 'material',
        closeIcon: true,
        animation: 'scale',
        type: 'orange',
        // escapeKey:'okay',
        buttons: {
            okay: {
                text: '删除',
                btnClass: 'btn-blue',
                action:function(){

                    window.location = returnUrl(url,index)
                    // success()
                    // autoAlert('删除成功！','green')
                    
                }
            },
            cancel: {
                text: '取消',
            }
        }
    });

}

export function resizePic(ThisPic){
    //- console.log(11,$(ThisPic)[0]['naturalHeight'])
    var RePicWidth = -1; //这里修改为您想显示的宽度值
    var standardWidth = 350
    //============以下代码请勿修改==================================

    //- var TrueWidth = ThisPic.width;    //图片实际宽度
    //- var TrueHeight = ThisPic.height;  //图片实际高度
    var TrueWidth = $(ThisPic)[0]['naturalWidth']
    var TrueHeight = $(ThisPic)[0]['naturalHeight']
    if(TrueWidth > standardWidth){
      RePicWidth = standardWidth
    }else{
      RePicWidth = TrueWidth
    }
    var Multiple = TrueWidth / RePicWidth;  //图片缩小(放大)的倍数

    ThisPic.width = RePicWidth;  //图片显示的可视宽度
    ThisPic.height = TrueHeight / Multiple;  //图片显示的可视高度
}

export function setPages(option,showCnt){
    setCurpage(option.page,option.type)
    page(option)
    /*if(pageCount > showCnt){
      page(option)
      $('.page-contain').css('display','block')
    }*/
}


export function setCurpage(num,index){
    // localStorage.setItem('pageNum',num)
    let curPageNums = $.session.get('curPages') ? JSON.parse($.session.get('curPages')) : pageNums
    curPageNums[pageNumNames[index]] = num
    $.session.set('curPages',JSON.stringify(curPageNums))
}

export function returnUrl (urlStr,index){
    var name = pageNumNames[index]
    var pageSize = localStorage.getItem('pageSize')
    var url = urlStr.replace('pageSize',pageSize)
    if(url.indexOf(name) != -1){
        // var pageNum = localStorage.getItem('pageNum') || 1
        var pageNum = $.session.get('curPages') ? JSON.parse($.session.get('curPages'))[name] : 1

        url = url.replace(name,pageNum)
    }
    return url
}
//前后公用
export function setUrl(ele,param,index,isMenu){
    if(index || index == 0){

        var name = pageNumNames[index]
        var pageSize = localStorage.getItem('pageSize') || 10
        var url = ele.attr(param)
        url = url.replace('pageSize',pageSize)
        // console.log('index:',index)
        // console.log('pageNumNames[index]:',pageNumNames[index])
        if(url.indexOf(name) != -1){
            var pageNum = $.session.get('curPages') ? JSON.parse($.session.get('curPages'))[name] : 1
            // console.log(1111,pageNum)
            url = url.replace(name,pageNum)
        }
        // ele.attr(param,url)
        // console.log('url:',url)
        if(url == window.location.pathname && isMenu != -1){
            ele.attr(param,'javascript:;')
        }else{
            ele.attr(param,url)
        }
    }else{
        //网站使用
        let pageNum = 1
        let pageSize = localStorage.getItem('usersPageSize')
        var url = ele.attr(param)
        if(url.indexOf('?') != -1){
            url = url+'&pageNum='+pageNum+'&pageSize='+pageSize
        }else{
            url = url+'/?pageNum='+pageNum+'&pageSize='+pageSize
        }
        ele.attr(param,url)
    }
    
}

//网站使用
export function setFooterWidth(className){
    var widthVal = $(className).css('width')
    $('.footer').css('min-width',widthVal)
}

