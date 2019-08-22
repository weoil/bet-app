<template>
  <div class="seize">
    <div
      class="wrapper"
      :class="{ top: position === 'top', bottom: position === 'bottom' }"
      :style="wrapperStyle"
    >
      <slot></slot>
    </div>
    <cover-view :style="boxStyle"></cover-view>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
export default Vue.extend({
  name: 'seize',
  components: {},
  props: {
    name: {
      type: String,
      default: 'seize',
    },
    position: {
      type: String,
      default: 'top',
    },
    val: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      height: 0,
      id: this.name,
    };
  },
  computed: {
    wrapperStyle(): string {
      const keys = this.position.split('||');
      const vals = this.val.split('||');
      if (keys.length !== vals.length) {
        if (vals.length !== 1 && vals[0] !== '') {
          return `left:0px`;
        }
      }
      let style = ``;
      keys.forEach((k, index) => {
        style += `${k}:${vals[index] || '0px'};`;
      });
      console.log('style', style);
      return style;
    },
    boxStyle(): any {
      return `height: ${this.height}px;`;
      // padding-${this.position}:${this.val};
    },
  },
  // beforeMount() {},
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.select(`.seize .wrapper`).boundingClientRect(res => {
      if (!res) {
        return;
      }
      this.height = res.height || 0;
    });
    query.exec();
  },
  // created() {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.seize {
  .wrapper {
    position: fixed;
    &.top {
      top: var(--window-top);
    }
    &.bottom {
      bottom: 0;
    }
  }
}
</style>
