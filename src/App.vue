<template>
    <div class="app-container">
        <!-- 顶部Header区域 -->
        <mt-header fixed title="Shenlx">
               <mt-button  icon="back" slot="left" @click="goBack" v-show="flag">返回</mt-button>
        </mt-header>
      
  <!-- v-link="'/'"<mt-button icon="more" slot="right"></mt-button> -->
        <!-- 中间router-view路由区域 -->
        <transition mode="out-in">
			  <router-view></router-view>
		</transition>
	  
     
        <!-- 底部tabber区域 -->
		<!-- 1.5将a连接改造为routerlink -->
         <nav class="mui-bar mui-bar-tab">
			 <router-link class="mui-tab-item-footer  mui-active" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
				</router-link>
			 <router-link class="mui-tab-item-footer " to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
		 <router-link class="mui-tab-item-footer " to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					 <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span> 
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			 <router-link class="mui-tab-item-footer " to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
      
    </div>
</template>

<script>
export default {
    data(){
        return{
            flag:false
        }
    },
    created(){
        //在非根地址页面刷新 判定
        this.flag=this.$route.path==='/home'?false:true;
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    },
    watch:{
        //监听地址栏，如果是home根目录就隐藏返回按钮
        '$route.path':function(newVal){
            if(newVal==='/home'){
                this.flag=false
            }else{
                this.flag=true
            }

        }
    }
}
</script>

<style lang="scss" scpoed>
.mint-header.is-fixed{
    z-index: 999;
}
   .app-container{
       padding-top: 40px;
	   padding-bottom: 50px;
	   overflow-x: hidden
   }

   //动画
   .v-enter{
	   opacity: 0;
	   transform: translateX(100%);
   }
	 .v-leave-to{
		  opacity: 0;
	   transform: translateX(-100%);
	   position: absolute
	 }

   .v-enter-active,
   .v-leave-active{
	   transition: all 0.5s ease;
   }


//
.mui-bar-tab .mui-tab-item-footer .mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-footer  {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-footer .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-footer .mui-icon~.mui-tab-label{
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>