/**
 * Created by hekk on 2017/5/23.
 */
'use strict';
const mutations = {};

// state
mutations.setState = (state, data) => {
    if (data) {
        Object.keys(state).forEach(key => {
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });

    }
};
export default mutations;
