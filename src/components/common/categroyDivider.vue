<script>
export default {
  name: '',
  components: {},
  props: {
    label: {
      type: String,
      default: '基本选项',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<template>
  <div id="categroy-divider">
    <span class="categroy__label">{{label}}</span>
    <el-divider></el-divider>
  </div>
</template>

<style lang="scss">
#categroy-divider {
  text-align: left;
  .categroy__label {
    font-size: 14px;
    color: #909399;
  }
  .el-divider--horizontal {
    margin-top: 10px;
  }
}
</style>
