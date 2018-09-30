<template>
    <div class="drawCont">
        <TempGameSocket
                @setWinners="getWinners"
        ></TempGameSocket>
        <div class="draw_cont">
            <div class="block" v-if="roomInfo.isPrivate === '0'">
                <TempBlockLeft
                        :winList="winList"
                        :setActive="active"
                ></TempBlockLeft>

                <TempBlockFooter
                        @setWinners="getWinners"
                        @setActive="getActive"
                        :info="info"
                ></TempBlockFooter>
                <div class="biguo_logo"></div>
            </div>
            <div class="block">
                <TempBlockRight
                        :setActive="active"
                        :winList="winList"
                        :info="info"
                ></TempBlockRight>
            </div>
        </div>
    </div>
</template>

<script>
    import REQ   from "../../common/request.js";
    import TempBlockLeft    from  './block_left.vue'
    import TempBlockRight   from  './block_right.vue'
    import TempBlockFooter    from  './block_footer.vue'
    import TempGameSocket  from './comm_socket.vue'
    const roomInfo = window.GameInfo;
    export default {
        components:{
            TempBlockLeft,
            TempBlockRight,
            TempBlockFooter,
            TempGameSocket
        },
        data(){
            return{
                userList:[],
                winList:[],
                active:'2',
                info:[],
                title:'',
                roomInfo:roomInfo
            }
        },
        mounted(){
            if(this.roomInfo.isPrivate === '0'){
                this.beginGame();
                this.gamePlayList();
                this.gameInfo();
            }
        },
        methods:{
            beginGame(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    gameIndex:roomInfo.gameIndex,
                };
                REQ.reqGameStart(posData,
                    function(result){
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            gamePlayList(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    gameIndex:roomInfo.gameIndex,
                    play:{
                        action:'users'
                    }
                };
                REQ.reqGetGamePlay(posData,
                    function(result){
                        _this.userList = result.data;
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            gameInfo(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    gameIndex:roomInfo.gameIndex,
                    play:{
                        action:'rewards'
                    }
                };
                REQ.reqGetGameInfo(posData,
                    function(result){
                        if(result.data.reward.length<1) return
                        _this.info = result.data.reward;
                        _this.title = result.data.name;
                        _this.$emit('setTitle',result.data.name);
                        _this.$store.commit('setAwardInfo',{
                            count:_this.info[0].count,
                            level:_this.info[0].level
                        })
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            getWinners(val){
                this.winList = val;
            },
            getActive(val){
                this.active = val;
                if(val === '1') this.winList = [];
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';
    .drawCont{
        height: 100%;
        margin-bottom: 70px;
        position: relative;
    }
    .draw_cont{
        padding: 0 70px;
        height: 100%;
        @include layout-flex-r-center;
        .block{
            width: 50%;
            background:rgba(127,44,48,0.9);
            border-radius: 8px;
            text-align: center;
            min-width: 590px;
            min-height: 600px;
            max-height: 700px;
            position: relative;
            .biguo_logo{
                position: absolute;
                z-index: 999;
                top:-151px;
                left: -20px;
                background: url("http://static.ibigtop.com/static/img/public/game/bigicon.png") no-repeat;
                @include set-width-height(219px,220px);
            }
        }
        .block:nth-of-type(1){
            margin-right: 70px;
        }
    }

</style>