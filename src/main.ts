import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/css/tailwind.css';
import '@/assets/css/styles.css';
import '@/components';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
