<template>
    <div class="game-socket">
    </div>
</template>

<script>
    import REQ from './request'

    const GameInfo = window.GameInfo
    const serverUrl = REQ.gameSocketDomain + "/play/connect/screen?";
    const E_SOCKET_USER_JOIN = 'game_1003_user_join';      //玩家加入

    const E_SOCKET_GAME_START = 'game_1003_draw_user';     //抽取玩家

    const E_SOCKET_GAME_NEXT_QUE = 'game_1003_next_ques';  //下个问题
    const E_SOCKET_GAME_OVER = 'game_1003_game_over';      //游戏结束
    const E_SOCKET_GAME_TERM = 'game_1003_play_term';      //游戏终止

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
            this.getPlayCurrent();
        },

        methods: {
            getPlayCurrent(){
                let _this = this;
                let posData = {
                    storeId:GameInfo.storeId
                };
                REQ.reqPlayCurrent(posData,
                    function(result){
                        _this.conn(result.data.playId);
                        _this.getAward(result.data.gameId)
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

            getAward(gameId){
                if(!gameId) return;
                let _this = this;
                let posData = {
                    gameId:gameId
                };
                REQ.reqAward(posData,
                    function(result){
                    console.log(result.data)
                        _this.$emit('getAward',result.data)
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

            conn(playId) {
                if(!playId) return;
                let url = serverUrl + "playId=" + playId;
                let isOver = false;
                this.ES = new EventSource(url, {withCredentials: false});

                this.ES.onerror = (event) => {
                    console.log("on error====", event.type, "readyState=", this.ES.readyState);
                }

                this.ES.addEventListener(E_SOCKET_USER_JOIN, (event) => {                    //玩家加入
                    this.$root.notify.$emit("USER_JOIN", JSON.parse(event.data))
                });

                this.ES.addEventListener(E_SOCKET_GAME_START, (event) => {                   //抽取玩家
                    this.$root.notify.$emit("START_GAME", JSON.parse(event.data))
                });

                this.ES.addEventListener(E_SOCKET_GAME_NEXT_QUE, (event) => {                //下个问题
                    this.$root.notify.$emit("NEXT_QUE", JSON.parse(event.data))
                });

                this.ES.addEventListener(E_SOCKET_GAME_OVER, (event) => {                     //游戏结束
                    if(isOver) return;
                    isOver = true;
                    this.$root.notify.$emit("GAME_OVER", JSON.parse(event.data))
                });
                this.ES.addEventListener(E_SOCKET_GAME_TERM, (event) => {                     //游戏终止
                    window.location.href = `http://web.ibigtop.com/screen/public?storeId=${GameInfo.storeId}`
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