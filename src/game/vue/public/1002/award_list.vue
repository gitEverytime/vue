<template>
    <div class="award-list">
        <div class="list-head" v-if="awardList.length>0">
            <span>序号</span>
            <span>获奖用户</span>
            <span>奖项</span>
            <span>奖品</span>
        </div>
        <div class="prompt" v-if="awardList.length<1">
             还没有中奖人员喔！
        </div>
        <div class="hidden-wrap">
            <div class="body-wrap" id="scrollList">
                <div class="list-body" v-for="(item,index) in awardList">
                    <span>{{index+1}}</span>
                    <span style="justify-content: flex-start">
                        <img :src="item.headimg" class="headimg">
                        <i class="icon iconMan" v-if="item.sex === '1'"></i>
                        <i class="icon iconWoman" v-else></i>
                        {{item.nickname}}
                    </span>
                    <span>{{item.levelName}}</span>
                    <span>{{item.rewardDesc}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    const roomInfo = window.GameInfo;
    export default {
        components:{

        },
        props:{
            getList:{
                type:Array
            },
            info:{
                type:Array
            }
        },
        data(){
            return{
                awardList:[],
                roomInfo:roomInfo
            }
        },
        watch:{
            getList(val){
                this.bigScreenAward(val);
                this.scrollBottom();

            },
            winners(val){
                this.awardList = [];
                this.awardList = val;
                this.scrollBottom();
            }
        },
        computed:{
            winners(){
                return this.$store.getters.getWinners
            }
        },
        mounted(){

        },
        methods: {
            bigScreenAward(val) {
                val.forEach((item) => {
                    this.awardList.push(item);
                })
            },
            scrollBottom(){
                this.$nextTick(() => {
                    var container = this.$el.querySelector("#scrollList");
                    container.scrollTop = container.scrollHeight;
                })
            }
        }
        }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    .award-list{
        padding: 0 30px;
        .list-head{
            width: 100%;
            @include layout-flex-r;
            border-top: #a15c62 solid 1px;
            border-bottom: #a15c62 solid 1px;
            padding: 16px 0;
            span{
                display: inline-block;
                text-align: center;
                font-size:22px;
                color:rgba(254,243,205,1);
            }
            span:nth-of-type(1){width: 15%}
            span:nth-of-type(2){width: 30%}
            span:nth-of-type(3){width: 15%}
            span:nth-of-type(4){width: 40%}
        }
        .hidden-wrap{
            overflow: hidden;
            width: 100%;
        }
        .body-wrap{
            overflow-y: auto;
            margin-right: -17px;
            max-height: 540px;
        }
        .list-body{
            width: 100%;
            @include layout-flex-r;
            border-bottom: #a15c62 solid 1px;
            padding: 10px 0;
            span{
                display: inline-block;
                text-align: center;
                font-size:22px;
                color:rgba(254,243,205,1);
                @include layout-flex-r-center;
                line-height: 50px;
                img{
                    @include set-width-height(50px,50px);
                    border-radius: 50%;
                    margin-right: 10px;
                }
                i{
                    display: inline-block;
                    margin-top: 12px;
                    margin-right: 10px;
                }
            }
            span:nth-of-type(1){width: 15%;color:rgba(189,130,130,1);}
            span:nth-of-type(2){width: 30%;color:rgba(189,130,130,1);}
            span:nth-of-type(3){width: 15%;color:rgba(227,211,124,1);}
            span:nth-of-type(4){width: 40%;color:rgba(189,130,130,1);}
        }
        .headimg{

        }
        .iconMan{
            background: url("http://static.ibigtop.com/static/img/icon/icon_man.png") no-repeat top center;
            background-size: 100% 100%;
            @include set-width-height(16px,26px);
        }
        .iconWoman{
            background: url("http://static.ibigtop.com/static/img/icon/icon_woman.png") no-repeat top center;
            background-size: 100% 100%;
            @include set-width-height(16px,25px)
        }
        .prompt{
            color: #bd8282;
            font-size: 26px;
        }
    }
</style>