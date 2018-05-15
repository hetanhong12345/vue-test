/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
// 个人信息
let getUserInfo = () => {
    return $api.get('/invest/getUserInfo');
};
actions.getUserInfo = ({commit}) => {
    return getUserInfo()
        .then(res => {
            if (res.code == 200) {
                commit('setState', res.data);
            }
            return res;
        });
};
//账户信息

let getBaofoo = () => {
    return $api.get('/invest/account/getAccountBaofoo');
};
actions.getBaofoo = ({commit}) => {
    return getBaofoo()
        .then(res => {
            if (res.code == 200) {
                commit('setState', res.data);
            }
            return res;
        });
};
export default actions;
