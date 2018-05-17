<template>
    <div class="home" flex="dir:top">
        <fish-header flex-box="0" index="1"></fish-header>
        <div flex-box="1">
            <p class="text">home </p>

            <button class="btn-default" @click="getData"> getData</button>
        </div>
    </div>
</template>

<script>
    import FishHeader from '../components/Header';
    import $api from '../utils/api';
    import {Toast} from 'mint-ui';

    export default {
        name: "Home",
        data() {
            return {
                pageName: 'home'
            };
        },
        created() {
            console.log(process.env);
        },
        components: {
            FishHeader
        },
        methods: {
            getData() {
                return $api.get('/assets/getArea')
                    .then(data => {
                        Toast('suc');
                        console.log(data);
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .home {
        position: relative;
        height: 100%;
        .text{
            padding: 1rem;
        }
    }
</style>
