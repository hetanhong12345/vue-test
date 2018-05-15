<template>
    <div class="login" flex="dir:top">
        <web-header flex-box="0"></web-header>
        <div flex-box="0">fuck you</div>
        <div flex-box="0">fuck your hehe</div>
        <div class="body-warp" flex-box="1" flex>

            <div class="content" flex="main:center cross:center">
                <div class="text-warp" flex="main:justify cross:center">
                    <span v-for="(letter,index) in 'KINGOLD'" :key="index">{{letter}}</span>
                </div>
                <div class="container">
                    <div class="title" flex="main:center cross:center">用户登录</div>
                    <form class="form-warp" @submit.stop.prevent="login">
                        <div class="form-item" flex>
                            <label for="mobile" class="label" flex-box="0" flex="main:center cross:center">
                                手机号
                            </label>
                            <input flex-box="1" type="text" id="mobile"
                                   placeholder="请输入手机号" maxlength="11"
                                   v-model="userLoginName" class="form-input">
                        </div>
                        <div class="form-item" flex v-show="imageCode">
                            <label for="imgCode" class="label" flex-box="0" flex="main:center cross:center">
                                图形验证码
                            </label>
                            <input id="imgCode" type="text" class="form-input"
                                   style="width: 120px" maxlength="4"
                                   v-model="inputCode" flex-box="0">
                            <div flex-box="0" class="form-code btn-primary"
                                 @click.stop="getImageCode"
                                 flex="main:center cross:center">{{imageCode}}
                            </div>
                        </div>
                        <div class="form-item" flex v-show="loginType==1">
                            <label for="smsCode" class="label" flex-box="0" flex="main:center cross:center">
                                验证码
                            </label>
                            <input id="smsCode" type="text" class="form-input"
                                   style="width: 120px" maxlength="6"
                                   v-model="smsCode" flex-box="0">
                            <div flex-box="0" class="form-code btn-primary"
                                 @click.stop="getSmsCode"
                                 flex="main:center cross:center" v-if="verifyTimeLeft<1">{{smsText}}
                            </div>
                            <div flex-box="0" class="form-code disabled"
                                 flex="main:center cross:center" v-else>{{verifyTimeLeft}}
                            </div>
                        </div>

                        <div class="form-item" flex v-if="loginType==0">
                            <label for="password" class="label" flex-box="0" flex="main:center cross:center">
                                密码
                            </label>
                            <input flex-box="1" type="password" id="password"
                                   placeholder="请输入密码" maxlength="20"
                                   v-model="userLoginPassword"
                                   class="form-input">
                        </div>
                        <div class="form-item" flex="main:right">
                            <span class="switch-type" @click.stop="switchType">
                                {{loginType?'密码登录':'验证码登录'}}

                            </span>
                        </div>
                        <div class="form-item" flex>
                            <label class="label" flex-box="0"></label>
                            <button class="btn-primary btn-login" flex-box="1"
                                    type="submit" :disabled="loading">{{loading?'登录中...':'登录'}}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <web-footer flex-box="0"></web-footer>

    </div>

</template>

<script>
    import '../less/login.less';
    import {isPassword, isPhone} from "../tools/operation";
    import WebHeader from '../components/Header';

    import WebFooter from '../components/Footer';

    import {Message} from 'element-ui';

    export default {
        name: 'login',
        data() {
            return {
                loginType: 0,// 0:密码登录 ，1：验证码登录
                userLoginName: '',
                userLoginPassword: '',
                loading: false,
                imageCode: '',
                inputCode: '',
                smsCode: '',
                smsText: '发送短信',
                timer: null,
                verifyTimeLeft: 0
            }
        },
        components: {
            WebFooter, WebHeader
        },
        created() {
        },
        computed: {},
        methods: {
            switchType() {
                this.imageCode = '';
                this.loginType = (this.loginType + 1) % 2
            },
            getImageCode() {
                return this.$api.get('/imageCode')
                    .then(res => {
                        if (res.code == 200) {
                            let {data} = res;
                            this.imageCode = data;
                        }
                    });
            },
            getSmsCode() {
                if (this.imageCode && !this.inputCode) {
                    Message.warning('请输入图片验证码');
                    return false;
                }
                let {userLoginName} = this;
                if (!userLoginName) {
                    Message.warning('请输入正确的11位手机号码');
                    return false;
                }
                if (!isPhone(userLoginName)) {
                    Message.warning('请输入正确的11位手机号码');
                    return false;
                }
                let investorMobile = this.userLoginName;
                let bussType = 4;
                let data = {investorMobile, bussType};
                if (this.imageCode) {
                    data.imageCode = this.inputCode;
                }
                this.verifyTimeLeft = 60;
                this.timeCount();
                this.smsText = '重新发送';
                return this.$api.post('/invest/sendVerifyCode', data)
                    .then(res => {
                        if (res.code == 200) {
                            //
                            return false;
                        }
                        if (res.data && res.data.imageCode) {
                            this.imageCode = res.data.imageCode;
                        }
                        Message.error(res.msg);
                        this.clearTimeCount();
                    })

            },
            timeCount() {
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount() {
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            login() {
                if (this.loading) {
                    return false;
                }

                let {userLoginName, userLoginPassword} = this;
                if (!userLoginName) {
                    Message.warning('请输入正确的11位手机号码');
                    return false;
                }
                if (!isPhone(userLoginName)) {
                    Message.warning('请输入正确的11位手机号码');
                    return false;
                }
                if (this.loginType == 1) {
                    return this.smsLogin();
                }
                if (!userLoginPassword) {
                    Message.warning('请输入正确的登录密码（6~20位数字和字母）');

                    return false;
                }

                if (!isPassword(userLoginPassword)) {
                    Message.warning('请输入正确的登录密码（6~20位数字和字母）');

                    return false;
                }
                if (this.imageCode && !this.inputCode) {
                    Message.warning('请输入图片验证码');
                    return false;
                }
                let data = {
                    userLoginName: this.userLoginName,
                    userLoginPassword: this.userLoginPassword
                };
                if (this.inputCode && this.imageCode) {
                    data.imageCode = this.inputCode;
                }
                this.loading = true;
                this.$api.post('/invest/login', data)
                    .then(res => {
                        this.loading = false;
                        if (res.code == 200) {
                            this.$store.dispatch('getUserInfo');
                            this.$store.dispatch('getBaofoo');
                            this.$router.replace('/account');
                            return false

                        }
                        if (res.code == 1004) {
                            this.imageCode = res.data.imageCode;
                            Message.warning(res.msg);
                            return false
                        }
                        if (res.data && res.data.imageCode) {
                            this.imageCode = res.data.imageCode;
                            Message.error(res.msg);
                            return false
                        }

                        else {
                            Message.error(res.msg);
                        }
                    })
            },
            smsLogin() {
                let {userLoginName, smsCode} = this;
                if (!smsCode) {
                    Message.warning('请输入短信验证码');
                    return false;
                }
                let data = {smsCode, investorMobile: userLoginName};
                this.loading = true;
                return this.$api.post('/invest/smsLogin', data)
                    .then(res => {
                        this.loading = false;
                        if (res.code == 200) {
                            this.$store.dispatch('getUserInfo');
                            this.$store.dispatch('getBaofoo');
                            this.$router.replace('/account');
                            return false
                        }
                        if (res.data && res.data.imageCode) {
                            this.imageCode = res.data.imageCode;
                            Message.error(res.msg);
                            return false
                        }

                        else {
                            Message.error(res.msg);
                        }
                    })

            }
        },
        mounted() {
        },
        destroyed() {

        }
    }
</script>


