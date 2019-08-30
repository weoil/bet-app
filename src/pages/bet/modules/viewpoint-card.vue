<template>
  <div
    class="viewpoint-card shadow-blur"
    :class="{
      selected: selected,
    }"
  >
    <div class="content">{{ item.name }}</div>
    <div class="ctrl">
      <button class="button" v-if="edit" @click="onEdit">
        编辑
      </button>
      <button
        class="button"
        open-type="getUserInfo"
        @getuserinfo="onAuthor"
        @click="onView"
        v-if="!edit"
      >
        查看
      </button>
      <button
        class="button"
        v-if="isSelect"
        open-type="getUserInfo"
        @getuserinfo="onAuthor"
        @click.stop="onSelect"
      >
        选择
      </button>
      <button class="button" v-if="edit" @click.stop="onRemove">
        删除
      </button>
      <!-- <span
              v-if="isCreate"
              class="iconfont icon-shanchu"
              @click.stop="removeViewPonit(i)"
            ></span> -->
      <!-- 已选择 -->
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IViewPoint } from '../../../api/bet';
@Component({
  name: 'viewpoint-card',
})
export default class App extends Vue {
  @Prop()
  selected!: boolean;

  @Prop()
  isSelect!: boolean;

  @Prop()
  edit!: boolean;
  @Prop()
  item!: IViewPoint;
  // mounted(){}
  // beforeMount(){}
  onAuthor(e: any) {
    this.$emit('author', e);
  }
  onRemove() {
    this.$emit('remove');
  }
  onSelect() {
    this.$emit('select');
  }
  onView() {
    this.$emit('view');
  }
  onEdit() {
    this.$emit('edit');
  }
}
</script>

<style lang="scss" scoped>
.viewpoint-card {
  @include flex-center;
  justify-content: flex-start;
  text-align: left;
  position: relative;
  // display: inline-block;
  padding: 30upx 30upx 30upx 30upx;
  border-radius: 20upx;
  font-size: 38upx;
  // background: linear-gradient(to right, #ff5f6d, #ffc371);
  background: linear-gradient(to bottom, #5d698549, #3f4c6b73);
  &.selected {
    background: linear-gradient(to right, #dd8e7649, #e2563373);
  }
  .content {
    flex: 1;
  }
  .ctrl {
    display: flex;
    flex-shrink: 0;
    .button {
      padding: 20upx 20upx;
      font-size: 24upx;
      background: #eece19;
      color: #333;
      border-radius: 40upx;
      line-height: 1;
    }
    .button + .button {
      margin-left: 10upx;
    }
  }
}
</style>
