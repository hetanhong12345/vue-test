// author: DELL
// created:2018/3/13 11:44
let banks = [
    {
        name: '工商银行',
        code: 'gongshang',
        payTypes: [{
            typeName: 'e支付',
            perValue: '1万',
            dayValue: '1万'
        }, {
            typeName: '网银支付',
            perValue: '500万',
            dayValue: '不限'
        }]
    },
    {
        name: '农业银行',
        code: 'nongye',
        payTypes: [{
            typeName: 'K宝',
            perValue: '100万',
            dayValue: '500万'
        }]
    },
    {
        name: '中国银行',
        code: 'zhongguo',
        payTypes: [{
            typeName: '中银快付',
            perValue: '1000',
            dayValue: '1000'
        }, {
            typeName: 'USBKey证书认证、令牌+动态口令',
            perValue: '5万',
            dayValue: '20万'
        }]
    },
    {
        name: '建设银行',
        code: 'jianshe',
        payTypes: [{
            typeName: '网银盾1代',
            perValue: '5万',
            dayValue: '10万'
        }, {
            typeName: '网银盾2代',
            perValue: '50万',
            dayValue: '50万'
        }]
    },
    {
        name: '交通银行',
        code: 'jiaotong',
        payTypes: [{
            typeName: '手机短信密码验证',
            perValue: '500',
            dayValue: '5万'
        }, {
            typeName: 'USBKey证书认证',
            perValue: '500',
            dayValue: '100万'
        }]
    },
    {
        name: '邮政储蓄银行',
        code: 'youzheng',
        payTypes: [{
            typeName: '手机短信客户',
            perValue: '1万',
            dayValue: '1万'
        }, {
            typeName: '电子令牌+短信客户',
            perValue: '20万',
            dayValue: '20万'
        }, {
            typeName: 'Ukey+短信客户',
            perValue: '100万',
            dayValue: '100万'
        }]
    },
    {
        name: '中信银行',
        code: 'zhongxin',
        payTypes: [{
            typeName: '手机动态密码',
            perValue: '1000',
            dayValue: '5000'
        }, {
            typeName: 'U盾',
            perValue: '100万',
            dayValue: '100万'
        }]
    },
    {
        name: '兴业银行',
        code: 'xingye',
        payTypes: [{
            typeName: '手机动态密码版',
            perValue: '日累积范围内无限额',
            dayValue: '初始5000，可至网点加大'
        }, {
            typeName: 'U盾',
            perValue: '40万',
            dayValue: '100万'
        }]
    },
    {
        name: '光大银行',
        code: 'guangda',
        payTypes: [{
            typeName: '手机动态密码版',
            perValue: '1万',
            dayValue: '1万'
        }, {
            typeName: '令牌动态密码及阳光网盾验证方式',
            perValue: '100万',
            dayValue: '100万'
        }]
    },
    {
        name: '民生银行',
        code: 'minsheng',
        payTypes: [{
            typeName: '大众版',
            perValue: '300',
            dayValue: '300'
        }, {
            typeName: '贵宾版',
            perValue: '5000',
            dayValue: '5000'
        }, {
            typeName: 'U宝用户',
            perValue: '50万',
            dayValue: '50万'
        }]
    },
    {
        name: '广发银行',
        code: 'guangfa',
        payTypes: [{
            typeName: '手机动态密码版',
            perValue: '3000',
            dayValue: '3000'
        }, {
            typeName: 'key盾/key令',
            perValue: '5000',
            dayValue: '5000'
        }]
    },
    {
        name: '上海银行',
        code: 'shanghai',
        payTypes: [{
            typeName: '办理动态密码版个人网银（含文件证书）,开通网上支付功能',
            perValue: '6000',
            dayValue: '1万'
        }, {
            typeName: '办理E盾证书版个人网银，开通网上支付功能',
            perValue: '10万',
            dayValue: '100万'
        }]
    },
    {
        name: '招商银行',
        code: 'zhaoshang',
        payTypes: [{
            typeName: '大众版',
            perValue: '500',
            dayValue: '500'
        }, {
            typeName: '专业版',
            perValue: '500万',
            dayValue: '1000万以上'
        }]
    },
    {
        name: '浦发银行',
        code: 'pufa',
        payTypes: [{
            typeName: '手机动态密码',
            perValue: '500',
            dayValue: '20万'
        }, {
            typeName: '数字证书（浏览器证书或U盾）',
            perValue: '500',
            dayValue: '无限额，自行设置'
        }]
    },
    {
        name: '平安银行',
        code: 'pingan',
        payTypes: [{
            typeName: '网银',
            perValue: '5万',
            dayValue: '5万'
        }]
    },
    {
        name: '北京银行',
        code: 'beijing',
        payTypes: [{
            typeName: '普通版',
            perValue: '300',
            dayValue: '300'
        }, {
            typeName: '动态密码版',
            perValue: '1000',
            dayValue: '5000'
        }, {
            typeName: '证书版',
            perValue: '100万',
            dayValue: '100万'
        }]
    },
    {
        name: '北京农商银行',
        code: 'beijingrcb',
        payTypes: [{
            typeName: '大众版',
            perValue: '500',
            dayValue: '500'
        }, {
            typeName: '手机认证',
            perValue: '10万',
            dayValue: '50万'
        }, {
            typeName: '证书认证',
            perValue: '20万',
            dayValue: '100万'
        }]
    },
    {
        name: '上海农商银行',
        code: 'shanghaircb',
        payTypes: [{
            typeName: '短信版',
            perValue: '1000',
            dayValue: '5000'
        }, {
            typeName: '证书版',
            perValue: '1万',
            dayValue: '1万'
        }]
    },
    {
        name: '华夏银行',
        code: 'huaxia',
        payTypes: [{
            typeName: '卡密码校验',
            perValue: '300',
            dayValue: '1000'
        }, {
            typeName: '手机动态验证码',
            perValue: '1000',
            dayValue: '5000'
        }, {
            typeName: 'U盾',
            perValue: '5000',
            dayValue: '10万'
        }]
    },
    {
        name: '浙商银行',
        code: 'zheshang',
        payTypes: [{
            typeName: '自助注册',
            perValue: '200',
            dayValue: '200'
        }, {
            typeName: '大众版',
            perValue: '1000',
            dayValue: '1000'
        }]
    },
    {
        name: '银联在线',
        code: 'yinlian',
        payTypes: [{
            typeName: '银联卡',
            perValue: '2万',
            dayValue: '5万'
        }, {
            typeName: '银联账户',
            perValue: '2万',
            dayValue: '5万'
        }]
    }
];
let imgUrls = {};

banks.map(bank => {
    imgUrls[bank.code] = require(`../images/bank/${bank.code}.png`)
});
export {
    banks, imgUrls
};
