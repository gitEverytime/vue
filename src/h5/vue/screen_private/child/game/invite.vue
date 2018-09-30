<template>
    <div class="invite">
        <div class="panel" @click="clickCloseHandler">
            <span class="icon icon-12-3"></span>
            <div class="image bgd bg-invite-shake" @click.stop="joinGameHandler"></div>
        </div>
    </div>

</template>

<script>
    import REQ from '../../comm/request'

    const roomInfo = window.RINFO
    export default {
        props: [],

        data() {
            return {}
        },

        computed: {
        },

        mounted() {
        },

        methods: {
            clickCloseHandler() {
                window.history.back()
            },
            joinGameHandler() {
                const gameIndex = this.$store.getters.getGameInviteInfo.gameIndex || 0
                const data = {
                    storeId: roomInfo.storeId,
                    userId: roomInfo.clientId,
                    userName: roomInfo.nickName,
                    avatar: roomInfo.headimg,
                    gameIndex: gameIndex
                }
                REQ.reqJoinGame(data,
                    () => {
                        window.location.href = `${REQ.apiGameDomain}/game/render/set/${gameIndex}?cId=${roomInfo.clientId}&storeId=${roomInfo.storeId}#/preparePlayer`
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg || err.code.msg)
                        this.clickCloseHandler()
                    })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import './../../../../../style/sass/mixin.scss';

    .invite {
        position: fixed;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);

        .panel {
            @include layout-flex-c-center;
            align-items: center;
            width: 100%;
            height: 100%;

            .image {
                @include set-width-height(318px, 196px)
            }
        }
    }

</style>