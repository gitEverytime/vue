<template>
    <div class="operation-content">
        <div class="btn-operation" @click="likeHandler">
            <span class="pic icon" :class="liked ? 'icon-good-on' : 'icon-good'"></span>
            <span class="number">{{likedNumber}}</span>
        </div>
        <div class="btn-operation" @click="cancelHandler" v-if="isMe">
            <span class="pic icon icon-cancel"></span>
            <span class="text">撤回</span>
        </div>
    </div>
</template>

<script>
    import REQ from "../../comm/request"
    import MsgType from "../../comm/msg_type"

    const roomInfo = window.RINFO
    export default {

        props: ["mid", "cid", "liked", "likedNumber"],

        data() {
            return {
            }
        },

        components: {},

        computed: {
            isMe() {
                return roomInfo.clientId === this.cid
            }
        },

        mounted() {
            this.$root.notify.$on(MsgType.DISPATCH_DOWN_PUB_MSG_LIKE, (data) => {
                if (data.id === this.mid) {
                    this.$store.commit("updateScreenDataLike", {
                        mid: this.mid,
                        liked: roomInfo.clientId == data.cid ? !this.liked: this.liked,
                        likedNumber: data.favorCount
                    })
                }
            })

            this.$root.notify.$on(MsgType.DISPATCH_DOWN_PUB_MSG_CANCEL, (data) => {
                if (data.id === this.mid) {
                    this.$store.commit('removeFromScreenData', data.id)
                }
            })

        },

        methods: {
            likeHandler() {
                const data = {
                    cid: roomInfo.clientId,
                    id: this.mid,
                    status: this.liked ? 0 : 1,
                }
                REQ.reqChatFavor(data,
                    (response) => {
                        data.favorCount = response.data.favorCount
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_PUB_MSG_LIKE, data)
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },

            cancelHandler() {
                const data = {
                    cid: roomInfo.clientId,
                    id: this.mid,
                }
                REQ.reqChatCancel(data,
                    () => {
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_PUB_MSG_CANCEL, data)
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    }
                )
            }
        }
    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .operation-content {
        @include layout-flex-r-sb;
        margin: 3px 0 3px 0;
    }

    .operation-content .btn-operation {
        @include layout-flex-r-sb;
        align-items: center;
    }

    .operation-content .btn-operation .pic {
        align-self: center;
    }

    .operation-content .btn-operation .number {
        @include font-dpr(15px);
        color: #999;
        margin-left: 3px;
        align-self: center;
    }

    .operation-content .btn-operation .text {
        @include font-dpr(13px);
        color: #999;
        margin-left: 3px;
        align-self: center;
    }

</style>




