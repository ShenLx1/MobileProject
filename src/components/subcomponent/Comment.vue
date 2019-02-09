<template>
    <div class="cmt-container">
        <h4>评论列表</h4>
        <hr>
        <textarea placeholder="说出你的想法(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
       
       <div class="cmt-list">
           <div class="cmt-item" v-for="(item,i) in NewsComment" :key="item.add_time">
               <div class="cmt-title">
                   第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time}}
               </div>
               <div class="cmt-content">
                   {{item.content}}
               </div>
           </div>
          
       </div>
       
        <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
//导入获取时间
import slxtime from 'silly-datetime'
export default {
    data(){
        return{
            page:1,//默认显示第一页
            NewsComment:[],//所有评论数据
            msg:''//发表评论内容
        }
    },
    props:["paramid","type"],//接收父组件传递过来的值
    created(){
        this.getNewsComment()
    },
    methods:{
        getNewsComment(){
            this.$http.post('http://192.168.2.70:6677/Slx/GetComment',{id:this.paramid,page:this.page,type:this.type},{emulateJSON:true})
            .then(result=>{ 
                this.NewsComment=result.body;
            })
            .catch(ex=>{
                console.log(ex);
            })
        },
        loadMore(){
            this.page++;
            this.getNewsComment();
        },
        postComment(){
            if(this.msg.trim()==''){
                Toast("请输入评论内容！")
                return
            }
            let param={};
            param.match_id=this.paramid;
            param.user_name = "尊贵会员";
            param.add_time = slxtime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            param.content = this.msg.trim();
            param.type=this.type;
             this.$http.post('http://192.168.2.70:6677/Slx/AddComment',param,{emulateJSON:true})
            .then(result=>{
                Toast('发表评论成功！');
                //拼接出一个评论对象(当前偷懒)
                this.NewsComment.unshift(param);
                //重置输入框
                this.msg='';
            })
            .catch(ex=>{
                console.log(ex);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h4{
        font-size: 18px;
        text-align: center;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0
    }

    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-content{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }

}
</style>

