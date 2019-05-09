<template>
    <div>
      <p>{{timed1 | capitalize}}</p>
      <p>时间格式的转换使用moment.js“http://momentjs.cn/”可调整时间不同显示，解决ios兼容的问题</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "TimeData",
        data(){
          return {
            timed1:'2019-03-11',
          }
        },
        methods:{

        },
        filters: {
          capitalize:function(value,format='YYYY-MM-DD'){
            return moment(value).add('years',1).format(format)
          },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  div{
      margin-top: 100px;padding: 100px;
      p{
        font-size: 40px;
      }
  }
</style>
