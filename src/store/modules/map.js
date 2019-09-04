const state = {
    mapLayers:[],
    EquimentType:"",
    Geometrystr:"",
    clickResult:[],
    isShowClickDetail:false,
    isMeasure:false,
    isOpenTimer:'',
    mapBase:{
        map:''
    }
}

import * as types from './mutation-type'
import { deepCopy } from '@/common/utils/tool.js'
const mutations = {
    [types.SET_EQUIMENTTYPE](state,type) {
        state.EquimentType = deepCopy(type)
    },
    [types.SET_GEOMETRYSTR](state,geometry) {
        state.Geometrystr = deepCopy(geometry)
    },
    [types.SET_CLICKRESULT](state,result) {
        state.clickResult = deepCopy(result)
    },
    [types.SET_ISSHOWCLICKDETAIL](state,isShow) {
        state.isShowClickDetail = isShow
    },
    [types.SET_ISMEASURE](state,isMeasure) {
        state.isMeasure = isMeasure
    },
    [types.SET_ISOPENTIMER](state,isOpen) {
        state.isOpenTimer = isOpen
    }
}

const actions = {
    setEquimentType:({commit},type) => {
        commit("SET_EQUIMENTTYPE",type)
    },
    setGeometry:({commit},geomerty) => {
        commit("SET_GEOMETRYSTR",geomerty)
    },
    setClickResult:({commit},result) => {
        commit("SET_CLICKRESULT",result)
    },
    setIsShowClickDetail:({commit},isShow) => {
        commit("SET_ISSHOWCLICKDETAIL",isShow)
    },
    setIsMeasure:({commit},isMeasure) => {
        commit("SET_ISMEASURE",isMeasure)
    },
    setMapBase:({commit},mapBase) => {
        commit("SET_MAPBASE",mapBase)
    },
    setIsOpenTimer:({commit},isOpen) => {
        commit("SET_ISOPENTIMER",isOpen)
    }
}

const getters = {
    EquimentType: state => {
        return state.EquimentType
    },
    Geometrystr: state => {
        return state.Geometrystr
    },
    clickResult: state => {
        return state.clickResult
    },
    isShowClickDetail: state => {
        return state.isShowClickDetail
    },
    isMeasure: state => {
        return state.isMeasure
    },
    mapBase: state => {
        return state.mapBase
    },
    isOpenTimer: state => {
        return state.isOpenTimer
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}