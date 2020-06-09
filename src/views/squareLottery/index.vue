<script>
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    toConfig(showPrize) {
      if (this.$route.query.showPrize === showPrize) {
        return false
      }
      this.$router.replace({ path: '/squareLottery/config', query: { showPrize } })
    },
  },
}
</script>

<template>
  <el-container id="square-lottery-main">
    <el-aside width="150px" class="aside-wrapper">
      <ul>
        <li :class="$route.query.showPrize === 'no' ? 'active' : ''" @click="toConfig('no')">首页</li>
        <li :class="$route.query.showPrize === 'yes' ? 'active' : ''" @click="toConfig('yes')">中奖页面</li>
      </ul>
    </el-aside>
    <el-main class="main-wrapper">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
  </el-container>
</template>

<style lang="scss">
#square-lottery-main {
  .aside-wrapper {
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0px 0px 6px 0px rgba(37, 115, 239, 0.2);
    ul {
      li {
        @include text-size(16px, 40px);
        cursor: pointer;
        &.active {
          background: rgba(37, 115, 239, 0.4);
        }
        &:hover {
          background: rgba(37, 115, 239, 0.2);
        }
      }
    }
  }
  .main-wrapper {
    display: flex;
    padding: 20px;
    background-color: #f8f8f8;
  }
}
</style>
