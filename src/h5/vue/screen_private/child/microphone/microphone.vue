<template>
    <div class="microphone">
        <div class="panel">
            <Title title="霸麦"/>
            <div class="menu-bar">
                <span class="btn" :class="{'is-on':currTabIndex==1}" @click="switchTab(1)">真心话</span>
                <i class="cut-off-line"></i>
                <span class="btn" :class="{'is-on':currTabIndex==2}" @click="switchTab(2)">好声音</span>
            </div>
            <div class="content">

                <div class="diff" v-if="currTabIndex==1">
                    <h1>说你想说的话</h1>
                    <Imag :src="getImageSrc"/>
                    <p>有一些话</p>
                    <p>只想讲一次</p>
                    <p>以后便不会再讲</p>
                    <p>你准备好听我了吗</p>
                </div>
                <div class="diff" v-if="currTabIndex==2">
                    <h1>展示你的歌喉</h1>
                    <Imag :src="getImageSrc"/>
                    <p>忘了自己</p>
                    <p>只是小城的过客</p>
                    <p>此时 此刻 此情 此景</p>
                    <p>我只想唱歌</p>
                </div>
                <Price :price="Number(currPrice) || 0"/>
                <Button @click="onPayHandler" text="微信支付"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Title from "../component/box_title.vue"
    import Price from "../component/box_price.vue"
    import Button from "../component/box_btn.vue"
    import MsgType from "../../comm/msg_type"
    import REQ from "../../comm/request"
    import ConstValue from "../../comm/const_value"
    import WeChatPay from "../../comm/wechat_pay"
    import Imag from "../component/Image.vue"

    const roomInfo = window.RINFO;
    const DESCR = roomInfo.storeName + "-霸麦"

    export default {
        props: [],

        components: {Title, Price, Button, Imag},

        data() {
            return {
                currTabIndex: 1,
                currPrice: 0,
                isOn: 0,
                config: {}
            }
        },

        computed: {
            getImageSrc() {
                return REQ.apiStaticDomain + '/static/img/new/' + (this.currTabIndex == 1 ? 'heartmsg.png.webp' : 'goodvoice.png.webp')
            },
        },

        mounted() {
            this.getConfig()
        },

        methods: {
            getConfig() {
                REQ.reqGetBmConfig({storeId: roomInfo.storeId},
                    (res) => {
                        this.config = res.data
                        this.setPrice()
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            setPrice() {
                const config = JSON.parse(this.config[this.currTabIndex == 1 ? 'bmHert' : 'bmVoice'])
                this.isOn = config.isOn
                if (!this.isOn) {
                    this.currPrice = 0
                } else {
                    this.currPrice = config.price
                }
            },

            switchTab(tabIndex) {
                this.currTabIndex = tabIndex
                this.setPrice()
            },

            onPayHandler() {
                if (!this.isOn) {
                    this.$toast.center('商家未开启霸麦-' + (this.currTabIndex == 1 ? '真心话' : '好声音'))
                    return
                }

                // this.addPubChatMessage({oid: 'fe187f61c42d44d99831427546e88a40'})

                const detail = {
                    type: this.currTabIndex == 1 ? ConstValue.INTERACTION_BM_HEART : ConstValue.INTERACTION_BM_VOICE,
                    cid: roomInfo.clientId,
                }
                const data = {
                    ...detail,
                    descr: DESCR + (this.currTabIndex == 1 ? '真心话' : '好声音'),
                    detail: JSON.stringify(detail),
                    storeId: roomInfo.storeId,
                }
                REQ.reqWeixinPay(data,
                    (response) => {
                        if (response.data.free == 1) {
                            this.addPubChatMessage({iid: response.data.iid})
                        } else {
                            WeChatPay.startPay(response.data)
                                .then(() => {
                                    this.addPubChatMessage({oid: response.data.oid})
                                })
                                .catch((err) => {
                                    this.$logger.error("支付失败", err)
                                })
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                    })
            },

            addPubChatMessage(params) {
                const data = {
                    ...params,
                    type: this.currTabIndex == 1 ? ConstValue.INTERACTION_BM_HEART : ConstValue.INTERACTION_BM_VOICE,
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    cname: roomInfo.nickName,
                    sex: roomInfo.sex,
                    headimg: roomInfo.headimg,
                    sId: roomInfo.sId,
                    descr: DESCR + (this.currTabIndex == 1 ? '真心话' : '好声音'),
                    pic: this.getImageSrc
                }

                REQ.reqAddPubChat(data,
                    (response) => {
                        const resData = response.data
                        data.mid = resData.id
                        data.createdAt = resData.createdAt
                        data.favorCount = resData.favorCount
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_BM, data);
                        this.$root.notify.$emit(MsgType.CLIENT_WIN_CLOSE);
                        this.addLog()
                        window.history.back()
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },

            addLog() {
                let image = new Image()
                image.src = `http://log.ibigtop.com/log/1/5`
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .microphone {
        @include window-box;

        .panel {
            @include box-panel;

            .menu-bar {
                @include layout-flex-r;
                width: 100%;
                @include set-h(36px);
                text-align: center;
                justify-content: center;
                align-items: center;
                background: #322831;

                .btn {
                    color: #9f99a1;
                    @include font-dpr(14px);
                    flex: 1;
                }

                .is-on {
                    color: #01b695;
                }

                .cut-off-line {
                    width: 1px;
                    @include set-height(16px);
                    background: #221821;
                }
            }

            .content {
                @include content;

                .diff {
                    @include layout-flex-c;
                    align-items: center;

                    img {
                        @include set-width-height(280px, 158px);
                        margin: 15px 0;
                        width: 90%;
                    }

                    h1 {
                        @include font-dpr(14px);
                        color: #9F99A1;
                        margin-top: 15px;
                    }

                    p {
                        @include font-dpr(12px);
                        color: #9F99A1;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
</style>