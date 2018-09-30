<template>
    <div class="result">
        <div class="content">
            <div class="box" v-if="oneWinners.length>0" >
                <h2>{{oneWinners[0].levelName}}&nbsp;&nbsp;{{oneWinners[0].rewardDesc}}</h2>
                <div class="item" v-for="item in oneWinners">
                    <p>
                        <img :src="item.avatar"><span>{{item.userName}}</span>
                    </p>
                </div>
            </div>
            <div class="box" v-if="twoWinners.length>0" >
                <h2>{{twoWinners[0].levelName}}&nbsp;&nbsp;{{twoWinners[0].rewardDesc}}</h2>
                <div class="item" v-for="item in twoWinners">
                    <p>
                        <img :src="item.avatar"><span>{{item.userName}}</span>
                    </p>
                </div>
            </div>
            <div class="box" v-if="threeWinners.length>0">
                <h2>{{threeWinners[0].levelName}}&nbsp;&nbsp;{{threeWinners[0].rewardDesc}}</h2>
                <div class="item" v-for="item in threeWinners">
                    <p>
                        <img :src="item.avatar"><span>{{item.userName}}</span>
                    </p>
                </div>
            </div>
            <div class="box" v-if="fourWinners.length>0" >
                <h2>{{fourWinners[0].levelName}}&nbsp;&nbsp;{{fourWinners[0].rewardDesc}}</h2>
                <div class="item" v-for="item in fourWinners">
                    <p>
                        <img :src="item.avatar"><span>{{item.userName}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!--<div class="back-cover">-->
            <!--<span class="back" @click="backHandler">-->
                <!--<img src="http://static.ibigtop.com/static/img/public/game/icon_back.png"> 返回大屏-->
            <!--</span>-->
        <!--</div>-->
    </div>

</template>

<script>
    import REQ from '../../common/request'
    import TempUserItem from './user_item.vue'

    const GameInfo  = window.GameInfo

    export default {
        props: [],

        components: {TempUserItem},

        data() {
            return {
                resultData: [],
                luckGift: {
                    title: '',
                    content: ''
                },
                oneWinners:[
                ],
                twoWinners:[],
                threeWinners:[],
                fourWinners:[],
            }
        },

        computed: {},

        mounted() {
            this.playGame(GameInfo.storeId,GameInfo.gameIndex);
        },

        methods: {
            backHandler() {
                let _this = this;
                let posData = {
                    storeId:GameInfo.storeId,
                    gameIndex:GameInfo.gameIndex,
                };
                REQ.reqGameStop(posData,
                    function(result){
                        window.location.href = `http://web.ibigtop.com/screen/public?storeId=${GameInfo.storeId}`
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            playGame(storeId,gameIndex){
                let _this = this;
                let posData = {
                    storeId:storeId,
                    gameIndex:gameIndex,
                };
                REQ.reqGetGameResult(posData,
                    function(result){
                        let winners = result.data.reward;
                        _this.winnersItem(winners);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /**
             * 拿到获奖的item
             */
            winnersItem(winners){
                winners.forEach((item) => {
                    if(item.userList.length>0){
                        let level = Number(item.level);
                        switch(level){
                            case 1:
                                item.userList.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '一等奖';
                                    col['level'] = 1;
                                    this.oneWinners.push(col)
                                });
                                break;
                            case 2:
                                item.userList.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '二等奖';
                                    col['level'] = 2;
                                    this.twoWinners.push(col)
                                });
                                break;
                            case 3:
                                item.userList.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '三等奖';
                                    col['level'] = 3;
                                    this.threeWinners.push(col)
                                });
                                break;
                            case 4:
                                item.userList.forEach((col) => {
                                    col['rewardDesc'] = item.rewardDesc;
                                    col['levelName'] = '幸运奖';
                                    col['level'] = 4;
                                    this.fourWinners.push(col)
                                });
                                break;
                        }
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .result {
        @include layout-flex-r-center;
        width: 100%;
        height: 100%;
    }

    .result .panel {
        width: 60%;
        height: 70%;
        background:rgba(141,136,143,1);
        margin-top: 5%;
        margin-left: 20%;
        border-radius: 8px;
    }

    .result .btn {
        width:240px;
        height:60px;
        background:rgba(205,83,62,1);
        border-radius:8px;
        text-align: center;
        color: #FFFFFF;
        line-height: 60px;
        margin: 0 auto;
        position: absolute;
        @include box-center(95%,50%);
        cursor: pointer;
        font-size: 20px;
    }

    .result .back-cover {
        position: absolute;
        left: 5%;
        top: 5%;
    }
    .result .back-cover .back img{margin-right: 10px}
    .result .back-cover .back {
        color: #aaa;
        font-size: 25px;
        cursor: pointer;
        @include layout-flex-r-center;
    }

    .result .content {
        position: absolute;
        @include box-center(50%,50%);
        @include layout-flex-c;
        align-items: end;
        background: rgba(200, 200, 200, 0.2);
        border-radius: 8px;
        padding: 40px 60px 0;
        width: 50%;
        .box{
            margin-bottom: 40px;
            @include layout-flex-r-wrap;
            h2{
                color:rgba(181,172,185,1);
                padding-bottom: 5px;
                font-size: 26px;
                width: 100%;
            }
            .item{
                p{
                    font-size:26px;
                    color:rgba(1,182,149,1);
                    line-height:60px;
                    margin-bottom: 5px;
                    @include layout-flex-r-center;
                    img{
                        @include set-width-height(60px,60px);
                        border-radius: 50%;
                    }
                    span{
                        display: inline-block;
                        padding-left: 10px;
                        width: 120px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }

    .result .title {
        color: #eeeeee;
        @include font-dpr(16px);
        margin-top: 5px;
    }

    .result .number {
        color: #bbbbbb;
        margin: 10px 0 20px 0;
    }

    .result .line {
        @include layout-flex-c;
        width: 90%;
    }

    .result .line span {
        color: #aaa;
        @include font-dpr(25px);
    }

    .result .line .user-content {
        @include layout-flex-r-wrap;
        margin: 8px 0;
    }

    .result .line .user-content .user-item {
        width: 20%;
        margin-bottom: 10px;
    }

    .result .luck {
        @include layout-flex-c;
        width: 90%;
    }

    .result .luck .luck-name {
        color: #aaa;
        @include font-dpr(25px)
    }

    .result .luck .luck-content {
        @include font-dpr(18px);
        color: #aaa;
        margin: 5px 0;
    }
</style>