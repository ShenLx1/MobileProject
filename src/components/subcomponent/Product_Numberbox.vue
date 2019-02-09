<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'  data-numbox-step='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>

export default {
    mounted(){
        //初始化数字选择框
        mui(".mui-numbox").numbox();
    },
    methods:{
        countChange(){
            //只要数值改变 立即将数据传递到父组件
            this.$emit('getCount',parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        //因为获取数据得方法是异步的，所以在mounted时还没有获取到数据
        //监听到值变化时，调用接收
        //:data-numbox-max='max'
        //这里通过js设置
        max:function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
import  mui  from "../../lib/mui/js/mui.js";
</script>
<style lang="scss" scoped>

</style>

