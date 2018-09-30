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
    import GameSocket from '../common/game_socket.vue'

    export default {
        components: {TempHome, GameSocket},

        mounted() {
            // let script = document.createElement('script')
            // script.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js"
            // document.body.appendChild(script)
        }
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




