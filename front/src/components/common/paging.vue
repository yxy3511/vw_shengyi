<template lang='jade'>
  nav(v-show='page > 1')
    ul.pagination.yupage
      li.goPage(:class="{'disabled': current == 1}")
        a(href="javascript:;", rel="external nofollow", @click="setCurrent(current - 1)")  « 
      |    
      li(:class="{'disabled': current == 1}")
        a(href="javascript:;", rel="external nofollow", @click="setCurrent(1)")  首页 
      |    
      li(v-for="p in grouplist", :class="{'active': current == p.val}")
        a(href="javascript:;", rel="external nofollow", @click="setCurrent(p.val)")  {{ p.text }} 
      |    
      li(:class="{'disabled': current == page}")
        a(href="javascript:;", rel="external nofollow", @click="setCurrent(page)")  尾页 
      |    
      li.goPage(:class="{'disabled': current == page}")
        a(href="javascript:;", rel="external nofollow", @click="setCurrent(current + 1)")  »

</template>
<script>
export default{
  data(){
    return {
      // current: this.currentPage,
      // page: this.total
    }
  },
  props: {
    total: {// 数据总条数
      type: Number,
      default: 0
    },
   // display: {// 每页显示条数
   //    type: Number,
   //    default: 10
   // },
   currentPage: {// 当前页码
      type: Number,
      default: 1
   },
    pagegroup: {// 分页条数
      type: Number,
      default: 5,
      // coerce: function (v) {
      //   v = v > 0 ? v : 5;
      //   return v % 2 === 1 ? v : v + 1;
      // }
    }
  },
  computed: {
    current: function(){
      return this.currentPage
    },
    page: function () { // 总页数
      // return Math.ceil(this.total / this.display);
      // console.log(this.total)
      return this.total
    },
    grouplist: function () { // 获取分页页码
      // var len = this.page 
      var len = this.total 
      let temp = []
      let list = []
      let count = Math.floor(this.pagegroup / 2)
      let center = this.current;
      if(len > 0){
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    }
      
  },
  methods: {
    setCurrent: function (idx) {
      if (this.current != idx && idx > 0 && idx < this.total + 1) {
       // this.current = idx;
       this.$emit('pagechange', idx);
      }
    }
  }
}
</script>
<style scoped  lang='sass'>
  .pagination 
    overflow: hidden;
    display: table;
    margin: 0 auto;
    /*width: 100%;*/
    height: 50px;
    li 
      float: left;
      height: 30px;
      border-radius: 5px;
      margin: 3px;
      color: #666;
      &:hover,&:focus
        background: #000;      
    a 
      padding: 0px
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      border-radius: 5px;
      text-decoration: none
      color: #000;   
    .goPage
      a
        font-size: 20px;

  .active 
    background: #000;
    outline:none
    a 
      color: #fff;
      background: #000
      border-color: #000
      &:hover,&:focus
        background: #000; 
        border-color: #000

</style>