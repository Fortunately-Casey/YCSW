<template>
    <div class="main">
        <router-view></router-view>
        <m-map></m-map>
    </div>
</template>
<script>
import MMap from '../../map/Map.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    MMap
  }
}
</script>
<style lang="less" scoped>
    .main {
        height: 100%;
        margin-left: 100px;
        position: relative;
    }
</style>
