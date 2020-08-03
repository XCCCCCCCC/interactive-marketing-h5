<script>
import { mapState, mapMutations } from 'vuex'
import categroyDivider from '@/components/common/categroyDivider'
export default {
  name: '',
  components: { categroyDivider },
  props: [],
  data() {
    return {
      rules: {
        title: { required: true, message: '请输入活动标题', trigger: 'blur' },
        timeRange: [{ type: 'array', required: true, message: '请选择活动时间', trigger: 'change' }],
        description: [{ required: true, message: '请输入活动规则说明', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      form: (state) => state.squareLottery.config.basic,
    }),
    title: {
      get() {
        return this.form.title
      },
      set(val) {
        this.updateTitle(val)
      },
    },
    timeRange: {
      get() {
        return this.form.timeRange
      },
      set(val) {
        this.updateTimeRange(val)
      },
    },
    description: {
      get() {
        return this.form.description
      },
      set(val) {
        this.updateDescription(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('squareLottery/config', ['updateTitle', 'updateTimeRange', 'updateDescription']),
  },
}
</script>

<template>
  <div id="config-basic">
    <categroy-divider></categroy-divider>
    <el-form
      size="small"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动标题：" prop="title">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间：" prop="timeRange">
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          format="yyyy/MM/dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动规则说明：" prop="description">
        <el-input type="textarea" :autosize="{minRows: 10, maxRows: 30}" v-model="description"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
#config-basic {
  padding: 20px 40px;
  // max-width: 600px;
  text-align: left;
  .el-form-item__content {
    max-width: 400px;
  }
}
</style>
