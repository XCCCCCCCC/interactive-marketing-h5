<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      curIndex: 0,
    }
  },
  computed: {
    ...mapState({
      config: state => state.squareLottery.config,
    }),
    uploadUri() {
      return process.env.NODE_ENV === 'development' ? `/api/image/upload` : `/lottery-api/api/image/upload`
    },
    show: {
      get() {
        return this.config.showEditDialog
      },
      set(val) {
        this.updateShowEditDialog(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('squareLottery/config', ['updateShowEditDialog', 'updateCurPrizeIndex', 'updatePrizeImage']),
    handleAvatarSuccess(...arg) {
      // console.log(arg)
      this.updateCurPrizeIndex(Number(arg[0].response.index))
      this.updatePrizeImage(arg[0].response.path)
    },
    handleAvatarProgress(...arg) {
      // console.log(arg)
    },
    beforeAvatarUpload(...arg) {
      // console.log(arg)
    },
  },
}
</script>

<template>
  <el-dialog title="编辑图片" :visible.sync="show" width="500px" append-to-body>
    <el-form class="upload-form" ref="form" label-width="100px" inline>
      <template v-for="image in config.images">
        <el-form-item :label="`奖项${image.type + 1}：`" :key="image.type">
          <el-upload
            name="image"
            class="avatar-uploader"
            :data="{index: image.type}"
            :action="uploadUri"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="handleAvatarProgress"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="config.images[image.type].path"
              :src="config.images[image.type].path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </template>
    </el-form>
  </el-dialog>
</template>

<style lang="scss">
.upload-form {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
}
.avatar {
  width: 55px;
  height: 55px;
  display: block;
}
</style>
