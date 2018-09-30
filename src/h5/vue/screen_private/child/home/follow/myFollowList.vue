<template>
    <div class="my-follow">
        <div class="line" v-if="myFollowList.length" v-for="item in myFollowList" :key="Date.now() * Math.random()">
            <div class="avatar-content">
                <Imag classes="avatar" :src="item.theadimg"/>
                <div class="sex icon" :class="getSex(item.tsex)"></div>
            </div>
            <div class="info">
                <span class="name">{{item.tnickname}}</span>
                <span class="sign"></span>
            </div>
            <span class="btn" @click="followHandler(item)">取消关注</span>
        </div>
        <TempNoResult v-if="!myFollowList.length" :title="'你还没有关注的人哦~'"></TempNoResult>
    </div>

</template>

<script>
    import REQ from '../../../comm/request'
    import TempNoResult from './noResult.vue'
    import Imag from "../../component/Image.vue"

    const roomInfo = window.RINFO

    export default {
        props: [],

        components: {TempNoResult, Imag},

        data() {
            return {
                myFollowList: []
            }
        },

        computed: {},

        mounted() {
            this.getMyFollowList()
        },

        methods: {
            getMyFollowList() {
                REQ.reqGetMyFollowList({cid: roomInfo.clientId},
                    (response) => {
                        this.myFollowList = response.data
                    },
                    (complete) => {
                    },
                    (err) => {
                        console.error(err)
                    })
            },
            getSex(sex) {
                return sex == 1 ? 'icon-man-on' : (sex == 2 ? 'icon-woman-on' : '')
            },

            followHandler(item) {
                REQ.reqFollowOrNot({
                        cid: roomInfo.clientId,
                        tid: item.tid,
                        type: 0
                    },
                    () => {
                        this.getMyFollowList();
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
    @import './../../../../../../style/sass/mixin.scss';

    .my-follow {
       width: 100%;

        .line {
            @include layout-flex-r-sb;
            align-items: center;
            @include set-height(80px);
            border-bottom: 1px solid #322831;

            .avatar-content {
                @include set-width-height(62px, 62px);
                margin-left: 10px;

                .avatar {
                    @include set-width-height(56px, 56px);
                    border-radius: 50%;
                }
                .sex {
                    position: relative;
                    left: 40px;
                    bottom: 15px;
                }
            }

            .info {
                @include layout-flex-c-center;
                flex: 1;
                overflow: hidden;
                padding: 0 10px 0 3px;

                .name {
                    @include font-dpr(14px);
                    color: #bbb;
                }

                .sign {
                    @include font-dpr(14px);
                    color: #8d888f;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 5px 0;
                }
            }

            .btn {
                width: 20%;
                color: #d8d854;
                border: 1px solid #d8d854;
                @include set-h(24px);
                border-radius: 3px;
                text-align: center;
                margin-right: 10px;
            }
        }
    }

</style>