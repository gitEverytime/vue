<template>

    <div class="agree-box" >
        <div class="head">
                申请成为艺人
                <span class="bkgd bg-arrow-left go-back" @click="goBack"></span>
            </div>
        <div >
        <div v-if="step=='success'">
            <div class="result-box">
                <span class="success-sp bg-success"></span>
            </div>
            <div>
                <h2>提交成功，请耐心等待平台通过</h2>
                <p>系统将在7个工作日内通过审核</p>
                <p>您还可以通过联系当地运营商加快审核进度：</p>
                <textarea name="" id="" cols="10" rows="6"></textarea>
            </div>
        </div>
        <div v-if="step=='error'">
            <div class="result-box">
                <span class="error-sp bg-error"></span>
            </div>
            <div>
                <h2>审核失败</h2>
                <p>请检查您提交的内容是否符合规范</p>
                <p>您还可以通过联系当地运营商加快审核进度：</p>
            </div>
            <div  class="btn-next is-agree"  @click="next">重新申请</div>
        </div>
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
            isAgree:false,
            step:"success"
        }
    },
    computed:{

    },

    mounted(){
    },
    
    methods:{
        agreed(){
            console.log(this.isagree)
        },
        next(){
            if(this.isagree){
                this.$emit("E_R_MENU_CLICK", "form");   
            }
            
        },
        goBack(){
            window.location.href = "#/";
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

.agree-box .btn-next{ height: 32px; line-height: 32px; border-radius: 15px; font-size: 18px; width: 120px; margin: 15px auto; text-align: center; display: block; }

.agree-box .is-agree{ background-color: #b225f0; color: #fff; }

.agree-box .foot{ color: rgba(184, 184, 184, 0.502); font-size: 12px; text-align: center; width: 100%; margin-top: 20px; width: 100%; position: absolute; bottom: 25px; }

.agree-box .result-box{ width: 100%; min-height: 200px; @include layout-flex-r-center; align-items: center; }

.agree-box textarea{ width: 80%; margin-left: 10%; outline: none; border: 1px solid #ddd; margin-top: 15px; border-radius: 6px; }

.agree-box .result-box .success-sp{ width: 100px; height: 100px; background-size: 100%; background-repeat: no-repeat; }

.agree-box .result-box .error-sp{ background-size: 100%; background-repeat: no-repeat; }

.agree-box  h2{ font-size: 18px; width: 100%; text-align: center; margin: 0 auto 20px; color: #555; }

.agree-box  p{ font-size: 14px; width: 100%; text-align: center; margin: 0 auto 20px; color: #999; }
</style>




