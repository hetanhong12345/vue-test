/**
 * Created by DELL on 2017/7/5.
 */
const CryptoJS = require('crypto-js/core');
const AES = require('crypto-js/aes');
const Utf8 = require('crypto-js/enc-utf8');
const Hex = require('crypto-js/enc-hex');
const Base64 = require('crypto-js/enc-base64');
const ZeroPadding = require('crypto-js/pad-zeropadding');
const Latin1 = require('crypto-js/enc-latin1');
import md5 from 'md5';
import {encryptKey, encryptIV} from './config';
/*
 * kingoldKey md5
 * kingoldIV  md5
 * */

/*用于解密key和iv 的key 和iv */
let keyMd5 = md5('kingoldKey');
let IVMd5 = md5('kingoldIV');
IVMd5 = IVMd5.substr(0, 16);
let key = Utf8.parse(keyMd5);
let iv = Utf8.parse(IVMd5);

let decryptKingold = (encrypt) => {
    let encryptedHexStr = Hex.parse(encrypt);
    let base64 = Base64.stringify(encryptedHexStr);
    let decrypt = AES.decrypt(base64, key, {iv: iv, padding: ZeroPadding});
    return decrypt.toString(Latin1);
};
/*解密生成key 和IV*/
export let kinglodKey = decryptKingold(encryptKey);
export let kinglodIV = decryptKingold(encryptIV);

export let decryptFun = (encrypt) => {
    let encryptedHexStr = Hex.parse(encrypt);
    let base64 = Base64.stringify(encryptedHexStr);
    /*取解密生成的key 中间32位*/
    let key = Utf8.parse(kinglodKey.substr(7, 32));

    /*取解密生成的iv 中间16位*/
    let iv = Utf8.parse(kinglodIV.substr(7, 16));
    let decrypt = AES.decrypt(base64, key, {iv: iv, padding: ZeroPadding});
    return decrypt.toString(Latin1);
}
export let encryptFun = (text) => {
    let key = Utf8.parse(kinglodKey.substr(7, 32));
    let iv = Utf8.parse(kinglodIV.substr(7, 16));
    text = text.toString();
    let encrypted = AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: ZeroPadding
    });
    let encryptedStr = encrypted.ciphertext.toString();
    return encryptedStr;
};


