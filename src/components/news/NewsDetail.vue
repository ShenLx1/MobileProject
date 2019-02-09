<template>
    <div class="newsinfo-container">
        <h4 class="title">新闻标题：{{newsDetail.category}}</h4>
        <p class="subtitle">
            <!-- 得放一个v- 不然会第一次不加载 -->
            <span v-text="newsDetail.date"></span>
            <span >作者：{{newsDetail.author_name}}</span>
        </p>
        <hr>
        <!-- 内容区域 -->
         <img :src="newsDetail.image1" >
         <div class="content" v-html="newsDetail.content"></div>
         <img :src="newsDetail.image2" >
         <img :src="newsDetail.image3" >
         
        <!-- 评论子组件区域 -->
        <!-- 父组件向子组件传值 -->
        <comment-box :paramid="this.id" :type="'news'">123</comment-box>
    </div>
</template>
<script>
//1.导入评论子组件
import comment from'../subcomponent/Comment.vue';

export default {
    data(){
        return {
           id:this.$route.params.id,//将url上的id挂载到data里，来传递给接口,
           newsDetail:''
        }
    },
    created(){
         this.getNewsDetail();
    },
    methods:{
        getNewsDetail(){
           // this.$http.get("http://localhost:6677/Slx/GetNewsDetail/"+this.id)//传入id
           //{emulateJSON:true}设置通过 application/x-www-form-urlencoded格式发起请求   
            this.$http.post('http://192.168.2.70:6677/Slx/GetNewsDetail',{id:this.id},{emulateJSON:true})
            .then(result => {
                if(result.body.message==1){
                    console.log(result.body.data_single)
                     this.newsDetail = result.body.data_single;
                }else{
                    Toast('加载数据失败！');
                }
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    components:{
        //1.2 用来注册子组件节点
        "comment-box":comment
    }
}
</script>
<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
        color: brown
    }
    .subtitle{
        font-size: 13px;
        color: blue;
        display: flex;
        justify-content: space-between;
    }
    .content{
        padding: 5px 10px;
        img{
            width: 100%;
        }
    }
}
</style>


