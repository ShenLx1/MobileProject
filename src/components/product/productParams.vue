<template>
    <div class="productparams-container">
        <h3>{{productParams.title}}</h3> 
        <hr>
        <div class="content" v-html="productParams.word"></div>

    </div>
</template>
<script>
export default {
    data(){
        return{
             id:this.$route.params.id,
             productParams:[]
        }
    },
    created(){
        this.getProductParams();
    },
    methods:{
        getProductParams(){
             this.$http.post("http://192.168.2.70:6677/slx/GetProductDetail",{id:this.id},{emulateJSON:true})
                .then(result => { 
                if(result.body.message==1){
                    //console.log(result.body.data_single)
                    this.productParams=result.body.data_single;
                }else{
                    Toast('加载数据失败！');
                }
          
            }) .catch(e => {
            console.log(e)});
        }
    }
}
</script>
<style lang="scss" scoped>
.productparams-container{
    h3{
        font-size:16px;
        color: #226aff;
        text-align: center;
        margin:15px 0;
    }
    .content{
        font-size:10px;
    }
}
</style>
