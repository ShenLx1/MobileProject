<template>
  <div>
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newslist"
        :key="item.uniquekey"
      >
        <router-link :to="'/home/newsinfo/'+ item.uniquekey">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img"
          ><!-- http://s1.hdslb.com/bfs/static/jinkela/video/asserts/33.png -->
          <div class="mui-media-body">
            <h5>{{ item. title}}</h5>
            <p class='mui-ellipsis'>
              <span>{{ item.date | dataFormat }}</span>
              <span>分类：{{ item.category }}</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>


export default {
  data() {
    return {
      newslist: [] //新闻列表this.
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http
       //proxy代理 .get("/jiekou")
       .get("http://192.168.2.70:6677/Slx/GetNews")
        .then(result => {
          if(result.body.message==1){
            console.log(result);
            this.newslist = result.body.data;
          }else{
             Toast('获取新闻列表失败！');
          }
         
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-ellipsis {
  font: 12px;
  color: #00a1d6;
  display: flex;
  justify-content: space-between;
}
</style>

