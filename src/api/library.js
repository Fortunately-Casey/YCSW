import axios from 'axios'

// 获取图库类型
export function GetDocunmentTypeInfo (params) {
  const url = '/api/DocumentManage/GetDocunmentTypeInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取图库列表
export function GetDocumentManageInfo (params) {
  const url = '/api/DocumentManage/GetDocumentManageInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 新增图件库
export function InsertDocumentManageInfo (params) {
  const url = '/api/DocumentManage/InsertDocumentManageInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 图库详情
export function GetDocumentManageDetail (params) {
  const url = '/api/DocumentManage/GetDocumentManageInfo2'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 删除资料
export function DeleteDocummentManage (params) {
  const url = '/api/DocumentManage/DeleteDocumentManageInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 编辑资料
export function EditDocummentManage (params) {
  const url = '/api/DocumentManage/UpdateDocumentManageInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取下载列表
export function GetDocumentDetail (params) {
  const url = '/api/DocumentManage/GetDocumentDetail'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 批量下载
export function DownLoadTK (params) {
  const url = '/api/DocumentManage/DownLoadTK'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 详情文件删除
export function DeleteDocumentDetailInfo (params) {
  const url = '/api/DocumentManage/DeleteDocumentDetailInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}
