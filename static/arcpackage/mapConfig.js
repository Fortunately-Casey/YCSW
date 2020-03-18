/* eslint-disable no-unused-vars */
var dojoConfig = {
  packages: [
    {
      name: 'MapApi',
      location: 'http://' + location.host + '/static/arcpackage'
    }
  ],
  spatialReference: {}, // 坐标系
  initialExtent: [], //
  fullExtent: [],
  loads: [], // 切片等级
  origin: {}, // 坐标原点
  initScale: 100// 初始化比例尺
}
