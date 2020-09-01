import moment from 'moment'
import { getTypeList, create, getDetail, update } from '@/services/activity'
function output(state) {
  return {
    title: state.basic.title,
    from_datetime: moment(state.basic.timeRange[0]).format('YYYY/MM/DD HH:mm:ss'),
    to_datetime: moment(state.basic.timeRange[1]).format('YYYY/MM/DD HH:mm:ss'),
    description: state.basic.description,
    total_chance: state.rule.total === 'free' ? -1 : state.rule.max,
    chance_per_day: state.rule.day,
    point_cost: state.rule.cost,
    share_img: state.share.imageUrl,
    share_title: state.share.summary,
    share_description: state.share.content,
    images: state.images,
    items: state.awards.map((award, index) => ({
      name: award.name,
      position: index,
      type: 1,
      quantity: award.count,
      win_rate: award.rate,
      win_text_1: award.text1,
      win_text_2: award.text2,
      ext_number: award.template,
    })),
  }
}
const state = {
  id: -1,
  status: '',
  basic: {
    title: '会员抽奖赢好礼',
    timeRange: [
      moment().format('YYYY/MM/DD 00:00:00'),
      moment()
        .add(7, 'days')
        .format('YYYY/MM/DD 23:59:59'),
    ],
    description: `1."会员抽奖赢好礼"活动需要花费30积分参与。\n2.活动周期为每月第一周周一(以自然月起始周为准),同一个账户在活动当日可以参与若干次抽奖。\n3."会员抽奖赢好礼"活动所消耗的30积分,一旦参与无论是否中奖，所消耗的积分不予返还。\n4.参加抽奖活动后请留意中奖产品领取页面的礼券使用规则。优惠券的有效期与使用范围请详见规则页面为准。\n5.发现作弊别取等行为，将取消参与及中奖资格积分不子返还。`,
  },
  rule: {
    total: 'free',
    max: 10,
    day: 100,
    cost: 30,
  },
  activeAward: '0',
  awards: [
    {
      name: '奖项1',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '饮品',
      text2: '买一赠一券',
    },
    {
      name: '奖项2',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '100元',
      text2: '代金券',
    },
    {
      name: '奖项3',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '蛋糕',
      text2: '75折券',
    },
    {
      name: '奖项4',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '8元',
      text2: '代金券',
    },
    {
      name: '奖项5',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '搪瓷杯',
      text2: '7折券',
    },
    {
      name: '奖项6',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '买二赠一券',
      text2: '',
    },

    {
      name: '奖项7',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '挂耳包',
      text2: '一盒券',
    },
    {
      name: '奖项8',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '5元',
      text2: '代金券',
    },
  ],
  share: {
    imageUrl: `/uploads/20200526142914_8592.png`,
    summary: '会员抽奖赢好礼',
    content: '会员抽奖赢好礼',
  },
  curPrizeIndex: 0,
  images: [
    {
      type: 0,
      path: `/uploads/20200528180708_6812.png`,
    },
    {
      type: 1,
      path: `/uploads/20200528180724_9998.png`,
    },
    {
      type: 2,
      path: `/uploads/20200528180731_6509.png`,
    },
    {
      type: 3,
      path: `/uploads/20200528180752_7823.png`,
    },
    {
      type: 4,
      path: `/uploads/20200528183730_2987.png`,
    },
    {
      type: 5,
      path: `/uploads/20200528180829_6152.png`,
    },
    {
      type: 6,
      path: `/uploads/20200528180839_4237.png`,
    },
    {
      type: 7,
      path: `/uploads/20200528180849_2464.png`,
    },
  ],
  cBg: `/uploads/20200821164214_6272.jpg`,
  pBg: `/uploads/20200821163510_6323.jpg`,
  dBg: `/uploads/20200821165029_9911.jpg`,
  startBox: `/uploads/20200616172745_9941.png`,
  aBox: `/uploads/20200616172730_1571.png`,
  nBox: `/uploads/20200616172716_5869.png`,
  prize: `/uploads/20200821165620_7159.png`,
  finished: true,
  showEditDialog: false,
  templateList: [],
}
const getters = {
  // finished(state) {
  //   for (const key in state.basic) {
  //   }
  // },
}
const actions = {
  async getTemplateList({ dispatch, commit, state, rootState }) {
    commit('updateTemplateList', await getTypeList())
  },
  async createActivity({ dispatch, commit, state, rootState }) {
    commit('reset')
    const data = output(state)
    const res = await create(JSON.stringify(data))
    return res
  },
  async getActivity({ dispatch, commit, state, rootState }) {
    const res = await getDetail(state.id)
    commit('updateActivity', res)
  },
  async editActivity({ dispatch, commit, state, rootState }) {
    const data = output(state)
    const res = await update(state.id, JSON.stringify(data))
    return res
  },
}
const mutations = {
  updateTemplateList(state, arr) {
    state.templateList = arr
    state.awards.forEach((award) => {
      award.template = award.template || state.templateList[0].number
    })
  },
  updateId(state, val) {
    state.id = val
  },
  reset(state) {
    state = {
      basic: {
        title: '会员抽奖赢好礼',
        timeRange: [
          moment().format('YYYY/MM/DD 00:00:00'),
          moment()
            .add(7, 'days')
            .format('YYYY/MM/DD 23:59:59'),
        ],
        description: `1."会员抽奖赢好礼"活动需要花费30积分参与。\n2.活动周期为每月第一周周一(以自然月起始周为准),同一个账户在活动当日可以参与若干次抽奖。\n3."会员抽奖赢好礼"活动所消耗的30积分,一旦参与无论是否中奖，所消耗的积分不予返还。\n4.参加抽奖活动后请留意中奖产品领取页面的礼券使用规则。优惠券的有效期与使用范围请详见规则页面为准。\n5.发现作弊别取等行为，将取消参与及中奖资格积分不子返还。`,
      },
      rule: {
        total: 'free',
        max: 10,
        day: 100,
        cost: 30,
      },
      activeAward: '0',
      awards: [
        {
          name: '奖项1',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '饮品',
          text2: '买一赠一券',
        },
        {
          name: '奖项2',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '100元',
          text2: '代金券',
        },
        {
          name: '奖项3',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '蛋糕',
          text2: '75折券',
        },
        {
          name: '奖项4',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '8元',
          text2: '代金券',
        },
        {
          name: '奖项5',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '搪瓷杯',
          text2: '7折券',
        },
        {
          name: '奖项6',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '买二赠一券',
          text2: '',
        },

        {
          name: '奖项7',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '挂耳包',
          text2: '一盒券',
        },
        {
          name: '奖项8',
          type: 'coupon',
          template: state.templateList[0] ? state.templateList[0].number : 'template1',
          count: 1,
          rate: 10,
          text1: '5元',
          text2: '代金券',
        },
      ],
      share: {
        imageUrl: `/uploads/20200526142914_8592.png`,
        summary: '会员抽奖赢好礼',
        content: '会员抽奖赢好礼',
      },
      curPrizeIndex: 0,
      images: [
        {
          type: 0,
          path: `/uploads/20200528180708_6812.png`,
        },
        {
          type: 1,
          path: `/uploads/20200528180724_9998.png`,
        },
        {
          type: 2,
          path: `/uploads/20200528180731_6509.png`,
        },
        {
          type: 3,
          path: `/uploads/20200528180752_7823.png`,
        },
        {
          type: 4,
          path: `/uploads/20200528183730_2987.png`,
        },
        {
          type: 5,
          path: `/uploads/20200528180829_6152.png`,
        },
        {
          type: 6,
          path: `/uploads/20200528180839_4237.png`,
        },
        {
          type: 7,
          path: `/uploads/20200528180849_2464.png`,
        },
      ],
      cBg: `/uploads/20200526182612_5058.png`,
      pBg: `/uploads/20200526182912_8492.png`,
      dBg: `/uploads/20200525194349_2241.png`,
      startBox: `/uploads/20200526135403_8729.png`,
      aBox: `/uploads/20200526135026_9090.png`,
      nBox: `/uploads/20200526115851_4335.png`,
      prize: `/uploads/20200526150838_6973.png`,
      finished: true,
      showEditDialog: false,
    }
  },
  // 更新活动信息
  updateActivity(state, obj) {
    state.status = obj.status
    state.basic.title = obj.title
    state.basic.timeRange = [obj.from_datetime, obj.to_datetime]
    state.basic.description = obj.description
    state.rule.total = obj.total_chance === -1 ? 'free' : 'limit'
    state.rule.max = obj.total_chance !== -1 ? obj.total_chance : 0
    state.rule.day = obj.chance_per_day
    state.rule.cost = obj.point_cost
    state.share.imageUrl = obj.share_img
    state.share.summary = obj.share_title
    state.share.content = obj.share_description
    state.images = obj.images
    state.awards = obj.items.map((item) => ({
      name: item.name,
      type: 'coupon',
      template: item.ext_number,
      count: item.quantity,
      rate: item.win_rate,
      text1: item.win_text_1,
      text2: item.win_text_2,
    }))
  },
  // 更新奖项图片
  updateCurPrizeIndex(state, val) {
    state.curPrizeIndex = val
  },
  updatePrizeImage(state, val) {
    state.images[state.curPrizeIndex].path = `/${val}`
  },
  updateFinished(state, val) {
    state.finished = val
  },
  updateShowEditDialog(state, val) {
    state.showEditDialog = val
  },
  // 基础设置
  updateTitle(state, val) {
    state.basic.title = val
  },
  updateTimeRange(state, obj) {
    state.basic.timeRange = obj
  },
  updateDescription(state, val) {
    state.basic.description = val
  },
  // 规则设置
  updateTotal(state, val) {
    state.rule.total = val
  },
  updateMax(state, val) {
    state.rule.max = val
  },
  updateDay(state, val) {
    state.rule.day = val
  },
  updateCost(state, val) {
    state.rule.cost = val
  },
  // 奖项设置
  updateActiveAward(state, val) {
    state.activeAward = val
  },
  updateName(state, val) {
    state.awards[state.activeAward].name = val
  },
  updateType(state, val) {
    state.awards[state.activeAward].type = val
  },
  updateTemplate(state, val) {
    state.awards[state.activeAward].template = val
  },
  updateCount(state, val) {
    state.awards[state.activeAward].count = val
  },
  updateRate(state, val) {
    state.awards[state.activeAward].rate = val
  },
  updateText1(state, val) {
    state.awards[state.activeAward].text1 = val
  },
  updateText2(state, val) {
    state.awards[state.activeAward].text2 = val
  },
  // 分享设置
  updateImageUrl(state, val) {
    state.share.imageUrl = `/${val}`
  },
  updateSummary(state, val) {
    state.share.summary = val
  },
  updateContent(state, val) {
    state.share.content = val
  },
}
// function input() {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
}
