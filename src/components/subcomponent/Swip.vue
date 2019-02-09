<template>
  <div>
    <mt-swipe :auto="4000">
        <!-- 谁调用此组件，谁将picLIst传过来 [父组件向子组件传值]-->
      <mt-swipe-item   v-for="item in picList"  :key="item.url" >
        <img :src="item.img"  alt="" >
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
    props:["picList"]
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  &:nth-child(1) {
    background-color: red;
  } //scss语法 ，选择器
  &:nth-child(2) {
    background-color: rebeccapurple;
  }
  &:nth-child(3) {
    background-color: blue;
  }
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
