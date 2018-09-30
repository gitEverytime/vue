<template>
    <div class="game_public_2001 box">
        <div class="result">
            <h3 class="result_ranking">游戏排名</h3>
            <div class="ranking_box">
                <div class="ranking_list" v-for="item in resultList">
                    <div class="ranking_left">
                        正确&nbsp;{{item.right}}&nbsp;题
                    </div>
                    <div class="ranking_right">
                        <img :src="item.player.avatar"><span>{{item.player.nickname}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $                 from  'jquery'
    import REQ   from "./request.js";
    import setZoom           from  '../../common/setZoom.js'
    export default {
        components:{
        },
        data(){
            return{
                resultList:[]
            }
        },
        mounted(){
            setZoom();     //初始化触发
            /**
             * 当浏览器窗口大小发生变化时触发
             */
            $(window).bind('resize',function(){
                setZoom();
            });

            //
            let playId = this.$store.getters.getPlayId;
            if(!playId) return;
            this.resultBillBoard(playId);
            // this.$root.notify.$on("GAME_TERM", (data) => {
            //     this.$store.commit('setPlayId',data.playId);
            //     window.location.href = "#/result"
            // });
        },
        methods:{
            resultBillBoard(playId){
                let _this = this;
                let posData = {
                    playId:playId,
                    sort:true
                };
                REQ.reqBillboard(posData,
                    function(result){
                        _this.resultList = result.data;
                        console.log(result.data)
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .box{
        background: url("http://static.ibigtop.com/static/img/public/game/game_extract.png") top center;
        background-size: 100% 100%;
        @include set-width-height(100%,100%);
        overflow: hidden;
        position: relative;
        .result{
            position: absolute;
            @include box-center(15%,50%);
            .result_ranking{
                font-size:50px;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-shadow:0px 2px 3px rgba(3,32,26,0.36);
                text-align: center;
            }
            .ranking_box{
                padding: 0px 40px;
                overflow: hidden;
                background:rgba(254,249,237,0.2);
                border-radius:10px;
                margin-top: 60px;
                .ranking_list{
                    width: 670px;
                    border-bottom: #fef9ef solid 1px;
                    @include layout-flex-r-sb;
                    padding: 20px 0;
                    align-items:center;
                    .ranking_left{
                        font-size:42px;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:5px;
                        text-shadow:0px 2px 3px rgba(3,32,26,0.36);
                    }
                    .ranking_right{
                        display: flex;
                        display: -webkit-flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width:88px;
                            height:88px;
                            background:rgba(250,249,250,1);
                            border-radius:50%;
                        }
                        span{
                            font-size:24px;
                            font-weight:bold;
                            color:rgba(255,255,255,1);
                            text-shadow:0px 1px 1px rgba(3,32,26,0.47);
                            display: inline-block;
                            margin-left: 30px;
                            width: 180px;
                        }
                    }

                }
                .ranking_list:last-of-type{
                    border-bottom: none;
                }
            }
        }
    }

</style>