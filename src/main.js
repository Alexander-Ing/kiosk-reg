// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import VeeValidate from 'vee-validate';
import Toast from 'vue-easy-toast';
import VueGoodTable from 'vue-good-table';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import Kiosk from './components/Kiosk';
import Admin from './components/Admin';
import AdminHome from './components/AdminHome';
import store from './router/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueGoodTable);
Vue.use(VeeValidate);
Vue.use(Router);
Vue.use(Toast);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Kiosk',
      component: Kiosk,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/adminhome',
      name: 'Admin Home',
      component: AdminHome,
    },
  ],
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
