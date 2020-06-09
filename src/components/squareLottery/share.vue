<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      rules: {
        imageUrl: { required: true, message: '请输入分享图标', trigger: 'change' },
        summary: [{ required: true, message: '请输入分享标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入分享内容', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      form: state => state.squareLottery.config.share,
    }),
    uploadUri() {
      return process.env.NODE_ENV === 'development' ? `/api/image/upload` : `/lottery-api/api/image/upload`
    },
    imageUrl: {
      get() {
        return this.form.imageUrl
      },
      set(val) {
        this.updateImageUrl(val)
      },
    },
    summary: {
      get() {
        return this.form.summary
      },
      set(val) {
        this.updateSummary(val)
      },
    },
    content: {
      get() {
        return this.form.content
      },
      set(val) {
        this.updateContent(val)
      },
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('squareLottery/config', ['updateImageUrl', 'updateSummary', 'updateContent']),
    handleAvatarSuccess(...arg) {
      this.imageUrl = arg[0].response.path
    },
    beforeAvatarUpload() {},
  },
}
</script>

<template>
  <div id="config-share">
    <el-form
      size="small"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="130px"
    >
      <el-form-item label="分享图标：" prop="imageUrl">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="uploadUri"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="分享标题" prop="summary">
        <el-input v-model="summary"></el-input>
      </el-form-item>
      <el-form-item label="分享内容：" prop="content">
        <el-input type="textarea" :autosize="{minRows: 2}" v-model="content"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
#config-share {
  padding: 20px 40px;
  // max-width: 600px;
  text-align: left;
  .el-form-item__content {
    max-width: 400px;
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
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
      display: block;
    }
  }
}
</style>
