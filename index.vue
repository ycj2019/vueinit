<template>
    <div id="exchange">
        <!--tabs-->
        <div class="cont">
            <common @listenSearchMethod="listenSearchMethod" ref="common"></common>
              <van-tabs v-model="activeTabs" color="#F3A02F" swipeable @change="tabsChange" @click="closeMenuShow">
                  <div class="van-tabs__content" >
                    <van-tab title="实物周边">
                        <van-list
                                v-if="activeTabs==0"
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="pageGoodsList">
                            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                            <ul>
                                <li v-for="item in goodsDataAllList">
                                    <div class="clear" @click="routerGoodsInformation(item)">
                                        <a>
                                            <div v-if="item.stocks==0" class="sold-out">
                                                <div class="sold-icon"></div>
                                            </div>
                                            <img  v-lazy="item.thum_img" alt="">
                                        </a>
                                    </div>
                                    <h3 class="ellipsis">{{item.title}}</h3>
                                    <p>
                                        <span class="num">￥{{item.seller_price}}</span>
                                    </p>
                                </li>
                            </ul>
                            </van-pull-refresh>
                        </van-list>

                    </van-tab>
                    <van-tab title="汽车服务">
                        <van-list
                                v-if="activeTabs==1"
                                v-model="loading"
                                :finished="finished"
                                :finished-text="finishedText"
                                @load="pageServerList">
                            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                            <div v-for="item in serverDataAllList" :key="item.shopId">
                                <van-card :centered=centered @click="routerShopInformation(item)">
                                    <div slot="thumb">
                                        <!--2闭店中，1营业中-->
                                        <img v-if="item.business_status==2" :src="closeStore" alt="">
                                        <div v-else>

                                            <img v-if="item.thum_img==''"  v-lazy="vctLogo"/>
                                            <img v-if="item.thum_img!=''"  v-lazy="item.thum_img">
                                        </div>
                                    </div>
                                    <div slot="title">
                                        <span style="font-weight: 800;">{{item.name}}</span>
                                        <span style="color: #979797;float: right">{{item.distance}}km</span>
                                    </div>
                                    <div slot="desc" style="color: #979797">
                                        <div>{{item.address}}</div>
                                        <div>{{item.operate_project}}</div>
                                    </div>
                                </van-card>
                            </div>
                            </van-pull-refresh>
                        </van-list>

                    </van-tab>
                  </div>
            </van-tabs>
        </div>

    </div>
</template>
<script>
    let loadingTemp = false;
    let loadingServerTemp = false;
    import common from "../..//components/common-head.vue"
    import vctLogo from "../../assets/img/home/vctLogo.png"
    import closeStore from "../../assets/img/home/closeStore.png"
    export default {
        components: {'common': common,},
        data() {
            return {
                closeStore: closeStore,//闭店中
                vctLogo: vctLogo,//默认图片
                centered: true,//汽车服务详情居中
                goodsDataAllList: [],//实物周边已经加载数据
                serverDataAllList: [],//汽车服务已经加载数据
                activeTabs: 0,//当前tabs
                token: this.$store.state.token,
                loading: false,
                finished: false,
                routerActiveTabs: this.$route.params.activeTabs || "",
                searchState: false,
                longitude: this.$store.state.geolocationInfo.longitude,
                latitude: this.$store.state.geolocationInfo.latitude,
                activeNames: [1],
                addressText: this.$store.state.geolocationInfo.value,
                activeNumer: 0,
                page: 0,
                serverPage:0,
                finishedText:"没有更多了",
                isLoading: false
            }
        },
        created() {
            if (this.routerActiveTabs != "") {//判断返回界面状态是否为汽车服务
                this.activeTabs = this.$route.params.activeTabs;
            }else {
                this.pageGoodsList();
            }
            if (typeof this.$route.params.addressName != "undefined") {
                this.addressText = this.$route.params.addressName
            }
        },
        methods: {
            //关闭菜单栏
            closeMenuShow() {
                this.$refs.common.changeCollapse();
            },
            //实物分页
            pageGoodsList() {
                if (loadingTemp) {
                    return;
                }
                loadingTemp = true
                this.page =this.page+ 1;
                this.$http.post(VCCT.Api.bsapiPost, {
                    sign: this.ParameterEncryption({page: this.page, action: "smGoodsList"}),
                    token: this.$store.state.token
                }).then(response => {
                    loadingTemp = false;
                    this.loading = false;
                    this.isLoading = false;//下拉刷新
                    const result = response.data;
                    if (result.code == 0) {
                        if (result.data.goods.length < 10)
                         this.finished = true;
                        for (let i in result.data.goods) {
                            this.goodsDataAllList.push(result.data.goods[i])
                        }
                    } else {
                        this.finished = true;
                        this.$dialog.alert({
                            message: result.msg,
                        });
                    }

                })
                    .catch(response => {
                        console.log(response);
                    });
            },
            //服务分页
            pageServerList() {
                if (loadingServerTemp) {
                    return;
                }
                this.serverPage = this.serverPage+1;
                const data = {
                    page: this.serverPage,
                    action: "nearShopList",
                    longitude: this.$store.state.geolocationInfo.longitude,
                    latitude: this.$store.state.geolocationInfo.latitude
                };
                this.$http.post(VCCT.Api.bsapiPost, {
                    sign: this.ParameterEncryption(data),
                    token: this.token
                }).then(response => {
                    loadingServerTemp = false;
                    this.loading = false;
                    this.isLoading = false;
                    const result = response.data;
                    if (result.code == 0) {
                        if (result.data.shop.length < 10){
                            this.finished = true;
                        }
                        for (let i in result.data.shop) {
                            this.serverDataAllList.push(result.data.shop[i])
                        }
                        if ( this.finished && this.serverDataAllList.length==0){
                            this.finishedText="城市暂未开放，敬请期待"
                        }else {
                            this.finishedText="没有更多了";
                        }
                    } else {
                        this.finished = true;
                        this.$dialog.alert({
                            message: result.msg,
                        });
                    }
                }).catch(response => {
                    console.log(response);
                });
            },
            //tabs发生改变
            tabsChange(val) {
                this.activeTabs=val;
                this.page=0;
                this.serverPage=0;
                this.loading=false;
                this.finished=false;
                this.goodsDataAllList=[];
                this.serverDataAllList=[];
                if (this.activeTabs==0){
                    this.pageGoodsList();
                } else {
                    this.pageServerList();
                }
            },
            //跳转到商铺详情
            routerShopInformation(item) {
                this.$router.push({
                    path: '/home/shopInformation',
                    query: {
                        id: item.shopId,
                        distance: item.distance
                    }
                })
            },
            //跳转到商品详情页
            routerGoodsInformation(item) {
                const vm = this;
                vm.$router.push({
                    path: '/home/goodsDetail/',
                    query: {
                        id: item.goodsId,
                    }
                })
            },
            //监听子组件搜索事件
            listenSearchMethod(data, page) {
                this.serverDataAllList = [];
                this.searchState = true;//查询状态
                if (this.activeTabs == 1) {
                    for (let i in data){
                        this.serverDataAllList.push(data[i])
                    }
                } else {
                    this.activeTabs = 1;
                }
            },
            //下拉刷新
            onRefresh(){
                this.page=0;
                this.serverPage=0;
                this.loading=false;
                this.finished=false;
                this.goodsDataAllList=[];
                this.serverDataAllList=[];
                if (this.activeTabs==0){
                    this.pageGoodsList();
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .van-card__thumb img {
        border: 0;
        width: 1.94rem;
        height: 1.42rem;
        /*margin-top: 0.16rem;*/
    }

    .van-tab, .van-tag--large {
        font-size: 0.29rem;
    }

    .mint-loadmore {
        overflow: scroll !important;
    }

    .mint-loadmore-bottom {
        margin-bottom: 0 !important;
    }

    #exchange {

        .num {
            color: #ff9a26;
        }

        nav {
            width: 100%;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            font-size: 0.3rem;
            display: flex;
            background: #fff;
            position: fixed;
            z-index: 100;
            top: .91rem;

            &.top {
                top: 0;
            }

            a {
                flex: 1;
                color: #757575;
            }

            .active {
                color: #ff9a26;
                border-bottom: 1px solid #ff9a26;
            }
        }

        .list-box {
            margin-top: .8rem;
            font-size: .3rem;
        }

        .list-box::-webkit-scrollbar {
            display: none;
        }

        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0.2rem 0.3rem 0;

            li {
                width: 3.25rem;
                margin-bottom: 0.15rem;

                > div {
                    width: 3.25rem;
                    height: 3.25rem;
                    position: relative;
                    border: 1px solid #eeeeee;

                    .sold-out {
                        position: absolute;
                        width: 3.25rem;
                        height: 3.25rem;
                        background: rgba(0, 0, 0, 0.3);
                        z-index: 12;

                        .sold-icon {
                            width: 1.65rem;
                            height: 1.31rem;
                            background: url(http://cdn1.damailicai.com/h5/integral/soldout@1x.png) no-repeat;
                            background-size: 100%;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }

                    .discount-icon {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 0.64rem;
                        height: 0.99rem;
                        line-height: .33rem;
                        text-align: center;
                        word-break: break-all;
                        padding-top: .15rem;
                        box-sizing: border-box;
                        background: url(http://cdn1.damailicai.com/h5/integral/find_jfsc_zk_bj@2x.png) no-repeat;
                        background-size: 100%;
                        z-index: 11;

                        p {
                            font-size: .3rem;
                            color: #FFFFFF;
                            text-align: center;
                        }
                    }

                    img {
                        width: 3rem;
                        height: 3rem;
                        position: absolute;
                        display: block;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                    }

                    .foot-icon {
                        position: absolute;
                        width: 0.66rem;
                        height: 0.37rem;
                        line-height: .37rem;
                        text-align: center;
                        background: #FF5657;
                        color: #ffffff;
                        right: 0.13rem;
                        bottom: 0.14rem;
                        font-size: .26rem;
                        z-index: 11;
                    }
                }

                h3 {
                    font-size: .28rem;
                    color: #212121;
                    text-align: left;
                }

                p {
                    line-height: 0.33rem;
                    text-align: left;
                    font-size: 0;

                    span {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 0.24rem;
                        margin-right: 0.05rem;
                    }
                }
            }
        }
    }

    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .van-card__content--centered {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        line-height: 0.44rem;
    }

    .van-card__content {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
    }

    .van-card__thumb {
        position: relative;
        width: 1.94rem;
        height: 1.42rem;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .van-card {
        position: relative;
        color: #323233;
        font-size: 0.3rem;
        padding: 0.2rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: white;
        border-bottom: 1px solid #e8e8e8;
    }

    .van-tabs .van-tab__pane {
        width: 100%;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: white;
    }

    .van-hairline--top-bottom::after {
        border-width: 0px 0;
    }
    /*首页tabs滑动条问题*/
    .van-tabs__content{
        height: 100%;
        position: fixed;
        width: 100%;
        bottom: 0px;
        top: 2.54rem;
        overflow: auto;
    }

    .van-list{
        height: 100%;
        padding-bottom: 3rem;
    }

</style>
<style>
    .van-hairline--top-bottom::after {
        border-width: 0px 0 !important;
        border: none;
    }

    [class*=van-hairline]::after {
        content: ' ';
        position: absolute;
        pointer-events: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        -webkit-transform: scale(.0);
        transform: scale(.0);
        border: 0px solid #2e5ea7;
    }
</style>
