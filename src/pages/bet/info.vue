<template>
  <div class="bet-info">
    <topbar title="创建赌约"></topbar>
    <div class="title">
      <input
        type="text"
        v-model="title"
        placeholder="#赌约的名字#"
        focus
        placeholder-class="placeholder-class"
      />
    </div>
    <div class="intro">
      <input
        type="text"
        v-model="intro"
        auto-height
        placeholder="#赌点什么好呢~#"
        placeholder-class="placeholder-class"
      />
    </div>
    <div class="view-points">
      <div class="view-point" v-for="v in viewPoints" :key="v">
        <div>
          <span>{{ v }}</span>
          <span class="iconfont icon-shanchu"></span>
        </div>
      </div>

      <div class="new view-point">
        <div>
          <span>创建观点</span>
          <span class="iconfont icon-shanchu"></span>
        </div>
      </div>
    </div>
    <i-modal title="创建观点" :status.sync="vpModal.status">
      <div>
        <input
          v-model="vpModal.value"
          placeholder="# 新的观点"
          placeholder-class="placeholder-class"
        />
      </div>
      <template v-slot:footer>
        <div class="modal-footer">
          <button class="button " type="text" @click="vpModal.status = false">
            <i class="iconfont icon-shanchu"></i>
          </button>
          <button class="button " type="text">
            <i class="iconfont icon-dui"></i>
          </button>
        </div>
      </template>
    </i-modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import IModal from '@/coms/modal/modal.vue';
@Component({
  name: 'bet-info',
  components: {
    IModal,
  },
})
export default class App extends Vue {
  id: string = '';
  title: string = '';
  intro: string = '';
  viewPoints: string[] = ['张恒硕是个打蜡机', '张恒硕是个打蜡机'];
  vpModal = {
    status: false,
    value: '',
  };
  get isCreate() {
    return !!this.id;
  }
  // beforeMount(){}
  // mounted(){}
  // created(){}
  // onShow(){}
  // onHide(){}
  onLoad(opts: AnyObject) {
    this.id = opts.id || '';
  }
  // onUnload(){}
  onAuthor(e: any) {
    console.log(e);
  }
  createViewPoint() {
    this.vpModal = {
      status: true,
      value: '',
    };
  }
}
</script>

<style lang="scss" scoped>
.bet-info {
  input,
  textarea {
    color: #fff;
  }
  padding: 60upx 30upx 0;
  .title {
    font-size: 90upx;
    input {
      height: 90upx;
    }
  }
  .intro {
    margin-top: 40upx;
    font-size: 60upx;
    input {
      height: 60upx;
    }
  }
  .view-points {
    margin-top: 60upx;
    .button {
    }
    .view-point {
      color: #fff;
      div {
        position: relative;
        display: inline-block;
        padding: 15upx 30upx;
        padding-right: 60upx;
  background: linear-gradient(to left, #8360c3, #2ebf91);         border-radius: 20upx;
        font-size: 28upx;
        .iconfont {
          position: absolute;
          right: 10upx;
          top: 17upx;
        }
      }
    }
    .view-point + .view-point {
      margin-top: 30upx;
    }
  }
  .modal-footer {
    @include flex-center;
    justify-content: space-between;
    .iconfont {
      font-size: 48upx;
    }
    .button {
      color: #fff;
      overflow: initial;
    }
  }
}
</style>
