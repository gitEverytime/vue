<template>
    <div class="head">
        <div class="draw_header">
            {{titleName}}
            <div class="backBigScreen" @click="backBigScreen">
                返回大屏
            </div>
        </div>
        <div class="back">

        </div>
    </div>
</template>

<script>
    import REQ   from "../../common/request.js";
    const roomInfo = window.GameInfo;
    export default {
        components:{
        },
        props:{
            title:{
                type:String
            }
        },
        data(){
            return{
                titleName:this.title,
                roomInfo:roomInfo
            }
        },
        watch:{
            title(val){
                this.titleName = val;
            }
        },
        mounted(){
            if(this.roomInfo.isPrivate === '1') {
                this.getGameRule(roomInfo.storeId, roomInfo.gameIndex)
            }
        },
        methods:{
            backBigScreen(){
                let _this = this;
                let posData = {
                    storeId:roomInfo.storeId,
                    gameIndex:roomInfo.gameIndex,
                };
                REQ.reqGameStop(posData,
                    function(){
                        window.location.href = `http://web.ibigtop.com/screen/public?storeId=${roomInfo.storeId}`
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            getGameRule(storeId,gameIndex){
                let _this = this;
                let posData = {
                    storeId:storeId,
                    gameIndex:gameIndex,
                };
                REQ.reqGetRule(posData,
                    function(result){
                        _this.titleName = result.data.name
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
    @import './../../../../style/sass/mixin.scss';
    .head{
        position: relative;
        .backBigScreen{
            position: absolute;
            top: 0;
            right: 70px;
            font-size: 30px;
            cursor: pointer;
        }
    }
    .draw_header{
        height: 140px;
        text-align: center;
        font-size: 42px;
        font-weight: bold;
        line-height: 140px;
        color: #fde9c2;
    }
    .back{
        /*background:red; !* 一些不支持背景渐变的浏览器 *!*/
        background:-moz-linear-gradient(top, #af292f, rgba(199, 57, 60, 0.3));
        background:-webkit-gradient(linear, 0 0, 0 bottom, from(#af292f), to(rgba(199, 57, 60, 0.3)));
        height: 50px;
    }
    .draw_cont{
        padding: 0 48px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        @include layout-flex-r-sb;
        .block{
            width: 49%;
            height: 100%;
        }
    }

</style>