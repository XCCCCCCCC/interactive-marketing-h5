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
        total: { required: true, message: '请选择总抽奖机会', trigger: 'change' },
        max: [
          { required: true, message: '请输入每人最多抽奖次数' },
          { type: 'number', message: '必须为数字值' },
        ],
        day: [
          { required: true, message: '请输入每人每日抽奖次数' },
          { type: 'number', message: '必须为数字值' },
        ],
        cost: [
          { required: true, message: '请输入每次抽奖消耗积分' },
          { type: 'number', message: '必须为数字值' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      form: state => state.squareLottery.config.rule,
    }),
    isLimit() {
      return this.form.total === 'limit'
    },
    total: {
      get() {
        return this.form.total
      },
      set(val) {
        this.updateTotal(val)
      },
    },
    max: {
      get() {
        return this.form.max
      },
      set(val) {
        this.updateMax(val)
      },
    },
    day: {
      get() {
        return this.form.day
      },
      set(val) {
        this.updateDay(val)
      },
    },
    cost: {
      get() {
        return this.form.cost
      },
      set(val) {
        this.updateCost(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('squareLottery/config', ['updateTotal', 'updateMax', 'updateDay', 'updateCost']),
  },
}
</script>

<template>
  <div id="config-rule">
    <el-form
      size="small"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="150px"
      class="demo-ruleForm"
    >
      <categroy-divider label="抽奖限制"></categroy-divider>
      <el-form-item class="extra" label="总抽奖机会：" prop="total">
        <el-radio-group v-model="total">
          <el-radio label="free">不限</el-radio>
          <el-radio label="limit">限制</el-radio>
        </el-radio-group>
        <el-form-item v-if="isLimit" label="每人最多抽奖机会：" prop="max">
          <el-input v-model.number="max" style="width: 150px;">
            <template slot="append">次</template>
          </el-input>
        </el-form-item>
      </el-form-item>

      <el-form-item label="每日抽奖机会：" prop="day">
        <el-input v-model.number="day" style="width: 150px;">
          <template slot="append">次</template>
        </el-input>
      </el-form-item>
      <div style="height:20px"></div>
      <categroy-divider label="抽奖消耗"></categroy-divider>
      <el-form-item label="每日抽奖消耗积分：" prop="cost">
        <el-input v-model.number="cost" style="width: 150px;">
          <template slot="append">积分</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
#config-rule {
  padding: 20px 40px;
  text-align: left;
  .el-form-item__content {
    max-width: 400px;
  }
  .extra {
    .el-form-item__content {
      max-width: 1000px;
    }
    .el-form-item {
      display: inline-block;
      margin-left: 20px;
    }
  }
}
</style>