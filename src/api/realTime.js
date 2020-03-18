import axios from 'axios'

// 获取实时数据仪表盘列表
export function GetSCADALive (params) {
  const url = '/api/SCADALive/GetPumpStaticSCADA'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 获取仪表盘空间信息
export function GetPumpDetailSCAD (params) {
  const url = '/api/SCADALive/GetPumpDetailSCAD'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}
