import '../less/base.less';
import 'flex.css';

import Vue from 'vue';
import PictureBook from '../container/PictureBook';

new Vue({
    el: '#app',
    render: h => h(PictureBook)
});
