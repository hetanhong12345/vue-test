/**
 * Created by DELL on 2017/6/5.
 */
let protocol = window.location.protocol;
let apiUrl = 'http://10.10.10.69:6640';
let baofooActionUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
let baofooCallUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
let merchant_id = '100000675';
let terminal_id = '100000701';
let encrypt = false;
/* test config*/
if (process.env.kingold == 'test' || 1) {
    apiUrl = `https://issuer-pc-test.zj-hf.cn`;
    baofooActionUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
    baofooCallUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
}
/* stage config*/
if (process.env.kingold == 'stage') {
    apiUrl = `https://issuer-pc-prod.zj-hf.cn`;
    baofooActionUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//pre-callme.zj-hf.cn`;
    merchant_id = '1172380';
    terminal_id = '34865';
    encrypt = true;

}
/* prod config*/
if (process.env.kingold == 'production') {
    apiUrl = `https://issuer-pc-prod.zj-hf.cn`;
    baofooActionUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//callme.zj-hf.cn`;
    merchant_id = '1177929';
    terminal_id = '35265';
    encrypt = true;
}
export default {
    apiUrl,
    baofooActionUrl,
    baofooCallUrl,
    merchant_id,
    terminal_id
}
/*
 * kingold key & IV
 * */
/* key 和 iv 密文*/
export const encryptKey = '73ded42e8a84ffb937765aa97c760f8449a0b7f091b6bfe70462896d22c039c38054e4622b4dcbb7ca93f3d0e8b1fdc3';
export const encryptIV = 'dd515f3774e20d18ae9b19ea3fa8edd3906223e2ac35c805a6d984f2ca8c3d44';
export let doEncrypt = encrypt;
export const telNumber = '400-640-3606';

export let iosUrl = 'https://itunes.apple.com/cn/app/%E9%87%91%E7%96%99%E7%98%A9/id1260433533?mt=8';
export let androidUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zjinv.kingold';


