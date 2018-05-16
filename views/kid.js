import '../less/base.less';
import 'flex.css';

import Vue from 'vue';
import Kid from '../containers/Kid';

new Vue({
    el: '#app',
    render: h => h(Kid)
});
