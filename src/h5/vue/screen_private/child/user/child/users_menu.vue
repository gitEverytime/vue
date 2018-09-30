<template>
    <div class="user-menu">
        <div class="item-box" v-for="(peo,index) in actorList">
            <div class="item-header" @click="getUsers(peo ,index)" :class="ison==index?'on':''">
                <div class="img-con">
                    <Imag v-bind:src="peo.headimg" :classes="ison == index ? 'img-active' : ''"/>
                </div>
                <span class="name">{{peo.actorName}}</span>
                <span class="type">{{getActorType(peo.actorType)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import ConstValue from "../../../comm/const_value"
    import Imag from "../../component/Image.vue"
    import REQ from "../../../comm/request"

    const roomInfo = window.RINFO
    const E_CHOOSE_PEO = "E_CHOOSE_PEO"

    export default {
        components: {Imag},

        data() {
            return {
                ison: '',
                actorList: []
            }
        },

        computed: {},

        mounted() {
            this.getUserList()
        },

        methods: {
            getUsers(user, index) {
                this.ison = index;
                this.$emit(E_CHOOSE_PEO, user)
            },

            getUserList() {
                REQ.reqActorInStore({storeId: roomInfo.storeId},
                    (res) => {
                        this.actorList = res.data
                        if (this.actorList[0]) {
                            this.ison = 0
                            this.$emit(E_CHOOSE_PEO, this.actorList[0])
                        } else {
                            this.$emit(E_CHOOSE_PEO, {})
                        }
                    },
                    (complete) => {
                    },
                    (err) => {
                        this.$logger.error(err)
                    }
                )
            },

            getActorType(type) {
                return ConstValue.getActorType(type)
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import './../../../../../../style/sass/mixin.scss';

    .user-menu {
        @include layout-flex-r;
        overflow-x: auto;

        .item-box {
            padding: 5px 10px 0 10px;

            .item-header {
                @include layout-flex-c-center;
                height: auto;
                align-items: center;

                .img-con img {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: block;
                    margin-bottom: 2px;
                }

                .img-con .img-active {
                    @include box-shadow(0 0 8px #01b695);
                }

                .name {
                    color: #8d888f;
                    @include font-dpr(10px);
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 45px;
                }

                .type {
                    color: #8d888f;
                    @include font-dpr(9px);
                }
            }

            .on {
                .name {
                    color: #01b695 !important;
                }

                .type {
                    color: #01b695 !important;
                }
            }
        }
    }
</style>




