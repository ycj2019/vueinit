<template>
    <div class="jr">
      <div class="jrtop" v-if="jrtop">
        <div class="and but" @click="tz(1)">安卓</div>
        <div class="ios but" @click="tz(2)">IOS</div>
        <div class="wx but" @click="tz(3)">微信</div>
        <div class="xcx but" @click="tz(4)">小程序</div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "JR",
        data(){
          return {
            jrtop : true
          }
        },
        methods:{
          tz(n){
            switch (n) {
              case n = 1 :
                this.$router.push({  //核心语句
                  path:'/jr/and',   //跳转的路径
                  /*query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                    id:this.id ,
                  }*/
                })
                this.jrtop = false
                    break;
              case n = 2 :
                this.$router.push({
                  path:'/jr/ios',
                })
                this.jrtop = false
                break;
              case n = 3 :
                this.$router.push({
                  path:'/jr/wx',
                })
                this.jrtop = false
                break;
              case n = 4 :
                this.$router.push({
                  path:'/jr/xcx',
                })
                this.jrtop = false
                break
            }
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.jr{
  .jrtop{display: flex;
      .but{width: 400px;height: 200px;border: 4px solid #acf;margin: 60px auto;font-size: 40px;text-align: center;line-height: 200px;}
    }
}
</style>
