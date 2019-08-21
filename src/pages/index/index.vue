<template>
  <div class="index">
    <topbar></topbar>
    <div class="header">
      <div class="title">
        <span>约定</span>
        <span>被记录的点滴</span>
      </div>
    </div>
    <div class="content">
      <div class="createBet" @click="toCreateBet">
        打个赌
      </div>
      <div class="bets">
        <list :getData="getData" :query="query" ref="list">
          <!-- <template v-slot="{ list }">
            <div v-for="bet in list" :key="bet.id">
              <bat-card :item="bet"></bat-card>
            </div>
          </template> -->
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
@Component({
  name: 'Index',
  components: {
    List,
    BetCard,
    IModal,
  },
})
export default class Index extends Vue {
  query: AnyObject = {};
  modal: boolean = false;
  // beforeMount(){}
  mounted() {
    this.modal = true;
    this.refresh();
  }
  toCreateBet() {
    Router.to('/pages/bet/create');
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
  // onShow(){}
  // onHide(){}
  // onLoad(){}
  // onUnload(){}
}
</script>

<style lang="scss" scoped>
.index {
  height: 200vh;
}
</style>
