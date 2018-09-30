<template>
    <div class="game-socket">
    </div>
</template>

<script>
    import REQ from '../../common/request'

    const GameInfo = window.GameInfo
    const serverUrl = REQ.gameSocketDomain + "/game/api/joinRoom?";
    const E_SOCKET_USER_JOIN = 101        //加入
    const E_SOCKET_GAME_START = 102       //开始
    const E_SOCKET_GAME_STOP =103         //结束

    const E_SOCKET_GAME_BACK = 106 //回到公屏

    export default {

        components: {},

        data() {
            return {
                ES: null
            }
        },
        computed: {},

        mounted() {
            this.conn(GameInfo.storeId, GameInfo.gameIndex);
        },

        methods: {

            conn(storeId, gameIndex) {
                let url = serverUrl + "storeId=" + storeId + "&gameIndex=" + gameIndex
                this.ES = new EventSource(url, {withCredentials: false});

                this.ES.onerror = (event) => {
                    console.log("on error====", event.type, "readyState=", this.ES.readyState);
                };

                this.ES.addEventListener(E_SOCKET_USER_JOIN, (event) => {
                    this.$store.commit('setCount',JSON.parse(event.data).userCount)
                });
                this.ES.addEventListener(E_SOCKET_GAME_START, (event) => {
                    window.location.href = '#/countDown';
                });

                this.ES.addEventListener(E_SOCKET_GAME_BACK, () => {
                    window.location.href = `http://web.ibigtop.com/screen/public?storeId=${GameInfo.storeId}`
                });
            },
        },
    }
</script>


<style scoped>
    .game-socket {
        width: 1px;
        height: 1px;
        position: absolute;
    }
</style>