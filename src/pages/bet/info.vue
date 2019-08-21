<template>
  <div class="bet-info">
    <topbar title="创建赌约"></topbar>
    <div class="title">
      <input
        type="text"
        v-model="title"
        placeholder="请输入赌约名称"
        focus
        placeholder-class="placeholder-class"
      />
    </div>
    <div class="intro">
      <input
        type="text"
        v-model="intro"
        placeholder="请输入赌约描述"
        placeholder-class="placeholder-class"
      />
    </div>
    <div class="view-points">
      <div
        class="view-point"
        v-for="(v, i) in viewPoints"
        :key="v"
        @click="modifyViewPoint(i)"
      >
        <div class=" shadow-blur">
          <span>{{ v }}</span>
          <span
            class="iconfont icon-shanchu"
            @click.stop="removeViewPonit(i)"
          ></span>
        </div>
      </div>

      <div class="new view-point">
        <div @click="showModal">
          <span>创建观点</span>
          <span class="iconfont icon-shanchu"></span>
        </div>
      </div>
    </div>
    <i-modal
      :title="vpModal.index === -1 ? '创建观点' : '编辑观点'"
      :status.sync="vpModal.status"
      mask
    >
      <div>
        <input
          :focus="vpModal.status"
          id="modal-input"
          v-model="vpModal.value"
          placeholder="# 新的观点"
          placeholder-class="placeholder-class"
          @confirm="createViewPoint"
        />
      </div>
      <template v-slot:footer>
        <div class="modal-footer">
          <button class="button " type="text" @click="vpModal.status = false">
            <i class="iconfont icon-shanchu"></i>
          </button>
          <button class="button " type="text" @click="createViewPoint">
            <i class="iconfont icon-dui"></i>
          </button>
        </div>
      </template>
    </i-modal>
    <seize position="bottom||right">
      <div class="done">
        <button type="text" class="button">
          <div class="iconfont icon-dui"></div>
        </button>
      </div>
    </seize>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import IModal from '@/coms/modal/modal.vue';
import Seize from '@/coms/seize/seize.vue';
@Component({
  name: 'bet-info',
  components: {
    IModal,
    Seize,
  },
})
export default class App extends Vue {
  id: string = '';
  title: string = '';
  intro: string = '';
  viewPoints: string[] = [
    '张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机',
    '张恒硕是个打蜡机',
    '张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机',
    '张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机',
    '张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机',
    '张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机',
    '张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机张恒硕是个打蜡机',
  ];
  vpModal = {
    status: false,
    value: '',
    index: -1,
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
  createViewPoint() {
    const val = this.vpModal.value;
    const ind = this.vpModal.index;
    if (ind === -1) {
      this.viewPoints.push(val);
    } else {
      this.viewPoints[ind] = val;
    }
    this.vpModal = {
      status: false,
      value: '',
      index: -1,
    };
  }
  modifyViewPoint(index: number) {
    this.vpModal = {
      status: true,
      value: this.viewPoints[index],
      index,
    };
  }
  removeViewPonit(index: number) {
    this.viewPoints.splice(index, 1);
  }
  showModal() {
    this.vpModal = {
      status: true,
      value: '',
      index: -1,
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
  padding: 0upx 30upx 0;
  .title {
    margin-top: 20upx;
    font-size: 60upx;
    input {
      height: 90upx;
    }
  }
  .intro {
    margin-top: 30upx;
    font-size: 40upx;
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
        padding: 15upx 80upx 15upx 30upx;
        border-radius: 20upx;
        font-size: 32upx;
        background: linear-gradient(to bottom, #8f94fb, #4e54c8);
        .iconfont {
          position: absolute;
          padding: 20upx;
          right: 0upx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.new {
        div {
          background: linear-gradient(to top, #ff5e62, #ff9966);
        }
        .iconfont {
          right: 30upx;
          transform: rotate(45deg) translate(0, -60%);
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
  .done {
    @include flex-center;
    @include shadow-blur('left');
    $w: 125upx;
    $h: 125upx;
    width: $w;
    height: $h;
    // overflow: hidden;
    position: relative;
    .button {
      .iconfont{
        font-size: 60upx;
      }
      // padding: 0;
      margin-left: 20upx;
    }
    &::after {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      content: '';
      display: block;
      width: $w * 2;
      height: $h * 2;
      border-radius: 50%;
      background: linear-gradient(to top, #ff5e62, #ff9966);
      box-shadow: 0 0 10upx #ff5e62;
      // text-align: left;
      // padding: 40upx;
      // transform: translate(50%, 50%);
    }
  }
}
</style>
