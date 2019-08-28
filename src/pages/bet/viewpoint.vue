<template>
  <div class="viewpoint">
    <topbar title="观点"></topbar>
    <div class="name">
      {{ cache.name }}
    </div>
    <div class="users">
      <div class="user" v-for="user in cache.users" :key="user._id">
        <img class="avatar" :src="user.avatar" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component({
  name: 'viewpoint',
})
export default class App extends Vue {
  @State('tool')
  tool!: Store.Tool.State;

  get cache() {
    return this.tool.cache;
  }
  mounted() {
    console.log(this.cache);
  }
  // beforeMount(){}
}
</script>

<style lang="scss" scoped>
.viewpoint {
}
</style>
