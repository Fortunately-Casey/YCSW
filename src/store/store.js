import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import search from './modules/search'
import statistics from './modules/statistics'
import analysis from './modules/analysis'
import repair from './modules/repair'
import map from './modules/map'
import realTime from './modules/realTime'
import query from './modules/query'
import patrol from './modules/patrol'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules:[
        map,
        search,
        statistics,
        analysis,
        repair,
        realTime,
        query,
        patrol
    ],
    strict:debug,
    plugins:debug ? [createLogger()]: []
})