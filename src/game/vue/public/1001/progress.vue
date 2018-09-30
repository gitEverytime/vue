<template>
    <div class="progress">
        <div class="item" v-for="(item, index) in getRD">
            <div class="top arrow">
                <img class="avatar" :src="item.avatar">
                <div class="level">LV{{item.level}}</div>
            </div>
            <div class="data" :style="{height: item.data+'px'}">
                <ProgressGif v-bind:index="index"></ProgressGif>
            </div>
            <div class="name">{{item.userName}}</div>
        </div>
        <div class="time-cover">
            <span class="time">
                {{time}}s
            </span>
        </div>
    </div>
</template>

<script>

    import REQ from '../../common/request'
    import ConstValue from '../../common/const_value'

    const GameInfo = window.GameInfo
    import ProgressGif from "./progrssGif.vue";
    import {setTimeout} from 'timers';

    export default {
        props: [],
        data() {
            return {
                rankingData: [],
                time: 0,
                maxData: 500,
                reduceCount: 1,
            }
        },

        components: {ProgressGif},
        computed: {

            getRD() {
                return this.rankingData;
            }
        },
        mounted() {
            var _this = this;
            this.timer = setInterval(() => {
                this.time++
            }, 1000);

            this.timer1 = setInterval(() => {
                REQ.reqGetGameTop10({
                        storeId: GameInfo.storeId,
                        gameIndex: GameInfo.gameIndex,
                    },
                    (response) => {
                        this.formatData(response.data.list)
                        if (response.data.gameStatus === ConstValue.GAME_END) {
                            window.location.href = '#/result'
                            clearInterval(this.time)
                            clearInterval(this.timer1)
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            }, 500)
        },
        methods: {
            formatData(data) {
                data.forEach(item => {
                    item.level = Math.ceil(item.data/500)
                    item.data = item.data % 500
                    if (item.data < 20) item.data = 20

                })

                this.rankingData = data
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .progress {
        @include layout-flex-r-center;
        height: 92%;
        margin-top: 25px;
    }

    .progress .item {
        color: #eeeeee;
        @include layout-flex-c;
        justify-content: flex-end;
        height: 100%;
        font-size: 18px;
        align-items: center;
        margin: 0 20px;

        @-webkit-keyframes arrow {
            0%{transform: translateY(0);}
            100%{transform: translateY(15px);}
        }

        @keyframes arrow {
            0%{transform: translateY(0);}
            100%{transform: translateY(15px);}
        }

        .arrow {
            animation: arrow 2s infinite;
            -webkit-animation: arrow 2s infinite;
            animation-timing-function:ease-in-out;
            -webkit-animation-timing-function:ease-in-out;
            -webkit-animation-direction:alternate;
            animation-direction:alternate;
        }

        .top {
            @include layout-flex-c;
            align-items: center;
        }

    }

    .progress .item .level {
        color: #01b695;
        width: 60px;
        font-size: 25px;
        text-align: center;
        margin-bottom: 20px;
    }

    .progress .item .name {
        color: #01b695;
        width: 90px;
        font-size: 25px;
        text-align: center;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }

    .progress .item .data {
        width: 70px;
        height: 10px;
    }

    .progress .item .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .progress .time-cover {
        @include layout-flex-r-center;
        align-items: center;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        border: 1px solid #aaa;
        position: absolute;
        left: 5%;
        top: 5%;
    }

    .progress .time-cover .time {
        color: #aaa;
        font-size: 40px;
    }

</style>