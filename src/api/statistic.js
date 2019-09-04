import axios from "axios";

// 导出Excel
export function exportStaticData(params) {
    const url = "/api/SSGW/ExportStaticData"
    return axios.get(url,{
        params:params
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}

// 统计
export function GetStaticJSDbySubSID(params) {
    const url = "/api/JSD/GetStaticJSDbySubSID"
    return axios.get(url,{
        params:params
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}