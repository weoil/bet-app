<template>
  <div
    class="i-modal"
    v-if="show"
    :class="{ visible: visible, mask: $mask }"
    @click="onClickMask"
    @touchmove.stop
  >
    <div
      class="wrapper shadow-blue"
      :class="scopeOptions.class"
      @click.stop
      :style="wrapperStyle"
    >
      <div class="title" v-if="$title">
        <slot name="title">
          {{ $title }}
        </slot>
      </div>
      <div class="content">
        <slot>
          {{ scopeOptions.message }}
        </slot>
      </div>
      <div class="footer" v-if="$isShowFooter">
        <slot name="footer">
          <button
            type="text"
            class="button"
            v-if="scopeOptions.isShowCancel"
            @click="onCancel"
          >
            <template v-if="$useIcon">
              <i class="iconfont icon-shanchu"></i>
            </template>
            <template v-else>
              {{ $cancelText }}
            </template>
          </button>
          <button
            type="text"
            class="button"
            v-if="scopeOptions.isShowConfirm"
            @click="onConfirm"
          >
            <template v-if="$useIcon">
              <i class="iconfont icon-dui"></i>
            </template>
            <template v-else>
              {{ $confirmText }}
            </template>
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
  useIcon!: boolean;

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

  @Prop({
    type: Boolean,
    default: false,
  })
  scope!: boolean;

  show: boolean = this.status;
  visible: boolean = this.show;
  delay: number = 300;

  // 私有配置 权级最高
  scopeOptions: {
    footer: boolean;
    mask: boolean;
    title: string;
    message: string;
    isShowConfirm: boolean;
    isShowCancel: boolean;
    confirmText: string;
    cancelText: string;
    isScope: boolean;
    class: string;
    useIcon: boolean;
    promise: {
      resolve: (() => any) | null;
      reject: (() => any) | null;
    };
  } = {
    footer: this.isShowFooter,
    title: '',
    isScope: false,
    message: '',
    isShowConfirm: this.isShowConfirm,
    isShowCancel: this.isShowCancel,
    confirmText: this.confirmText,
    cancelText: this.cancelText,
    mask: this.mask,
    useIcon: this.useIcon,
    class: '',
    promise: {
      resolve: null,
      reject: null,
    },
  };

  get $title() {
    return this.scopeOptions.title || this.title;
  }
  get $isShowFooter() {
    return this.scopeOptions.footer;
  }
  get $mask() {
    return this.scopeOptions.mask;
  }
  get $useIcon() {
    return this.scopeOptions.useIcon;
  }
  get $confirmText() {
    return this.scopeOptions.confirmText;
  }
  get $cancelText() {
    return this.scopeOptions.cancelText;
  }
  get wrapperStyle() {
    if (this.scopeOptions.isScope) {
      return ``;
    }
    return `width:${this.width}rpx;`;
  }
  @Watch('status')
  onStatusChange(val: boolean) {
    this.setShow(val);
  }
  setShow(val: boolean) {
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
    if (this.scopeOptions.mask && this.scopeOptions.isScope) {
      return;
    }
    if (this.maskClose) {
      this.onCancel();
    }
  }
  onCancel() {
    this.$emit('update:status', false);
    this.$emit('cancel');
    if (this.scopeOptions.isScope && this.scopeOptions.promise.reject) {
      this.scopeOptions.promise.reject();
    }
  }
  onConfirm() {
    this.$emit('confirm');
    if (this.scopeOptions.isScope && this.scopeOptions.promise.resolve) {
      this.scopeOptions.promise.resolve();
    }
  }
  // 初始化设置Promise
  createScopePromise() {
    const promise = this.scopeOptions.promise;
    return new Promise((resovle, reject) => {
      promise.resolve = resovle;
      promise.reject = reject;
    });
  }
  Toast(options: {
    message: string;
    mask?: boolean;
    delay?: number;
    loading?: boolean;
  }) {
    const defaultOpts = {
      message: '',
      mask: true,
      delay: 2000,
      loading: false,
    };
    const opts = Object.assign({}, defaultOpts, options);
    this.scopeOptions.isScope = true;
    this.scopeOptions.footer = false;
    this.scopeOptions.class = 'toast';
    this.scopeOptions.message = opts.message;
    this.setShow(true);
    setTimeout(() => {
      this.setShow(false);
    }, opts.delay);
  }
  Confirm(options: {
    title: string;
    message: string;
    isShowConfirm?: boolean;
    isShowCancel?: boolean;
    useIcon?: boolean;
    confirmText?: string;
    cancelText?: string;
  }) {
    const sp = this.scopeOptions;
    const defaultOpts = {
      message: '',
      isShowConfirm: true,
      isShowCancel: true,
      useIcon: true,
      confirmText: this.confirmText,
      cancelText: this.cancelText,
    };
    const opts = Object.assign({}, defaultOpts, options);
    sp.isScope = true;
    sp.footer = true;
    sp.class = 'confirm';
    sp.mask = true;
    sp.title = opts.title;
    sp.message = opts.message;
    sp.isShowConfirm = opts.isShowConfirm;
    sp.isShowCancel = opts.isShowCancel;
    sp.cancelText = opts.cancelText;
    sp.confirmText = opts.confirmText;
    sp.useIcon = opts.useIcon;
    this.setShow(true);
    const promise = this.createScopePromise();
    promise.finally(() => {
      this.setShow(false);
    });
    return promise;
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
    padding: 15upx 30upx;
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
      padding: 0 30upx;
    }
    .footer {
      @include flex-center;
      justify-content: space-between;
      margin-top: 30upx;
      .button {
        // overflow: initial;
        padding: 15upx 30upx;
      }
      .iconfont {
        font-size: 48upx;
      }
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
  .toast {
    width: auto;
    background: linear-gradient(to left, #b993d6, #8ca6db);
    border-radius: 10upx;
  }
  .confirm {
    width: 400upx;
  }
}
</style>
