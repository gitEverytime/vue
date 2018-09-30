<template>
    <div class="game-socket">
    </div>
</template>

<script>
    import REQ from './request'
    const GameInfo = window.GameInfo
    const serverUrl = REQ.apiGameDomain + ":3016/play/connect/master?";
    export default {
        components: {},
        data() {
            return {
                ES: null
            }
        },
        computed: {},

        mounted() {
            this.$root.notify.$on("conn-socket", playId => {
                this.conn(playId, GameInfo.cId);
            })
        },

        methods: {
            conn(playId, cid) {
                let url = serverUrl + "playId=" + playId + "&cid=" + cid
                this.ES = new EventSource(url, {withCredentials: false});

                this.ES.onerror = (event) => {
                    console.log("on error====", event.type, "readyState=", this.ES.readyState);
                }

                this.ES.addEventListener('game_1003_user_join', (event) => {
                    const info = JSON.parse(event.data)
                    this.$root.notify.$emit("user-join", info.playerCount)
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