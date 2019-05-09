<template>
    <div class="box">
      <div class="btn" @click="tz(1)" style="font-size: 20px;font-weight: 900">时间格式问题</div>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "IOS",
      methods: {
        tz(n) {
          switch (n) {
            case n = 1 :
              this.$router.push({  //核心语句
                path: '/jr/ios/timedata',   //跳转的路径
                /*query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                  id:this.id ,
                }*/
              })
              break;
          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .box{
      .but{width: 400px;height: 200px;border: 4px solid #acf;margin: 60px auto;font-size: 40px;text-align: center;line-height: 200px;}
  }
</style>
