// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import DashboardSidebar from '@/components/DashboardSidebar';
import ClForm from '@/components/ClForm';
import ClButton from '@/components/ClButton';
import ClIcon from '@/components/ClIcon';
// eslint-disable-next-line
import ClModal from '@/components/ClModal';

import Vue from 'vue';

// import our styles/bootstrap/bootstrap vue
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/application.min.css';

import Index from './Index';
import router from './router';

Vue.config.productionTip = false;

Vue.component('dashboard-sidebar', DashboardSidebar);
Vue.component('cl-form', ClForm);
Vue.component('cl-button', ClButton);
Vue.component('cl-icon', ClIcon);
Vue.component('cl-modal', ClModal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Index },
  template: '<Index/>',
});
