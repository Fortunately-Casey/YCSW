import * as types from './mutation-type'
import { deepCopy } from '@/common/utils/tool.js'
const state = {
  isShowFaultLevel: false,
  isShowFaultDetail: false,
  faultDetailValue: {},
  bigImageUrl: '',
  isShowBigImage: false
}
const mutations = {
  [types.SET_ISSHOWFAULTLEVEL] (state, isShow) {
    state.isShowFaultLevel = isShow
  },
  [types.SET_ISSHOWFAULTDETAIL] (state, isShow) {
    state.isShowFaultDetail = isShow
  },
  [types.SET_FAULTDETAILVALUE] (state, detail) {
    state.faultDetailValue = deepCopy(detail)
  },
  [types.SET_BIGIMAGEURL] (state, url) {
    state.bigImageUrl = url
  },
  [types.SET_ISSHOWBIGIMAGE] (state, isShow) {
    state.isShowBigImage = isShow
  }
}

const actions = {
  setIsShowFaultLevel: ({commit}, isShow) => {
    commit('SET_ISSHOWFAULTLEVEL', isShow)
  },
  setIsShowFaultDetail: ({commit}, isShow) => {
    commit('SET_ISSHOWFAULTDETAIL', isShow)
  },
  setFaultDetailValue: ({commit}, detail) => {
    commit('SET_FAULTDETAILVALUE', detail)
  },
  setBigImageUrl: ({commit}, url) => {
    commit('SET_BIGIMAGEURL', url)
  },
  setIsShowBigImage: ({commit}, isShow) => {
    commit('SET_ISSHOWBIGIMAGE', isShow)
  }
}

const getters = {
  isShowFaultLevel: state => {
    return state.isShowFaultLevel
  },
  isShowFaultDetail: state => {
    return state.isShowFaultDetail
  },
  faultDetailValue: state => {
    return state.faultDetailValue
  },
  bigImageUrl: state => {
    return state.bigImageUrl
  },
  isShowBigImage: state => {
    return state.isShowBigImage
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
