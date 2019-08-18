<template>
  <div class="i-modal"></div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
@Component({
  name: 'i-modal',
})
class App extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  status!: boolean;
  show: boolean = this.status;
  @Watch('status')
  onStatusChange(val: boolean) {
    this.show = val;
  }
  // mounted(){}
  // beforeMount(){}
}
export default App;
</script>

<style lang="scss" scoped>
.i-modal {
}
</style>
