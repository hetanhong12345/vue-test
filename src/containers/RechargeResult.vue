<template>
    <div class="recharge-result">
        <div class="btn-warp">
            <button class="btn-primary btn-resulr" @click.stop="closeWindow">充值结束</button>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'recharge-result',
        data() {
            return {}
        },
        created() {
        },
        computed: {},
        methods: {
            closeWindow() {
                window.close();
            }
        },
        mounted() {
        },
        destroyed() {

        }
    }
</script>

<style scoped>
    .recharge-result {
        position: relative;
        .btn-warp {
            margin-top: 60px;
            text-align: center;
            .btn-resulr {
                margin: auto;
                width: 200px;
                height: 40px;
                font-size: 18px;
            }

        }
    }
</style>
