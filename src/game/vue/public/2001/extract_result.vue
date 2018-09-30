<template>
    <div class="game_public_2001 box">
        <div class="group">
            <p class="group_title">第{{index+1}}组</p>
            <img  :src="head" class="group_headImg slideDown">
            <p class="group_name">{{title}}</p>
            <TempSubjectType v-if="actIndex === '1'"></TempSubjectType>
            <TempSubject
                    v-if="actIndex === '2'"
                    :question="question"
                    :right="right"
            >

            </TempSubject>
        </div>
        <h3 class="setTime" v-if="actIndex === '2'">剩余时间：{{second}}&nbsp;s</h3>
    </div>
</template>

<script>
    import $                 from  'jquery'
    import TempSubjectType   from  './subject_type.vue'
    import TempSubject       from  './subject.vue'
    import setZoom           from  '../../common/setZoom.js'
    export default {
        components:{
            TempSubjectType,
            TempSubject
        },
        data(){
            return{
                actIndex:'1',
                second:'15',
                title:'',
                head:'',
                index:'0',
                question:'',
                right:''
            }
        },
        watch:{

        },
        computed:{

        },
        mounted(){
            setZoom();     //初始化触发
            /**
             * 当浏览器窗口大小发生变化时触发
             */
            $(window).bind('resize',function(){
                setZoom();
            });
            this.actIndex = '1';
            let val = this.$store.getters.getExtractInfo;
            if(!val) return;
            this.index = JSON.parse(val).index;
            this.title = JSON.parse(val).nickname;
            this.head = JSON.parse(val).avatar;
            this.startGame();
            this.enterQuestion();
            this.endGame();
        },
        methods:{
            startGame(){
                //抽取玩家
                this.$root.notify.$on("START_GAME", (data) => {
                    this.actIndex = '1';
                    this.index = data.index;
                    this.title = data.nickname;
                    this.head = data.avatar;
                });
            },
            endGame(){
                this.$root.notify.$on("GAME_OVER", (data) => {
                    this.$store.commit('setPlayId',data.playId);
                    window.location.href = "#/result"
                });
            },
            enterQuestion(){
                //进入问题
                let timer = null;
                this.$root.notify.$on("NEXT_QUE", (data) => {
                    clearInterval(timer);
                    this.second = '15';
                    this.actIndex = '2';
                    this.question = data.question;
                    this.right = data.right;
                    timer =setInterval(() =>{
                        if(this.second === 0) {
                            clearInterval(timer);
                            return;
                        }
                        this.second --;
                    },1000)
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './../../../../style/sass/mixin.scss';
    @import "./../../../../style/css/wickedcss.css";
    .box{
        background: url("http://static.ibigtop.com/static/img/public/game/game_extract.png") top center;
        background-size: 100% 100%;
        @include set-width-height(100%,100%);
        overflow: hidden;
        position: relative;
        .group{
            position: absolute;
            @include box-center(15%,50%);
            text-align: center;
            .group_title{
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-shadow:0px 2px 3px rgba(3,32,26,0.36);
                font-size: 50px;
            }
            .group_headImg{
                margin-top: 30px;
                @include set-width-height(140px,140px);
                border-radius: 50%;
            }
            .group_name{
                font-size:42px;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-shadow:0px 2px 3px rgba(3,32,26,0.36);
                margin-top: 15px;
            }
        }
        .setTime{
            position: absolute;
            top: 60px;
            right: 60px;
            font-size:42px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            text-shadow:0px 2px 3px rgba(3,32,26,0.36);
        }
    }

</style>