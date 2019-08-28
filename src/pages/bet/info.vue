<template>
  <div class="bet-info">
    <topbar title="创建赌约"></topbar>
    <div class="title">
      <textarea
        @click.stop
        @blur="offEdit"
        v-if="isEditTitle"
        :disabled="!isCreate"
        v-model="title"
        auto-height
        placeholder="请输入赌约名称"
        focus
        placeholder-class="placeholder-class"
      ></textarea>
      <text v-else @click.stop="toEdit('title')">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          {{ isCreate ? '请输入赌约名称' : '' }}
        </template>
      </text>
    </div>
    <div class="intro">
      <textarea
        @click.stop
        @blur="offEdit"
        v-if="isEditIntro"
        :disabled="!isCreate"
        v-model="intro"
        auto-height
        placeholder="请输入赌约描述"
        placeholder-class="placeholder-class"
      ></textarea>
      <text v-else @click.stop="toEdit('intro')">
        <template v-if="intro">
          {{ intro }}
        </template>
        <template v-else>
          {{ isCreate ? '请输入赌约描述' : '' }}
        </template>
      </text>
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
        <view-point-card
          :item="v"
          :edit="isCreate"
          :selected="selectViewPointId && selectViewPointId === v._id"
          :isSelect="!isCreate && !selectViewPointId"
          @author="onAuthor"
          @select="selectViewPoint(i)"
          @edit="modifyViewPoint(i)"
          @remove="removeViewPoint(i)"
          @view="viewViewPoint(i)"
        >
        </view-point-card>
      </div>
      <div class="new view-point" v-if="isCreate">
        <button class="button" @click="clickAddViewPoint">
          <span>创建观点</span>
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
import ViewPointCard from './modules/viewpoint-card.vue';
import IModal from '@/coms/modal/modal.vue';
import Seize from '@/coms/seize/seize.vue';
import {
  createBet,
  getBetInfo,
  IViewPoint,
  selectViewPoint,
  IPlayer,
  IPeople,
} from '../../api/bet';
import { Router } from '../../utils/uniapi';
import { Loading, getRefElement } from '../../utils';
import { Tool } from '@/mixins/tool';
import { State, Mutation } from 'vuex-class';
@Component({
  name: 'bet-info',
  components: {
    IModal,
    Seize,
    ViewPointCard,
  },
})
export default class App extends Tool {
  @State('user')
  user!: Store.User.State;

  @Mutation('setCache')
  setCache!: any;

  id: string = '';
  title: string = '';
  intro: string = '';
  viewPoints: IViewPoint[] = [];
  players: IPlayer[] = [];
  selectViewPointId: string = '';
  isEditTitle: boolean = false;
  isEditIntro: boolean = false;
  vpModal = {
    status: false,
    value: '',
    index: -1,
  };
  get isCreate() {
    return !this.id;
  }
  // {观点:[用户]}
  get playerMapViewPoint(): { [key: string]: IPeople[] } {
    return this.players.reduce((obj: { [key: string]: IPeople[] }, player) => {
      let list = obj[player.viewPointId];
      if (!list) {
        list = obj[player.viewPointId] = [];
      }
      list.push(player.user);
      if (player.customerId === this.user.id) {
        this.selectViewPointId = player.viewPointId;
      }
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
  }
  toEdit(type = 'title') {
    switch (type) {
      case 'title':
        return (this.isEditTitle = true);
      case 'intro':
        return (this.isEditIntro = true);
    }
  }
  offEdit() {
    this.isEditTitle = false;
    this.isEditIntro = false;
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
        this.removeViewPoint(ind);
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
    this.offEdit();
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
    this.offEdit();
    this.vpModal = {
      status: true,
      value: this.viewPoints[index].name,
      index,
    };
  }
  viewViewPoint(index: number) {
    const item = this.viewPoints[index];
    const users = this.playerMapViewPoint[item._id];
    console.log(users);
    this.setCache({
      name: item.name,
      users,
    });
    Router.to(`/pages/bet/viewpoint`);
    console.log(index);
  }
  removeViewPoint(index: number) {
    this.offEdit();
    console.log(index);
    this.viewPoints.splice(index, 1);
  }
  clickAddViewPoint() {
    this.offEdit();
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
  async onAuthor(e: any, type: string = '', ...args: any[]) {
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
  textarea,
  text {
    min-height: 33px;
    color: #fff;
    line-height: 1;
    word-break: break-all;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  textarea {
    padding-top: 5upx;
    &::before,
    &::after {
      display: none;
    }
  }
  text {
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

      &.new {
        .button {
          background: #eece19;
        }
        .iconfont {
          right: 30upx;
          transform: rotate(45deg) translate(0, -60%);
        }
      }
      &.no-select {
        .vp-item {
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
