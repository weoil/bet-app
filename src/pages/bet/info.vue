<template>
  <div class="bet-info">
    <button open-type="getUserInfo" @getuserinfo="onAuthor"></button>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'bet-info',
  components: {},
})
export default class App extends Vue {
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
}
</style>
