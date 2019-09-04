const state = {
    userQueryList:[],
    userQueryDetail:{},
    comsuptionList:[],
    comsuptionDetail:{},
    isShowComsuptionDetail:false,
    isShowUserQueryDetail:false
}

import * as types from './mutation-type'
import { deepCopy } from '@/common/utils/tool.js'
const mutations = {
    [types.SET_USRQUERYLIST](state,list) {
        state.userQueryList = deepCopy(list)
    },
    [types.SET_USERQUERYDETAIL](state,detail) {
        state.userQueryDetail = deepCopy(detail)
    },
    [types.SET_ISSHOWUSERQUERYDETAIL](state,isShow) {
        state.isShowUserQueryDetail = isShow
    },
    [types.SET_COMSUPTIONLIST](state,list) {
        state.comsuptionList = deepCopy(list)
    },
    [types.SET_COMSUPTIONDETAIL](state,detail) {
        state.comsuptionDetail = deepCopy(detail)
    },
    [types.SET_ISSHOWCOMSUPTION](state,isShow) {
        state.isShowComsuptionDetail = isShow
    }
}

const actions = {
    setUserQueryList:({commit},list) => {
        commit("SET_USRQUERYLIST",list)
    },
    setUserQueryDetail:({commit},detail) => {
        commit("SET_USERQUERYDETAIL",detail)
    },
    setIsShowQueryDetail:({commit},isShow) => {
        commit("SET_ISSHOWUSERQUERYDETAIL",isShow)
    },
    setComsuptionList:({commit},list) => {
        commit("SET_COMSUPTIONLIST",list)
    },
    setComsuptionDetail:({commit},detail) => {
        commit("SET_COMSUPTIONDETAIL",detail)
    },
    setIsShowComsuption:({commit},isShow) => {
        commit("SET_ISSHOWCOMSUPTION",isShow)
    }
}

const getters = {
    userQueryList: state => {
        return state.userQueryList
    },
    userQueryDetail: state => {
        return state.userQueryDetail
    },
    isShowUserQueryDetail: state => {
        return state.isShowUserQueryDetail
    },
    comsuptionList: state => {
        return state.comsuptionList
    },
    comsuptionDetail: state => {
        return state.comsuptionDetail
    },
    isShowComsuptionDetail: state => {
        return state.isShowComsuptionDetail
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}