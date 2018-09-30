<template>
    <div class="box-program" :style="getStyle">
        <div class="panel">
            <TempTitle title="点播"></TempTitle>
            <TempSubTitle title="选择艺人" v-if="showBottom"></TempSubTitle>
            <TempUsersMenu @E_CHOOSE_PEO="setSelectActor" v-if="showBottom" class="users"/>
            <TempSubTitle title="选择节目" v-if="showBottom" style="margin-bottom: 10px"></TempSubTitle>
            <div class="content">
                <MusicItem class="music-item" v-for="(item, idx) in currMusicList"
                           v-bind:key="Date.now() * Math.random()"
                           v-bind="{itemData:item, idx: idx + 1, musicOn: currMusic.programId === item.programId}"
                           v-bind:class="{'music-active': currMusic.programId === item.programId}"
                           v-bind:end="idx === currMusicList.length - 1"
                           @E_CLICK_MUSIC="setSelectMusic"></MusicItem>
            </div>
            <TempInput v-model="note" style="margin-top: 10px" placeholder="点播留言~"/>
            <TempPrice :price="getPrice"/>
            <TempBtn text="微信支付" @click="onPayHandler"/>
        </div>
    </div>
</template>

<script>

    import REQ from "../../comm/request.js"
    import MusicItem from './child/music_item.vue'
    import MsgType from '../../comm/msg_type'
    import TempTitle from '../component/box_title.vue'
    import TempSubTitle from "../component/box_sub_title.vue"
    import TempUsersMenu from './child/users_menu.vue'
    import TempPrice from '../component/box_price.vue'
    import TempBtn from '../component/box_btn.vue'
    import TempInput from '../component/box_input_text.vue'
    import ConstValue from '../../comm/const_value'
    import WeChatPay from '../../comm/wechat_pay'
    import filterXss from "../../comm/filterXss"

    var roomInfo = window.RINFO;
    const DESCR = roomInfo.storeName + "-点歌"


    export default {
        props: [],

        components: {MusicItem, TempTitle, TempUsersMenu, TempSubTitle, TempPrice, TempBtn, TempInput},

        data() {
            return {
                actor: {},
                currMusicList: [],
                currMusic: {},
                note: '',
                showBottom: true,
            }
        },
        computed: {
            getPrice() {
                return this.currMusic.price || 0
            },

            getStyle() {
                const height = this.$store.getters.getFootMenuShow ? '50px' : '0px'
                return {
                    borderBottom: height + ' solid transparent'
                }
            }
        },

        mounted() {
        },

        methods: {
            setSelectActor(actor) {
                this.actor = actor
                this.getProgramByActor(actor.actorId)
            },

            setSelectMusic(music) {
                this.currMusic = music
            },

            onPayHandler() {
                if (!this.currMusic.programId) {
                    this.$toast.center('请选择曲目')
                    return
                }
                // this.addPubChatMessage({oid: 'fe187f61c42d44d99831427546e88a40'})

                const detail = {
                    type: ConstValue.INTERACTION_SONG,
                    cid: roomInfo.clientId,
                    programId: this.currMusic.programId,
                }
                const data = {
                    ...detail,
                    descr: DESCR,
                    detail: JSON.stringify(detail),
                    storeId: roomInfo.storeId,
                    actorId: this.actor.actorId,
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

            getProgramByActor(actorId) {
                var posData = {storeId: roomInfo.storeId, actorId: actorId};
                REQ.reqActorProgramInStore(posData,
                    (data) => {
                        this.currMusicList = data.data
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                );
            },

            addPubChatMessage(params) {
                const detail = {
                    actorId: this.actor.actorId,
                    actorName: this.actor.actorName,
                    actorType: this.actor.actorType,
                    mediaType: this.currMusic.type,
                }
                const data = {
                    ...params,
                    ...detail,
                    detail: JSON.stringify(detail),
                    type: this.currMusic.type == ConstValue.INTERACTION_SONG ? ConstValue.INTERACTION_SONG : ConstValue.INTERACTION_DANCE,
                    cid: roomInfo.clientId,
                    storeId: roomInfo.storeId,
                    cname: roomInfo.nickName,
                    content: filterXss(this.note),
                    sex: roomInfo.sex,
                    headimg: roomInfo.headimg,
                    mediaId: this.currMusic.programId,
                    mediaTitle: this.currMusic.title,
                    sId: roomInfo.sId,
                    descr: DESCR,
                }

                REQ.reqAddPubChat(data,
                    (response) => {
                        const resData = response.data
                        data.mid = resData.id
                        data.createdAt = resData.createdAt
                        data.favorCount = resData.favorCount
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_PROGRAM_BUY, data);
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
                image.src = `http://log.ibigtop.com/log/1/6`
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import "../../../../../style/sass/mixin.scss";

    .box-program {
        @include window-box;

        .panel {
            @include box-panel;

            .users {
                margin-top: 10px;
            }

            .content {
                background: #322831;
                margin: 0 10px;
                flex: 1;
                overflow-y: auto;
            }
        }
    }
</style>




