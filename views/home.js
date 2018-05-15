import '../less/base.less';
import 'flex.css';

import Vue from 'vue';
import Home from '../container/Home';

new Vue({
    el: '#app',
    render: h => h(Home)
});
