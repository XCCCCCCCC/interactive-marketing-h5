<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import list from '@/components/activity/list'
export default {
  name: '',
  components: { list },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      page: state => state.activity.page,
      pageSize: state => state.activity.pageSize,
      total: state => state.activity.total,
    }),
    page: {
      get() {
        return this.$store.state.activity.page
      },
      set(val) {
        this.updatePage(val)
      },
    },
  },
  watch: {},
  mounted() {
    this.updatePage(1)
    this.getList()
  },
  methods: {
    ...mapMutations('activity', ['updatePage']),
    ...mapActions('activity', ['getList']),
    ...mapActions('squareLottery/config', ['createActivity']),
    async handleCreate() {
      const res = await this.createActivity()
      this.$router.push({ path: '/squareLottery/config', query: { id: res.id, showPrize: 'no' } })
    },
  },
}
</script>

<template>
  <el-container id="activity">
    <el-header class="activity-toolbar" height="50px">
      <el-button size="small" type="primary" @click="handleCreate">创建活动</el-button>
    </el-header>
    <el-main>
      <list></list>
      <div class="pagination-wrapper">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss">
#activity {
  flex: 1;
  padding: 20px;
  .activity-toolbar {
    @include flex-center(y);
    justify-content: flex-end;
  }
  .pagination-wrapper {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
