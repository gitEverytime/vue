<template>
    <div class="game-public">
        <commonSocket
                @setCount="getCount"
        ></commonSocket>
        <div class="content">
            <div class="left">
                <TempTopBar
                        :title="title"
                ></TempTopBar>
                <div class="meddle">
                    <router-view>
                    </router-view>
                </div>

                <TempBottomBar></TempBottomBar>
            </div>
            <!--<div class="right">-->
                <!--<TempRightBar></TempRightBar>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
   import commonSocket  from  './comm_socket.vue'
    import TempHome from './home.vue'
    import TempTopBar from './top_bar.vue'
    import TempBottomBar from './bottom_bar.vue'
    import TempRightBar from './right-bar.vue'
    import REQ from '../../common/request'
   import TempPopover   from './popover.vue'

    const GameInfo  = window.GameInfo

    export default {
        components: {TempHome, TempTopBar, TempBottomBar, TempRightBar,commonSocket,TempPopover},
        data(){
            return{
                count:'0',
                title:''
            }
        },
        mounted(){
            this.getGameRule(GameInfo.storeId,GameInfo.gameIndex)
        },
        methods:{
            getCount(val){
                this.count = val;
            },
            getGameRule(storeId,gameIndex){
                let _this = this;
                let posData = {
                    storeId:storeId,
                    gameIndex:gameIndex,
                };
                REQ.reqGetRule(posData,
                    function(result){
                        _this.title = result.data.name
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },

        }
    }


</script>
<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .game-public {
        width: 100%;
        height: 100%;
        background-image: url(http://static.ibigtop.com/static/img/screen/pub_bg.webp);
        background-repeat: no-repeat;
        position: relative;
    }

    .game-public .content {
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 99;
        top: 0;
        @include layout-flex-r;
    }

    .game-public .content .left {
        flex: 1;
    }

    .game-public .content .left {
        width: 100px;
        @include layout-flex-c;
    }

    .game-public .content .meddle {
        flex: 1;
        width: 100%;
    }
</style>




