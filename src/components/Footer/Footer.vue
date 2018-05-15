<template>
    <div class="footer">
        <div class="footer-content" flex="main:justify cross:center">
            <span flex-box="1">Copyright@2017 all rights reserved 粤ICP备17086866号-1 深圳买单互联网金融服务有限公司</span>
            <span flex-box="0">客服电话：{{ telNumber}}</span>
        </div>

    </div>
</template>

<script>
    import './footer.less';
    export default {
        name: 'web-footer',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
