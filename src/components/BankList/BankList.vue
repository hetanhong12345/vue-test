<template>
    <div class="bank-list">
        <div class="bank-body">
            <p class="title">网银充值限额表</p>
            <div class="bank-wrap">
                <div class="bank-item" v-for="bank in banks"
                     :class="{'active':bank.code==defaultBank.code}"
                     :key="bank.code" @click.stop="setBank(bank)">
                    <img class="bank-logo" :src="imgUrls[bank.code]" alt=""/>
                </div>
                <div class="bank-item more" v-if="!more"
                     flex="main:center"
                     @click.stop="more=true">
                    <p style="text-align: center">更多银行</p>
                </div>
                <div style="clear: both"></div>

            </div>

            <div class="table-line table-title" flex="box:mean">
                <span>单笔限额</span>
                <span class="border-left">单日限额</span>
                <span class="border-left">必要条件</span>
            </div>
            <div class="table-line item" flex="box:mean" v-for="payType in defaultBank.payTypes">
                <span>{{payType.perValue}}</span>
                <span class="border-left">{{payType.dayValue}}</span>
                <span class="border-left">{{payType.typeName}}</span>
            </div>

            <button class="close-btn" @click.stop="close">关闭</button>
        </div>
    </div>
</template>

<script>
    import {banks, imgUrls} from '../../tools/bank';
    import './bank-list.less';

    export default {
        name: 'bank-list',
        data() {
            return {
                more: false,
                imgUrls,
                defaultBank: banks[0]
            }
        },
        created() {
        },
        computed: {
            banks() {
                if (!this.more) {
                    return banks.slice(0, 9);
                }
                return banks;
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            setBank(bank) {
                this.defaultBank = bank;
            }
        },
        destroyed() {

        }
    }
</script>
