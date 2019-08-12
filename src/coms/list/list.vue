<template>
  <div class="list">
    <slot v-if="empty && !loading" name="empty">
      <div class="empty">
        暂无内容
      </div>
    </slot>
    <slot :list="list" :query="query"></slot>
    <slot name="loading" v-if="loading">
      <button loading class="loading"></button>
    </slot>
    <slot name="complete" v-if="complete && !loading && !empty">
      <div class="complete"></div>
    </slot>
  </div>
</template>

<script lang='ts'>
// 列表渲染组件
// 内部维护列表状态 进行状态分析 维护页码情况
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
export function getList(ctx: Vue, refName: string = 'list'): List {
  const el: any = ctx.$refs[refName];
  return el;
}
export interface IQuery {
  page: number;
  [key: string]: any;
}
@Component({
  name: 'list',
  components: {},
})
export default class List extends Vue {
  loading: boolean = false; // 是否加载
  complete: boolean = false; // 是否完成
  empty: boolean = false; // 是否为空
  isRefresh: boolean = false; // 是否为刷新
  page: number = 0; // 页码
  list: any[] = []; // 数据
  @Prop({
    type: Object,
    default: () => ({
      page: 0,
    }),
  })
  query: any; // 请求参数
  @Prop()
  getData: any; // 请求函数
  // 当query发生改变的时候,自动进行刷新
  @Watch('query', { deep: true })
  onQueryChange() {
    this.refresh();
  }
  // 下一页
  public async nextPage(): Promise<void> {
    try {
      if (this.complete || this.loading) {
        return;
      }
      const page = this.page + 1;
      const query = { ...this.query };
      this.loading = true;
      let list = await this.getData({ ...query, page });
      if (typeof list === 'function') {
        list = await list({ page, ...query });
      }
      let diff = page - 1 === this.page;
      if (!diff) {
        // throw new Error("page change")
        return;
      }
      for (const key of Object.keys(query)) {
        diff = query[key] === this.query[key];
        if (!diff) {
          // throw new Error("query change")
          return;
        }
      }
      if (list.length === 0) {
        this.complete = true;
        if (page > 1) {
          return;
        } else {
          this.empty = true;
        }
      }
      if (page > 1) {
        list = this.list.concat(list);
      }
      this.page = page;
      this.list = list;
    } catch (err) {
      throw err;
    } finally {
      this.loading = false;
    }
  }
  // 刷新
  public async refresh(): Promise<void> {
    try {
      this.page = 0;
      this.isRefresh = true;
      this.loading = false;
      this.complete = false;
      // obj.list = []
      await this.nextPage();
    } finally {
      this.isRefresh = false;
    }
  }
  // beforeMount(){},
  // mounted() {}
  // beforeDestroy() {}
  // created(){},
  // onShow(){},
  // onHide(){},
  // onLoad(){},
  // onUnload(){},
}
</script>

<style lang="scss" scoped>
.list {
  .empty {
    padding: 30upx 0;
    font-size: 26upx;
    opacity: 0.6;
    text-align: center;
  }
  .loading {
    width: 100%;
    background: none;
    text-align: center;
    padding-bottom: 30upx;
    opacity: 0.6;
    &::after {
      border: none;
    }
  }
}
</style>
