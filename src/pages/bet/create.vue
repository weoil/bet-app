<template>
  <div class="bet-info">
    <topbar title="创建赌约"></topbar>
    <div class="title">
      <input type="text" v-model="title" placeholder="#赌约的名字#" focus />
    </div>
    <div class="intro">
      <input type="text" v-model="intro" placeholder="#赌点什么好呢~#" />
    </div>
    <div class="view-points">
      <div class="new">
        <span>创建观点</span>
      </div>
      <div v-for="v in viewPoints" :key="v">
        {{ v }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'bet-info',
  components: {},
})
export default class App extends Vue {
  title: string = '';
  intro: string = '';
  viewPoints: string[] = [];

  // beforeMount(){}
  // mounted(){}
  // created(){}
  // onShow(){}
  // onHide(){}
  // onLoad(){}
  // onUnload(){}
  onAuthor(e: any) {
    console.log(e);
  }
}
</script>

<style lang="scss" scoped>
.bet-info {
  padding: 0 30upx;
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
  .view-points{
    margin-top: 60upx;
  }
}
</style>
