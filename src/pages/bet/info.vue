<template>
  <div class="bet-info">
    <topbar title="创建赌约"></topbar>
    <div class="title">
      <input
        type="text"
        :disabled="!isCreate"
        v-model="title"
        placeholder="请输入赌约名称"
        focus
        placeholder-class="placeholder-class"
      />
    </div>
    <div class="intro">
      <input
        type="text"
        :disabled="!isCreate"
        v-model="intro"
        placeholder="请输入赌约描述"
        placeholder-class="placeholder-class"
      />
    </div>
    <div class="view-points">
      <div
        class="view-point"
        :class="{
          'no-select': selectViewPointId && selectViewPointId !== v._id,
        }"
        v-for="(v, i) in viewPoints"
        :key="v._id"
      >
        <button
          class="button shadow-blur"
          @click="clickViewPoint(i, v)"
          open-type="getUserInfo"
          @getuserinfo="onAuthor($event, 'clickViewPoint', i, v)"
        >
          <span>{{ v.name }}</span>
          <span
            v-if="isCreate"
            class="iconfont icon-shanchu"
            @click.stop="removeViewPonit(i)"
          ></span>
          <!-- 已选择 -->
          <span
            v-else-if="selectViewPointId && selectViewPointId === v._id"
            class="iconfont icon-success1f"
          ></span>
          <span
            v-else-if="!selectViewPointId"
            class="iconfont icon-Left"
          ></span>
        </button>
      </div>
      <div class="new view-point" v-if="isCreate">
        <button class="button" @click="clickAddViewPoint">
          <span>创建观点</span>
          <span class="iconfont icon-shanchu"></span>
        </button>
      </div>
    </div>
    <i-modal
      :title="vpModal.index === -1 ? '创建观点' : '编辑观点'"
      :status.sync="vpModal.status"
      mask
      useIcon
      @cancel="vpModal.status = false"
      @confirm="createViewPoint"
    >
      <div>
        <input
          :focus="vpModal.status"
          id="modal-input"
          v-model="vpModal.value"
          placeholder="# 新的观点"
          placeholder-class="placeholder-class"
          @confirm="createViewPoint"
        />
      </div>
    </i-modal>
    <template v-if="isCreate">
      <seize position="bottom||right">
        <div class="done">
          <button
            type="text"
            class="button"
            open-type="getUserInfo"
            @click="createBet"
            @getuserinfo="onAuthor($event, 'create')"
          >
            <div class="iconfont icon-dui"></div>
          </button>
        </div>
      </seize>
    </template>

    <i-modal scope></i-modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import IModal from '@/coms/modal/modal.vue';
import Seize from '@/coms/seize/seize.vue';
import {
  createBet,
  getBetInfo,
  IViewPoint,
  selectViewPoint,
  IPlayer,
} from '../../api/bet';
import { Router } from '../../utils/uniapi';
import { Loading, getRefElement } from '../../utils';
import { Tool } from '@/mixins/tool';
import { State } from 'vuex-class';
@Component({
  name: 'bet-info',
  components: {
    IModal,
    Seize,
  },
})
export default class App extends Tool {
  @State('user')
  user!: Store.User.State;
  id: string = '';
  title: string = '';
  intro: string = '';
  viewPoints: IViewPoint[] = [];
  players: IPlayer[] = [];
  selectViewPointId: string = '';
  vpModal = {
    status: false,
    value: '',
    index: -1,
  };
  get isCreate() {
    return !this.id;
  }
  get playerMapViewPoint(): { [key: string]: IPlayer } {
    return this.players.reduce((obj: { [key: string]: IPlayer }, player) => {
      obj[player.viewPointId] = player;
      return obj;
    }, {});
  }
  // beforeMount(){}
  // mounted(){}
  // created(){}
  // onShow(){}
  // onHide(){}
  onLoad(opts: AnyObject) {
    const id = (this.id = opts.id || '');
    if (id) {
      this.getData();
    } else {
      uni.hideShareMenu();
    }
  }
  onShareAppMessage() {
    return {
      title: `${this.title}`,
      path: `/pages/middle/index?scene=1:0:(${this.id})`,
    };
  }
  // onUnload(){}
  @Loading('加载中')
  async getData() {
    const result = await getBetInfo(this.id);
    this.title = result.name;
    this.intro = result.intro;
    this.viewPoints = result.viewPoints;
    this.players = result.player;
    this.findSelectViewPoint();
  }
  // 查找已经选择的观点
  findSelectViewPoint() {
    for (const v of this.viewPoints) {
      const player = this.playerMapViewPoint[v._id];
      if (player && player.customerId === this.user.id) {
        this.selectViewPointId = v._id;
        break;
      }
    }
  }
  createViewPoint() {
    const val = this.vpModal.value;
    const ind = this.vpModal.index;
    if (ind === -1) {
      if (!val) {
        return;
      }
      this.viewPoints.push({ name: val, _id: '' });
    } else {
      if (!val) {
        this.removeViewPonit(ind);
      } else {
        this.viewPoints[ind].name = val;
      }
    }
    this.vpModal = {
      status: false,
      value: '',
      index: -1,
    };
  }
  async selectViewPoint(index: number) {
    const vp = this.viewPoints[index];
    await this.$Confirm({
      title: '选择观点',
      message: `${vp.name}`,
    });
    await selectViewPoint(this.id, vp._id);
    this.selectViewPointId = vp._id;
    uni.hideLoading();
    this.$store.commit('setIndexRefreshState', true);
  }
  clickViewPoint(index: number, item: IViewPoint) {
    if (this.isCreate) {
      this.modifyViewPoint(index);
    } else if (!this.selectViewPointId) {
      this.selectViewPoint(index);
    }
  }
  modifyViewPoint(index: number) {
    this.vpModal = {
      status: true,
      value: this.viewPoints[index].name,
      index,
    };
  }
  removeViewPonit(index: number) {
    this.viewPoints.splice(index, 1);
  }
  clickAddViewPoint() {
    if (!this.isCreate) {
      if (!this.selectViewPointId) {
        // 提示选择观点
      }
      return;
    }
    this.vpModal = {
      status: true,
      value: '',
      index: -1,
    };
  }
  async createBet() {
    if (!this.user.info.isAuthor) {
      return;
    }
    if (!this.title) {
      return uni.showToast({
        title: '请输入名称~',
        icon: 'none',
      });
    }
    if (!this.viewPoints.length) {
      return uni.showToast({
        title: '请添加观点~',
        icon: 'none',
      });
    }
    await createBet(this.title, this.intro, this.viewPoints, 1);
    this.$store.commit('setIndexRefreshState', true);
    Router.back(-1);
    uni.hideLoading();
  }
  async onAuthor(e: any, type: string = 'create', ...args: any[]) {
    if (this.user.info.isAuthor) {
      return;
    }
    uni.showLoading();
    await this.$store.dispatch('Author', e);
    switch (type) {
      case 'create':
        return await this.createBet();
      case 'clickViewPoint':
        return await this.clickViewPoint(args[0], args[1]);
    }
    // console.log(e);
  }
}
</script>

<style lang="scss" scoped>
.bet-info {
  input,
  textarea {
    color: #fff;
  }
  padding: 0upx 30upx 0;
  .title {
    margin-top: 20upx;
    font-size: 60upx;
    input {
      height: 90upx;
    }
  }
  .intro {
    margin-top: 30upx;
    font-size: 40upx;
    input {
      height: 60upx;
    }
  }
  .view-points {
    margin-top: 60upx;
    .button {
    }
    .view-point {
      color: #fff;
      .button {
        text-align: left;
        position: relative;
        display: inline-block;
        padding: 30upx 80upx 30upx 30upx;
        border-radius: 20upx;
        font-size: 38upx;
        // background: linear-gradient(to right, #ff5f6d, #ffc371);
        background: linear-gradient(to bottom, #606c88, #3f4c6b);
        .iconfont {
          position: absolute;
          padding: 20upx;
          right: 0upx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.new {
        .button {
          background: linear-gradient(to top, #ff5e62, #ff9966);
        }
        .iconfont {
          right: 30upx;
          transform: rotate(45deg) translate(0, -60%);
        }
      }
      &.no-select {
        div {
          padding: 30upx;
        }
      }
    }
    .view-point + .view-point {
      margin-top: 30upx;
    }
  }
  // .modal-footer {
  //   @include flex-center;
  //   justify-content: space-between;
  //   .iconfont {
  //     font-size: 48upx;
  //   }
  //   .button {
  //     color: #fff;
  //     overflow: initial;
  //   }
  // }
  .done {
    @include flex-center;
    @include shadow-blur('left');
    $w: 125upx;
    $h: 125upx;
    width: $w;
    height: $h;
    // overflow: hidden;
    position: relative;
    .button {
      .iconfont {
        font-size: 60upx;
      }
      // padding: 0;
      margin-left: 20upx;
    }
    &::after {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      content: '';
      display: block;
      width: $w * 2;
      height: $h * 2;
      border-radius: 50%;
      background: linear-gradient(to top, #ff5e62, #ff9966);
      box-shadow: 0 0 10upx #ff5e62;
      // text-align: left;
      // padding: 40upx;
      // transform: translate(50%, 50%);
    }
  }
}
</style>
