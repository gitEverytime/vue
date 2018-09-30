<template>
    <div>
        <div class="actor">
            <div class="panel">
                <TempTitle title="艺人"/>
                <TempSubTitle title="今日已签到艺人" style="margin-bottom: 10px"/>
                <div class="content">
                    <TemActorList></TemActorList>
                </div>
                <TempBtn v-if="btnType === 1" text="申请成为艺人" @click="apply"/>
                <TempBtn v-if="btnType === 2" text="签到" @click="signIn"/>
                <TempBtn v-if="btnType === 3" text="签退" @click="signOut"/>
            </div>
        </div>
        <Modal :show="showModal" @close="closeModal" :type="modalType" :content="modalContent" :btnText="modalBtnText"
               @confirm="modalConfirm"/>
    </div>
</template>

<script>

    import REQ from '../../comm/request.js';
    import MsgType from "../../comm/msg_type.js";
    import ConstValue from "../../comm/const_value"
    import TemActorList from "./actor_list.vue";
    import TempTitle from "../component/box_title.vue";
    import TempSubTitle from "../component/box_sub_title.vue";
    import TempBtn from "../component/box_btn.vue"
    import Modal from "../component/modal.vue"

    var roomInfo = window.RINFO;

    //clientRole   0 普通用户   1  艺人

    export default {

        components: {TemActorList, TempTitle, TempSubTitle, TempBtn, Modal},

        data() {
            return {
                clientRole: Number(roomInfo.clientRole),
                note: "",
                actorId: "",
                showModal: false,
                modalType: 'time',
                modalContent: ['您已经是平台艺人', '请与本店演艺相关负责人', '沟通上班事宜', '如有其它需求可与当地服务商联络', '预祝演出成功'],
                modalBtnText: '发送入驻商家申请',
                btnType: 0,
                actorStatus: {},
            }
        },
        computed: {},

        mounted() {
            this.getInitStatus()
            this.$root.notify.$on(MsgType.CLIENT_ROLE_CHANGE, () => this.getInitStatus())
        },


        methods: {
            closeModal() {
                this.showModal = false
            },

            signIn() {
                if (this.actorStatus.type == 0 && this.actorStatus.status == 1) { //平台艺人审核通过
                    this.showModal = true
                } else if (this.actorStatus.type == 0 && this.actorStatus.status == 0) { //平台艺人审核中
                    this.modalType = 'going'
                    this.modalContent = ['亲爱的', '您的个人材料还在审核ing', '请耐心等候审核']
                    this.modalBtnText = '好的'
                    this.showModal = true
                } else if (this.actorStatus.type == 0 && this.actorStatus.status == 2) { //平台艺人审核未通过
                    this.modalType = 'unpass'
                    this.modalContent = ['亲爱的', '您得审核暂没有通过', '请尝试重新申请']
                    this.modalBtnText = '好的'
                    this.showModal = true
                } else if(this.actorStatus.type == 0 && this.actorStatus.status == 3) {
                    this.modalType = 'going'
                    this.modalContent = ['因某些原因', '您的艺人身份暂时被冻结', '请联系平台处理']
                    this.modalBtnText = '好的'
                    this.showModal = true
                } else if (this.actorStatus.type == 1 && this.actorStatus.status == 1) { //商家艺人审核通过,直接签到
                    REQ.reqActorSignIn({storeId: roomInfo.storeId, actorId: this.actorId},
                        () => {
                            this.$toast.center('签到成功')
                            this.btnType = 3
                            this.$root.notify.$emit(MsgType.DISPATCH_UP_SIGN_IN)
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$toast.center(err.msg)
                        })
                } else if(this.actorStatus.type == 1 && this.actorStatus.status == 2) { //商家艺人审核审核未通过
                    this.modalType = 'time'
                    this.modalContent = ['您的审核商家未通过', '您可以点击确定重新发送入驻申请', '也可以尝试直接见面沟通~']
                    this.modalBtnText = '确定'
                    this.showModal = true

                } else if (this.actorStatus.type == 1 && this.actorStatus.status == 3) {
                    this.modalType = 'going'
                    this.modalContent = ['因某些原因', '您的艺人身份暂时被冻结', '请联系商家处理']
                    this.modalBtnText = '好的'
                    this.showModal = true
                }else {   //商家艺人审核中
                    this.modalType = 'coffee'
                    this.modalContent = ['这个BOSS有点小忙', '可能还没看', '您可以尝试直接见面沟通~']
                    this.modalBtnText = '好的'
                    this.showModal = true
                }
            },

            modalConfirm(type) {
                this.closeModal()
                //申请成为商家艺人
                if (type == 'time') {
                    REQ.reqActorStoreApply({storeId: roomInfo.storeId, actorId: this.actorId},
                        (res) => {
                            this.$toast.center("发送成功")
                            this.getInitStatus()
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$toast.center(err.msg)
                            this.$logger.error(err)
                        })
                } else if (type == 'unpass') { //如果平台审核未通过，开放申请成为艺人的入口
                    this.btnType = 1
                }
            },

            signOut() {
                REQ.reqActorSignOut({storeId: roomInfo.storeId, actorId: this.actorId},
                    () => {
                        this.$toast.center('签退成功')
                        this.btnType = 2
                        this.$root.notify.$emit(MsgType.DISPATCH_UP_SIGN_OUT)
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$toast.center(err.msg)
                        this.$logger.error(err)
                    })
            },

            getInitStatus() {
                if (roomInfo.clientRole == ConstValue.CLIENT_ROLE_CLIENT) {
                    this.btnType = 1
                } else if (roomInfo.clientRole == ConstValue.CLIENT_ROLE_ACTOR) {
                    this.btnType = 2
                    this.getActorStatus()
                } else {
                    this.btnType = 0
                }
            },

            getActorStatus() {
                REQ.reqActorState({clientId: roomInfo.clientId, storeId: roomInfo.storeId},
                    (res) => {
                        const info = res.data;
                        this.actorId = info.actorId;
                        window.RINFO.actorId = info.actorId;
                        this.actorStatus = info

                        if (info.type == 1 && info.status == 1) { //已经是商家艺人，再去查询签到状态
                            this.getSignInStatus()
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    })
            },

            getSignInStatus() {
                REQ.reqActorSignState({storeId: roomInfo.storeId, actorId: this.actorId},
                    (res) => {
                        if (res.data.sign == 0) { //如果已经签到，显示签退按钮
                            this.btnType = 3
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    })
            },

            apply() {
                this.$router.replace({name: 'applyNotes'})
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import '../../../../../style/sass/mixin.scss';

    .actor {
        @include window-box;

        .panel {
            @include box-panel;

            .content {
                width: 100%;
                flex: 1;
                overflow-y: auto;
                position: relative;
            }
        }
    }
</style>




