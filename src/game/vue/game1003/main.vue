<template>
    <div class="game">
        <GameSocket></GameSocket>
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
    import GameSocket from './game_socket.vue'
    console.log(window.GameInfo)

    export default {
        components: {TempHome, GameSocket},
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




