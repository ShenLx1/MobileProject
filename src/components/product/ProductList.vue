<template>
    <div class="product-list">
            <!-- 页面跳转方式。
            方式1：a标签跳转
                     <router-link :to="'/home/productlist/'+item.itemid" class="product-item" v-for="item in productList" :key="item.itemid"></router-link>


            方式2：（编程式跳转）dom   window.location.href
             -->


            <div class="product-item" v-for="item in productList" :key="item.itemid" @click="goDetail(item.itemid)">
                <img :src="item.img_url" alt="">
                <h1 class="title">{{item.title}}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{item.price}}</span>
                        <span class="old">￥{{item.market_price}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>已售：{{item.comment}}</span>
                    </p>
                </div>
            </div>
             
             <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
</template>
<script>

export default {
    data(){
        return {
            page:1,
            productList:[]
        }
    },
    created(){
        this.getProductList();
    },
    methods:{
        
        getProductList(){
            //获取商品列表
            this.$http.post("http://192.168.2.70:6677/slx/GetProductList",{page:this.page},{emulateJSON:true})
            .then(result=>{
                if(result.body.message==1){
                    console.log(result.body)
                    this.productList=result.body.dataByPage
                    //拼接上之前的数据
                    //this.productList=this.productList.concat(result.body.dataByPage)               
                      }
            })
        },
        loadMore(){
            this.page++;
            this.getProductList();
        },
        goDetail(id){
            //使用js形式进行路由跳转[vue-router]
            //this.$route  区别 this.$router
            //是一个路由【参数对象】，包含路由中的参数，params和query等
            //是一个路由【导航对象】，可以用其实现路由的前进后退以及跳转
           
           //1.最简单方式 this.$router.push("/home/productlist/"+id)
           //2.传递对象  this.$router.push({path:"/home/productlist/"+id})
           //3.传递命名的路由  需要在路由创建时添加name属性
            this.$router.push({name:'productDetail',params:{id:id}}) 
           //4.带参数 this.$router.push({path:"/home/productlist/"+id,query:{id:id}}) 
        },
      
    }
}
</script>
<style lang="scss" scoped>
.product-list{
    display: flex;
    flex-wrap:wrap;
    padding: 7px;
    justify-content: space-between;
}
.product-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow:0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    //改变主轴方向
    flex-direction: column;
    justify-content: space-between;

    min-height: 293px;
    img{
        width: 100%
    }
    .title{
        font-size: 14px;
    }
    .info{
        background-color: #eee;
        .p{
            margin: 0;
            padding: 5px;
        }
        .price{
            .now{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
            .old{
                text-decoration: line-through;
                font-size: 12px;
                margin-left: 10px;
            }
        }
        .sell{
            display: flex;
            flex-wrap:wrap;
            justify-content: space-between;
            font-size: 10px;
        }
    }
}
</style>
