<template>
    <div class="game">
        <div class="meddle">
            <!-- 渲染路由 -->
            <router-view class="view">
            </router-view>
        </div>
        <TempHome></TempHome>
    </div>
</template>

<script>
    import TempHome from './home.vue'

    export default {
        components: {TempHome},
    }


</script>
<style lang='scss' scoped>

    .game {
        width: 100%;
        height: 100%;
    }

    .game .meddle {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
</style>




