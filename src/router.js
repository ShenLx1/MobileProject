// 路由文件
import VueRouter from "vue-router"

//导入对应得路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsDetails from './components/news/NewsDetail.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoDetail from './components/photos/PhotoDetail.vue'
import ProductList from './components/product/ProductList.vue'
import ProductDetail from'./components/product/ProductDetail.vue'
import ProductParams from './components/product/productParams.vue'
import ProductComment from './components/product/productComment.vue'


// 创建一个路由对象
let router = new VueRouter({
    routes:[//配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/Member',component:MemberContainer},
        {path:'/Shopcar',component:ShopcarContainer},
        {path:'/Search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsDetails},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoDetail/:id',component:PhotoDetail},
        {path:'/home/productlist',component:ProductList},
        {path:'/home/productlist/:id',component:ProductDetail,name:'productDetail'},
        {path:'/home/productParams/:id',component:ProductParams,name:'ProductParams'},
        {path:'/home/productComment/:id',component:ProductComment,name:'ProductComment'},
    ],
    linkActiveClass:"mui-active"//覆盖默认得高亮的类
})

export default router