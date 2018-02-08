export const manageMenu = [
    {
        name: '商品列表',
        url:'/manage/MProducts',
        childUrl:[
            '/manage/MEditPro',
            '/manage/descPro/',
            '/manage/editPro/',
            
        ],
    },{
        name: '用户列表',
        url:'/manage/userList',
        childUrl:[
            '/manage/register',
        ],
    },{
        name: '分类列表',
        url:'/manage/sortsList',
        childUrl:[
        ],
    },{
        name: '公司介绍',
        url:'/manage/aboutUs',
        childUrl:[
            '/manage/editAboutUs',
            '/manage/viewAboutus/'
        ],
    }
]
//页面的
export const defaultUserPagesize = 9
//后台的
export const defaultPagesize = 10

export const baseUrl = 'http://localhost:3000'
export const Menu = [
    {
        name: 'HOME',
        url:'/page',
        childUrl:[
            '/page',
            '/atlas',
            
        ],
    },{
        name: 'ABOUT US',
        url:'/aboutUs',
        childUrl:[
            '/aboutUs',
        ],
    },{
        name: 'PRODUCTS',
        url:'/products/',
        childUrl:[
            '/products/',
            '/proSearch',
            '/proDesc'
        ],
    },{
        name: 'CONTACT',
        url:'/contact',
        childUrl:[
            '/contact'
        ],
    }
]

