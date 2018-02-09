export function getProById(id){
    //获取商品详情
    return $.ajax({
        type : 'get',
        url : '/api/proDesc/'+id,
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            // console.log(111,JSON.parse(re.vals))
            // return re
            console.log(re);
        },
        error:function(re){
            // alert(JSON.stringify(re))
            // console.log(window)
            // window.autoAlert(JSON.stringify(re),'red')
            console.log(re);
        }

    }); 

}

export function getAtlas(){
    return $.ajax({
        type : 'get',
        url : '/api/atlas',
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            // console.log(111,JSON.parse(re.vals))
            // return re
            console.log(re);
        },
        error:function(re){
            // alert(JSON.stringify(re))
            // console.log(window)
            // window.autoAlert(JSON.stringify(re),'red')
            console.log(re);
        }

    }); 
}