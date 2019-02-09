<template>
  
  <div>
      <!-- 顶部滑动条区域 -->
        <!-- 去除full-screen属性 -->
    <div id="slider" class="mui-slider ">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
            <!-- vue绑定类选择器  -->
          <a :class="['mui-control-item',item.id==0?'mui-active':'']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in imagesCategory" :key="item.groupId"
            @click="getImgByCategory(item.groupid)">
            {{item.category}}
          </a>
         
        </div>
      </div>

    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <!-- 通过tag渲染成li标签 -->
      <li v-for="item in imageList" :key="item.pid">
        <!-- router-link绑定click事件需要使用.native事件修饰符 -->
        <router-link :to="{path:'/home/photoDetail/'+item.pid}" @click.native="sendMsg()"> 
           <img v-lazy="item.url">
            <div class="info">
              <h1 class="info-title">{{gid}}</h1>
              <div class="info-text">{{ item.title }}</div>
            </div>
        </router-link>
         
      </li>
    </ul>
  </div>

</template>
<script>
//1.1 导入mui的js
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
        imagesCategory:[],
        imageList:[],//图片列表数组
        gid:0
    };
  },
  created(){
      this.getAllCategory()
      this.getImgByCategory(0)//默认进入页面，主动请求所有列表数据
  },
  mounted() {
    //最早能操作DOM的位置就是mounted，不然初始化的时候找不到
    //1.2 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
      getAllCategory(){
          this.$http.get('http://192.168.2.70:6677/slx/GetImagesCategory')
          .then(result=>{
            if(result.body.message==1){
              //手动拼接出完整的全部分类
              result.body.data.unshift({category:"全部",groupid:0})
              this.imagesCategory=result.body.data;
            }else{
              Toast('数据加载失败！');
            }
          })
          .catch(ex=>{
              console.log(ex)
          })
      },
      getImgByCategory(gid){
        this.gid=gid;//存储groupid
        this.$http.post('http://192.168.2.70:6677/slx/GetImagesContent',{id:gid},{emulateJSON:true})
        .then(result=>{
            if(result.body.message==1){
                this.imageList=result.body.data;
            }else {
              Toast('图片加载失败！');
            }
        })
        .catch(ex=>{
            console.log(ex)
        })
      },
      sendMsg(){
       this.$bus.$emit('val',this.gid)
    },
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list{
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li{
     background-color:#ccc;
     text-align: center;
     margin-bottom: 10px;
     box-shadow: 0 0 #999 6px;
     position: relative;
     img{
       width: 100%;
       vertical-align:middle
     }
    //必须
    img[lazy="loading"]{
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
 }
.info{
   color: whitesmoke;
   text-align: left;
   position: absolute;
   bottom: 0; 
   background-color: rgba(0,0,0,0.4);
   max-height: 84px;
   .info-title{
     font-size: 14px;
   }
   .info-text{
     font-size:13px;
   }
 }
 
</style>

