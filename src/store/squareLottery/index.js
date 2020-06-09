import config from './config'
import win from './win'
import lose from './lose'
const state = {
  tabActiveName: 'basic',
}
const getters = {}
const actions = {}
const mutations = {
  updateTabActiveName(state, val) {
    state.tabActiveName = val
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    config,
    win,
    lose,
  },
}
