import axios from 'axios';

// 维修登记
export function InsertServieceInfo(params) {
    const url = '/api/ServiceInfo/InsertServieceInfo'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

//维修查询
export function GetServiceInfoList(params) {
    const url = '/api/ServiceInfo/GetServiceInfoList'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}
// 维修统计
export function GetStaticInfo(params) {
    const url = '/api/ServiceInfo/GetStaticInfo'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}
// 维修编辑
export function UpdateServieceInfo(params) {
    const url = '/api/ServiceInfo/UpdateServieceInfo'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}

// 维修删除
export function DeleteServieceInfo(params) {
    const url = '/api/ServiceInfo/DeleteServieceInfo'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}
