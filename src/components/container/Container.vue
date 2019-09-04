<template>
    <div class="content">
        <side-bar></side-bar>
        <m-content></m-content>
    </div>
</template>
<script>
import SideBar from './components/SideBar.vue'
import MContent from './components/Content.vue'
    export default {
        components:{
            SideBar,
            MContent
        }
    }
</script>
<style lang="less" scoped>
    .content {
        height: 93%;
    }
</style>