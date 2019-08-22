<template>
  <div
    class="i-modal"
    v-if="show"
    :class="{ visible: visible, mask: mask }"
    @click="onClickMask"
    @touchmove.stop
  >
    <div class="wrapper shadow-blue" @click.stop :style="wrapperStyle">
      <div class="title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer" v-if="isShowFooter">
        <slot name="footer">
          <button class="button cancel" v-if="isShowCancel" @click="onCancel">
            {{ cancelText }}
          </button>
          <button class="button confirm" v-if="isShowConfirm">
            {{ confirmText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'i-modal',
})
class App extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  status!: boolean;
  @Prop({
    type: String,
    default: '',
  })
  title!: string;

  @Prop({
    type: String,
    default: '取消',
  })
  cancelText!: string;
  @Prop({
    type: String,
    default: '确认',
  })
  confirmText!: string;

  @Prop({
    type: Number,
    default: 600,
  })
  width!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  isShowConfirm!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  isShowCancel!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  isShowFooter!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  mask!: boolean;
  @Prop({
    type: Boolean,
    default: false,
  })
  maskClose!: boolean;
  show: boolean = this.status;
  visible: boolean = this.show;
  delay: number = 300;

  get wrapperStyle() {
    return `width:${this.width}rpx;`;
  }
  @Watch('status')
  onStatusChange(val: boolean) {
    if (!val) {
      setTimeout(() => {
        this.show = val;
      }, this.delay);
    } else {
      this.show = val;
    }
    this.$nextTick(() => {
      this.visible = val;
    });
  }
  onClickMask() {
    if (this.maskClose) {
      this.onCancel();
    }
  }
  onCancel() {
    this.$emit('update:status', false);
  }
  // mounted(){}
  // beforeMount(){}
}
export default App;
</script>

<style lang="scss" scoped>
.i-modal {
  position: fixed;
  min-height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  @include flex-center;
  transition: background-color 0.3s;
  z-index: 10;
  .wrapper {
    margin-top: -10%;
    position: absolute;
    padding: 20upx 30upx;
    transform: scale(0.3);
    transform-origin: 50% 40%;
    transition: transform 0.3s, opacity 0.3s;
    // overflow: hidden;
    border-radius: 20upx;
    opacity: 0;
    background: linear-gradient(to top, #0f0c29, #302b63, #24243e);
    color: #fff;
    .title {
      font-size: 42upx;
      text-align: center;
      margin-bottom: 30upx;
    }
    .content {
    }
    .footer {
      margin-top: 30upx;
    }
  }
  &.visible {
    &.mask {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .wrapper {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
