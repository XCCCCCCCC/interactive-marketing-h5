<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      publishVisible: false,
      stopVisible: false,
      removeVisible: false,
    }
  },
  computed: {
    ...mapState({
      list: state => state.activity.list,
    }),
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('activity', []),
    ...mapActions('activity', ['publish', 'stop', 'remove']),
    handleStart(i, row) {
      this.publish(row.id)
    },
    handleStop(i, row) {
      this.stop(row.id)
    },
    handleEdit(i, row) {
      this.$router.push({ path: '/squareLottery/config', query: { id: row.id, showPrize: 'no' } })
    },
    handleRemove(i, row) {
      this.remove(row.id)
    },
  },
}
</script>

<template>
  <el-table
    id="activity-list"
    header-row-class-name="table-header-row"
    row-class-name="table-body-row"
    :data="list"
    border
    style="width: 100%"
  >
    <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
    <el-table-column prop="no" label="活动编号" align="center"></el-table-column>
    <el-table-column label="活动时间" align="center">
      <template slot-scope="scope">
        <p>{{ scope.row.startTime }}</p>
        <p>{{ scope.row.endTime }}</p>
      </template>
    </el-table-column>
    <el-table-column label="状态" align="center">
      <template slot-scope="scope">
        <span :class="scope.row.status == '进行中' ? 'running' : 'normal'">{{scope.row.status}}</span>
      </template>
    </el-table-column>
    <el-table-column label="参与人数/最大限制" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.count}}&nbsp;/&nbsp;{{scope.row.max}}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="奖品/商品详情" align="center"></el-table-column> -->
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-popconfirm
          placement="top-end"
          title="确定结束该活动吗？"
          @onConfirm="handleStop(scope.$index, scope.row)"
        >
          <el-button slot="reference" v-if="scope.row.status == '进行中'" size="mini" type="text">结束</el-button>
        </el-popconfirm>
        <el-popconfirm
          placement="top-end"
          title="确定发布该活动吗？"
          @onConfirm="handleStart(scope.$index, scope.row)"
        >
          <el-button slot="reference" v-if="scope.row.status == '未发布'" size="mini" type="text">发布</el-button>
        </el-popconfirm>
        <el-button
          v-if="scope.row.status != '已删除'"
          size="mini"
          type="text"
          @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button>
        <el-popconfirm
          slot="reference"
          placement="top-end"
          title="确定删除该活动吗？"
          @onConfirm="handleRemove(scope.$index, scope.row)"
        >
          <el-button slot="reference" v-if="scope.row.status != '已删除'" size="mini" type="text">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss">
.table-header-row {
  background-color: #f5f5f5;
  th {
    padding: 6px 0;
    background-color: transparent;
    color: #333333 !important;
    .cell {
      height: 24px !important;
      line-height: 24px !important;
      font-size: 12px;
    }
  }
}
.table-body-row {
  td {
    padding: 6px 0;
    background-color: transparent;
    color: #333333;
    .cell {
      // height: 24px !important;
      line-height: 24px !important;
      font-size: 12px;
      .running {
        color: #30bc9b;
      }
      .normal {
        color: #a6a6a6;
      }
      > span + span {
        margin-right: 10px;
      }
      > span:last-child {
        margin-left: 10px;
      }
    }
  }
}
.el-table__empty-block,
.el-table__empty-text {
  min-height: 36px;
  // height: 36px;
  line-height: 36px;
}
.el-popconfirm {
  .el-popconfirm__main {
    margin: 0.8em 0;
  }
}
</style>
