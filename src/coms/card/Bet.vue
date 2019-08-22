<template>
  <div class="bet-card shadow-blur" @click="onClick">
    <div class="header">
      <div class="left">
        <div class="title">
          {{ item.name }}
        </div>
        <div class="intro" v-if="item.intro">
          {{ item.intro }}
        </div>
      </div>
      <div class="right">
        <img :src="item.initiator.avatar" alt="" class="initiator-avator" />
      </div>
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
import { Router } from '../../utils/uniapi';
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
  onClick() {
    Router.to(`/pages/bet/info`, {
      id: this.item._id,
    });
  }
}
</script>

<style lang="scss" scoped>
.bet-card {
  display: inline-block;
  padding: 20upx 30upx 20upx;
  border-radius: 10upx;
  background: linear-gradient(
    120deg,
    rgba(61, 95, 193, 1),
    rgba(63, 159, 233, 1)
  );
  .header {
    @include flex-center;
    justify-content: space-between;
    .left {
      flex-grow: 1;
      .title {
        font-size: 36upx;
      }
      .intro {
        margin-top: 20upx;
        font-size: 28upx;
      }
    }
    .right {
      margin-left: 20upx;
      flex-shrink: 0;
      img {
        width: 80upx;
        height: 80upx;
        border-radius: 50%;
      }
    }
  }
}
</style>
