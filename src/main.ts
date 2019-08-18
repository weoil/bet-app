import Vue from 'vue';
import App from './App.vue';
import Store from '@/store';
import '@/assets/iconfont/iconfont.css';
import '@/assets/style/components.scss';
import TopBar from '@/coms/topbar/topbar.vue';
Vue.config.productionTip = false;
Vue.prototype.$store = Store;
Vue.component('topbar', TopBar);

new App().$mount();
