<template>
    <div class="tip">
        <div class="body">
            <img src="../../images/close.png" alt="" class="close" @click.stop="close">
            <div class="line"></div>
            <p class="txt1">{{tipTitle||'请您在新打开的网上银行页面上完成付款'}}</p>
            <button class="tip-btn" @click.stop="complete">已完成</button>
            <p class="txt2">如果在充值过程中遇到问题请致电：{{telNumber}}</p>
        </div>
    </div>
</template>

<script>
    import EventBus from '../../tools/event-bus';
    import './tip.less';

    export default {
        name: 'tip',
        data() {
            return {}
        },
        props: ['tipTitle'],
        created() {
        },
        computed: {},
        methods: {
            close() {
                this.$emit('close')
            },
            complete() {
                this.close();
                EventBus.$emit('complete');
            }
        },
        destroyed() {

        }
    }
</script>
