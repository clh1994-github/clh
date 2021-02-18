<template>
  <div class="">
    {{ num }}
  </div>
</template>
 <script>
import axios from "../axios";  //引入自己封装好的axios用于发送请求
export default {
  //Data中放的数据,可以通过{{num}} 在template中显示,template等于html标签
  data() {
    return {
      num: 1,
    };
  },
  //mounted是生命周期函数中用于发送请求的阶段,将对应方法在这里面执行,执行时机是页面中Dom挂载完成后
  mounted() {
    this.getInfo();
  },
  //methods用于写对应的方法
  methods: {
    //async和await搭配使用,实现异步获取到接口中的数据
    async getInfo() {
      const response = await axios({
        url:'http://localhost:3000/cartoon/getcartoons',//接口的1,2级路径
        method:'post',//对应接口的请求方式
        data:{data},//要传递给后端的数据
      });
      console.log(response);//后端发送回来的响应数据,用console.log输出后可以到浏览器的控制台中看看拿回来的数据结构,然后自己通过对象.属性的方法 拿出自己需要的属性,赋值到最上面的data对象中,然后通过{{}}渲染到页面上
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang='scss'>
</style>
