<template>
  <div class="index">
    <div class="header">
      <div class="title">
        <span>约定</span>
        <span>被记录的点滴</span>
      </div>
      <div class="setting-box">
        <img src="" alt="" class="setting" />
      </div>
    </div>
    <div class="content">
      <div class="createBet"></div>
      <div class="bets">
        <list :getData="getData" :query="query" ref="list">
          <template v-slot="{ list }">
            <div v-for="bet in list" :key="bet.id">
              <bat-card :item="bet"></bat-card>
            </div>
          </template>
        </list>
      </div>
    </div>
    <button open-type="getUserInfo" @getuserinfo="onAuthor">授权</button>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import List, { IQuery, getList } from '@/coms/list/list.vue';
import BetCard from '@/coms/card/Bet.vue';
import { getBetList } from '@/api/bet';
import { getRefElement } from '../../utils';
import { Author } from '../../api/user';
@Component({
  name: 'Index',
  components: {
    List,
    BetCard,
  },
})
export default class Index extends Vue {
  query: AnyObject = {};
  // beforeMount(){}
  // mounted() {}
  async refresh() {
    const list = getList(this);
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
}
</style>
