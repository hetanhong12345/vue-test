import '../less/base.less';
import 'flex.css';

import Vue from 'vue';
import Home from '../containers/Home';

new Vue({
    el: '#container',
    render: h => h(Home)
});
