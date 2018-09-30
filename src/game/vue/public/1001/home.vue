<template>
    <div class="home">
        <div class="shake"></div>
        <div class="count">当前参与人数<span>{{getCount}}</span>人</div>
        <div class="qr-container" >
            <div class="qr-back">
                <div id="qrcode" ref="qrcode" @click="$store.commit('setPopoverShow',true)"></div>
            </div>
            <span>扫码参与</span>
        </div>
        <TempPopover :wxpic="wxpic"></TempPopover>
    </div>
</template>

<script>
    import REQ from '../../common/request'
    import ConstValue from '../../common/const_value'
    import QRCode from 'qrcodejs2'
    import TempPopover   from './popover.vue'

    const GameInfo = window.GameInfo

    export default {
        props: {
            count: {
                type: String
            }
        },

        components: {TempPopover},

        data() {
            return {
                // count: 0,
                wxpic:''
            }
        },

        computed: {
            getCount() {
                return this.$store.getters.getCount;
            }
        },

        mounted() {
            this.getUserCount()
            this.getStoreInfo()
        },

        beforeDestroy() {
            clearInterval(this.timer)
        },

        methods: {
            getUserCount() {
                REQ.reqGetUserCount({
                        gameIndex: GameInfo.gameIndex,
                        storeId: GameInfo.storeId
                    },
                    (response) => {
                        this.$store.commit('setCount', response.data.count)
                    },
                    (complete) => {
                    },
                    (err) => {
                    })
            },

            getStoreInfo() {
                REQ.reqStoreGetById({storeId: GameInfo.storeId},
                    (res) => {
                        this.$nextTick (() => {
                            this.qrcode(res.data.pubCode);
                            this.wxpic = res.data.pubCode;
                        })
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            qrcode(url) {
                let qrcode = new QRCode('qrcode', {
                    width: 200,  // 设置宽度
                    height: 200, // 设置高度
                    text: url
                });
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .home {
        @include layout-flex-c;
        align-items: center;
    }

    .home .shake {
        background: url("http://static.ibigtop.com/static/img/public/game/yao_yi_yao.png") no-repeat;
        background-size: 100% 100%;
        @include set-width-height(432px, 136px)
    }

    .home .count {
        color: #aaa;
        font-size: 35px;
        margin-top: 5%;
        span {
            font-size: 50px;
        }
    }

    .home .btn {
        background: #cd533e;
        color: #ccc;
        border-radius: 5px;
        padding: 8px 3%;
        @include font-dpr(20px);
        margin-top: 20%;
        cursor: pointer;
    }

    .home .qr-container {
        @include layout-flex-c;
        align-items: center;
        padding: 10px;
        position: absolute;
        left: 5%;
        top: 30%;
        border-radius: 5px;
        background: #134a47;
    }

    .home .qr-container .qr-back {
        background: #dddddd;
        border-radius: 5px;
        margin: 5px;
    }

    #qrcode{
        padding: 5px;
        cursor: pointer;
    }

    .home .qr-container span {
        color: #ddd;
        @include font-dpr(20px);
        margin-top: 10px;
    }

    .beginBtn {
        @include set-width-height(183px, 45px);
        line-height: 60px;
        background: #cd533e;
        text-align: center;
        color: #FFFFFF;
        font-size: 24px;
    }
</style>