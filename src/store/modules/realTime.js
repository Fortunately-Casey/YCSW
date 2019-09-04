const state = {
    realTimeIndex:'',
    isShowRealTimeSpace:false,
    realTimeDetail:{},
    isShowRealTimeDetail:false
}

import * as types from './mutation-type'
import { deepCopy } from '@/common/utils/tool.js'
const mutations = {
    [types.SET_REALTIMEINDEX](state,index) {
        state.realTimeIndex = deepCopy(index)
    },
    [types.SET_REALTIMRDETAIL](state,detail) {
        state.realTimeDetail = deepCopy(detail)
    },
    [types.SET_ISSHOWREALTIMEDETAIL](state,isShow) {
        state.isShowRealTimeDetail = deepCopy(isShow)
    }
}

const actions = {
    setRealTimeIndex:({commit},index) => {
        commit("SET_REALTIMEINDEX",index)
    },
    setRealTimeDetail:({commit},detail) => {
        commit("SET_REALTIMRDETAIL",detail)
    },
    setIsShowRealTimeDetail:({commit},isShow) => {
        commit("SET_ISSHOWREALTIMEDETAIL",isShow)
    }
}

const getters = {
    realTimeIndex: state => {
        return state.realTimeIndex
    },
    realTimeDetail: state => {
        return state.realTimeDetail
    },
    isShowRealTimeDetail: state => {
        return state.isShowRealTimeDetail
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}