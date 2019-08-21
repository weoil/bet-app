<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
});
</script>

<style>
/*每个页面公共css */
page {
  min-height: 100vh;
  background: linear-gradient(120deg, rgb(192, 188, 195), rgb(174, 167, 226));
  background-attachment: fixed;
}
</style>
