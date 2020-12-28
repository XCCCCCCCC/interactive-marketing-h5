import { getList, publish, stop, remove } from '@/services/activity'
const state = {
  page: 1,
  pageSize: 10,
  total: 0,
  status: 'all',
  list: [],
}
const getters = {}
const actions = {
  async getList({ dispatch, commit, state, rootState }) {
    commit(
      'updateList',
      await getList({
        page: state.page,
        per_page: state.pageSize,
      }),
    )
  },
  async publish({ dispatch, commit, state, rootState }, id) {
    await publish(
      JSON.stringify({
        ids: String(id),
      }),
    )
    dispatch('getList')
  },
  async stop({ dispatch, commit, state, rootState }, id) {
    await stop(
      JSON.stringify({
        ids: String(id),
      }),
    )
    dispatch('getList')
  },
  async remove({ dispatch, commit, state, rootState }, id) {
    await remove(
      JSON.stringify({
        ids: String(id),
      }),
    )
    dispatch('getList')
  },
}
const mutations = {
  updatePage(state, val) {
    state.page = val
  },
  updateList(state, obj) {
    function returnStatus(status) {
      switch (status) {
        case 0:
          return '未发布'
        case 1:
          return '已发布未进行'
        case 2:
          return '进行中'
        case 3:
          return '已结束'
        case 4:
          return '已删除'
        default:
          return '未知'
      }
    }
    state.list = obj.data.map((activity) => ({
      id: activity.id,
      name: activity.title,
      no: activity.id,
      startTime: activity.from_datetime,
      endTime: activity.to_datetime,
      count: activity.userNumber,
      max: activity.total_chance === -1 ? '不限' : activity.total_chance,
      status: returnStatus(activity.status),
    }))
    state.total = obj.total_num
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
}
