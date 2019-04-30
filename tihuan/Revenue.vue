<template>
    <div class="revenue">
      <div class="revenue-head">
        <h3>总佣金 (欧币)</h3>
        <span>{{moneyInfo}}</span>
      </div>
      <div class="revenue-time">
        <div class="time-box" @click="showtime">{{startt}}</div>
        <span>~</span>
        <div class="time-box">{{endt}}</div>
        <div class="revenue-time-con">确认</div>
      </div>
      <div class="revenue-con-head">团队消费明细</div>
      <revenue-con v-if="shopInfo" :data="shopInfo"></revenue-con>
      <div class="renew-mask" v-show="renewmask" >
        <van-datetime-picker @confirm="timeo" v-model="currentDate" type="date" :min-date="minDate" class="showpick"/>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import RevenueCon from "../../components/personal/revenue/RevenueCon";
  import {selectRevenueList,getRevenueInfo} from "@/config/interface.js"
  export default {
    name: "Revenue",
    components: {RevenueCon},
    data(){
      return {
        moneyInfo:null,
        startt:"开始时间",
        endt:"结束时间",
        shopInfo :{},
        renewmask: false,
        minDate: new Date(2015, 0, 1),
        currentDate: new Date()
      }
    },
    created () {
      this.moneyinit();
      this.orderinit();
    },
    methods :{
      moneyinit() {
        const url = getRevenueInfo
        let params = {
          userId: 336348
        }
        fetch(url,params)
          .then(res => {
            if (res.code == 10000) {
              const data = res.data
              console.log(data)
              this.moneyInfo = data.totalCommisionFee
            } else {
              console.log("用户查询错误")
            }
          })
      },
      orderinit() {
        const url = selectRevenueList
        let params = {
          userId: 336348,
          pageNum	: 1,
          pageSize : 10,
          startTime: null,
          endTime: null
        }
        fetch(url,params)
          .then(res => {
            if (res.code == 10000) {
              const data = res.data
              this.shopInfo = data
              console.log(data)
              console.log(this.shopInfo)
            } else {
              console.log("用户查询错误")
            }
          })
      },
      showtime(){
        this.renewmask = !this.renewmask
      },
      timeo(){
          this.startt = getColumnValue(index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.revenue {
  .revenue-head {width: 100%;height: 180px;background: no-repeat;
                 background-image: url("../../assets/images/revenue/beijing.png");background-size: 100% 100%;
    h3 {padding-top: 48px;font-size: 32px;color: #333;font-weight: 400}
    span {font-size: 36px;color: #333;font-weight: 600}
  }
  .revenue-time {height: 100px;background: #F6F6F6;padding-left: 30px;padding-right: 30px;display: flex;align-items: center;
    .time-box {width: 232px;height: 60px;color: #494949;line-height: 60px;border-radius: 64px;background: #fff;margin-right: 20px;
      border: none;outline: none;text-align: center}
    span {font-size: 32px;color: #C0C0C0;font-weight: 400;margin-right: 20px}
    .revenue-time-con {width: 166px;height: 60px;background: no-repeat;line-height: 60px;font-size: 26px;color: #333333;font-weight: 400;
      background-image: url("../../assets/images/revenue/anniu.png");background-size: 100% 100%;}
  }
  .renew-mask {width:100%; height:100%;background:rgba(0,0,0,0.5);position:fixed;top:0;left: 0; z-index: 1000;
    .showpick {position: fixed;bottom: 0;width: 100%;}
  }
  .revenue-con-head {height: 94px;line-height: 94px;font-size: 32px;color: #333;font-weight: 600;border-bottom: 2px solid #F6F6F6;text-align: left;padding-left: 30px;}
}

</style>
