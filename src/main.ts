import Vue from 'vue';
import App from './App.vue';
import Store from '@/store';
Vue.config.productionTip = false;

Vue.prototype.$store = Store;
new App().$mount();
