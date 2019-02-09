<template>
  <div>
    <!-- 轮播图区域[已抽离为单独组件] -->
    <swip :picList='picList'></swip>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/newslist">
          <img
            src="../../images/menu1.png"
            alt=""
          >
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/photolist">
          <img
            src="../../images/menu2.png"
            alt=""
          >
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/productlist">
          <img
            src="../../images/menu3.png"
            alt=""
          >
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="#">
          <img
            src="../../images/menu4.png"
            alt=""
          >
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="#">
          <img
            src="../../images/menu5.png"
            alt=""
          >
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="#">
          <img
            src="../../images/menu6.png"
            alt=""
          >
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>

import swip from '../subcomponent/Swip.vue'

export default {
  data() {
    return {
      picList: []
    };
  },
  created() {
    this.getPic();
  },
  methods: {
    getPic() {
      this.$http.get("http://192.168.2.70:6677/Slx/GetData") 
        .then(result => { 
          if(result.body.message==1){
             this.picList = result.body.data;
             console.log(this.picList)
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
    swip
  }
};
</script>
<style lang="scss" scoped>


.mui-grid-view.mui-grid-9 .mui-media {
  background-color: white;
  img {
    width: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>