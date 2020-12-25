<script>
import { mapState, mapMutations } from 'vuex'
import editDialog from '@/components/squareLottery/editDialog'
export default {
  name: '',
  components: { editDialog },
  props: {
    isConfig: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showEditBtn1: false,
      showEditBtn2: false,
      showEditBtn3: false,
      scroll: null,
    }
  },
  computed: {
    ...mapState({
      config: (state) => state.squareLottery.config,
    }),
    showPrize() {
      return this.$route.query.showPrize === 'yes'
    },
    prizeStyle() {
      return {
        backgroundImage: `url(${this.config.prize})`,
      }
    },
    playStyle() {
      return {
        backgroundImage: `url(${this.config.pBg})`,
      }
    },
    nBoxStyle() {
      return {
        backgroundImage: `url(${this.config.nBox})`,
      }
    },
    aBoxStyle() {
      return {
        backgroundImage: `url(${this.config.aBox})`,
      }
    },
    startBoxStyle() {
      return {
        backgroundImage: `url(${this.config.startBox})`,
      }
    },
    dBoxStyle() {
      return {
        backgroundImage: `url(${this.config.dBg})`,
      }
    },
    descriptionForHtml() {
      const reg = new RegExp('\\n', 'g')
      return this.config.basic.description.replace(reg, '<br/>')
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('squareLottery/config', ['updateShowEditDialog']),
  },
}
</script>

<template>
  <div id="preview" ref="preview">
    <img src="@/assets/images/title.png" />
    <span class="title">{{config.basic.title}}</span>
    <div v-show="showPrize" class="prize-wrapper">
      <div class="prize-wrapper__tip" :style="prizeStyle">
        <img src="/uploads/20200528180708_6812.png" />
      </div>
    </div>
    <perfect-scrollbar class="lottery-wrapper" id="lottery-wrapper" ref="lotteryWrapper">
      <div class="c-wrapper">
        <div class="banner" @mouseenter="showEditBtn1 = true" @mouseleave="showEditBtn1 = false">
          <div
            v-show="showEditBtn1 && isConfig"
            class="edit-btn"
            @click="updateShowEditDialog(true)"
          >编辑图片</div>
          <img :src="config.cBg" />
        </div>
        <div
          class="c-wrapper-play"
          @mouseenter="showEditBtn2 = true"
          @mouseleave="showEditBtn2 = false"
          :style="playStyle"
        >
          <div
            v-show="showEditBtn2 && isConfig"
            class="edit-btn"
            @click="updateShowEditDialog(true)"
          >编辑图片</div>
          <div class="c-wrapper-play__box has-margin" :style="aBoxStyle">
            <img :src="config.images[0].path" />
          </div>
          <div class="c-wrapper-play__box has-margin" :style="nBoxStyle">
            <img :src="config.images[1].path" />
          </div>
          <div class="c-wrapper-play__box has-margin" :style="nBoxStyle">
            <img :src="config.images[2].path" />
          </div>
          <div class="c-wrapper-play__box has-margin" :style="nBoxStyle">
            <img :src="config.images[7].path" />
          </div>
          <div class="c-wrapper-play__box has-margin" :style="startBoxStyle"></div>
          <div class="c-wrapper-play__box has-margin" :style="nBoxStyle">
            <img :src="config.images[3].path" />
          </div>
          <div class="c-wrapper-play__box" :style="nBoxStyle">
            <img :src="config.images[6].path" />
          </div>
          <div class="c-wrapper-play__box" :style="nBoxStyle">
            <img :src="config.images[5].path" />
          </div>
          <div class="c-wrapper-play__box" :style="nBoxStyle">
            <img :src="config.images[4].path" />
          </div>
        </div>
      </div>
      <div
        class="d-wrapper"
        @mouseenter="showEditBtn3 = true"
        @mouseleave="showEditBtn3 = false"
        :style="dBoxStyle"
      >
        <div
          v-show="showEditBtn3 && isConfig"
          class="edit-btn"
          @click="updateShowEditDialog(true)"
        >编辑图片</div>
        <p v-html="descriptionForHtml"></p>
      </div>
    </perfect-scrollbar>
    <edit-dialog></edit-dialog>
  </div>
</template>

<style lang="scss">
#preview {
  position: relative;
  width: 375px;
  height: 667px;
  background-color: #faf7f0;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  .title {
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    @include text-size(16px, 24px);
    // font-weight: bold;
  }
  .prize-wrapper {
    @include flex-center();
    position: absolute;
    top: 76px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: rgba($color: #000000, $alpha: 0.6);
    &__tip {
      @include flex-center();
      box-sizing: border-box;
      width: 309px;
      height: 375px;
      background-size: cover;
      padding: 55px 80px 0 80px;
      @include text-size(20px, 28px);
      font-weight: bold;
      color: #000;
      cursor: pointer;
    }
  }
  .lottery-wrapper {
    height: 591px;
    overflow-y: auto;
    .c-wrapper {
      position: relative;
      // margin: 20px 12px;
      // border: 1px solid #44372c;
      .banner {
        position: relative;
        min-height: 20px;
        .edit-btn {
          top: 5px;
        }
      }
      .c-wrapper-play {
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        // margin: 0 12px 0 12px;
        padding: 25px 31px 31px 31px;
        background-size: 100% auto;
        background-repeat: no-repeat;
        // border-top: 1px solid #44372c;
        &__box {
          position: relative;
          width: 101px;
          height: 101px;
          background-size: cover;
          overflow: hidden;
          &.has-margin {
            margin-bottom: 4.5px;
          }
          img {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            // width: 100%;
            // height: auto;
          }
        }
      }
    }
    .d-wrapper {
      position: relative;
      box-sizing: border-box;
      padding: 45px 20px 10px 20px;
      height: 270px;
      background-size: 100% auto;
      background-repeat: no-repeat;
      text-align: left;
      @include text-size(12px, 23px);
      color: #cfc4af;
    }
    .edit-btn {
      position: absolute;
      top: -5px;
      right: 20px;
      padding: 2px 5px;
      z-index: 1;
      background: rgba($color: #000000, $alpha: 0.6);
      @include text-size(12px, 16px);
      color: #fff;
      cursor: pointer;
      &:hover {
        background: rgba($color: #000000, $alpha: 0.8);
      }
    }
  }
}
</style>
