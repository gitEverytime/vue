<template>
    <div class="select-number">
        <div class="panel">
            <Title :title="getTableName" @E_LEFT_CLICK="backHandler" style="position: absolute"/>
            <div class="content">
                <div class="top bgd bg-number-bg">
                    <span class="store">{{getStoreName}}</span>
                </div>
                <h1 class="question">客官您几位？</h1>
                <div class="number">{{Number(number)}}<span class="seat">位</span></div>
                <div class="line">
                    <span v-for="item in ['1','2','3']" class="item" @click="pressKey(item)">{{item}}</span>
                </div>
                <div class="line">
                    <span v-for="item in ['4','5','6']" class="item" @click="pressKey(item)">{{item}}</span>
                </div>
                <div class="line">
                    <span v-for="item in ['7','8','9']" class="item" @click="pressKey(item)">{{item}}</span>
                </div>
                <div class="delete-line">
                    <span class="item" @click="pressKey('0')">0</span>
                    <div class="back" @click="pressKey('d')">
                        <span class="icon icon-10-9"></span>
                    </div>
                </div>
                <Button text="确认" @click.native="confirmNumber"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from '../component/title.vue'
    import Button from '../component/button.vue'
    import REQ from '../../comm/request'

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {Title, Button},

        data() {
            return {
                number: '0'
            }
        },

        computed: {
            getStoreName() {
                return roomInfo.storeName
            },

            getTableName() {
                return '点餐-' + this.$store.getters.getDiningTableName + '桌'
            }
        },

        mounted() {
        },

        methods: {
            backHandler() {
                window.history.back()
            },

            pressKey(key) {
                switch (key) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        if (Number(this.number) > 10000000) {
                            this.$toast.center('请正确填写数量')
                        } else {
                            this.number += key
                        }
                        break
                    case 'd':
                        if (this.number.length) {
                            this.number = this.number.substring(0, this.number.length - 1)
                            if (this.number === '') {
                                this.number = '0'
                            }
                        }
                        break
                }
            },

            confirmNumber() {
                const number = Number(this.number)
                if (!number) {
                    this.$toast.center('请选择桌号')
                    return
                }

                const params = {
                    order: {
                        dinerCount: number,
                        id: this.$store.getters.getDiningInfo.order.id
                    }
                }

                REQ.reqUpdateDiningInfo(params,
                    () => {
                        this.$store.commit("storeUpdateDinerCount", number)
                        this.$router.replace({name: 'OrderMeal'})
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .select-number {
        @include window;

        .panel {
            @include panel;

            .content {
                @include content;

                .top {
                    width: 100%;
                    @include set-height(135px);
                    @include layout-flex-r-center;
                    align-items: flex-end;

                    .store {
                        margin-bottom: 25px;
                        color: #F5F5F5;
                        @include font-dpr(16px);
                    }
                }

                .question {
                    @include font-dpr(20px);
                    color: #8D888F;
                    text-align: center
                }

                .number {
                    color: #F5F5F5;
                    @include font-dpr(31px);
                    text-align: center;
                    margin: 20px 0 10px 0;

                    .seat {
                        @include font-dpr(14px);
                        color: #01B695;
                        margin-left: 10px;
                        position: relative;
                        bottom: 3px;
                    }
                }

                .line {
                    @include layout-flex-r;
                    padding: 0 23px;

                    .item {
                        flex: 1;
                        margin: 10px;
                        border-radius: 4px;
                        background: #322831;
                        @include box-shadow(0px 0px 15px rgba(23, 13, 13, 0.6));
                        @include set-height(44px);
                        @include layout-flex-r-center;
                        align-items: center;
                        @include font-dpr(20px);
                        color: #cccccc;
                    }

                    .item:active {
                        background: #007b64;
                    }
                }

                .delete-line {
                    @include layout-flex-r;
                    padding: 0 23px;

                    .item {
                        flex: 2;
                        margin: 10px;
                        border-radius: 4px;
                        background: #322831;
                        @include box-shadow(0px 0px 15px rgba(23, 13, 13, 0.6));
                        @include set-height(44px);
                        @include layout-flex-r-center;
                        align-items: center;
                        @include font-dpr(20px);
                        color: #cccccc;
                        padding: 0 10px;
                    }

                    .item:active {
                        background: #007b64;
                    }

                    .back {
                        flex: 1;
                        margin: 10px;
                        border-radius: 4px;
                        background: #01B695;
                        @include box-shadow(0px 0px 15px rgba(23, 13, 13, 0.6));
                        @include set-height(44px);
                        @include layout-flex-r-center;
                        align-items: center;
                    }

                    .back:active {
                        background: #007b64;
                    }
                }
            }
        }
    }
</style>