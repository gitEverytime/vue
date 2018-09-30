<template>

    <div class="agree-box" >
        <div class="head">
            申请成为艺人
            <span class="bkgd bg-arrow-left go-back" @click="goBack"></span>
        </div>
        
        <div >
            <div class="content">
                <p class="p-title">成为艺人须知</p>
                <p>1、注册入驻后可成为毕果平台歌手，享有平台提供一切关于歌手的权限，并可积累属于自己的粉丝。</p>
                <p>2、可致电各地服务商签约成为毕果平台签约歌手，平台提供演出需求，具体事宜请咨询当地服务商或毕果总部。</p>
                <p>3、凡成功入驻的艺人，不得在本平台发布包括但不仅限于淫秽、色情、暴力、反动、不文明等文字、图片、视频、
                    语音等内容，一经发现即刻封号且永不通过，行为恶劣者将提供信息给当地执法部门。</p>
                <p>4、所获得收益需遵循本平台分配机制，具体分配机制以各地服务商及实体店决定，且依法扣除相关税费。</p>
                <p>5、以上解释权归本平台所有。</p>
                <div @click="agreed" class="choosebox">
                    <input id="agree" type="checkbox" v-model="isAgree"><label for="agree">我已认真阅读，并遵守此须知</label>
                </div>
            </div>
            <div :class="isAgree?'is-agree':'isnt-agree'"  class="btn-next"  @click="next">下一步</div>
            <div class="foot">
                ©big2018-2020 毕果科技
            </div>
        </div>
       
    </div>
    
    
</template>

<script>

import $  from 'jquery';



export default {
    
    components:{   },

    data(){
        return{
            isAgree:false
        }
    },
    computed:{

    },

    mounted(){
    },
    
    methods:{
        agreed(){
            
        },
        next(){
            if(this.isAgree){
                window.location.href = "#/actorForm";
            }
            
        },
        goBack(){
            window.location.href = "#/talk";
        }
    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';
.agree-box{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 89999; background-color: #fff; }

.agree-box .head{ padding: 15px; position: relative; font-size: 18px; color: #fff; background-color: #2c2a33; text-align: center; }

.agree-box .head .go-back{ position: absolute; top: 15px; left: 15px; }

.agree-box .content{ padding: 15px; margin: 15px; border: 1px solid #ddd; }

.agree-box .content .choosebox{ @include layout-flex-r-center; align-items: center; margin: 15px auto; }

.agree-box .content .choosebox input{ margin-right: 5px; }

.agree-box .content p{ font-size: 14px; color: rgb(78, 85, 99); text-align: justify; margin-bottom: 15px; }

.agree-box .content .p-title { font-size: 16px; color: rgb(178, 37, 240); text-align: center; }

.agree-box .btn-next{ height: 32px; line-height: 32px; border-radius: 15px; font-size: 18px; width: 120px; margin: 15px auto; text-align: center; display: block; }

.agree-box .is-agree{ background-color: #b225f0; color: #fff; }

.agree-box .isnt-agree{ background-color: #ddd; color: #999; }

.agree-box .foot{ color: rgba(184, 184, 184, 0.502); font-size: 12px; text-align: center; width: 100%; margin-top: 20px; width: 100%; position: absolute; bottom: 25px; } 

</style>




