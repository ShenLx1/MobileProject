<template>
    <div class="mui-numbox" :data-numbox-min='1' :data-numbox-max='10'  data-numbox-step='1' style="height:25px;width:120px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox" readonly/>
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
            //this.$emit('getCount',parseInt(this.$refs.numbox.value))
            //只要数值改变 立即将数据传递到store中去
            this.$store.commit("updateCart",{
                id:this.productid,
                count:this.$refs.numbox.value
            })

        }
    },
    props:["initcount","productid"]
}
import  mui  from "../../lib/mui/js/mui.js";
</script>
<style lang="scss" scoped>

</style>

