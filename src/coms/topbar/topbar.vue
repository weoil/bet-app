<template>
  <div class="topbar">
    <div class="wrapper" :style="style">
      <img class="i-icon i-return" src="/static/image/return.png" />
      <div class="title">
        {{ title }}
      </div>
    </div>
    <div class="seize" :style="seizeStyle" v-if="fixed"></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
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
  get style() {
    let style = `height:${info.height + 20}px;padding-top:${info.top}px;`;
    if (this.fixed) {
      style += `position: fixed;`;
    } else {
      style += `padding-top:${info.top}px;`;
    }
    return style;
  }
  get seizeStyle() {
    let style = `height:${info.height + 10}px;`;
    if (this.fixed) {
      style += `padding-top:${info.top}px;`;
    }
    return style;
  }
  mounted() {
    console.log(info);
  }
  // beforeMount(){}
}
export default App;
</script>

<style lang="scss" scoped>
.topbar {
  .wrapper {
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    background: linear-gradient(120deg, rgb(192, 188, 195), rgb(174, 167, 226));
    background-size: 100% 100vh;
    width: 100%;
    color: #fff;
    padding: 0 30upx;
    z-index: 9;
    transform: translateY(-10px);
    .i-return {
      margin-right: 30upx;
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
