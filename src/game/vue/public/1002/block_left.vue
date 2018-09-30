<template>
    <div class="block_left">
        <h2 class="title">抽取{{level}}&nbsp;&nbsp;&nbsp;&nbsp;名额{{count}}人</h2>
        <div class="scroll-award" v-if="activePage === '1'">
            <img src="http://static.ibigtop.com/static/img/public/game/award-head.gif">
        </div>
        <div class="user-list" v-if="activePage === '2' && !$store.getters.getIsOver">
            <div class="box" v-for="item in userList">
                <img :src="item.headimg">
                <h2>{{item.nickname}}</h2>
            </div>
            <div v-if="userList.length<1 && !$store.getters.getIsOver" class="prompt">还没有中奖信息喔！</div>
        </div>
        <div v-if="$store.getters.getIsOver" class="prompt">
            已经抽完了，请选择别的奖项
        </div>
    </div>
</template>

<script>
    export default {
        components:{

        },
        props:{
            winList:{
                type:Array
            },
            setActive:{
                type:String
            }
        },
        data(){
            return{
                userList:this.winList,
                activePage:this.setActive,
                level:'一等奖',
                count:''
            }
        },
        watch:{
            isOver(val){
                if(val) this.userList = [];
            },
            setActive(val){
                this.activePage = val;
            },
            winList(val){
                this.userList = val;
            },
            awardInfo(val){
                this.userList = [];
                this.level = val.level;
                this.count = val.count
            }
        },
        computed:{
            awardInfo(){
                return this.$store.getters.getAwardInfo
            },
            isOver(){
                return this.$store.getters.getIsOver
            }
        },
        mounted(){

        },
        methods:{}
    }
</script>

<style lang='scss' scoped>
    @import './../../../../style/sass/mixin.scss';
    .block_left{
        @include layout-flex-c-center;
        .title{
            color:rgba(254,243,205,1);
            padding: 50px 0;
            font-size: 30px;
        }
        .scroll-award{
            @include layout-flex-r-center;
        }
        .user-list{
            @include layout-flex-r-center;
            .box{
                font-size:24px;
                color:rgba(254,243,205,1);
                margin-right: 50px;
                img{
                    @include set-width-height(120px,120px);
                    border-radius: 50%;
                }
                h2{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    width: 120px;
                }
            }
            .box:nth-last-child(1){
                margin-right: 0;
            }
        }
        .prompt{
            color: #bd8282;
            font-size: 26px;
        }
    }
</style>