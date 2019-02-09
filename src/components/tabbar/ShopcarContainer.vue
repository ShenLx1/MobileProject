<template>
    <div class="cart-container">
        <div class="cart-list">
            <!-- 购物车列表区域 -->
            <div class="mui-card" v-for="(item,i) in cartItems" :key="item.itemid">
                <div class="mui-card-content">
                     <div class="mui-card-content-inner"><!---->
                        <mt-switch v-model="$store.getters.selectCart[item.itemid]" 
                                    @change="selectChange(item.itemid,$store.getters.selectCart[item.itemid])"
                                    ></mt-switch>
                        <img :src="item.img_url_1" alt="">
                        <div class="info">
                            <h1>{{item.title.trim().split(" ")[0]+item.title.trim().split(" ")[1]}}</h1>
                            <p>
                                <span class="price">￥{{item.now_price}}</span>
                                <numbox :initcount="$store.getters.getCartCount[item.itemid]" :productid="item.itemid"></numbox>
                                <a href="#" @click.prevent="remove(item.itemid,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 --> 
        <div class="mui-card">
            <div class="mui-card-header">总计（不含运费）</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>已选择商品 <span class="red">{{$store.getters.getAll.count}}</span> 件</p>
                        <p>总价 <span class="red">￥ {{$store.getters.getAll.amount}}</span> 元</p>
                    </div>
                <mt-button type="danger">去结算</mt-button>
                </div>
                <!-- <p>{{$store.getters.selectCart}}</p> -->
            </div>
        </div>
    </div>
    
</template>
<script>
import numbox from '../subcomponent/Cart_Numberbox.vue'

export default {
    data(){
        return {
            cartItems:[]
        }
    },
    created(){
        this.getCartItems();
    },
    methods:{
        getCartItems(){
            //获取store中所以商品，并用逗号分隔 （join）
            let idArr=[];
            this.$store.state.cart.forEach(element => {
                idArr.push(element.id)
            });
            //判空
            if(idArr.length<=0) return;

            this.$http.post("http://192.168.2.70:6677/slx/GetCartItem",{id:idArr.toString()},{emulateJSON:true})
            .then(result=>{
                if(result.body.message===1){
                    this.cartItems=result.body.data;
                    //console.log( this.cartItems);
                }
            })
        },
        remove(id,index){
            //id删store   index删界面上的cartItems
            this.cartItems.splice(index,1);
            this.$store.commit("removeCart",id)
        },
        selectChange(id,val){
            //每当切换开关，把商品id和状态更新到store
            this.$store.commit("updateSelect",{
                id:id,
                selected:val
            })
        }
    },
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
.cart-container{
    background-color: #eee;
    overflow: hidden;
    .cart-list{


        .mui-card-content-inner{
            display: flex;
            justify-items: center;
        }
        img{
            width: 80px;
            height: 60px;
            margin-top:10px
        }
        h1{
            font-size: 14px;
        }
        .info{
            display: flex;
            justify-items: center;
            flex-direction: column;
            .price{
                color: red;
                font-weight: bold;
            }
        }
       
    }
    .mui-card-header{
         font-size: 14px;
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>