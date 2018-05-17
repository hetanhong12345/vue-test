<template>
    <div class="home" flex="dir:top">
        <fish-header flex-box="0" index="1"></fish-header>
        <div flex-box="1">home</div>
    </div>
</template>

<script>
    import FishHeader from '../components/Header';

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
        }
    }
</script>

<style scoped lang="less">
    .home {
        position: relative;
        height: 100%;
    }
</style>
