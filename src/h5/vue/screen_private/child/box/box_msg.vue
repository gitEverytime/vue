<template>
    <div class="box-msg">
        <div class="left">
            <div class="header" v-on:click="showUserPenal">
                <Imag v-bind:src="headimg"/>
            </div>
        </div>
        <div class="right">
            <div class="title">
                <div class="name-content">
                    <span class="sex icon" :class="getSex"></span>
                    <span class="name">{{ cname }}</span>
                </div>
                <span class="date">{{getDate}}</span>
            </div>

            <div class="content">
                <!-- ITEM 发言  -->
                <TempChat v-if="uiType == UIKey.UI_CHAT_PUB" v-bind="chatData"></TempChat>
                <!-- ITEM 霸屏  -->
                <TempOnscreen v-if="uiType == UIKey.UI_ON_SCREEN_THEME" v-bind="screenData"></TempOnscreen>
                <!-- ITEM 打赏  -->
                <TempReward v-if="uiType == UIKey.UI_REWARD" v-bind="rewardData"></TempReward>
                <!-- ITEM 点歌  -->
                <TempProgram v-if="uiType == UIKey.UI_PROGRAM" v-bind="programData"></TempProgram>
                <!-- ITEM 霸麦  -->
                <TempBM v-if="uiType == UIKey.UI_BM" v-bind="bmData"></TempBM>

            </div>
        </div>
        <div class="user-info" v-if="isShowUserInfo">
            <UserInfo v-bind:userInfo="userInfo" v-on:E_CLOSE_PENAL="closeUserPenal"></UserInfo>
        </div>
    </div>

</template>

<script>

    import CatchControl from "../../comm/catch_control.js";

    import UIType from "../../comm/ui_type.js";

    import TempChat from "./theme_chat.vue";
    import TempOnscreen from "./theme_onscreen.vue";
    import TempReward from "./theme_reward.vue";
    import TempProgram from "./theme_program.vue";
    import TempBM from "./theme_bm.vue"
    import UserInfo from "./user_info.vue";
    import DateFormat from "../../comm/date_format"
    import Imag from "../component/Image.vue"

    var roomInfo = window.RINFO;


    export default {

        props: ["sId", "cid", "uiType", "content", "pic", "title", "toUserId", "duration", "tid", "tname", "count",
            "rewardType", "actorId", "musicType", "headimg", "sex", "cname", "mid", "mediaTitle", "onScreenType",
            "actorName", "actorType", "type", "mediaType", "liked", "likedNumber", "tableName", "createdAt", "rid"],

        data() {
            return {
                UIKey: UIType,
                // userInfo: CatchControl.getUserById(this.userId),
                chatData: {
                    msg: this.content,
                    pic: this.pic,
                    mid: this.mid,
                    cid: this.cid,
                    liked: this.liked,
                    likedNumber: this.likedNumber
                },
                screenData: {
                    msg: this.content,
                    mediaTitle: this.mediaTitle,
                    pic: this.pic,
                    cid: this.cid,
                    mid: this.mid,
                    onScreenType: this.onScreenType,
                    duration: this.duration,
                    liked: this.liked,
                    likedNumber: this.likedNumber
                },
                rewardData: {
                    msg: this.content,
                    mediaTitle: this.mediaTitle,
                    pic: this.pic,
                    cid: this.cid,
                    mid: this.mid,
                    tid: this.tid,
                    tname: this.tname,
                    count: this.count,
                    liked: this.liked,
                    likedNumber: this.likedNumber,
                    tableName: this.tableName,
                    type: this.type,
                    rid: this.rid,
                    cname: this.cname,
                    headimg: this.headimg,
                },
                programData: {
                    msg: this.content,
                    mediaTitle: this.mediaTitle,
                    cid: this.cid,
                    mid: this.mid,
                    actorName: this.actorName,
                    actorType: this.actorType,
                    type: this.mediaType,
                    liked: this.liked,
                    likedNumber: this.likedNumber
                },
                bmData: {
                    cid: this.cid,
                    mid: this.mid,
                    type: this.type,
                    pic: this.pic,
                    liked: this.liked,
                    likedNumber: this.likedNumber
                },
                isShowUserInfo: false
            }
        },

        components: {TempChat, TempOnscreen, TempReward, TempProgram, UserInfo, TempBM, Imag},

        computed: {
            getSex() {
                return this.sex == 1 ? 'icon-man' : (this.sex == 2 ? 'icon-woman' : '')
            },
            getDate() {
                if (this.createdAt) {
                    return DateFormat.MDHM(this.createdAt)
                } else {
                    return DateFormat.MDHM(Date.now())
                }
            }

        },

        mounted() {
        },

        methods: {
            showUserPenal() {
                // this.userInfo = {
                //     clientId: this.cid,
                //     sex: this.sex,
                //     nickname: this.cname,
                //     headimg: this.headimg,
                // }
                this.userInfo = CatchControl.getUserById(this.cid)
                if (this.userInfo.clientId === roomInfo.clientId) {
                    window.location.href = "#/home"
                } else {
                    this.isShowUserInfo = true
                }
            },

            closeUserPenal() {
                this.isShowUserInfo = false
            }
        }


    }
</script>


<style lang='scss' scoped>

    @import '../../../../../style/sass/mixin.scss';

    .box-msg {
        @include layout-flex-r;
        width: 100%;
        box-sizing: border-box;
        border-right: 76px solid transparent;
        margin-bottom: 10px;

        .left {
            margin-left: 5px;
        }
    }

    .box-msg .left .header {
        padding: 20px 5px;
    }

    .box-msg .left .header img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }

    .box-msg .right {
        width: 100%;
        height: auto;
        padding-left: 5px;
    }

    .box-msg .right .title {
        @include layout-flex-r-sb;
        height: 30px;
        align-items: center;
    }

    .box-msg .right .title .name-content {
        @include layout-flex-r-sb;
        align-items: center;
        height: 30px;

        .sex {
            align-self: center;
        }
    }

    .box-msg .right .title .name-content .name {
        @include font-dpr(13px);
        color: #9f99a1;
        margin-left: 5px;
        text-align: center;
    }

    .box-msg .right .title .date {
        margin: 0 5px;
        @include font-dpr(13px);
        color: #9f99a1;
    }

    .box-msg .right .content {
        height: auto;
        border-radius: 6px;
        background: rgba(26, 16, 25, 0.4);
        border: 1px solid rgba(1, 182, 149, 0.2);
        padding: 5px 10px;
        margin-bottom: 10px;
    }

    .box-msg .user-info {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, 0.3);
    }

</style>




