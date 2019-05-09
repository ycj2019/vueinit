import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import RRouter from '../pages/router/RRouter'
import RouterA from '../pages/router/RouterA'
import RouterB from '../pages/router/RouterB'
import RouterC from '../pages/router/RouterC'
import VueUi from "../pages/ui/VueUi";
import DropDown from "../pages/ui/DropDown";
import JR from "../pages/jianrong/JR";
import IOS from "../pages/jianrong/ios/IOS";
import TimeData from "../pages/jianrong/ios/TimeData";
import And from "../pages/jianrong/and/And";
import WX from "../pages/jianrong/wx/WX";
import XCX from "../pages/jianrong/xcx/XCX";
import GN from "../pages/gn/GN";
import TableHB from "../pages/gn/TableHB";

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/',
	routes: [
		{ 	path: '/', name: 'App', component: App ,
      meta://组件路由元
        { keepAlive: false,
          title: '良知泯灭'
        }
    },
    { 	path: '/ui', name: 'VueUi', component: VueUi ,
        meta:{ keepAlive: false,title: 'VueUi'},
        children:[
          {
            path: 'uidrop', name: 'DropDown', component: DropDown,
            meta:{keepAlive: false,title:'下拉刷新'}
          }
        ]
    },
    { 	path: '/gn', name: 'GN', component: GN ,
        meta:{ keepAlive: false,title: '功能'},
        children:[
          {
            path: 'tablehb', name: 'tablehb', component: TableHB,
            meta:{keepAlive: false,title:'table合并'}
          }
        ]
    },
    { 	path: '/jr', name: 'JR', component: JR ,
        meta:{ keepAlive: false,title: 'JR'},
        children:[
          {
            path:'ios',name:'IOS',component:IOS,
            meta:{keepAlive: false,title: 'IOS'},
            children:[
              {
                path:'timedata',name:'TimeData',component:TimeData,
                meta:{keepAlive: false,title: 'TimeData'}
              }
            ]
          },
          {
            path:'and',name:'And',component:And,
            meta:{keepAlive: false,title: '安卓'},
            children:[
            ]
          },
          {
            path:'wx',name:'WX',component:WX,
            meta:{keepAlive: false,title: '微信'},
            children:[
            ]
          },
          {
            path:'xcx',name:'XCX',component:XCX,
            meta:{keepAlive: false,title: '小程序'},
            children:[
            ]
          }
        ]
    }
	]
})
