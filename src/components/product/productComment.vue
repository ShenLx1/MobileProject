<template>
    <cmtbox :paramid="this.$route.params.id" :type="'product'"></cmtbox>
</template>
<script>
import cmtbox from '../subcomponent/Comment.vue'

export default {
   
    components:{
        cmtbox
    }
}
</script>
<style lang="scss" scoped>

</style>