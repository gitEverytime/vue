<template>
    <div class="invite">
        <div class="panel" @click="clickCloseHandler" v-show="showInvite">
            <span class="icon icon-12-3 ico"></span>
            <div class="image bgd bg-invite-heart" @click.stop="joinGameHandler"></div>
        </div>
        <Modal :show="showModal" @close="closeModal" type="heart" :content="modalContent" btnText="返回互动"
               @confirm="closeModal"/>
    </div>

</template>

<script>
    import REQ from '../../comm/request'
    import Modal from '../component/modal.vue'

    const roomInfo = window.RINFO
    export default {
        props: [],

        components: {Modal},

        data() {
            return {
                showModal: false,
                modalContent: ['心心相印游戏', ' '],
                showInvite: true,
            }
        },

        computed: {},

        mounted() {
        },

        methods: {
            clickCloseHandler() {
                window.history.back()
            },
            joinGameHandler() {
                const info = this.$store.getters.getGameInviteInfo
                const params = {
                    playId: info.playId,
                    player: {
                        cid: roomInfo.clientId,
                        avatar: roomInfo.headimg,
                        nickname: roomInfo.nickName,
                    },
                }
                REQ.joinGame1003(params,
                    (res) => {
                        this.$logger(res)
                        this.modalContent[1] = '参与成功！'
                        this.showInvite = false
                        this.showModal = true
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.modalContent[1] = '本轮游戏已开始，敬请期待下一轮~'
                        this.showInvite = false
                        this.showModal = true
                    }
                )
            },

            closeModal() {
                this.showModal = false
                this.$router.back()
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

            .ico {
                position: relative;
                top: 11px;
            }

            .image {
                @include set-width-height(230px, 270px)
            }
        }
    }

</style>