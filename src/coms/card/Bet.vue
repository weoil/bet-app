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
      <div class="user" v-for="user in users" :key="user._id">
        <img :src="user.avatar" :alt="user.name" />
      </div>
      <div v-if="isMoreUser" class="more-user">...</div>
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

  isMoreUser: boolean = false;
  get users() {
    const us = this.item.users;
    this.isMoreUser = us.length > 10;
    if (this.isMoreUser) {
      return us.slice(0, 10);
    }
    return us;
  }
  // beforeMount() {}
  // mounted() {}
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
  padding: 20upx 30upx 10upx 30upx;
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
      margin-left: 40upx;
      flex-shrink: 0;
      img {
        width: 80upx;
        height: 80upx;
        border-radius: 50%;
      }
    }
  }
  .users {
    margin-top: 20upx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .user {
      margin-right: 10upx;
      margin-bottom: 10upx;
      width: 50upx;
      height: 50upx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .more-user {
    }
  }
}
</style>
