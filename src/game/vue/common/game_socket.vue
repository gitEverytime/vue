<template>
    <div class="game-socket">
    </div>
</template>

<script>
    import REQ from './request'

    const GameInfo = window.GameInfo
    const serverUrl = REQ.gameSocketDomain + "/game/api/joinRoom?";
    const E_SOCKET_USER_JOIN = 101
    const E_SOCKET_GAME_START = 102
    const E_SOCKET_GAME_STOP =103

    const E_SOCKET_GAME_BACK =106

    export default {

        components: {},

        data() {
            return {
                ES: null
            }
        },
        computed: {},

        mounted() {
            this.conn(GameInfo.storeId, GameInfo.cId, GameInfo.gameIndex);
        },

        methods: {

            conn(storeId, cid, gameIndex) {
                let url = serverUrl + "storeId=" + storeId + "&gameIndex=" + gameIndex + "&cid=" + cid
                this.ES = new EventSource(url, {withCredentials: false});

                this.ES.onerror = (event) => {
                    console.log("on error====", event.type, "readyState=", this.ES.readyState);
                }

                this.ES.addEventListener(E_SOCKET_USER_JOIN, (event) => {
                    const info = JSON.parse(event.data)
                    this.$store.commit('storeUserCount', info.userCount)
                });

                this.ES.addEventListener(E_SOCKET_GAME_START, () => {
                    this.$root.notify.$emit("START_GAME")
                });

                this.ES.addEventListener(E_SOCKET_GAME_STOP, () => {
                    this.$root.notify.$emit("END_GAME")
                });

                this.ES.addEventListener(E_SOCKET_GAME_BACK, () => {
                    window.history.back()
                });
            }
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