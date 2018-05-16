<template>
    <div class="picture-book" flex="dir:top">
        <fish-header flex-box="0" index="2"></fish-header>
        <div flex-box="1">picture_book</div>
    </div>
</template>

<script>
    import FishHeader from '../components/Header';

    export default {
        name: 'picture-book',
        data() {
            return {
                pageName: 'picture-book'
            };
        },
        components: {
            FishHeader
        }
    }
</script>

<style scoped lang="less">
    .picture-book {
        position: relative;
        height: 100%;
    }
</style>
