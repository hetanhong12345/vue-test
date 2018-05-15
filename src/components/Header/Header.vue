<template>
    <div class="header">
        <div class="content" flex>
            <img flex-box="0" class="logo" src="../../images/logo.png" alt="logo" @click.stop="$router.push('/index')">
            <div flex-box="1" class="header-text">深圳买单互联网金融服务有限公司</div>
            <div flex-box="0" class="header-link" v-if="userUuid" @click.stop="linkAccount">我的账户</div>
            <div flex-box="0" class="header-link" @click.stop="logout" v-else>登录</div>
        </div>

    </div>
</template>

<script>
    import './header.less';
    import {mapState} from 'vuex';

    export default {
        name: 'web-header',
        data() {
            return {}
        },
        created() {
        },
        computed: {
            ...mapState(['userUuid'])
        },
        methods: {
            logout() {
                this.$router.push('/login');
            },
            linkAccount() {
                this.$router.push('/account');
            }
        },
        destroyed() {

        }
    }
</script>
