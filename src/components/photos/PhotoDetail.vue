<template>
    <div class="photodetail-container">
        <h3 v-html="imageDetail.title">{{ imageDetail.title }}</h3>
        <p class="subtitle">
            <!-- <span>发表时间：</span>
            <span>作者：</span> -->
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <!-- <img class="preview-img" v-for="(item,index) in piclist" :key="item.src"
         :src="item.src" height="100" @click="$preview.open(index,piclist)"> -->
        <vue-preview :slides="piclist" @close="handleClose" class="picshow"></vue-preview>
        <!-- 文字内容区域 -->
        <div class="content" v-html="imageDetail.text"></div>
        <!-- 评论子组件 -->
        <cmt-box :paramid="this.id" :type="'photos'"></cmt-box>
    </div>

</template>
<script>
//导入评论子组件
import comment from '../subcomponent/Comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            gid:this.$route.params.gid,//，存在手动拼接的全部数据。老子不用了！浪费老子时间
            imageDetail:[],
            piclist:[]//缩略图存储
        }
    },
    
    created(){
       this.getPhotoDetail()
    },
    methods:{

        handleClose () {
        console.log('close event')
      },
        getPhotoDetail(){
            //获取图片详情 
           
          
            this.$http.post('http://192.168.2.70:6677/Slx/GetImagesDetail',{id:this.id},{emulateJSON:true})
            .then(result=>{
                if(result.body.message==1){
                    this.imageDetail=result.body.data_single
                    result.body.data_single.pic.forEach(pic=>{
                        pic.w=600
                        pic.h=400
                    })
                    this.piclist=result.body.data_single.pic
                }else{
                    Toast('图片详情加载失败！');
                }
            })
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>
<style lang="scss" scoped>
.photodetail-container{
    padding: 3px;
    h3{
        color: #26A2ff;
        font-size:16px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{

    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    

} 
</style>
<style>
.my-gallery{
    width: 100%;
    height: 200px
}
.picshow figure{
        float: left ;
        margin: 2px 2px; 
    }
</style>

