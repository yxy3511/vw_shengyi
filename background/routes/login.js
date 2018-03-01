/**
 * Created by yxy3511 on 2017/9/14
 *
 *   登录页
 *
 *
 */
var express = require('express');
var router = express.Router();
var loginContent = require('./../dao/loginContent.js');
var proListContent = require('./../dao/proListContent.js');
var cryptico = require('crypto');
// var md5 = cryptico.createHash('md5');

toLogin=function(req,res){
    var msg = req.session.logMsg
    req.session.logMsg = null
    req.session.destroy();
    // res.render('login',{
    //     msg:msg
    // })
    res.send(200,{
        code:0,
        msg:''
    })
}
toRegister=function(req,res){
    // res.render('register')
    var msg = req.session.logMsg
    req.session.logMsg = null
    res.render('newRegister',{
        msg:msg
    })
}
// registering = function(req,res){
//     try{
//         var uname = req.body.rename
//         var pwd = req.body.repass
//         var againpwd = req.body.againpass
//         var page = {}
//         page.pageSize = req.params.pageSize
//         page.pageNum = req.params.pageNum

//         if(uname == ''){
//             return res.render('register',{
//                     msg:'用户名不能为空！'
//                 });
//         }else if(pwd == ''){
//             return res.render('register',{
//                     msg:'密码不能为空！'
//                 });
//         }else if(againpwd == ''){
//             return res.render('register',{
//                     msg:'请再次输入密码！'
//                 });
//         }
//         var params = {}
//         params.uname = uname
//         params.pwd = pwd

//         loginContent.searchUser(uname,page,function(err,vals){
//             if(err){
//                 console.log(err)
//             }else if(vals.length > 0){
//                 //用户名已被使用
//                 res.render('register',{
//                     msg:'此用户名已被注册！'
//                 });
//             }else if(params.pwd != againpwd){
//                 res.render('register',{
//                     msg:'两次密码输入不相同！'
//                 });
//             }else if(vals.length == 0){
//                 loginContent.addUser(params,function(err,vals){
//                     if(err){
//                         console.log(err)
//                     }else if(vals.affectedRows > 0){
                        
//                         var msg = '注册成功！'
//                         req.session.manageMsg = msg
//                         return res.redirect('/manage/getUser/'+page.pageNum+'/'+page.pageSize)
//                     }
//                 })    
//             }

//         })

//     }catch(e){
//         console.log(e)
//     }
       
// }
newRegistering = function(req,res){
    try{

        var uname = req.body.rename
        var pwd = req.body.repass
        var againpwd = req.body.againpass

        var page = {}
        page.pageSize = 1
        page.pageNum = 1

        if(uname == ''){
            return res.send(200,{
                code:-1,
                msg: '用户名不能为空！'
            })
            // req.session.logMsg = '用户名不能为空！'
            // return res.redirect('/manage/register')
            // return res.render('newRegister',{
            //         msg:'用户名不能为空！'
            //     });
        }else if(pwd == ''){
            return res.send(200,{
                code:-1,
                msg: '密码不能为空！'
            })
            // req.session.logMsg = '密码不能为空！'
            // return res.redirect('/manage/register')
            // return res.render('newRegister',{
            //         msg:'密码不能为空！'
            //     });
        }else if(againpwd == ''){
            return res.send(200,{
                code:-1,
                msg: '请再次输入密码！'
            })
            // req.session.logMsg = '请再次输入密码！'
            // return res.redirect('/manage/register')
            // return res.render('newRegister',{
            //         msg:'请再次输入密码！'
            //     });
        }
        var params = {}
        params.uname = uname
        params.pwd = pwd

        loginContent.searchUser(uname,page,function(err,vals){
            if(err){
                console.log(err)
                return res.send(200,{
                    code:500,
                    msg: err.sqlMessage
                })
            }else if(vals.length > 0){
                //用户名已被使用
                return res.send(200,{
                    code:-1,
                    msg: '此用户名已被注册！'
                })
                // req.session.logMsg = '此用户名已被注册！'
                // return res.redirect('/manage/register')
                // res.render('newRegister',{
                //     msg:'此用户名已被注册！'
                // });
            }else if(params.pwd != againpwd){
                return res.send(200,{
                    code:-1,
                    msg: '两次密码输入不相同！'
                })
                // req.session.logMsg = '两次密码输入不相同！'
                // return res.redirect('/manage/register')
                // res.render('newRegister',{
                //     msg:'两次密码输入不相同！'
                // });
            }else if(vals.length == 0){
                loginContent.addUser(params,function(err,vals){
                    if(err){
                        return res.send(200,{
                            code:500,
                            msg: err.sqlMessage
                        })
                        console.log(err)
                    }else if(vals.affectedRows > 0){
                        /*loginContent.searchUser('all',function(e,val){
                            if(e){
                                console.log(e)
                            }else{
                                proListContent.getRoles(function(err,vals){
                                    if(err){
                                        console.log(err)
                                    }else{
                                        var roleArr = {}
                                        for(var i in vals){
                                            roleArr[vals[i].id] = vals[i].rname
                                        }

                                        var userArr = {}
                                        for(var j in val){
                                            userArr[j] = {
                                                uname: val[j].uname,
                                                pwd: val[j].pwd,
                                                role: roleArr[val[j].role],
                                                uid: val[j].uid
                                            }
                                        }
                                        res.render('user',{
                                            users: JSON.stringify(userArr),
                                            msg:'注册成功！'
                                        })
                                    }
                                })
                            }
                            
                        })*/
                        return res.send(200,{
                            code:0,
                            msg:'添加用户成功！'
                        })
                        // var msg = '注册成功！'
                        // req.session.manageMsg = msg
                        // return res.redirect('/manage/getUser/'+page.pageSize+'/1')
                        // return res.redirect('/manage/getUser/'+page.pageNum+'/'+page.pageSize)
                       /* res.render('login',{
                            msg:'注册成功！'
                        })*/
                    }
                })    
            }

        })

    }catch(e){
        console.log(e)
    }
       
}
loggingIn = function(req,res){
    try{
        var page = {}
        page.pageSize = 1
        page.pageNum = 1
        var uname = req.body.uname
        var pwd = req.body.pwd
        if(uname.length == 0){
            return res.send(200,{
                code:-1,
                msg:'用户名不能为空！'
            })
            // req.session.logMsg = '用户名不能为空！'
            // return res.redirect('/login')
            // return res.render('login',{
            //         msg: '用户名不能为空！'
            //     })
        }else if(pwd.length == 0){
            // return res.render('login',{
            //         msg: '密码不能为空！'
            //     })
            // req.session.logMsg = '密码不能为空！'
            // return res.redirect('/login')
            return res.send(200,{
                code:-1,
                msg:'密码不能为空！'
            })
        }
        var params = {}
        params.uname = uname
        params.pwd = pwd

        loginContent.searchUser(uname,page,function(err,vals){
            var pass = cryptico.createHash('md5').update(params.pwd).digest('base64')
            if(err){
                console.log(err)
            }else if(vals.length > 0 && vals[0].pwd != pass){
                // delete req.session.isLogged;
                //用户名存在,密码不正确
                // return res.render('login',{
                //     msg: '密码不正确！'
                // })        
                // req.session.logMsg = '密码不正确！'
                // return res.redirect('/login')
                return res.send(200,{
                    code:-1,
                    msg:'密码不正确！'
                })
            }else if(vals.length == 0){

                // delete req.session.isLogged;
                // return res.render('login',{
                //     msg: '用户名不存在！'
                // })
                // req.session.logMsg = '用户名不存在！'
                // return res.redirect('/login')
                return res.send(200,{
                    code:-1,
                    msg:'用户名不存在！'
                })
            }else{
                //登录成功
                //操作session
                req.session.isLogged = true;
                // 操作location
                // return res.redirect('/manage/proList/'+page.pageSize+'/'+page.pageNum+'/?uname='+uname)
                return res.send(200,{
                    code:0,
                    msg:'登录成功！'
                })
            }   

        })

    }catch(e){
        console.log(e)
    }
}
router.post('/api/login',toLogin);
router.get('/api/manage/register',toRegister);
router.post('/api/manage/registering',newRegistering);
// router.post('/registering',registering);
router.post('/api/logging',loggingIn);

module.exports = router

