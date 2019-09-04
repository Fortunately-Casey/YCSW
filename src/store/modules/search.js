const state = {
    netWorkList:[],
    searchParams:{},
    isShowDetail:false,
    detailValues:{},
    equipmentParams:{},
    equipmentList:[],
    isShowEquipment:false,
    equipmentDetail:{},
    factoryList:[]
}

import * as types from './mutation-type'
import { deepCopy, setPagenation } from '@/common/utils/tool.js'
const mutations = {
    [types.SET_NETWORKLIST](state,list) {
        state.netWorkList = deepCopy(list)
    },
    [types.SET_SEARCHPARAMS](state,params) {
        state.searchParams = deepCopy(params)
    },
    [types.SET_EQUIPMENTLIST](state,list) {
        state.equipmentList = deepCopy(list)
    },
    [types.SET_EQUIPMENTPARAMS](state,params) {
        state.equipmentParams = deepCopy(params)
    },
    [types.SET_ISSHOWSEARCHDETAIL](state,isShowDetail) {
        state.isShowDetail = isShowDetail
    },
    [types.SET_DETAILVALUES](state,detailValues) {
        state.detailValues = deepCopy(detailValues)
    },
    [types.SET_ISSHOWEQUIPMENTDETAIL](state,isShowDetail) {
        state.isShowEquipment = isShowDetail
    },
    [types.SET_EQUIPMENTDETAIL](state,detailValues) {
        state.equipmentDetail = deepCopy(detailValues)
    },
    [types.SET_FACTORYSEARCHLIST](state,list) {
        state.factoryList = deepCopy(list)
    }
}

const actions = {
    setNetWorkList:({commit},netWorkList) => {
        commit("SET_NETWORKLIST",netWorkList)
    },
    setSearchParams:({commit},searchParams) => {
        commit("SET_SEARCHPARAMS",searchParams)
    },
    setEquipmentList:({commit},equipmentList) => {
        commit("SET_EQUIPMENTLIST",equipmentList)
    },
    setEquipmentParams:({commit},equipmentParams) => {
        commit("SET_EQUIPMENTPARAMS",equipmentParams)
    },
    setIsShowDetail:({commit},isShowDetail) => {
        commit("SET_ISSHOWSEARCHDETAIL", isShowDetail)
    },
    setDetailValues:({commit},detailValues) => {
        commit('SET_DETAILVALUES',detailValues)
    },
    setIsShowEquipment:({commit},isShow) => {
        commit('SET_ISSHOWEQUIPMENTDETAIL',isShow)
    },
    setEquipmentDetail:({commit},detailValues) => {
        commit('SET_EQUIPMENTDETAIL',detailValues)
    },
    setFactorySearchList:({commit},list) => {
        commit('SET_FACTORYSEARCHLIST',list)
    },
}

const getters = {
    netWorkList: state => {
        return state.netWorkList
    },
    equipmentList: state => {
        return state.equipmentList
    },
    searchParams: state => {
        return state.searchParams
    },
    equipmentParams: state => {
        return state.equipmentParams
    },
    isShowDetail: state => {
        return state.isShowDetail
    },
    detailValues: state => {
        return state.detailValues
    },
    equipmentDetail: state => {
        return state.equipmentDetail
    },
    isShowEquipment: state => {
        return state.isShowEquipment
    },
    factoryList: state => {
        return setPagenation(state.factoryList)
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}