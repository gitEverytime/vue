<template>
    <div class="peo-list">
        <div class="item-box" v-for="peo in userList">
            <div class="item-header" @click="getusers(peo)" :class="ison==peo.clientId?'on':''">
                <div class="img-con">
                    <Imag v-bind:src="peo.headimg" :classes="ison == peo.clientId ? 'img-active' : ''"/>
                </div>
                <span class="name">{{getName(peo)}}</span>
                <span class="type">{{getOtherMessage(peo)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import CatchControl from '../../../comm/catch_control'
    import ConstValue from '../../../comm/const_value'
    import REQ from '../../../comm/request'
    import Imag from "../../component/Image.vue"

    const roomInfo = window.RINFO

    export default {
        props: ["peoType", "rewardType", "toUser"],

        components: {Imag},

        data() {
            return {
                ison: '-2',
                userList: []
            }
        },

        watch: {
            peoType() {
                this.getUserList()
            },

            rewardType() {
                this.getUserList()
            }
        },

        computed: {},

        mounted() {
            this.getUserList()
        },

        methods: {
            getusers(user) {
                this.ison = user.clientId
                this.$emit("E_CHOOSE_PEO", user)
            },

            getName(peo) {
                if (this.peoType == ConstValue.CLIENT_ROLE_ACTOR) {
                    return peo.actorName
                } else {
                    return peo.nickname
                }
            },

            getOtherMessage(peo) {
                if (this.peoType == ConstValue.CLIENT_ROLE_ACTOR) {
                    return ConstValue.getActorType(peo.actorType)
                } else {
                    return ''
                }
            },

            getUserList() {
                if (this.peoType == ConstValue.CLIENT_ROLE_CLIENT) {     //现场
                    this.userList = [...CatchControl.getAllUser()] || []
                    if (this.rewardType != 0) {
                        const allPeople = {
                            nickname: "全场",
                            headimg: REQ.apiStaticDomain + "/static/img/new/all-people.png",
                            clientId: 0,
                        }
                        this.userList.unshift(allPeople)
                        if (!this.toUser.nickname || this.toUser.nickname == '整桌') {
                            this.ison = this.userList[0].clientId
                            this.$emit("E_CHOOSE_PEO", this.userList[0])
                        }
                    } else {
                        const noPeople = {
                            nickname: '整桌',
                            headimg: REQ.apiStaticDomain + "/static/img/new/all-table.png",
                            clientId: -1,
                        }
                        this.userList.unshift(noPeople)
                        if (!this.toUser.nickname || this.toUser.nickname == '全场') {
                            this.ison = this.userList[0].clientId
                            this.$emit("E_CHOOSE_PEO", this.userList[0])
                        }
                    }
                } else if (this.peoType == ConstValue.CLIENT_ROLE_ACTOR) {
                    REQ.reqActorInStore({storeId: roomInfo.storeId},
                        (res) => {
                            this.userList = res.data
                            if (this.userList.length && (!this.toUser.nickname || this.toUser.nickname == '全场' || this.toUser.nickname == '整桌')) {
                                this.ison = this.userList[0].clientId
                                this.$emit("E_CHOOSE_PEO", this.userList[0])
                            }
                        },
                        (complete) => {
                        },
                        (err) => {
                            this.$logger.error(err)
                        }
                    )
                }else {
                    this.userList = []
                }
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .peo-list {
        @include layout-flex-r;
        overflow-x: auto;
    }

    .peo-list .item-box {
        padding: 5px 10px 10px 10px;
    }

    .peo-list .item-header {
        @include layout-flex-c-center;
        height: auto;
        align-items: center;
    }

    .peo-list .on .name {
        color: #01b695 !important;
    }

    .peo-list .on .type {
        color: #01b695 !important;
    }

    .peo-list .item-header .img-con img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: block;
        margin-bottom: 2px;
        margin-top: 3px;
    }

    .peo-list .item-header .img-con .img-active {
        @include box-shadow(0 0 15px #01b695);
    }

    .peo-list .item-header .name {
        color: #8d888f;
        @include font-dpr(10px);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 45px;
    }

    .peo-list .item-header .type {
        color: #8d888f;
        @include font-dpr(9px);
        text-align: center;
    }


</style>




