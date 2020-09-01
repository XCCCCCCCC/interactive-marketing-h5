<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import preview from '@/components/squareLottery/preview'
import basic from '@/components/squareLottery/basic'
import rule from '@/components/squareLottery/rule'
import awards from '@/components/squareLottery/awards'
import share from '@/components/squareLottery/share'
export default {
  name: '',
  components: { preview, basic, rule, awards, share },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      squareLottery: (state) => state.squareLottery,
      config: (state) => state.squareLottery.config,
    }),
    tabActiveName: {
      get() {
        return this.squareLottery.tabActiveName
      },
      set(val) {
        this.updateTabActiveName(val)
      },
    },
    canPublish() {
      return this.config.status === 0
    },
  },
  watch: {},
  mounted() {
    if (!this.$route.query.id) {
      this.$router.push({ path: '/activity' })
      return false
    }
    this.updateTabActiveName('basic')
    this.updateId(this.$route.query.id)
    this.getActivity()
  },
  methods: {
    ...mapMutations('squareLottery', ['updateTabActiveName']),
    ...mapMutations('squareLottery/config', ['updateId']),
    ...mapActions('squareLottery/config', ['getActivity', 'editActivity']),
    ...mapActions('activity', ['publish']),
    handleFormCheck(activeName, oldActiveName) {
      let flag = true
      this.$refs[oldActiveName].$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('尚有信息未填写或填写错误，请先填写或修改')
      }
      return flag
    },
    confirmPublish() {
      const self = this
      let flag = true
      this.$refs[this.tabActiveName].$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('尚有信息未填写或填写错误，请先填写或修改')
        return false
      }
      this.$confirm('确定发布该互动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          self.yes()
        })
        .catch(() => {})
    },
    async yes() {
      await this.publish(this.config.id)
      this.getActivity()
      this.$message({
        type: 'success',
        message: '发布成功!',
      })
    },
    async save() {
      let flag = true
      this.$refs[this.tabActiveName].$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('尚有信息未填写或填写错误，请先填写或修改')
        return false
      }
      await this.editActivity()
      this.$message.success('修改成功')
    },
    exit() {
      this.$router.push({ path: '/activity' })
    },
  },
}
</script>

<template>
  <el-container id="square-lottery-config">
    <el-aside width="400px" class="preview-wrapper">
      <preview></preview>
    </el-aside>
    <el-main class="config-wrapper">
      <el-container>
        <el-header height="50px" class="control-wrapper">
          <el-button v-if="canPublish" size="small" type="primary" @click="confirmPublish">预览与发布</el-button>
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" type="primary" @click="exit">退出编辑</el-button>
        </el-header>
        <el-main class="tabs-wrapper">
          <el-tabs
            stretch
            v-model="tabActiveName"
            :before-leave="handleFormCheck"
            type="border-card"
          >
            <el-tab-pane label="基础设置" name="basic">
              <basic ref="basic"></basic>
            </el-tab-pane>
            <el-tab-pane label="规则设置" name="rule">
              <rule ref="rule"></rule>
            </el-tab-pane>
            <el-tab-pane label="奖项设置" name="award">
              <awards ref="award"></awards>
            </el-tab-pane>
            <el-tab-pane label="分享设置" name="share">
              <share ref="share"></share>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<style lang="scss">
#square-lottery-config {
  .preview-wrapper {
    // padding: 20px;
    padding-left: 0;
    min-height: 667px;
    @include flex-center();
  }
  .config-wrapper {
    display: flex;
    padding: 0;
    // background: rgba(255, 255, 255, 1);
    // box-shadow: 0px 2px 4px 0px rgba(37, 115, 239, 0.1);
    // border-radius: 4px;
    .control-wrapper {
      @include flex-center(y);
      justify-content: flex-end;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #dcdfe6;
    }
    .tabs-wrapper {
      display: flex;
      padding: 0;
      .el-tabs {
        flex: 1;
        box-shadow: none;
      }
    }
  }
}
</style>
