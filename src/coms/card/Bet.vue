<template>
  <div class="bet-card">
    <div class="title">
      {{ data.title }}
    </div>
    <div class="intro">
      {{ data.intro }}
    </div>
    <div class="gift">
      {{ data.gift }}
    </div>
    <div class="peoples">
      <div class="people">
        <img src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IBetInfo } from '../../api/bet';
@Component({
  name: 'bet-card',
  components: {},
})
export default class App extends Vue {
  @Prop()
  data!: IBetInfo;
  // beforeMount(){}
  // mounted(){}
  // created(){}
  // onShow(){}
  // onHide(){}
  // onLoad(){}
  // onUnload(){}
}
</script>

<style lang="scss" scoped>
.bet-card {
}
</style>
