//项目入口文件
import Vue from 'vue'

//1.1导入路由
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己得routejs模块
import router from './router.js'

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装VueResource
Vue.use(VueResource)
//全局设置post请求时的数据格式
Vue.http.options.emulateJSON = true;
//设置请求得根路径
//Vue.http.options.root='/root';

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次加载都从localstorage中获取数据
let getlocalcart=JSON.parse(localStorage.getItem('localCart')||'[]')

//创建数据仓储对象
var store =new Vuex.Store({//这里Store s要大写！！！
    state:{//类似于data
        //cart:[],//购物车中商品数据，用数组存储一系列对象
        cart:getlocalcart
    },
    mutations:{//类似于methods
        addToCart(state,sendProduct){//点击加入购物车，保存到store里的cart中
            //吐过已有数据，只要更新数量
            //如果没有，push到cart中
            
            let flag=false;//在cart没有找到对应商品标识
            state.cart.some(item=>{//some循环??(遍历cart里的每项sendProduct)
                if(item.id==sendProduct.id){
                    item.count += parseInt(sendProduct.count)
                    flag=true
                    return true
                }
            })
            if(!flag){
                state.cart.push(sendProduct)
            }

            //当更新 cart之后，把cart数组存储到本里localstrage中实现持久化
            localStorage.setItem('localCart',JSON.stringify(state.cart))
        },
        updateCart(state,changeProduct){
            state.cart.some(item=>{
                if(item.id==changeProduct.id){
                    item.count=parseInt(changeProduct.count)
                    return true
                }
            })
            localStorage.setItem('localCart',JSON.stringify(state.cart))
        },
        removeCart(state,id){
            //根据id删除store中数据
            state.cart.some((item,i)=>{
                if(item.id==id){
                    state.cart.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('localCart',JSON.stringify(state.cart))
        },
        updateSelect(state,info){
            state.cart.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            localStorage.setItem('localCart',JSON.stringify(state.cart))
        }
    },
    getters:{
        getAllCount(state){
            var c=0;
            state.cart.forEach(element => {
                c+=element.count
            });
            return c
        },
        getCartCount(state){
            var o={};
            state.cart.forEach(item=>{
                o[item.id]=item.count
            });
            return o
        },
        selectCart(state){
            var o={}
            state.cart.forEach(item=>{
                o[item.id]=item.selected
            })
            return o
        },
        getAll(state){
            var o={
                count:0,
                amount:0
            };
            state.cart.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price * item.count
                }
            })
            return o
        }
    }
})


//导入图片缩略图插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  })

//安装兄弟组建传值插件（未使用）
import bus from 'vue-bus';
Vue.use(bus)
const Bus = new Vue()
//导入时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function(datastr,pattern="YYYY年MM月DD日 HH:mm"){
    return moment(datastr).format(pattern)
})



// //按需导入Mint-ui组件
// import {Header,Swipe,SwipeItem,Toast,Button,Lazyload} from 'mint-ui'
// //手动导入
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.component(Toast.name,Toast)
// Vue.use(Lazyload)
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入app根组件
import app from './App.vue'

//渲染组件
let vm=new Vue({
    el:"#app",
    render:c=>c(app),
    router,//1.4挂在路由对象到vm实例
    store:store//缩写store
})