var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var proListContent = require('./../dao/proListContent.js');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

global.imagesArr = []
/* 上传*/
router.post('/uploading', function(req, res, next){
    // global.imagesArr = []
    //写这没有2,1-2问题
    var images = []
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/files/'});

    //上传完成后处理 
    form.parse(req, function(err, fields, files) {
        console.log('useFiles:',files)
        images.push(files)
        // var dstPath = {} 
        var imgArr = []
        if(err){
            console.log('parse error: ' + err);
        }else if(images){
            // console.log('imgages:',images)
            for(var i in images){
                var filesTmp = JSON.stringify(images[i],null,2); 
                for(var j in images[i]['inputFile']){
                    var imgInfo = {} 
                    // var index =  parseInt(j)+imgArr.length
                    var index =  j
                    var inputFile = images[i]['inputFile'][j];
                    var uploadedPath = inputFile['path'];
                    if(inputFile['size'] == 0){
                        continue;
                    }
                    //存数据库存这个 
                    // imgArr[index] = '/files/' + inputFile['originalFilename'];
                    var renamePath = './public/files/' + inputFile['originalFilename'];

                    imgInfo['src'] = '/files/' + inputFile['originalFilename'];
                    imgInfo['name'] = inputFile['originalFilename']
                    imgArr.push(imgInfo)
                    //重命名为真实文件名
                    fs.rename(uploadedPath, renamePath, function(err) {
                        if(err){
                            console.log('rename error: ' + err);
                        } else {
                            imagemin([renamePath], './public/files/', {
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
                                // console.log('err:',err);
                                //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …] 
                                return {
                                    status:false,
                                    data: err.toString
                                }

                            });
                            console.log('rename ok');
                        }
                    });

                }
                
            }
            
        }
        res.send(200,imgArr)
        // global.imagesArr.push(imgArr)
        // dstPath.imgs = imgArr;
        // //方法1
        // //格式必须为 binary 否则会出错
        // /*var content = fs.readFileSync(dstPath['path0'],"binary");  
        // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        // res.write(content,"binary"); //格式必须为 binary，否则会出错
        // res.end();*/
        // //方法2
        // // var stream = fs.createReadStream( dstPath['path0'] );
        // // var responseData = [];//存储文件流
        // // if (stream) {//判断状态
        // //     stream.on( 'data', function( chunk ) {
        // //       responseData.push( chunk );
        // //     });
        // //     stream.on( 'end', function() {
        // //        var finalData = Buffer.concat( responseData );
        // //        console.log('finalData',finalData)
        // //        res.write( finalData );
        // //        res.end();
        // //     });
        // // }
        // //方法3
        // var cnt = 0;
        // var all = {}
        // for(var l in global.imagesArr){
        //     for(var z in global.imagesArr[l]){
        //         all[cnt] = global.imagesArr[l][z]
        //         cnt += 1
        //     }
        // }
        // dstPath.len = cnt;
        // dstPath.allImgs = JSON.stringify(all);
        // // res.render('uploadImg',dstPath)
        // res.send(dstPath)
        // res.end();
    });

});


/* 上传页面 */
router.get('/uploadImg', function(req, res, next) {
    try{
        //获取类型
        proListContent.getSorts('all',{pageSize:0,pageNum:0},function(err,vals){
            if(err){
                console.log(err)
            }else{
                var sortArr = {}
                var totalCount = 0
                for(var j in vals){
                    sortArr[vals[j].id] = vals[j].name
                    totalCount = vals[j]['totalCount']
                }
                //获取状态
                // res.render('uploadImg',{
                //     sorts: JSON.stringify(sortArr)
                // }); 
                // res.render('proAdd',{
                //     sorts: JSON.stringify(sortArr)
                // }); 
                res.send(200,{
                    code:0,
                    sorts:sortArr,
                    length: totalCount
                })
            }
        })

    }catch(e){
        console.log(e)
    }
       
});

module.exports = router;