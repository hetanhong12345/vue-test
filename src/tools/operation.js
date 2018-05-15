/**
 * Created by hekk on 2017/5/28.
 */

//设置页面标题
export let setTitle = (title) => {
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title || '金疙瘩';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};
import $api from './api';
import config from './config';

let baofooUrl = config.baofooActionUrl;
let baofooCallUrl = config.baofooCallUrl;
let merchant_id = config.merchant_id;
let terminal_id = config.terminal_id;

// baofoo 充值
export let submitRecharge = (params) => {
    let {userId, orderBillCode, amount, returnUrl} = params;
    let backUrl = window.location.origin + '/recharge-result';
    let pageUrl = `${baofooCallUrl}/baofoo/h5/notification/recharge?backUrl=${backUrl}`;
    $api.post('/invest/trade/rechargeParam', {
        amount,
        userId,
        orderId: orderBillCode,
        returnUrl,
        pageUrl,
        feeTakenOn: 1,
        fee: 0
    }).then(resp => {
        if (resp.code == 200) {
            merchant_id = resp.data.merchantId || merchant_id;
            terminal_id = resp.data.terminalId || terminal_id;
            let xml = resp.data.requestParams;
            let sign = resp.data.sign;
            let form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', baofooUrl + 'recharge.do');
            form.setAttribute('target', '_KingGoldBlank');
            form.setAttribute('name', 'baofoo');
            let input = document.createElement('input');
            input.setAttribute('name', 'merchant_id');
            input.setAttribute('type', 'hidden');
            input.value = merchant_id;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'terminal_id');
            input.setAttribute('type', 'hidden');
            input.value = terminal_id;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'requestParams');
            input.setAttribute('type', 'hidden');
            input.value = xml;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'sign');
            input.setAttribute('type', 'hidden');
            input.value = sign;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }
    })
};
//
export let submitAuthorization = (pUserId) => {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', baofooUrl + 'inAccredit.do');
    //form.setAttribute('name', 'baofoo');
    let input = document.createElement('input');
    input.setAttribute('name', 'merchant_id');
    input.setAttribute('type', 'hidden');
    input.value = merchant_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'terminal_id');
    input.setAttribute('type', 'hidden');
    input.value = terminal_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'user_id');
    input.setAttribute('type', 'hidden');
    input.value = pUserId;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'service_url');
    input.setAttribute('type', 'hidden');
    input.value = baofooCallUrl + 'baofoo/notification/auth';
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'page_url');
    input.setAttribute('type', 'hidden');
    input.value = baofooCallUrl + 'baofoo/h5/notification/auth';
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

};

// 输入框校验,提现和充值
export let currencyInputValidate = (input) => {
    input = input.replace(/\s+/g, "");
    if (!input) {
        return '';
    }
    let t = input.toString();
    if (t[0] == '0' || t[0] == '.') {
        return '';
    }
    if (isNaN(input)) {
        return ''
    }
    return t.replace(/\.\d{3,}/, (match) => {
        return match.substring(0, 3);
    })
};
export let logout = () => {
    window.sessionStorage.setItem('logoutUrl', encodeURIComponent(window.location.href));
    window.location.replace('/login');
};
export let isIdCard = (idCard) => {
    let isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    let isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!idCard) {
        return false;
    }
    return isIDCard1.test(idCard.toString()) || isIDCard2.test(idCard.toString())
};
export let isPassword = (password) => {
    let reg = /(?=.*[0-9])(?=.*[A-Za-z])^[0-9A-Za-z]{6,20}$/;
    if (!password) {
        return false;
    }
    return reg.test(password);
};
export let isPayPassword = (password) => {
    let reg = /^[0-9]{6}$/;
    if (!password) {
        return false;
    }
    return reg.test(password);
};
export let isPhone = (phone) => {
    if (!phone) {
        return false;
    }
    let reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
    return reg.test(phone.toString());
};



