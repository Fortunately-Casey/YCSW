import axios from 'axios';
//输水管网查询
export function GetJSXByQuery(params) {
    const url = '/api/Map/GetJSXByQuery'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

//管网设备查询
export function GetGGSBQuery(params) {
    const url = '/api/Map/GetGGSBQuery'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

// 厂站查询
export function GetCZQuery(params) {
    const url = '/api/Map/GetCZQuery'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

// 阀门查询
export function GetFMQuery(params) {
    const url = '/api/Map/GetFMQuery'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

// 节点查询
export function GetJDQuery(params) {
    const url = '/api/Map/GetJDQuery'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

