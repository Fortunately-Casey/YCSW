export const server = {
  netWorkUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSX_XA80/MapServer', // 输水管线ServerURL
  RouteUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/NetWork_XA80/NAServer/Route', // 管网
  SSGDUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSD_XA80/MapServer', // 管点
  DXTUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/DXT_XA80/MapServer', // 地形图
  GWJDUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GWJDService/MapServer', // 管网节点
  GWFMUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GWFMService/MapServer', // 管网阀门
  CZUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CZService/MapServer', // 厂站,
  GWSBUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GGSBS/MapServer', // 管网设备
  ssg:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSX_XA80/MapServer',
  // /**
  //  * 标注图层
  //  */
  GWJDTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GWJDWithBZService/MapServer', // 管网节点标注
  GWFMTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GWFMWithBZService/MapServer', // 管网阀门标注
  CZTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CZWithBZService/MapServer', // 厂站标注
  GWSBTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GGSBWithBZS/MapServer', // 管网设备标注
  JSGTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSXWithBZ_XA80/MapServer', // 给水管标注

  // 标注图层
  BYTTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/BYTWithBZService/MapServer', // 补压塔

  BZTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/BZWithBZService/MapServer', // 泵站

  CLBTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CLBWithBZS/MapServer', // 测流表

  CSKTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CSKWithBZService/MapServer', // 出水口

  CYBTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CYBWithBZS/MapServer', // 测压表

  FMJTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/FMJMWithBZService/MapServer', // 阀门井

  FZDLQTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/FZDLQWithBZService/MapServer', // 防止倒流器

  GLJTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GLJMWithBZService/MapServer', // 法兰井

  JSKTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSKWithBZService/MapServer', // 进水口

  PQFTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/PQFWithBZService/MapServer', // 排气阀

  SSCTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/SSCWithBZService/MapServer', // 受水厂

  TCDTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/TCDWithBZService/MapServer', // 探测点

  ZFJTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/ZFJWithBZService/MapServer', // 闸阀井

  DFTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/DFWithBZService/MapServer', // 蝶阀

  PSFTagUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/PSFWithBZService/MapServer', // 排水阀

  // 无标注图层
  BYTUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/BYTService/MapServer', // 补压塔

  BZUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/BZService/MapServer', // 泵站

  CLBUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CLBS/MapServer', // 测流表

  CSKUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CSKService/MapServer', // 出水口

  CYBUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/CYBS/MapServer', // 测压表

  FMJUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/FMJMService/MapServer', // 阀门井

  FZDLQUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/FZDLQService/MapServer', // 防止倒流器

  GLJUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/GLJMService/MapServer', // 法兰井

  JSKUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/JSKService/MapServer', // 进水口

  PQFUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/PQFService/MapServer', // 排气阀

  SSCUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/SSCService/MapServer', // 受水厂

  TCDUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/TCDService/MapServer', // 探测点

  ZFJUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/ZFJService/MapServer', // 闸阀井

  DFUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/DFService/MapServer', // 蝶阀

  PSFUrl:
    'http://10.11.222.52:6080/arcgis/rest/services/YCSWData/PSFService/MapServer' // 排水阀
}

export const materials = [
  { name: '钢' },
  { name: '塑' },
  { name: '铜' },
  { name: '砼' }
] // 管材

export const diameters = [{ diameter: '2400' }]

export const types = [{ name: '全部' }, { name: '测压表' }, { name: '测流表' }]

export const numbers = [
  { name: '全部' },
  { name: 'cplc1' },
  { name: 'cplc2' },
  { name: 'dplc1' },
  { name: 'dplc2' },
  { name: 'dPLC15_15' }
]

export function clearAllGraphic () {
  window.mapBase.clearGraphic() // 清除默认图层
  var visibleLayer = window.mapBase.map.getLayersVisibleAtScale()
  visibleLayer.map((item, index) => {
    if (
      item.id === 'startgraphiclayer' ||
      item.id === 'endgraphiclayer' ||
      item.id === 'pointTc' ||
      item.id === 'pointTc2' ||
      item.id === 'hztc'
    ) {
      window.mapBase.clearGraphic(item)
    }
  })
}

export const faultImageUrl = 'http://10.11.222.52/Inspect/upload/inspect/'
