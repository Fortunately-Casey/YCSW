// Base64解码
export const b64DecodeUnicode = str => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

// Base64转码
export const b64EncodeUnicode = str => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1)
    })
  )
}

function Format2Len (i) {
  return i < 10 ? '0' + i : i
}
// 获取时间
export const getTime = () => {
  let CurrentTime = new Date()
  let timeStr =
    CurrentTime.getFullYear() +
    '年' +
    Format2Len(CurrentTime.getMonth() + 1) +
    '月' +
    Format2Len(CurrentTime.getDate()) +
    '日 ' +
    Format2Len(CurrentTime.getHours()) +
    ':' +
    Format2Len(CurrentTime.getMinutes())
  // +
  // ":" +
  // Format2Len(CurrentTime.getSeconds());
  return timeStr
}

export const getDate = () => {
  let CurrentTime = new Date()
  let timeStr =
    CurrentTime.getFullYear() +
    '-' +
    Format2Len(CurrentTime.getMonth() + 1) +
    '-' +
    Format2Len(CurrentTime.getDate())
  // "" +
  // Format2Len(CurrentTime.getHours()) +
  // ":" +
  // Format2Len(CurrentTime.getMinutes())
  // +
  // ":" +
  // Format2Len(CurrentTime.getSeconds());
  return timeStr
}

export const getClock = () => {
  let CurrentTime = new Date()
  let timeStr =
    // CurrentTime.getFullYear() +
    // "-" +
    // Format2Len(CurrentTime.getMonth() + 1) +
    // "-" +
    // Format2Len(CurrentTime.getDate())
    // "" +
    Format2Len(CurrentTime.getHours()) +
    ':' +
    Format2Len(CurrentTime.getMinutes()) +
    ':' +
    Format2Len(CurrentTime.getSeconds())
  return timeStr
}

// 深拷贝
export const deepCopy = value => {
  return JSON.parse(JSON.stringify(value))
}

export const copy = (obj) => {
  let copy = Object.create(Object.getPrototypeOf(obj))
  let propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach((items) => {
    let item = Object.getOwnPropertyDescriptor(obj, items)
    Object.defineProperty(copy, items, item)
  })
  return copy
}

// list做分页
export const setPagenation = list => {
  let result = []
  let chunk = 5 // 分页数量
  if (list && list.length) {
    for (var i = 0, j = list.length; i < j; i += chunk) {
      result.push(list.slice(i, i + chunk))
    }
  }
  return result
}
