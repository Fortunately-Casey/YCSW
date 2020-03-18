
import axios from 'axios'
// 获取用户权限
export function Permissions () {
  const url = '/api/UserInfo/GetMainMenu'
  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取用户列表
export function GetUserInfo (params) {
  const url = '/api/UserInfo/GetUserInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 新增用户
export function InsertUserInfo (params) {
  const url = '/api/UserInfo/InsertUserInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取用户角色下拉
export function GetRoleInfo (params) {
  const url = '/api/UserInfo/GetRoleInfo2'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取用户详情

export function GetUserDetail (params) {
  const url = '/api/UserInfo/GetUserInfo2'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 删除用户

export function UserDelete (params) {
  const url = '/api/UserInfo/DeleteUserInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 更新用户

export function UpdateUserInfo (params) {
  const url = '/api/UserInfo/UpdateUserInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取用户角色列表
export function GetRoleList (params) {
  const url = '/api/UserInfo/GetRoleInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取权限

export function GetRoots (params) {
  const url = '/api/UserInfo/GetMenuInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 新增角色

export function AddRole (params) {
  const url = '/api/UserInfo/InsertRoleInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 获取角色详情

export function GetRoleDetail (params) {
  const url = '/api/UserInfo/GetRoleInfo3'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 删除角色

export function DeleteRole (params) {
  const url = '/api/UserInfo/DeleteRoleInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 更新角色
export function UpdateRoleInfo (params) {
  const url = '/api/UserInfo/UpdateRoleInfo'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}

// 重置用户密码
export function ResetPassword (params) {
  const url = '/api/UserInfo/ResetPassword'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}
