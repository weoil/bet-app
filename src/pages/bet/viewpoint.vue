<template>
  <div class="viewpoint">
    <topbar title="观点"></topbar>
    <div class="name">
      {{ cache.name }}
    </div>
    <div class="users" v-if="cache.users.length">
      <div class="user" v-for="user in cache.users" :key="user._id">
        <img class="avatar" :src="user.avatar" />
        <div class="right">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-date">{{ user.date }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      暂时没有人参与~
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component({
  name: 'viewpoint',
})
export default class App extends Vue {
  @State('tool')
  tool!: Store.Tool.State;

  get cache() {
    return this.tool.cache;
  }
  mounted() {
    console.log(this.cache);
  }
  // beforeMount(){}
}
</script>

<style lang="scss" scoped>
.viewpoint {
  padding: 0 24upx;
  color: #fff;
  .name {
    font-size: 60upx;
    margin-bottom: 30upx;
  }
  .users {
    .user {
      margin-bottom: 30upx;
      @include flex-center;
      justify-content: flex-start;
      overflow: hidden;
      word-break: break-all;
      .avatar {
        flex-shrink: 0;
        width: 120upx;
        height: 120upx;
        margin-right: 30upx;
        border-radius: 50%;
      }
      .right {
        .user-name {
          font-size: 48upx;
        }
        .user-date {
          font-size: 32upx;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
