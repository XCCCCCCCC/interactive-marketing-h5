import Vue from 'vue'
import Vuex from 'vuex'
import activity from './activity'
import squareLottery from './squareLottery/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    activity,
    squareLottery,
  },
})
