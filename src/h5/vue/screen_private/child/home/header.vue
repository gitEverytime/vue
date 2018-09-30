<template>
    <div class="home-header">
        <Title title="个人中心" @E_LEFT_CLICK="backHandler"/>
        <div class="user-info">
            <div class="left">
                <div class="photo"><Imag v-bind:src="getHeadImg"/></div>
                <div class="info">
                    <div class="name-line">
                        <span class="icon" :class="getSex"></span>
                        <span class="name">{{getNickName}}</span>
                    </div>

                    <div class="level-line">
                        <span class="icon icon-level-lv0"></span>
                        <span class="level-name">果宝</span>
                    </div>

                </div>
            </div>

            <div class="right">
                <div class="like-content">
                    <span class="like">人气</span>
                    <span class="popularity">{{info.client ? info.client.followCount : 0}}</span>
                </div>
                <div class="upgrade-content" @click="handleUpgrade">
                    <!--<span class="upgrade">升级与特权</span>-->
                    <!--<div class="ico">-->
                        <!--<span class="icon icon-arrow-more"></span>-->
                    <!--</div>-->
                </div>
            </div>

        </div>

        <div class="menu-bar">

        </div>

    </div>
</template>

<script>
    import Title from "../component/title.vue"
    import Imag from "../component/Image.vue"


    var roomInfo = window.RINFO;


    export default {
        props: ['info'],

        components: {Title, Imag},


        data() {
            return {
                boxIndex: 0
            }
        },
        computed: {
            getHeadImg() {
                return roomInfo.headimg
            },

            getNickName() {
                return roomInfo.nickName
            },

            getSex() {
                return roomInfo.sex == 1 ? 'icon-man-mine' : (roomInfo.sex == 2 ? 'icon-woman-mine' : '')
            },
        },

        mounted() {
        },

        methods: {
            handleUpgrade() {
                // TODO
            },
            backHandler () {
                const index = this.$store.getters.getCurrTabIndex
                if (index === 1) {
                    this.$router.replace({name: 'talk'})
                } else if (index === 4) {
                    this.$router.replace({name: 'Dining'})
                }
            }
        }


    }


</script>


<style lang='scss' scoped>
    @import "../../../../../style/sass/mixin.scss";

    .home-header {
        width: 100%;
    }

    .home-header .user-info {
        @include layout-flex-r-sb;
    }

    .home-header .user-info .left {
        @include layout-flex-r-sb;
        margin-top: 5px;
    }

    .home-header .user-info .left .photo img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin: 10px;
    }

    .home-header .user-info .left .info {
        @include layout-flex-c-center;
    }

    .home-header .user-info .left .info .name-line {
        @include layout-flex-r;
        padding-bottom: 5px;
        align-items: center;
    }

    .home-header .user-info .left .info .name-line .name {
        color: #ddd;
        padding: 0 5px;
        @include font-dpr(16px)
    }

    .home-header .user-info .left .info .level-line {
        @include layout-flex-r;
        margin-top: 5px;
        align-items: center;
    }

    .home-header .user-info .left .info .level-line .level {
        width: 12px;
        background-size: 100%;
        background-repeat: no-repeat;
        margin-top: 3px;
    }

    .home-header .user-info .left .info .level-line .level-name {
        padding: 0 5px 3px 5px;
        @include font-dpr(14px);
        color: #d8d854;
    }

    .home-header .user-info .right {
        @include layout-flex-c-center;
        margin: 10px 10px 0 0;
    }

    .home-header .user-info .right .like-content {
        @include layout-flex-r;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 10px;

        .like {
            text-align: right;
            color: #a7a3a9;
            @include font-dpr(14px);
        }

        .popularity {
            color: #00b795;
            min-width: 20px;
            text-align: center;
            @include font-dpr(14px);
        }
    }

    .home-header .user-info .right .upgrade-content {
        @include layout-flex-r;
        align-items: center;

        .upgrade {
            color: #a7a3a9;
            @include font-dpr(14px);
        }

        .ico {
            @include set-width(20px);
            @include layout-flex-c-center;
            align-items: center;
        }
    }


</style>




