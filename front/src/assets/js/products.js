

export function searchPro(keyVal){
    var pageSize = localStorage.getItem('usersPageSize')
    
    //搜索商品
    return $.ajax({
        type : 'get',
        url : '/api/proSearch/?key='+keyVal+'&pageNum=1&pageSize='+pageSize,
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            // console.log(111,JSON.parse(re.vals))
            // return re
        },
        error:function(re){
            
            // console.log(re);
        }

    }); 

}