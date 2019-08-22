<template>
  <div class="topbar">
    <div class="background">
      <img src="/static/image/bg-4.jpg" alt="" class="b-image">
    </div>
    <div class="wrapper" :style="style">
      <img src="/static/image/bg-4.jpg" alt="" class="b-image">
      <img
        v-if="isShowBack"
        class="i-icon i-return"
        src="@/assets/image/return.png"
        @click.stop="backPage"
      />
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="seize" :style="seizeStyle" v-if="fixed"></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Router } from '../../utils/uniapi';
const info = wx.getMenuButtonBoundingClientRect();
@Component({
  name: 'topbar',
})
class App extends Vue {
  @Prop({
    type: String,
    default: '约定',
  })
  title!: string;
  @Prop({
    type: Boolean,
    default: true,
  })
  fixed!: boolean;
  get isShowBack() {
    return getCurrentPages().length > 1;
  }
  get style() {
    let style = `height:${info.height}px;padding-top:${info.top}px;`;
    if (this.fixed) {
      style += `position: fixed;`;
    } else {
      style += `padding-top:${info.top}px;`;
    }
    return style;
  }
  get seizeStyle() {
    let style = `height:${info.height}px;`;
    if (this.fixed) {
      style += `padding-top:${info.top}px;`;
    }
    return style;
  }
  mounted() {
    const page = getCurrentPages();
    console.log(page);
  }
  backPage() {
    Router.back(-1);
  }
  // beforeMount(){}
}
export default App;
</script>

<style lang="scss" scoped>
.topbar {
  .background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: $background;
    z-index: -1;
  }
  .background,.wrapper{
    .b-image{
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10;
      height: 100vh;
      width: 100vw;
    }
  }
  .seize,
  .wrapper {
    padding-bottom: 10upx;
  }
  .wrapper {
    // position: relative;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    background: $background;
    background-size: 100% 100vh;
    width: 100%;
    color: #fff;
    overflow: hidden;
    // padding: 0 30upx;
    z-index: 9;
    .i-return {
      position: absolute;
      left: 10upx;
      z-index: 2;
    }
    .title {
      flex: 1;
      text-align: center;
      line-height: inherit;
      font-size: 40upx;
    }
  }
}
</style>
