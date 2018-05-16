<template>
    <div class="kid" flex="dir:top">
        <fish-header flex-box="0" index="3"></fish-header>
        <div flex-box="1">kid  is  kid </div>
    </div>
</template>

<script>
    import FishHeader from '../components/Header';

    export default {
        name: "kid",
        data() {
            return {
                pageName: 'kid'
            };
        },
        components: {
            FishHeader
        }
    }
</script>

<style scoped lang="less">
    .kid {
        position: relative;
        height: 100%;
    }
</style>
