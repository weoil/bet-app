<template>
  <div class="i-modal" v-if="show" :class="{ visible: status }">
    <div class="wrapper">
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
    default: true,
  })
  mask!: boolean;

  show: boolean = this.status;
  delay: number = 500;
  @Watch('status')
  onStatusChange(val: boolean) {
    this.show = val;
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
  .wrapper{
    transform: scale(0);
  }
  &.visible {
    .wrapper{

    }
  }
}
</style>
