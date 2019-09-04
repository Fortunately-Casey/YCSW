import axios from 'axios'

// 登录

export function Login(params) {
    const url = '/api/Home/Logon'
    return axios.get(url,{
        params:params,
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) =>{
        console.log(err)
    })
}

// 修改密码 

export function EditPassword(params) {
    const url = "/api/UserInfo/ChangePasswordSelf"
    return axios.get(url, {
        params:params
    }).then((res) => {
        return Promise.resolve(res)
    }).catch((err) => {
        console.log(err)
    })
}