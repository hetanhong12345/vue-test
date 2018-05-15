import Vue from 'vue';
import 'flex.css';
import './less/base.less';
import App from './App';
import router from './router';
import store from './store';
import * as filters from './filters';
import $api from './tools/api';
import {telNumber} from './tools/config';
import 'babel-polyfill';

Vue.prototype.$api = $api;
Vue.prototype.telNumber = telNumber;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
store.dispatch('getUserInfo');
store.dispatch('getBaofoo');

