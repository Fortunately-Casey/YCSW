import axios from 'axios'

// 通告查询和获取列表
export function GetMessageList (params) {
  const url = '/api/InspectManage/GetMessageList'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取移动用户App

export function GetAPPUser (params) {
  const url = '/api/UserInfo/GetAPPUser'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 新增通告
export function InsertMessage (params) {
  const url = '/api/InspectManage/InsertMessage'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 编辑通告
export function UpdateMessage (params) {
  const url = '/api/InspectManage/UpdateMessage'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 发布通告
export function UpdateMessage2 (params) {
  const url = '/api/InspectManage/UpdateMessage2'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 删除通告
export function DeleteMessage (params) {
  const url = '/api/InspectManage/DeleteMessage'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取故障点
export function GetXZGZ (params) {
  const url = '/api/InspectManage/GetXZGZ'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取故障详情图片
export function GetInspectRecordPics (params) {
  const url = '/api/InspectManage/GetInspectRecordPics'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}
// 故障查询
export function GetInspectRecordList (params) {
  const url = '/api/InspectManage/GetInspectRecordList'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 故障统计分析
export function GetInspectStaticRecord (params) {
  const url = '/api/InspectManage/GetInspectStaticRecord'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 统计导出
export function ExportInspectStaticRecord (params) {
  const url = '/api/InspectManage/ExportInspectStaticRecord'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}
// 轨迹查询
export function GetInspectTrack (params) {
  const url = '/api/InspectManage/GetInspectTrack'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取阅读人员
export function GetMessageReadeInfo (params) {
  const url = '/api/InspectManage/GetMessageReadeInfo'
  return axios.get(url, {
    params: params
  }).then((resp) => {
    return Promise.resolve(resp)
  }).catch((err) => {
    console.log(err)
  })
}
