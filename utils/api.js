import axios from 'axios';

axios.defaults.baseURL = 'https://market.zj-hf.cn';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let get = (path, data = {}) => {
    data.t = new Date().getTime();
    return axios({
        url: path,
        method: 'get',
        params: data,
    }).then(response => {
        if (response.status === 200) {
            return response.data;
        }
        if (response.status === 503) {
            return {};
        }
        return {};
    }).catch(err => {
        console.error('error,--->', err);
    });
};
const $api = {
    get
};
export default $api;
