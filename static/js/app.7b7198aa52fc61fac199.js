webpackJsonp([1],{"3RYi":function(e,t){},"991W":function(e,t){},"MqL+":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("xd7I"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var s=n("C7Lr")({name:"App"},r,!1,function(e){n("RLyU")},null,null).exports,i=n("3XdE"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("input",{attrs:{type:"text"}}),this._v(" "),t("button",{on:{click:this.ruterb}},[this._v("去B")])])},staticRenderFns:[]};var c=n("C7Lr")({name:"RouterA",methods:{ruterb:function(){}}},a,!1,function(e){n("m0pe")},"data-v-190bd1b2",null).exports,u={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var l={name:"RRouter",components:{RouterB:n("C7Lr")({name:"RouterB"},u,!1,function(e){n("3RYi")},"data-v-c4d0c8be",null).exports,RouterA:c}},d={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("keep-alive",[t("router-a")],1),this._v(" "),t("router-b")],1)},staticRenderFns:[]};n("C7Lr")(l,d,!1,function(e){n("j+XB")},"data-v-0c1d47e6",null).exports;var m={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};n("C7Lr")({name:"RouterC"},m,!1,function(e){n("WBia")},"data-v-27fb51e3",null).exports;var f={name:"DropDown",data:function(){return{num:0,x:0,y:0}},mounted:function(){},methods:{mouse:function(e){document.body.scrollTop=e.clientY,console.log(e.clientY),console.log(document.body.scrollTop)}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box",on:{click:function(t){return e.mouse(t)}}},[n("ul",{ref:"boxx",staticClass:"boxx"},e._l(20,function(t,o){return n("li",{key:o,staticClass:"box1",attrs:{data:t}},[e._v(e._s(t))])}),0)])},staticRenderFns:[]};var v=n("C7Lr")(f,p,!1,function(e){n("Y2In")},"data-v-39f25bb8",null).exports,h={name:"VueUi",components:{DropDown:v}},g={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("drop-down")],1)},staticRenderFns:[]};var b=n("C7Lr")(h,g,!1,function(e){n("MqL+")},"data-v-c1047a42",null).exports;o.a.use(i.a);var _=new i.a({mode:"history",base:"/",routes:[{path:"/",name:"App",component:s,meta:{keepAlive:!1,title:"vueinit"}},{path:"/ui",name:"VueUi",component:b,meta:{keepAlive:!1,title:"VueUi"},children:[{path:"/uidrop",name:"DropDown",component:v,meta:{keepAlive:!1,title:"下拉刷新"}}]}]}),R=(n("991W"),n("R4Sj")),x={changeClientWh:function(e,t){(0,e.commit)("CHANGE_CLIENT_WH",t)}},E=n("a3Yh"),C=n.n(E)()({},"CHANGE_CLIENT_WH",function(e,t){e.clientWidth=t.clientWidth});o.a.use(R.a);var w={clientWidth:document.documentElement.clientWidth||document.body.clientWidth,clientHeight:document.documentElement.clientHeight||document.body.clientHeight},A=new R.a.Store({state:w,actions:x,mutations:C}),k=(n("D0oh"),n("aozt")),L=n.n(k),y=n("rVsN"),F=n.n(y);n("CtzY");L.a.defaults.timeout=3e4,L.a.defaults.baseURL="http://api.test.app.glela.cn",L.a.interceptors.request.use(function(e){if("post"===e.method)return e.headers["Content-Type"]="application/json",e},function(e){console.log("输入有误，请核对")}),L.a.interceptors.response.use(function(e){e.data.code;return e},function(e){if(e&&e.response)switch(e.response.status){case 400:e.message="错误请求",console.log(e.message);break;case 403:e.message="拒绝访问",console.log(e.message);break;case 404:e.message="请求错误,未找到该资源",console.log(e.message);break;case 405:e.message="请求方法未允许",console.log(e.message);break;case 408:e.message="请求超时",console.log(e.message);break;case 502:e.message="网络错误",console.log(e.message);break;case 504:e.message="网络超时",console.log(e.message);break;default:e.message="连接错误${err.response.status}",console.log(e.message)}else e.message="连接到服务器失败",console.log(e.message);return F.a.resolve(e.response)});var W={getQueryString:function(e){var t=window.location.search,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),o=t.substr(1).match(n);return null!=o?decodeURI(o[2]):null},isEnvironment:function(){var e=navigator.userAgent,t=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,n=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return t?"isAndroid":n?"isiOS":void 0},imgError:function(e,t){},andNumber:function(e,t){return(1e3*e+1e3*t)/1e3},subtractNumber:function(e,t){return(1e3*e-1e3*t)/1e3},subNumber:function(e,t){return 1e3*e*(1e3*t)/1e6},divideNumber:function(e,t){return 1e3*e/(1e3*t)},trim:function(e){return null==e?null:(e+"").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}};o.a.config.productionTip=!1,window.common=W,window.fetch=function(e,t,n){return new F.a(function(n,o){L.a.post(e,t).then(function(e){n(e.data)},function(e){o(e)})})},_.beforeEach(function(e,t,n){e.meta.title&&(document.title=e.meta.title),n()}),new o.a({el:"#app",router:_,store:A,components:{App:s},template:"<App/>"})},RLyU:function(e,t){},WBia:function(e,t){},Y2In:function(e,t){},"j+XB":function(e,t){},m0pe:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.7b7198aa52fc61fac199.js.map