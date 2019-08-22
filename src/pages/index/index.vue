<template>
  <div class="index">
    <topbar></topbar>
    <div class="header">
      <div class="title">
        嘿,
        <open-data type="userNickName"></open-data>
      </div>
    </div>
    <div class="content">
      <button class="button createBet shadow-blur" @click="toCreateBet">
        <div>新建赌约</div>
        <span>邀请朋友一起打个赌</span>
      </button>
      <div class="bets">
        <list :getData="getData" :query="query" ref="list">
          <template v-slot="{ list }">
            <div v-for="bet in list" :key="bet._id" class="bet-item">
              <bet-card :item="bet"></bet-card>
            </div>
          </template>
        </list>
      </div>
    </div>
    <!-- <button open-type="getUserInfo" @getuserinfo="onAuthor">授权</button> -->
    <!-- <i-modal v-model="modal"></i-modal> -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import List, { IQuery } from '@/coms/list/list.vue';
import BetCard from '@/coms/card/Bet.vue';
import { getBetList } from '@/api/bet';
import { getRefElement } from '../../utils';
import { Author } from '../../api/user';
import IModal from '@/coms/modal/modal.vue';
import { Router } from '../../utils/uniapi';
import { State } from 'vuex-class';
@Component({
  name: 'Index',
  components: {
    List,
    BetCard,
    IModal,
  },
})
export default class Index extends Vue {
  @State('tool')
  tool!: Store.Tool.State;
  query: AnyObject = {};
  modal: boolean = false;
  // beforeMount(){}
  mounted() {
    this.modal = true;
    this.refresh();
  }
  toCreateBet() {
    Router.to('/pages/bet/info');
  }
  async refresh() {
    const list = getRefElement<List>(this, 'list');
    list.refresh();
  }
  async getData(query: { page: number }) {
    const result = await getBetList(query.page);
    return result;
  }
  async onAuthor(e: any) {
    await this.$store.dispatch('Author', e);
  }
  // created(){}
  onShow() {
    if (this.tool.refresh) {
      this.refresh();
      this.$store.commit('setIndexRefreshState', false);
    }
  }
  // onHide(){}
  // onLoad(){}
  // onUnload(){}
}
</script>

<style lang="scss" scoped>
.index {
  color: #fff;
  padding: 0 30upx;
  .header {
    .title {
      font-size: 48upx;
      // color: #fff;
    }
  }
  .content {
    margin-top: 60upx;
    .createBet {
      border-radius: 20upx;
      text-align: left;
      background: linear-gradient(
        90deg,
        $danger-color,
        lighten($danger-color, 5%)
      );
      display: inline-block;
      overflow: initial;
      span {
        font-size: 28upx;
        opacity: 0.8;
      }
    }
    .bet-item {
      margin-top: 40upx;
    }
  }
}
</style>
