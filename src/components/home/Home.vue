<template>
    <div class="content">
        <m-header></m-header>
        <m-container></m-container>
    </div>
</template>
<script>
    import MHeader from '../header/Header.vue'
    import MContainer from '../container/Container.vue'
    export default {
        components:{
            MHeader,
            MContainer
        },
      
    }
</script>
<style lang="less" scoped>
    .content {
        background-color: #fff;
        height: 100%;
        min-width: 1400px;
        min-height: 800px;
    }
</style>