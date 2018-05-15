<template>
    <div class="center">
        <div class="content" flex="dir:top main:center cross:center">
            <p class="total">{{accountCashAmount|currencyFormat }}</p>
            <p class="info">可用余额（元）</p>
            <button class="btn" @click.stop="recharge">充值</button>
        </div>
        <div class="content2" flex="main:justify">
            <div>
                <p class="num blue">
                    {{accountTotalAssets|currencyFormat}}
                </p>
                <p class="info">总资产（元）</p>
            </div>
            <div>
                <p class="num green">
                    {{accountFreezeAmount|currencyFormat}}
                </p>
                <p class="info">冻结金额（元）</p>
            </div>
            <div>
                <p class="num red">
                    {{investmentAmount|currencyFormat}}
                </p>
                <p class="info">在投金额（元）</p>
            </div>
        </div>
    </div>

</template>

<script>
    import '../less/center.less';
    import {mapState} from 'vuex';

    export default {
        name: 'center',
        data() {
            return {}
        },
        created() {
        },
        computed: {
            ...mapState([
                'accountTotalAssets',
                'accountFreezeAmount',
                'accountCashAmount',
                'investmentAmount'
            ])
        },
        methods: {
            recharge() {
                this.$router.replace('/account/recharge');
            }
        },
        mounted() {
        },
        destroyed() {

        }
    }
</script>

<style scoped>

</style>
