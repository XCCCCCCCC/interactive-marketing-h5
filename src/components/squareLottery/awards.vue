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
        name: { required: true, message: '请输入奖项名称', trigger: 'blur' },
        type: { required: true, message: '请选择奖项类型', trigger: 'change' },
        template: { required: true, message: '请选择奖项类型', trigger: 'change' },
        count: [
          { required: true, message: '请输入奖项数量' },
          { type: 'number', message: '必须为数字值' },
        ],
        rate: [
          { required: true, message: '请输入中奖率' },
          { type: 'number', message: '必须为数字值', min: 0, max: 100 },
        ],
        text1: [{ required: true, message: '请输入中奖文案1', trigger: 'blur' }],
        text2: [{ required: true, message: '请输入中奖文案2', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      templateList: state => state.squareLottery.config.templateList,
      awards: state => state.squareLottery.config.awards,
    }),
    activeAward: {
      get() {
        return this.$store.state.squareLottery.config.activeAward
      },
      set(val) {
        this.updateActiveAward(val)
      },
    },
    name: {
      get() {
        return this.awards[this.activeAward].name
      },
      set(val) {
        this.updateName(val)
      },
    },
    type: {
      get() {
        return this.awards[this.activeAward].type
      },
      set(val) {
        this.updateType(val)
      },
    },
    template: {
      get() {
        return this.awards[this.activeAward].template
      },
      set(val) {
        this.updateTemplate(val)
      },
    },
    count: {
      get() {
        return this.awards[this.activeAward].count
      },
      set(val) {
        this.updateCount(val)
      },
    },
    rate: {
      get() {
        return this.awards[this.activeAward].rate
      },
      set(val) {
        this.updateRate(val)
      },
    },
    text1: {
      get() {
        return this.awards[this.activeAward].text1
      },
      set(val) {
        this.updateText1(val)
      },
    },
    text2: {
      get() {
        return this.awards[this.activeAward].text2
      },
      set(val) {
        this.updateText2(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('squareLottery/config', ['updateActiveAward', 'updateName', 'updateType', 'updateTemplate', 'updateCount', 'updateRate', 'updateText1', 'updateText2']),
    handleFormCheck(activeName, oldActiveName) {
      let flag = true
      this.$refs['ruleForm'].validate(valid => {
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
  },
}
</script>

<template>
  <div id="config-awards">
    <el-tabs stretch v-model="activeAward" type="border-card" :before-leave="handleFormCheck">
      <el-tab-pane name="0" label="位置一"></el-tab-pane>
      <el-tab-pane name="1" label="位置二"></el-tab-pane>
      <el-tab-pane name="2" label="位置三"></el-tab-pane>
      <el-tab-pane name="3" label="位置四"></el-tab-pane>
      <el-tab-pane name="4" label="位置五"></el-tab-pane>
      <el-tab-pane name="5" label="位置六"></el-tab-pane>
      <el-tab-pane name="6" label="位置七"></el-tab-pane>
      <el-tab-pane name="7" label="位置八"></el-tab-pane>
    </el-tabs>
    <div class="form-wrapper">
      <el-form
        size="small"
        :model="awards[activeAward]"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="100px"
        class="demo-ruleForm"
      >
        <categroy-divider label="基本选项"></categroy-divider>
        <el-form-item label="奖项名称：" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="奖项类型：" prop="type">
          <el-radio-group disabled v-model="type">
            <el-radio label="coupon">优惠券</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="template">
          <el-select v-model="template" placeholder="请选择优惠券模板">
            <el-option
              v-for="el in templateList"
              :key="el.number"
              :label="el.name"
              :value="el.number"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖项数量：" prop="count">
          <el-input v-model.number="count" style="width: 150px;">
            <template slot="append">份</template>
          </el-input>
        </el-form-item>
        <div style="height:20px"></div>
        <categroy-divider label="中奖设置"></categroy-divider>
        <el-form-item label="中奖率：" prop="rate">
          <el-input v-model.number="rate" style="width: 150px;">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="中奖文案1：" prop="text1">
          <el-input v-model="text1" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="中奖文案2：" prop="text2">
          <el-input v-model="text2" style="width: 150px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
#config-awards {
  .form-wrapper {
    padding: 10px 20px;
    text-align: left;
    .el-form-item__content {
      max-width: 400px;
    }
  }
  .el-tabs--border-card > .el-tabs__header {
    border-bottom: 0;
  }
  .el-tabs__content {
    padding: 0;
  }
}
</style>
