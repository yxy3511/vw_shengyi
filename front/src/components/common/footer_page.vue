<template lang="jade">  
  footer.footer
    .container.text-center            
        .row
          .footText
            h3 联系我们
            //- p 3422 Street, Barcelona 432, Spain, New Building North, 15th Floor
            |                       
            p
              i.fa.fa-phone
              |  +86 18060608001
            |                       
            p
              i.fa.fa-envelope
              |  cjw@shengyishoes.com
            p 福建省福州市仓山区福峡路上城国际6号楼1403宣
            p  Room 1403, building 6,Shangchengguoji Garden, Fuxia Road, Fuzhou, China
          //-div(style="width:50%;float:left;")
            //-img.QRImg(src='/images/yxy.jpg')
        .row.copy
            p
              | 版权为 Shengyi 所有未经许可不得转载或链接，闵ICP备00123141234号
            p
              router-link(to='/login', target='_blank',title='yxy3511') Admin      
</template>

<script>
  // require('./assets/js/config.js')
  // require('./assets/js/init.js')
  // import {getProLists,getSortsList} from './assets/js/init.js'
  export default {
    name: 'footer',
    data(){
      return{
      }
    },
    components:{
    },
    methods:{
    }
  }

</script>

<style scoped>

</style>
