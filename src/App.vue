<template>
    <div id="app" class="app">
        <div class="body">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

    import './less/app.less';

    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
