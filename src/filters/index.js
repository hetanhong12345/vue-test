/**
 * Created by DELL on 2017/6/6.
 */

export let textToHtml = (input) => {
    if (!input) {
        return '';
    }
    return input.replace(/\n/g, '<br>');
};
let add0 = (input) => {
    if (!input) {
        return '00';
    }
    input = input + '00';
    return input.substring(0, 2);
};
export let currencyFormat = (input) => {
    if (!input) {
        return '0.00';
    }
    let ouputs = input.toString();
    ouputs = ouputs.split('.');
    return ouputs[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + add0(ouputs[1]);
};
export let mobileFormat = (input) => {
    if (!input) {
        return '';
    }
    return input.substr(0, 3) + '****' + input.substr(7, 11);
};
export let timeFormater = (timeStamp, fmt = 'yyyy-MM-dd hh:mm:ss.S') => {
    if(!timeStamp) return ''
    let time = new Date(timeStamp)
    let o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
