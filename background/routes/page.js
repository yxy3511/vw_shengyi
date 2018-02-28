/**
 * Created by xuanx on 2016/12/27
 *
 *   策略配置
 *
 *
 */
var express = require('express');
var router = express.Router();
var proListContent = require('./../dao/proListContent.js');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

rePage=function(req,res){
	// res.redirect('/page');
    res.render('page')
}
toPage=function(req,res){
    try{
        //压缩首页大图
        imagemin(['./public/images/bg-main.jpg'], './public/images/', {
            plugins: [
                imageminMozjpeg(),
                imageminJpegtran(),
                imageminPngquant({quality: '65-80'})
            ]
        }).then(files => {
            // console.log('files:',files);
            //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
            return {
                status:true,
                data: files
            }

        }).catch(err => {
            console.log('err:',err);
            //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
            return {
                status:false,
                data: err.toString
            }

        });

        // var msg = req.session.manageMsg
        // req.session.manageMsg = null
        //获取商品前九个，按时间排
        proListContent.getPros(9,function(err,vals){
            if(err){
                console.log(err)
            }else{
                // console.log('vals:',vals)
                if(vals.length > 0){
                    var resArr = {}
                    for(var i in vals){
                        resArr[i] = vals[i]
                    }
                    if(vals.length > 0){
                        /*res.render('page',{
                            vals: JSON.stringify(resArr),
                            msg: msg
                        })*/
                        return res.send(200,{
                            code:0,
                            length:vals.length,
                            vals: resArr,
                        })
                    }
                }else{
                    // res.render('page',{
                    //     msg: msg
                    // })
                    return res.send(200,{
                        code: -1,
                        length:0,
                        msg:'暂无数据！'
                    })
                }
            }
        })
    }catch(e){
        console.log(e)
    }
    
}
//将数据库的<br>换成/r/n展示
setSC = function(val){
    var reg=new RegExp("<br>","g"); 
    var res = []
    JSON.parse(val).forEach(obj=>{
        obj['value'] = obj['value'].replace(reg,"\r\n")
        res.push(obj)
    })
    // for(var obj of val){
    //     obj['value'] = obj['value'].replace(reg,"\r\n")
    //     res.push(obj)
    // }
    return JSON.stringify(res)
}  
toAbout=function(req,res){
	// res.render('aboutUs');
    var id = req.query.id 
    var msg = req.session.manageMsg
    req.session.manageMsg = null
    //获得页面信息
    proListContent.getAboutUs(id,{pageNum:1,pageSize:1},function(err,vals){
        if(err){
            console.log(err)
        }else{
            if(vals.length > 0){
                vals[0].content = setSC(vals[0].content)
                /*res.render('aboutUs',{
                    vals: JSON.stringify(vals[0]),
                    msg:msg
                })*/
                return res.send(200,{
                    code:0,
                    length:1,
                    vals: vals[0],
                    msg:msg
                })
            }else{
                // req.session.manageMsg = '暂无介绍'
                msg = '暂无介绍'
                /*res.render('aboutUs',{
                    msg:msg,
                    vals: JSON.stringify(vals)
                })*/
                return res.send(200,{
                    code:-1,
                    length:0,
                    msg:msg,
                    // vals: vals
                })
            }
        }
    })
}
toProducts=function(req,res){
    try{
        // var msg = req.session.manageMsg
        // req.session.manageMsg = null
        var sid = req.params.sid ? parseInt(req.params.sid) : 0

        var page = {}
        page.pageNum = +req.body.pageNum 
        page.pageSize = +req.body.pageSize
    
        proListContent.getProList(sid,page,function(err,vals){
            if(err){
                console.log(err)
            }else{
                var resArr = {}
                var totalCount = -1
                for(var i in vals){
                    resArr[i] = vals[i]
                    totalCount = vals[i]['totalCount']
                }
                if(parseInt(totalCount/page.pageSize) == 0){
                    pageCount = 1
                }else if(totalCount%page.pageSize > 0 && totalCount%page.pageSize < page.pageSize){
                    pageCount = parseInt(totalCount/page.pageSize) + 1
                }else{
                    pageCount = parseInt(totalCount/page.pageSize)
                }
                if(page.pageNum > pageCount){
                    page.pageNum = page.pageNum - 1
                    // return res.redirect('/manage/proList/'+page.pageSize+'/'+page.pageNum)
                    return res.send(200,{
                        code: -2,
                        pageNum: page.pageNum
                    })
                }
                if(vals.length > 0){
                    /*res.render('products',{
                        vals: JSON.stringify(resArr),
                        msg: msg,
                        pageCount:pageCount,
                        pageNum: page.pageNum,
                    })*/
                    return res.send(200,{
                        code:0,
                        length:totalCount,
                        vals: resArr,
                        pageCount:pageCount,
                        pageNum: page.pageNum,
                    })
                }else{
                    let msg = ''
                    if(sid == 0){
                        msg = '暂无商品！'
                    }else{
                        msg = '暂无此类商品！'
                    }
                    return res.send(200,{
                        code:-1,
                        length:0,
                        msg: msg,
                        pageCount:1,
                        pageNum: 1,
                    })
                    // if(sid != 0){
                    //     // req.session.manageMsg = '暂无此类商品！'
                    //     // res.redirect('/api/products/0/?pageNum='+page.pageNum+'&pageSize='+page.pageSize)
                    //     res.send(200,{
                    //         msg: '暂无此类商品！'
                    //     })
                    // }else{
                    //     // res.render('products',{
                    //     //     vals: JSON.stringify(vals),
                    //     //     msg: msg,
                    //     //     pageCount:pageCount,
                    //     //     pageNum: page.pageNum,
                    //     // })
                    //     res.send(200,{
                    //         msg: '暂无商品！',
                    //         pageCount:pageCount,
                    //         pageNum: page.pageNum,
                    //     })
                    // }

                    // proListContent.getProList(0,{pageNum:1,pageSize:9},function(e,val){
                    //     if(e){
                    //         console.log(e)
                    //     }else{
                    //         var resObj = {}
                    //         for(var j in val){
                    //             resObj[j] = val[j]
                    //         }
                    //         if(val.length > 0){
                    //             res.render('products',{
                    //                 vals: JSON.stringify(resObj),
                    //                 msg: '暂无此类商品！'
                    //             })
                    //         }
                    //     }
                    // })
                    // res.redirect('/products/0')
                }
            }
        }) 
    }catch(e){
        console.log(e)
    }                                                                                             
}
toProDesc=function(req,res){

    try{
        var id = req.params.id
        proListContent.descPro(id,function(err,vals){
            if(err){
                console.log(err)
            }else if(vals.length > 0){
                //vals是数组
                // res.render("proDesc",vals[0])
                return res.send(200,{
                    vals:vals[0],
                    code:0,
                    length:1,
                })
            }
        })
    }catch(e){
        console.log(e)
    }
}
/*getProDesc=function(req,res){
    try{
        var key = req.query.key
        proListContent.getProId(key,function(err,vals){
            if(err){
                console.log(err)
            }else{
                var id = vals[0]['pid']
                res.redirect('/proDesc/'+id)
            }
        })
    }catch(e){
        console.log(e)
    }
}*/
// toContact=function(req,res){
// 	res.render('contact');
// }
getSorts = function(req,res){
    try{
        proListContent.getSorts('name',{pageNum:0,pageSize:0},function(err,vals){
            if(err){
                console.log(err)
            }else{
                var resArr = {}
                let cnt = 0
                for(var i in vals){
                    cnt++
                    resArr[i] = vals[i]
                }
                // res.render('layout',{vals:JSON.stringify(resArr)})
                return res.send(200,{
                    code:0,
                    length:cnt,
                    vals:resArr
                })
            }
        })

    }catch(e){
        console.log(e)
    }
}

searchPro = function(req,res,next){
    try{
        var key = req.body.key
        var page = {}
        page.pageNum = +req.body.pageNum
        page.pageSize = +req.body.pageSize
        proListContent.searchPro(key,page,function(err,vals){
            if(err){
                console.log(err)
            }else if(vals.length > 0){
                var totalCount = -1
                var resArr = {}
                for(var i in vals){
                    resArr[i] = vals[i]
                    totalCount = vals[i]['totalCount']
                }

                if(parseInt(totalCount/page.pageSize) == 0){
                    pageCount = 1
                }else if(totalCount%page.pageSize > 0 && totalCount%page.pageSize < page.pageSize){
                    pageCount = parseInt(totalCount/page.pageSize) + 1
                }else{
                    pageCount = parseInt(totalCount/page.pageSize)
                }

                return res.send(200,{
                    code: 0,
                    length:totalCount,
                    vals: resArr,
                    pageNum: page.pageNum,
                    pageCount: pageCount
                })
                //获取sorts
                // proListContent.getSorts('all',{pageNum:0,pageSize:0},function(e,val){
                //     if(e){
                //         console.log(e)
                //     }else{
                //         var sortArr = {}
                //         for(var j in val){
                //             sortArr[val[j].id] = val[j].name
                //         }
                //          res.render('products',{
                //             vals: JSON.stringify(resArr),
                //             sorts: JSON.stringify(sortArr),
                //             pageNum: page.pageNum,
                //             pageCount: pageCount
                //         })
                //         // res.render('tbodyPro',vals[0])
                //     }
                // })
               
            }else{
                return res.send(200,{
                    code:-1,
                    length:0,
                    msg:'暂无要搜索的商品！'
                })
                // req.session.manageMsg = '暂无此类商品！'
                // res.redirect('/products/0/?key='+key+'&pageNum='+page.pageNum+'&pageSize='+page.pageSize)
                /*proListContent.getProList(0,page,function(err,vals){
                    if(err){
                        console.log(err)
                    }else{
                        var resArr = {}
                        for(var i in vals){
                            resArr[i] = vals[i]
                        }
                        var totalCount = -1

                        if(vals.length > 0){
                            //获取sorts
                            proListContent.getSorts('all',{pageNum:0,pageSize:0},function(e,val){
                                if(e){
                                    console.log(e)
                                }else{
                                    var sortArr = {}
                                    for(var j in val){
                                        sortArr[val[j].id] = val[j].name
                                    }
                                    res.render('products',{
                                        vals: JSON.stringify(resArr),
                                        sorts: JSON.stringify(sortArr),
                                        pageNum: page.pageNum,
                                        pageCount
                                        msg:'查询无结果！'
                                    })
                                }
                            })
                            
                        }
                    }
                })*/
            }
        })
        
    }catch(e){
        console.log(e)
    }
}

getSortsList = function(req,res,next){
    try{
        proListContent.getSorts('all',{pageNum:0,pageSize:0},function(err,vals){
            if(err){
                console.log(err)
            }else{
                var resArr = {}
                let cnt = 0
                for(var i in vals){
                    cnt++
                    resArr[vals[i].id] = vals[i].name
                }
                var resObj = {}
                return res.send(200,{
                    code:0,
                    length: cnt,
                    vals:resArr
                })
                // res.render('layout',{vals:JSON.stringify(resArr)})
            }
        })

    }catch(e){
        console.log(e)
    }
}


toAtlas = function(req,res){
    try{
        proListContent.getAllImgs(function(err,vals){
            if(err){
                console.log(err)
            }else{
                var imgs = {}
                var cnt = 0 ;
                // console.log('vvaallss:',vals)
                if(vals.length > 0){
                    for(var first in vals){
                        for( var sec in vals[first]){
                            if(sec == 'imgs'){
                                for(var index in JSON.parse(vals[first][sec])){
                                    imgs[cnt] = {img:JSON.parse(vals[first][sec])[index],name:vals[first]['pname'],desc:vals[first]['desc_txt']}
                                    // imgs[cnt] = JSON.parse(vals[first][sec])[index]
                                    cnt ++
                                        
                                }
                            }

                        }
                    }
                    // res.render('atlas',{imgs:JSON.stringify(imgs)})
                    return res.send(200,{
                        code:0,
                        length:vals.length,
                        imgs:imgs
                    })
                }else{
                    // req.session.manageMsg = '暂无商品！'
                    // res.redirect('/page')
                    return res.send(200,{
                        code:-1,
                        length:0,
                        msg:'暂无商品！'
                    })
                }
            }
        })
        
    }catch(e){
        console.log(e)
    }
    
}

router.get('/',rePage);
router.post('/page',toPage);
router.post('/aboutUs',toAbout);
router.post('/products/:sid',toProducts);
router.get('/proDesc/:id',toProDesc);
// router.get('/contact',toContact);
router.get('/getSorts',getSorts);
router.post('/proSearch',searchPro);
router.get('/getSortsList',getSortsList);
router.get('/atlas',toAtlas);
// router.get('/getProDesc',getProDesc);

module.exports = router

