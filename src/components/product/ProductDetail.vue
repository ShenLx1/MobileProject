<template>
    <div class="Productinfo-container">
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swip  :picList='picList'></swip>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{productDetail.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{productDetail.old_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{productDetail.now_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectCount" :max='10'></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p v-html="productDetail.text"></p>
                </div>
            </div>
            <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goParams(productDetail.itemid)">详情介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(productDetail.itemid)">商品评论</mt-button>
            </div>
        </div>

        <!-- 添加购物车小球
        1. 用transition包裹小球
        2.使用钩子函数控制动画
         -->
        <transition 
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            >
            <div class="ball" v-show="ballFlag" ref="ball"></div>

        </transition>
    </div>
</template>

<script>
//导入轮播图组件
import swip from '../subcomponent/Swip.vue'
//导入选择数量组件
import numbox from '../subcomponent/Product_Numberbox.vue'


export default {
    data(){
        return{
            //id:this.$route.id,
            id:this.$route.params.id,
            picList:[],
            productDetail:[],
            ballFlag:false,//控制小球的隐藏显示
            count:1//默认用户买一个
        }
    },
    created(){
        this.getProductDetail()
    },
    methods:{
        getProductDetail() {
            this.$http.post("http://192.168.2.70:6677/slx/GetProductDetail",{id:this.id},{emulateJSON:true})
                .then(result => { 
                if(result.body.message==1){
                    //console.log(result.body.data_single)
                    let obj=result.body.data_single;
                    let pic={};
                    let list = new Array();
                    for(var key in obj){
                        //轮播图组件中 url为key值  img为图片属性
                        if(key.indexOf("img_url")!=-1&&obj[key]!=""){
                                pic[key]=obj[key]
                                let person={};
                                person.img=obj[key];
                                list.push(person)
                        }
                    }
                    //console.log(list)
                    result.body.data_single.text.replace(" ","<br/>")
                    this.productDetail=result.body.data_single;
                    this.picList = list;
                }else{
                    Toast('加载数据失败！');
                }
          
            }) .catch(e => {
            console.log(e);
                });
        },
        goParams(id){
            //编程式导航跳转到详情
            this.$router.push({name:"ProductParams",params:{id:id}})
        },
        goComment(id){
            //编程式导航跳转到详情
            this.$router.push({name:"ProductComment",params:{id:id}})
        },
        addCart(){ //添加购物车
            //小球显示控制
            this.ballFlag=!this.ballFlag
            //vuex传值
            //拼接出一个要保存到store中的对象
            var sendProduct={
                id:this.id,
                count:this.
                count,price:this.productDetail.now_price,
                selected:true}
            
            //调用store中mutation方法来将商品加入购物车
            this.$store.commit("addToCart",sendProduct);
        },
        getSelectCount(num){
             //子组件向父组件传值
            //父向子传递方法，子调用这个方法，同时把数据作为参数传递给这个方法
            //当子组件把选中的数量传递到父组件时，把值保存到data中去
            this.count=num;
            console.log("父组件获取到的值为："+this.count)
            //父组件向子组件传值
            //调用子组件时用属性绑定（v-bind）发送值
            //子组件通过props接收同时同时属性绑定获取值
        },

        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画自适应滚动位置
            //两个具体位置，纵轴减纵轴，横轴减横轴

            //获取小球在页面中的位置
            const ballPosition =this.$refs.ball.getBoundingClientRect();
            //获取结束位置在页面中的位置
            const badgePosition =document.getElementById("badge").getBoundingClientRect();
            const xDist=badgePosition.left-ballPosition.left;
            const yDist=badgePosition.top-ballPosition.top;

            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition='all 0.5s cubic-bezier(.26,-0.19,1,.32)';//使用bezier替换ease动画效果
            setTimeout(function(){
                done()
            },1000)//必须要setTimeout异步调用(延迟设置为transition的时间最佳)，不然过渡会立即完成。
        },
        afterEnter(el){
            this.ballFlag=false;
        }
    },
    components:{
        swip,numbox
    }
}
</script>
<style lang="scss" scoped>
.Productinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        font-size: 16px;
        color: red;
        font-weight: bold;
    }

    .mui-card-footer{
        display: block;//初始使用了flex所以按钮都在一行

        button{
            margin: 10px 0;
        } 
    }
}

.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 999;
    top:430px;
    left:150px;
}
</style>
