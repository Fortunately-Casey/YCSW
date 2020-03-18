import * as types from './mutation-type'
import { deepCopy } from '@/common/utils/tool.js'

const state = {
  netWorkRadio: 'MATERIAL',
  netWorkResult: [],
  searchList: []
}
const mutations = {
  [types.SET_NETWORKRADIO] (state, radio) {
    state.netWorkRadio = deepCopy(radio)
  },
  [types.SET_NETWORKRESULT] (state, result) {
    state.netWorkResult = deepCopy(result)
  },
  [types.SET_SEARCHLIST] (state, list) {
    state.searchList = deepCopy(list)
  }
}

const actions = {
  setNetWorkRadio: ({commit}, netWorkRadio) => {
    commit('SET_NETWORKRADIO', netWorkRadio)
  },
  setNetWorkResult: ({commit}, netWorkResult) => {
    commit('SET_NETWORKRESULT', netWorkResult)
  },
  setSearchList: ({commit}, searchList) => {
    commit('SET_SEARCHLIST', searchList)
  }
}

const getters = {
  netWorkRadio: state => {
    return state.netWorkRadio
  },
  netWorkResult: state => {
    return state.netWorkResult
  },
  searchList: state => {
    return state.searchList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
