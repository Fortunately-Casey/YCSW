import * as types from './mutation-type'
import { deepCopy, setPagenation } from '@/common/utils/tool.js'

const state = {
  connectList: [],
  isShowConnect: false,
  connectDetail: {},
  valveDetail: {},
  isShowValve: false
}
const mutations = {
  [types.SET_CONNECTLIST] (state, list) {
    state.connectList = deepCopy(list)
  },
  [types.SET_CONNECTDETAIL] (state, detail) {
    state.connectDetail = detail
  },
  [types.SET_ISSHOWCONNECT] (state, isShow) {
    state.isShowConnect = isShow
  },
  [types.SET_VALVEDETAIL] (state, valve) {
    state.valveDetail = valve
  },
  [types.SET_ISSHOWVALVE] (state, isShow) {
    state.isShowValve = isShow
  }
}

const actions = {
  setConnectList: ({ commit }, connectList) => {
    commit('SET_CONNECTLIST', connectList)
  },
  setConnectDetail: ({ commit }, connectDetail) => {
    commit('SET_CONNECTDETAIL', connectDetail)
  },
  setIsShowConnect: ({ commit }, isShowConnect) => {
    commit('SET_ISSHOWCONNECT', isShowConnect)
  },
  setValveDetail: ({ commit }, valveDetail) => {
    commit('SET_VALVEDETAIL', valveDetail)
  },
  setIsShowValve: ({commit}, isShowValve) => {
    commit('SET_ISSHOWVALVE', isShowValve)
  }
}

const getters = {
  connectList: state => {
    return setPagenation(state.connectList)
  },
  isShowConnect: state => {
    return state.isShowConnect
  },
  connectDetail: state => {
    return state.connectDetail
  },
  valveDetail: state => {
    return state.valveDetail
  },
  isShowValve: state => {
    return state.isShowValve
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
