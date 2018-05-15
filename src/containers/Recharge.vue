<template>
    <div class="recharge">
        <div class="content" ref="content">
            <div v-if="recharge==0">
                <div flex="cross:center" class="item">
                    <span class="star"></span>
                    <span class="info">充值方式</span>
                    <span class="txt">网银充值</span>
                </div>
                <div flex="cross:center" class="item">
                    <span class="star">*</span>
                    <span class="info">充值金额</span>
                    <input type="text" placeholder="请输入充值金额"
                           maxlength="12" @keyup="myKeyup"
                           class="input" v-model="rechargeMoney">
                    <span class="red a" @click.stop="showBankList">查看充值限额</span>
                </div>
                <div flex="cross:center" class="item">
                    <span class="star">*</span>
                    <span class="info">手续费</span>
                    <span class="txt">0元</span>
                </div>
                <div flex="cross:center" class="item">
                    <span class="star"></span>
                    <span class="info"></span>
                    <button class="btn-primary next-btn" @click.stop="nextStep">下一步</button>
                </div>
            </div>
            <div v-if="recharge==1" class="result">
                <img src="../images/recharge/succ.png" alt="" class="img">
                <button class="succ-btn btn-primary" @click.stop="onceMore">再充一笔</button>
            </div>
            <div v-if="recharge==2" class="result">
                <img src="../images/recharge/fail.png" alt="" class="img">
                <button class="fail-btn btn-primary" @click.stop="rechargeAgain">重新充值</button>
            </div>
        </div>
        <div class="record">
            <p class="title">充值记录</p>
            <div class="table-line" flex="box:mean">
                <span>充值时间</span>
                <span class="border-left">充值金额(元)</span>
                <span class="border-left">充值方式</span>
                <span class="border-left">状态</span>
            </div>
            <div class="table-line item" flex="box:mean" v-for="(re,index) in rechargeList" :key="index">
                <span class="grey">{{re.createTime|timeFormater('yyyy-MM-dd hh:mm:ss')}}</span>
                <span class="black border-left">{{re.rechargeAmount|currencyFormat}}</span>
                <span class="black border-left">{{re.payMethod==1?'快捷支付':'网银支付'}}</span>
                <span class="blue border-left"
                      :class="{'blue':re.rechargeStatus==0,'green':re.rechargeStatus==1,'red':re.rechargeStatus==2}">
                    {{re.rechargeStatus==0?'处理中':(re.rechargeStatus==1?'成功':'失败')}}
                </span>
            </div>

            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
                class="pagination" flex="main:center cross:center">
            </el-pagination>
            <div class="recharge-tip">
                <div class="tip-title">
                    <span>!</span>
                    <span>温馨提示</span>
                </div>
                <p>1、如果在充值过程中遇到问题请致电：{{telNumber}}；</p>
                <p>2、请使用借记卡充值，信用卡无法充值；</p>
                <p>3、开通网银方法：</p>
                <p style="margin-left: 14px">（1）携带本人身份证到银行柜台办理。（2）登录网上银行办理；</p>
                <p>4、每日的充值限额依据各银行限额为准；</p>
                <p>5、充值手续费暂由平台承担；</p>
                <p>6、提现请到金疙瘩APP或关注金疙瘩微信公众号。</p>
            </div>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import '../less/recharge.less';
    import EventBus from '../tools/event-bus';
    import {currencyInputValidate, submitRecharge} from '../tools/operation';
    import {Message, Loading, Pagination} from 'element-ui';
    import {mapState} from 'vuex';

    Vue.use(Pagination);

    let timer = null;
    export default {
        name: 'recharge',
        data() {
            return {
                recharge: 0, // 0:充值 ，1：充值成功，2：充值失败
                disabled: true,
                rechargeMoney: '',//充值金额
                handlingCharge: 0,//手续费
                orderBillCode: '', //充值单
                loadingInstance: null,
                currentPage: 1,
                pageSize: 5,
                total: 0,
                rechargeList: []
            }
        },
        created() {

        },
        computed: {
            ...mapState(['userVerifyStatus']),
            amount: function () {
                if (this.rechargeMoney) {
                    return Number(this.rechargeMoney) + Number(this.handlingCharge);
                }
                return 0;
            }
        },
        methods: {
            // 银行限额列表
            showBankList() {
                EventBus.$emit('showBankList');
            },
            // 充值状态
            checkStatus() {
                let {orderBillCode} = this;
                return this.$api.get('/invest/trade/rechargeStatus', {orderBillCode})
                    .then(res => {
                        if (res.code == 200) {
                            let {data} = res;
                            this.recharge = data.status;
                            if (data.status == 0) {
                                timer = setTimeout(this.checkStatus, 3000);
                                return false
                            }
                            if (this.currentPage == 1) {
                                this.getRechargeList();
                                this.$store.dispatch('getBaofoo');
                            }
                            this.loadingInstance.close();
                        } else {
                            Message.error(res.msg);
                            this.loadingInstance.close();
                        }
                    });
            },
            // baofoo充值
            nextStep() {
                if (this.userVerifyStatus < 9) {
                    EventBus.$emit('showTip', '请先到金疙瘩APP完成开户绑卡后方可进行网银充值！');
                    return false;
                }
                if (!this.rechargeMoney) {
                    Message.warning('请输入充值金额');
                    return false;
                }
                if (Number(this.rechargeMoney) < 0) {
                    Message.warning('请输入正确金额');
                    return false;
                }
                if (this.disabled) {
                    return false
                }
                if (this.amount < 5) {
                    Message.warning('充值金额不要低于5元！');
                    return false;
                }
                if (this.amount > 500000) {
                    Message.warning('充值金额不要超过50万元！');
                    return false;
                }
                let newWind = window.open('/blank', '_KingGoldBlank');
                return this.$api.post('/invest/trade/recharge', {amount: this.amount})
                    .then(res => {
                        if (res.code != 200) {
                            newWind.close();
                            Message.error(res.msg);
                            return false;
                        }
                        let params = res.data || {};
                        this.orderBillCode = params.orderBillCode; //充值单，待查询

                        params.amount = this.amount;
                        params.userId = this.$store.state.userId;
                        submitRecharge(params);
                        EventBus.$emit('showTip', '请您在新打开的网上银行页面上完成付款');
                    })
            },
            // 输入框字符过滤
            myKeyup() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.rechargeMoney = currencyInputValidate(this.rechargeMoney);
                    if (this.rechargeMoney) {
                        this.disabled = false;
                    } else {
                        this.disabled = true;
                    }
                }, 100);
            },
            // 充值完成
            complete() {
                if (this.orderBillCode) {
                    if (this.loadingInstance) {
                        this.loadingInstance.close();
                    }
                    this.loadingInstance = Loading.service({
                        target: this.$refs.content,
                        text: '正在查询充值状态...',
                        background: 'rgba(0, 0, 0, 0.4)'
                    });
                    this.checkStatus();
                }
                else {
                    this.$store.dispatch('getUserInfo');
                }

            },
            // 再充一笔
            onceMore() {
                this.recharge = 0;
                this.rechargeMoney = '';
            },
            //重新充值
            rechargeAgain() {
                this.recharge = 0;
            },
            // 分页改变
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getRechargeList();
            },
            // 充值列表
            getRechargeList() {
                let startRow = this.pageSize * (this.currentPage - 1);
                let {pageSize} = this;
                return this.$api.get('/invest/trade/rechargeList', {
                    startRow,
                    pageSize
                }).then(res => {
                    if (res.code == 200) {
                        let {data} = res;
                        this.total = data.count;
                        this.rechargeList = data.list;
                    }
                })
            }

        },
        mounted() {
            EventBus.$on('complete', this.complete);
            this.getRechargeList();
        },
        destroyed() {
            if (timer) {
                clearTimeout(timer);
            }
            EventBus.$off('complete');
        }
    }
</script>

<style scoped>

</style>
