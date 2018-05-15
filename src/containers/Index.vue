<template>
    <div class="index">
        <web-header></web-header>

        <div class="one-warp">
            <div class="content-one">
                <div class="content" flex>
                    <div class="one-left" flex-box="1">
                        <p class="main">金疙瘩——懂你的智能定制理财专家</p>
                        <p class="sub">中冀投资旗下智能化理财信息展示及服务平台。</p>
                        <p class="sub">用科技的力量让金融普惠天下</p>
                        <div class="expc-fund" flex>
                            <img flex-box="0" src="../images/dowmload.png" alt="">
                            <p flex-box="1" class="download" @click="toBottom">下载金疙瘩APP</p>
                        </div>
                    </div>
                    <div class="one-right" flex-box="0">
                        <div class="swip-warp">
                            <img class="img" src="../images/phone.png" alt="phone">
                            <div class="banner-warp">
                                <transition-group name="slide-fade">
                                    <div class="banner" :key="1" v-show="bannerIndex==1">
                                        <img src="../images/banner1.jpg"/>
                                    </div>
                                    <div class="banner" :key="2" v-show="bannerIndex==2">
                                        <img src="../images/banner2.jpg"/>
                                    </div>
                                    <div class="banner" :key="3" v-show="bannerIndex==3">
                                        <img src="../images/banner3.jpg"/>
                                    </div>
                                </transition-group>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>


        <div class="content-two">
            <p class="tow-title">安全可靠</p>
            <div class="two-box" flex="main:justify">
                <div class="item" flex-box="0">
                    <img class="img" src="../images/content-1.png" alt="">
                    <p class="title">背景可靠</p>
                    <p class="sub">上市公司股东—荣盛发展，中国地产16强</p>
                </div>
                <div class="item" flex-box="0">
                    <img class="img" src="../images/content-2.png" alt="">
                    <p class="title">百亿资本</p>
                    <p class="sub">实力不容小觑，注册资本100亿元</p>
                </div>
                <div class="item" flex-box="0">
                    <img class="img" src="../images/content-3.png" alt="">
                    <p class="title">省级平台</p>
                    <p class="sub">河北省政府批示，河北省工商联牵头搭建</p>
                </div>
                <div class="item" flex-box="0">
                    <img class="img" src="../images/content-4.png" alt="">
                    <p class="title">安全防控</p>
                    <p class="sub">从产品到系统，360度全方位安全风控体系</p>
                </div>
            </div>
        </div>
        <div class="content-three">
            <p class="three-title">下载APP</p>
            <div flex="main:center">
                <div class="three-left">
                    <p class="l-title">扫码关注 领取福利</p>
                    <img class="present" src="../images/present.png" alt="present">
                </div>
                <div class="three-right">
                    <p class="r-title">金疙瘩——懂你，更懂理财</p>
                    <div class="img-warp" flex>
                        <div class="download-box" flex-box="0">
                            <div class="ios" flex @click.stop="download('ios')">
                                <img flex-box="0" src="../images/apple-icon.png" alt="">
                                <p flex-box="1">iOS版下载</p>
                            </div>
                            <div class="android" flex @click.stop="download('android')">
                                <img flex-box="0" src="../images/andriod-icon.png" alt="">
                                <p flex-box="1">Android版下载</p>
                            </div>
                        </div>
                        <img class="qr-code" src="../images/qrcode.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <web-footer></web-footer>

    </div>
</template>

<script>
    import '../less/index.less';
    import WebHeader from '../components/Header';
    import WebFooter from '../components/Footer';
    import {androidUrl, iosUrl} from '../tools/config';

    export default {
        name: 'index',
        data() {
            return {
                bannerIndex: 1
            }
        },
        created() {
            setInterval(() => {
                this.bannerIndex = this.bannerIndex % 3 + 1;
            }, 3000);
        },
        components: {
            WebHeader,
            WebFooter
        },
        methods: {
            download(platform) {
                if (platform == 'ios') {
                    window.open(iosUrl, '_blank');
                } else {
                    window.open(androidUrl, '_blank');
                }
            },
            toBottom() {
                window.scrollTo(0, 800);
            }
        }
    }

</script>

