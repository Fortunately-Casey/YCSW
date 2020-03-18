import * as types from './mutation-type'
import { deepCopy } from '@/common/utils/tool.js'

const state = {
  detailValues: {},
  isShowDetail: false,
  repairSearchList: [],
  isShowEditRepair: false,
  repairEditDetail: {}
}
const mutations = {
  [types.SET_REPAIRDETAIL] (state, detail) {
    state.detailValues = deepCopy(detail)
  },
  [types.SET_ISSHOWREPAIR] (state, isShow) {
    state.isShowDetail = isShow
  },
  [types.SET_REPAIRSEARCHLIST] (state, list) {
    state.repairSearchList = deepCopy(list)
  },
  [types.SET_ISSHOWEDITREPAIR] (state, isShow) {
    state.isShowEditRepair = isShow
  },
  [types.SET_REPAIREDITDETAIL] (state, detail) {
    state.repairEditDetail = deepCopy(detail)
  }
}

const actions = {
  setRepairDetail: ({commit}, detail) => {
    commit('SET_REPAIRDETAIL', detail)
  },
  setIsShowRepairDetail: ({commit}, isShow) => {
    commit('SET_ISSHOWREPAIR', isShow)
  },
  setRepairSearchList: ({commit}, list) => {
    commit('SET_REPAIRSEARCHLIST', list)
  },
  setIsShowEditRepair: ({commit}, isShow) => {
    commit('SET_ISSHOWEDITREPAIR', isShow)
  },
  setRepairEditDetail: ({commit}, detail) => {
    commit('SET_REPAIREDITDETAIL', detail)
  }
}

const getters = {
  repairDetail: state => {
    return state.detailValues
  },
  isShowRepairDetail: state => {
    return state.isShowDetail
  },
  repairSearchList: state => {
    return state.repairSearchList
  },
  isShowEditRepair: state => {
    return state.isShowEditRepair
  },
  repairEditDetail: state => {
    return state.repairEditDetail
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
