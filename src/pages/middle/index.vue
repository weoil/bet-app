<template>
  <div class="middle">
    <div class="loading">
      <img
        class="i-icon i-loading animate-rotate"
        src="@/assets/image/loading.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { scene2Obj, target2Path, matchRoute } from './util';
import { Identity } from '../../store/modules/user';
import { Router } from '../../utils/uniapi';
@Component({
  name: 'middle',
  components: {},
})
export default class App extends Vue {
  loaded: boolean = false;
  @State('user')
  user!: Store.User.State;
  async middle(scene: string = '') {
    // 没登录去登陆
    try {
      if (!this.user.token) {
        await this.$store.dispatch('Login');
      }
      const sceneObj = scene2Obj(scene);
      const route = target2Path(sceneObj.target, sceneObj.detail);
      // 路由不是通用路由,并且不包含目前用户身份
      if (
        !route.roles.includes(Identity.Any) &&
        !route.roles.includes(this.user.info.identity)
      ) {
        throw new Error('identity');
      }
      // 页面是否为关闭当前页
      if (route.replace) {
        Router.reLaunch(route.path, route.detail);
      } else {
        Router.to(route.path, route.detail);
      }
    } finally {
      this.loaded = false;
    }

    //
  }
  // beforeMount(){}
  // mounted(){}
  // created(){}
  // onShow(){}
  // onHide(){}
  onLoad(options: AnyObject) {
    this.loaded = true;
    const scene = decodeURIComponent(options.scene || '');
    this.middle(scene);
  }
  onShow() {
    if (this.loaded) {
      return;
    }
    const path = matchRoute(this.user.info.identity);
    Router.reLaunch(path);
  }
  // onUnload(){}
}
</script>

<style lang="scss" scoped>
.middle {
  .loading {
    @include flex-center;
    padding-top: -50upx;
    height: 100vh;
  }
}
</style>
