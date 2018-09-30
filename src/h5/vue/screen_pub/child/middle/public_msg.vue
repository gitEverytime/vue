<template>
    <div class="public_msg">
        <div class="re_public">
            <div  class="msg" v-if="type === '3'">
               <span class="title1">{{onScreenType}}</span>
               <span class="title1">{{duration}}s</span>
               <span class="title2">&nbsp;&nbsp;#{{mediaTitle}}#</span>
            </div>
            <!--霸麦提示条-->
            <div class="real_text" v-if="type === '8' || type === '9'">
                <span>{{type === '8'? '真心话' : '好声音'}}</span>
            </div>
            <!--点歌提示条-->
            <div class="choose_song" v-if="type === '1'">
                <span>点歌</span>&nbsp;&nbsp;&nbsp;{{song.mediaTitle}}——{{song.actorName}}({{song.actorType}})
            </div>
            <!--实物打赏提示条-->
            <div class="AllrewardText" v-if="type === '7'">
                <p>
                    <label class="reward_name">{{gift.cname}}</label>
                    打赏给
                    <span>
                               <label class="tableNumber" v-if="gift.tableName!==''">{{gift.tableName}}桌</label>
                               {{gift.tname}}
                           </span>
                    {{gift.mediaTitle}}<label v-if="gift.count>0">x{{gift.count}}</label>
                </p>
            </div>
            <!--礼物打赏提示条-->
            <div class="AllrewardText" v-if="type === '6'">
                <p>
                    <label class="reward_name">{{gift.cname}}</label>
                    打赏给
                    <span>
                           {{gift.tname}}
                    </span>
                    {{gift.mediaTitle}}
                </p>
            </div>
            <!--红包打赏提示条-->
            <div class="redPaperReward" v-if="type === '4' || type === '5'">
                <div class="re_redPaper">
                    <img src="http://static.ibigtop.com/static/img/public/effect/reward/img/redmoney.png" class="redmoney">
                    <p>
                        <label class="reward_name">{{gift.cname}}</label>
                        打赏给
                        <span>
                               {{gift.tname}}
                        </span>
                        {{gift.mediaTitle}}
                    </p>
                </div>
            </div>

            <div class="cont_wrap">
                <p class="title3"  ref="message">
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import emoji from '../../../../../libs/emoji/emoji'
    import ConstValue from '../../comm/const_value.js'
    export default {
        components:{  },

        data(){
            return{
                onScreenType:'',
                duration:'',
                mediaTitle:'',
                type:'',
                song:{
                    mediaTitle:'',
                    actorName:'',
                    actorType:''
                },
                gift:{
                    tableName:'',
                    cname:'',
                    tname:'',
                    count:0,
                    mediaTitle:''
                }
            }
        },
        computed:{
            publicUserInfo(){
                return this.$store.getters.getPublicUserInfo;
            }
        },
        watch:{
            publicUserInfo(val){
                //延迟一秒
                let vm = this;
                let content ='';
                if(val.length <= 4){
                    return
                }
                let info = val[val.length - 5];   //取倒数第五条数据
                if(info.detail) {
                    let detail = JSON.parse(info.detail);
                    info['onScreenType'] = detail.onScreenType;
                    info['duration'] = detail.duration;
                    info['actorName'] = detail.actorName;
                    info['actorType'] = detail.actorType;
                }
                if((info.type === ConstValue.INTERACTION_GIVE_REAL || info.type === ConstValue.INTERACTION_GIVE_GIFT) && info.detail){
                    let detail = JSON.parse(info.detail);
                    info['tableName'] = detail.tableName;
                    info['count'] = detail.count;
                }
                let timer = setTimeout(() =>{
                    vm.type = info.type;              //类型
                    switch (info.type){
                        case ConstValue.INTERACTION_CHAT:
                            content = info.content;
                            break;
                        case ConstValue.INTERACTION_ONSCREEN:
                            content = info.content;
                            vm.onScreenType = vm.ConstValue.getScreenType(info.onScreenType);
                            vm.mediaTitle = info.mediaTitle;
                            vm.duration = info.duration;
                            break;
                        case ConstValue.INTERACTION_BM_HEART:
                            content = '在这个舞台，借麦，你说出内心深处，一直想说的那些话';
                            break;
                        case ConstValue.INTERACTION_BM_VOICE:
                            content = '我就是全场最受瞩目的超级巨星!';
                            break;
                        case ConstValue.INTERACTION_GIVE_REAL:                  //店内打赏/礼物打/个人红包/全场红包
                        case ConstValue.INTERACTION_GIVE_GIFT:
                        case ConstValue.INTERACTION_REDPACKET_ONE:
                        case ConstValue.INTERACTION_REDPACKET_ALL:
                            vm.gift.tableName = info.tableName;
                            vm.gift.cname = info.cname;
                            vm.gift.tname = info.tname;
                            vm.gift.count = info.count;
                            vm.gift.mediaTitle = info.mediaTitle;
                            content = info.content;
                            break;
                        case ConstValue.INTERACTION_SONG:
                            content = info.content;
                            vm.song.mediaTitle = info.mediaTitle;
                            vm.song.actorName = info.actorName;
                            vm.song.actorType =ConstValue.getActorType(info.actorType);
                            break;
                        default :
                            content = '';
                            break;
                    }
                    vm.AutoScroll(".title3",content,info.pic,vm.type);          //执行淡入淡出动画
                },500)
            }
        },
        mounted(){
        },
        methods:{
            AutoScroll(obj,text,pic,type){
                let vm = this;
                let oHeight = $(obj).height();
                vm.publicMsgStyle(obj,text,pic,type);
                $(obj).animate({
                    opacity: "0"
                }, 500, function() {
                    $(obj).css({
                        opacity: "1"
                    });
                    emoji.decode(vm.$refs.message,text);
                });
            },
            publicMsgStyle(obj,text,pic,type){
                let vm = this;
                if(type === '0' || type === '3'){    //发言
                    if(pic){
                        $(".public_msg").addClass('msg_footer').removeClass("msg_bottom msg_center");
                    }else{
                        $(".public_msg").addClass('msg_center').removeClass("msg_bottom msg_footer");
                        $(".cont_wrap").addClass("cont_center");
                    }
                }else if(type === '8' || type === '9'){
                    $(".public_msg").addClass('msg_bottom').removeClass("msg_center msg_footer");
                }else{    //其他居中
                    $(".public_msg").addClass('msg_center').removeClass("msg_bottom msg_footer");
                }
                if($(obj).height()>80){
                    $(obj).addClass('font54').removeClass('font60');
                }else{
                    $(obj).addClass('font60').removeClass('font54');
                }
            }
        }
    }
</script>


<style lang='scss'  scoped>
    @import '../../../../../style/sass/mixin';
   .public_msg{
       width: 100%;
       height: 30%;
       position: absolute;
       min-height: 200px;
       text-align: center;
       z-index: 999;
       .re_public{
           position: relative;
           @include set-width-height(100%,100%);
       }
       //霸屏
       .msg{
           padding: 10px 20px ;
           background:rgba(0,0,0,0.5);
           border-radius: 8px;
           display: inline-block;
           position: absolute;
           @include box-center(20%,50%);
           .title1{
               color: #01b695;
               font-size: 50px;
               font-weight: bold;
           }
           .title2{
               color: #FFFFFF;
               font-size: 50px;
               font-weight: bold;
           }
       }
       //发言
       .cont_wrap{
           overflow: hidden;
           width: 40%;
           position: absolute;
           @include box-center(100%,50%);
       }
       .title3{
           text-align: center;
           color: #FFFFFF;
           font-weight: bold;
           line-height: 70px;
           padding-top: 14px;
           text-shadow:#000 1px 1px 1px;
           display: inline-block;
           overflow:hidden;
           text-overflow:ellipsis;
           display:-webkit-box;
           -webkit-box-orient:vertical;
           -webkit-line-clamp:2;
       }
       .font60{
           font-size: 60px;
       }
       .font54{
           font-size: 54px;
       }
       //真心话
       .real_text{
           margin: 0 auto;
           width:288px;
           height:94px;
           background:rgba(34,24,33,1);
           opacity:0.7;
           border-radius:20px;
           font-size:50px;
           color:rgba(30,254,0,1);
           position: absolute;
           @include box-center(0%,50%);
           span{
               display: inline-block;
               line-height:94px;
               font-weight: bold;
           }
       }
       .choose_song{
           padding: 20px 37px;
           background:rgba(34,24,33,0.9);
           display: inline-block;
           /*opacity:0.7;*/
           border-radius:20px;
           color: #FFFFFF;
           font-size:50px;
           font-weight:bold;
           letter-spacing: 8px;
           position: absolute;
           @include box-center(0%,50%);
           span{
               color: #ff33dd;
               display: inline-block;
               font-size:50px;
               font-weight:bold;
           }
       }
       //店内打赏
       .AllrewardText{
           padding: 10px 20px;
           background:rgba(34,24,33,1);
           opacity:0.9;
           border-radius:20px;
           display: inline-block;
           position: absolute;
           @include box-center(20%,50%);
           max-width: 700px;
           p{
               font-size:50px;
               line-height: 70px;
               color:rgba(221,221,221,1);
               font-weight: bold;
               .reward_name{
                   color: #D8D854;
               }
               span{
                   color: #01B695;
                   .reward_name{}
                   .tableName{
                   }
               }
               .count{
               }
           }
       }
       .redPaperReward{
           background:rgba(34,24,33,1);
           opacity:0.9;
           border-radius:20px;
           display: inline-block;
           position: absolute;
           @include box-center(10%,50%);
           max-width: 700px;
           .re_redPaper{
               position: relative;
               padding: 50px 20px 10px;
               .redmoney{
                   margin-top: -140px;
               }
               p{
                   font-size:50px;
                   line-height: 70px;
                   color:rgba(221,221,221,1);
                   font-weight: bold;
                   position: relative;
                   .reward_name{
                       color: #D8D854;
                   }
                   span{
                       color: #01B695;
                       .reward_name{}
                       .tableName{
                       }
                   }
                   .count{
                   }
               }
           }
       }
   }
   .msg_center{
       @include box-center(40%,35%);
       width: 60%;
       .cont_wrap{
           width: 70%;
           position: absolute;
           @include box-center(100%,50%);
       }
   }
   .msg_bottom{
       @include box-center(90%,50%);
       .cont_wrap{
           width: 50%;
           position: absolute;
           @include box-center(100%,50%);
       }
   }
   .msg_footer{
       @include box-center(93%,50%);
       .cont_wrap{
           width: 50%;
           position: absolute;
           @include box-center(100%,50%);
       }
   }
</style>