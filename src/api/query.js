import axios from 'axios'

// 用户查询
export function GetServiceInfoList (params) {
  const url = '/api/WaterPlant/GetServiceInfoList'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 用水量查询

export function GetWaterPlantYSL (params) {
  const url = '/api/WaterPlant/GetWaterPlantYSL'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}
