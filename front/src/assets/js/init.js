// document.write("<script type='text/javascript' src='.src/assets/js/config.js'></script>");
// require('./assets/js/config.js')
import {Menu,defaultPagesize,defaultUserPagesize,manageMenu} from './config'
$(function() {
    if(localStorage.getItem('usersPageSize')){
        var pageSize = localStorage.getItem('usersPageSize')
    }else{
        localStorage.setItem('usersPageSize',defaultUserPagesize)
        var pageSize = defaultUserPagesize
    }
    // setUrlAct()
     //懒加载
    $(".lazyload").lazyload({
        effect : "fadeIn",
        threshold : 200
    });
    

});
export function getProLists(id,page){
    //获取商品页
    return $.ajax({
        type : 'get',
        url : '/api/products/'+id+'/?pageSize='+page.pageSize+'&pageNum='+page.pageNum,
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            // return re
            console.log(re);
        },
        error:function(re){
            // alert(JSON.stringify(re))
            // window.autoAlert(JSON.stringify(re),'red')
            console.log(re);
        }

    }); 
}
export function getProducts(){
    //获取首页商品
    return $.ajax({
        type : 'get',
        url : '/api/page',
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            console.log(re);
            // console.log(111,JSON.parse(re.vals))
            // return re
        },
        error:function(re){
            // alert(JSON.stringify(re))
            // window.autoAlert(JSON.stringify(re),'red')
            console.log(re);
        }

    }); 
}
export function getSortsList(){
    //获取分类
    return $.ajax({
        type : 'get',
        url : '/api/getSortsList',
        processData:false,
        async:false,
        cache: false,  
        contentType: false, 
        success:function(re){
            console.log(re);
        },
        error:function(re){
            // alert(JSON.stringify(re))
            // window.autoAlert(JSON.stringify(re),'red')
            console.log(re);
        }

    });   
}

export function setUrlAct(path){
    //子页面高亮，配合router-link自带active属性使用
    $('ul.main-menu li a').each(function(){
        manageMenu.forEach((menu,i)=>{
            if($($(this))[0].href.indexOf(menu.url) != -1){
                let isRight = false
                menu.childUrl.forEach((url,d)=>{
                    if(path.indexOf(url) != -1){
                        isRight = true
                    }
                })
                if(!isRight){
                    $(this).parent().removeClass('active');
                }else{
                    $(this).parent().addClass('active');
                }
            }
        })    
    });
    Menu.forEach((m,index)=>{
        m.childUrl.forEach(url=>{
            if(path.indexOf(url) != -1){
                $('a.page-scroll').map((i,param)=>{
                    if(i == index){
                        $(param).addClass('active');
                    }else{
                        $(param).removeClass('active');
                    }
                })
            }
        })
    })
}

export function setMap(){
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    var point = new BMap.Point(119.3782479896,25.9977155183);//39.9252565439,116.4897199676
    map.centerAndZoom(point, 17);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("福州");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用  
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件  
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);

    //创建信息窗口   
    var sContent ="Shengyi Shoes <br>Addr: Room 1403, building 6, Shangchengguoji Garden, Fuxia Road, Fuzhou, China<br>Mobile: +86 18060608001 <br>";
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象   
    marker.addEventListener('click', function(){   
       this.openInfoWindow(infoWindow);  
       //图片加载完毕重绘infowindow   
       document.getElementById('Coolwpimg').onload = function (){   
           infoWindow.redraw();   
       }   
    });   
}
export function isShowTwoMenu(curUrl){
    let showTowMenu = ['/atlas','/proDesc/']
    let isShowTowMenu = false
    // let isShowTowMenu = false
    showTowMenu.forEach(url=>{
        if(curUrl.indexOf(url) != -1){
            isShowTowMenu = true
        }
    })
    return isShowTowMenu
}
 

