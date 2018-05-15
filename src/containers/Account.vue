<template>
    <div class="account" flex="dir:top">
        <bank-list v-if="isShowList" @close="isShowList = false"></bank-list>
        <tip v-if="isShowTip" :tipTitle="tipTitle" @close="isShowTip = false"></tip>
        <div class="header">
            <div class="header-content" flex>
                <img flex-box="0" class="logo" src="../images/logo.png" alt="logo" @click.stop="$router.push('/index')">
                <div flex-box="1" class="header-text">深圳买单互联网金融服务有限公司</div>
                <span flex-box="0" class="user-span" v-if="userUuid" flex="cross:center">我的账户 ( {{mobile|mobileFormat}} )</span>
                <span flex-box="0" class="user-logout" v-if="userUuid" flex="cross:center"
                      @click.stop="logout">退出</span>
            </div>
        </div>
        <div class="body-warp" flex flex-box="1">
            <div class="left-items" flex-box="0">
                <router-link class="menu-item" :to="{path:'/account/center'}"
                             active-class="menu-active"
                             replace flex="main:center cross:center">账户中心
                </router-link>
                <router-link class="menu-item" :to="{path:'/account/recharge'}"
                             active-class="menu-active"
                             replace flex="main:center cross:center">充值
                </router-link>
            </div>
            <div class="right-content" flex-box="1">
                <router-view></router-view>
            </div>

        </div>
        <web-footer flex-box="0"></web-footer>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import EventBus from '../tools/event-bus';
    import BankList from '../components/BankList';
    import Tip from '../components/Tip';
    import WebFooter from '../components/Footer';

    import '../less/account.less';

    export default {
        name: 'account',
        data() {
            return {
                isShowList: false,
                isShowTip: false
            }
        },
        created() {

        },
        computed: {
            ...mapState(['userUuid', 'mobile'])
        },
        components: {BankList, Tip, WebFooter},
        methods: {
            logout() {
                this.$api.post('/invest/logout')
                    .then(res => {
                        if (res.code == 200) {
                            window.location.replace('/login');
                        }
                    })
            }
        },
        mounted() {
            EventBus.$on('showBankList', () => {
                this.isShowList = true;
            });
            EventBus.$on('showTip', (title) => {
                this.isShowTip = true;
                this.tipTitle = title;
            });
        },
        destroyed() {
            EventBus.$off('showBankList');
            EventBus.$off('showTip');
        }
    }
</script>

