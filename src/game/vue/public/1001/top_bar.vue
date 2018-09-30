<template>
    <div class="top-bar">
        <div class="back-cover">
            <span class="back" @click="backHandler">
                <img src="http://static.ibigtop.com/static/img/public/game/icon_back.png"> 返回大屏
            </span>
        </div>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    import REQ from '../../common/request'
    export default {
        props: {
            title:{
                type:String
            }
        },

        data() {
            return {}
        },

        computed: {},

        mounted() {
        },

        methods: {
            backHandler() {
                let _this = this;
                let posData = {
                    storeId:GameInfo.storeId,
                    gameIndex:GameInfo.gameIndex,
                };
                REQ.reqGameBack(posData,
                    function(result){
                        window.location.href = `http://web.ibigtop.com/screen/public?storeId=${GameInfo.storeId}`
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/sass/mixin';

    .top-bar {
        @include layout-flex-r-center;
        width: 100%;
    }
    .top-bar .back-cover {
        position: absolute;
        right: 5%;
        top: 5%;
    }
    .top-bar .back-cover .back img{margin-right: 10px}
    .top-bar .back-cover .back {
        color: #aaa;
        font-size: 25px;
        cursor: pointer;
        @include layout-flex-r-center;
    }

    .top-bar .title {
        @include font-dpr(30px);
        margin: 10px;
        color: #D0F3ED;
        font-weight: bold;
        background: url("http://static.ibigtop.com/static/img/public/game/nihong.png") no-repeat;
        background-size: 100% 100%;
        padding: 30px 54px;
        height: 126px;
        line-height: 126px;
        font-size: 54px;
        @include set-width-height(479px,264px);
        text-align: center;
    }

</style>