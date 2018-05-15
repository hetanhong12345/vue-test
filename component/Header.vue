<template>
    <div class="header" flex="box:mean">
        <a class="item" href="./home.html" :class="{'active':index==1}">伴鱼少儿英语</a>
        <a class="item" href="./picture_book.html" :class="{'active':index==2}">伴鱼绘本</a>
        <a class="item" href="./kid.html" :class="{'active':index==3}">少儿英语</a>
    </div>

</template>

<script>
    export default {
        name: "Header",
        props: ['index']
    }
</script>

<style lang="less" scoped>
    .header {
        height: 2.3rem;
        .item {
            height: 100%;
            text-align: center;
            line-height: 2.3rem;
            &.active,&:active {
                color: #01b1ea;
                border-bottom: 2px solid #01b1ea;
            }
        }
    }
</style>
