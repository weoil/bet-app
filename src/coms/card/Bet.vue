<template>
  <div class="bet-card">
    <div class="header">
      <div class="left">
            <div class="title">
      {{ item.name }}
    </div>
    <div class="intro">
      {{ item.intro }}
    </div>
      </div>
      div.rightrttryryrefeebgegtegevbjyjgjfjrjrjtj
    </div>

    <div class="users">
      <div class="user" v-for="user in item.users" :key="user._id">
        <img :src="user.avatar" :alt="user.name" />
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
  item!: IBetInfo;
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
