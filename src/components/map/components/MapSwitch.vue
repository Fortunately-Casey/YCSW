<template>
    <div class="map-switch">
        <div class="electronic" @click="choseMap('electronic')" :class="chosedMap==='electronic'?'active':''"></div>
        <div class="image" @click="choseMap('image')" :class="chosedMap==='image'?'active':''"></div>
    </div>
</template>
<script>
import esriLoader from 'esri-loader'
export default {
  data () {
    return {
      chosedMap: 'electronic'
    }
  },
  props: ['baseMap'],
  methods: {
    choseMap (value) {
      switch (value) {
        case 'electronic':
          this.baseMap.hideLayer('googleMap1') // 电子地图
          this.baseMap.hideLayer('googleMap2')
          this.baseMap.showLayer('googleMap3')
          break
        case 'image':
          this.baseMap.showLayer('googleMap1')
          this.baseMap.showLayer('googleMap2') // 影像地图
          this.baseMap.hideLayer('googleMap3')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.map-switch {
  width: 120px;
  height: 150px;
  background-color: #fff;
  box-shadow: 2px 2px 3px #adbfd3;
  .electronic {
    cursor: pointer;
    width: 102px;
    height: 52px;
    background: url("../../../assets/icon/map-reg.png") no-repeat;
    margin: 0 auto;
    margin-top: 15px;
  }
  .active {
    opacity: 0.7;
  }
  .image {
    cursor: pointer;
    width: 102px;
    height: 52px;
    background: url("../../../assets/icon/satellite.png") no-repeat;
    margin: 0 auto;
    margin-top: 15px;
    // opacity: 0.1;
  }
}
</style>
