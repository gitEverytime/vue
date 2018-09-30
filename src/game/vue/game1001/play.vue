<template>
    <div class="play bgd bg-private-bg">
        <div class="panel">
            <Title title="游戏摇一摇" @leftClick="backHandler"/>
            <span class="shake">摇一摇</span>
            <p class="count">参与人数{{this.count}}人</p>
            <img class="img" :src="getImgSrc">
            <div class="time">游戏已进行：<span class="number">{{this.time}}</span>s</div>
            <p class="text">【{{this.title}}】</p>
            <div class="line" v-for="item in resultData" :key="item.key">
                <span>{{item.reward}}</span>
                <span>{{item.count}}名</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import REQ from '../common/request'
    import ConstValue from '../common/const_value'

    const GameInfo = window.GameInfo

    let x, y, z, last_x = 0, last_y = 0, last_z = 0, last_update = 0;

    export default {
        props: [],

        data() {
            return {
                data: 0,
                resultData: [],
                time: 0,
                title: '',
                count: 0,
                canPlay: true,
            }
        },

        components: {Title},

        computed: {
            getImgSrc() {
                return REQ.apiStaticDomain + '/static/img/new/shake.gif'
            },
        },

        mounted() {
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', this.deviceMotionHandler, false);
            }
            this.sendPlayData()
            this.getUserCount()

            this.$root.notify.$on("END_GAME", () => {
                this.$router.replace({name: 'resultPlayer'})
            })

            REQ.reqGetGameResult({
                    storeId: GameInfo.storeId,
                    userId: GameInfo.cId,
                    gameIndex: GameInfo.gameIndex,
                },
                (response) => {
                    this.title = response.data.name
                    this.formatResult(response.data.reward)
                },
                (complete) => {
                },
                (err) => {
                })

            this.timer1 = setInterval(() => {
                this.time++;
            }, 1000)

        },

        beforeDestroy() {
            clearInterval(this.timer)
            clearInterval(this.timer1)
            window.removeEventListener('devicemotion', this.deviceMotionHandler)
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            sendPlayData() {
                this.timer = setInterval(() => {
                    REQ.reqSendGameData({
                            storeId: GameInfo.storeId,
                            userId: GameInfo.cId,
                            gameIndex: GameInfo.gameIndex,
                            data: this.data += 1
                        },
                        (response) => {
                        },
                        (complete) => {
                        },
                        (err) => {
                        })
                }, 1000)
            },

            getUserCount() {
                REQ.reqGetUserCount({
                        gameIndex: GameInfo.gameIndex,
                        storeId: GameInfo.storeId
                    },
                    (response) => {
                        this.count = response.data.count || 0
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            },

            deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 10) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    if (speed > ConstValue.SHAKE_THRESHOLD) {
                        this.data += 5
                        WeixinJSBridge.invoke('getNetworkType', {}, () => {
                            if (this.canPlay) {
                                this.canPlay = false
                                let audio = new Audio("http://static.ibigtop.com/static/img/new/shake.mp3")
                                audio.play()
                                setTimeout(() => {
                                    this.canPlay = true
                                }, 1000)
                            }
                        });
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            },

            formatResult(data) {
                let resultData = []
                const levelNames = ['一等奖', '二等奖', '三等奖', '幸运奖']
                data.forEach((item, idx) => {
                    if (item.count > 0) {
                        resultData.push({
                            key: idx,
                            reward: levelNames[idx] + ':' + item.rewardDesc,
                            count: item.count
                        })
                    }
                })
                this.resultData = resultData
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../style/sass/mixin.scss';

    .play {
        @include window;

        .panel {
            @include game-panel;
            align-items: center;
        }

        .shake {
            color: #FFFFFF;
            @include font-dpr(40px);
            margin-top: 36px;
        }

        .count {
            color: #eeeeee;
            @include font-dpr(16px);
            margin-top: 10px;
        }

        .img {
            @include set-width-height(155px, 155px);
            margin: 20px 0;
        }

        .time {
            color: #eeeeee;
            @include font-dpr(16px);

            .number {
                color: #fff;
                @include font-dpr(25px);
            }
        }

        .line {
            @include layout-flex-r-sb;
            width: 60%;

            span {
                color: #ddd;
                @include font-dpr(14px)
            }
        }

        .text {
            color: #eeeeee;
            @include font-dpr(14px);
            margin: 10px;
        }
    }
</style>