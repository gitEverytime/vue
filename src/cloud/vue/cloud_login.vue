<template>
    <div class="cloud">
        <div class="bg_logo"></div>
        <TempLoginStep1
                v-if="activeIndex === '1'"
                @setActiveIndex="getActiveIndex"
                @setPhone="getPhone"
        ></TempLoginStep1>

        <TempLoginStep2
                v-if="activeIndex === '2'"
                @setActiveIndex="getActiveIndex"
                @setBossName="getBossName"
                @setApplyType="getApplyType"
        ></TempLoginStep2>

        <TempLoginStep3
                v-if="activeIndex === '3'"
                @setActiveIndex="getActiveIndex"
                :bossName="bossName"
                :phone="phone"
        ></TempLoginStep3>

        <TempLoginStep4
                v-if="activeIndex === '4'"
                @setActiveIndex="getActiveIndex"
                :applyType="applyType"
                :bossName="bossName"
                :phone="phone"
        ></TempLoginStep4>

        <TempExamineResult
                v-if="activeIndex === '5'"
                :phone="phone"
        ></TempExamineResult>
        <p class="login_footer">
            官方主机:0951-8598-198&nbsp;&nbsp;&nbsp;&nbsp;  全国服务电话:400-0000-5382&nbsp;&nbsp;&nbsp;&nbsp;   举报维权:0951-8598-198转801&nbsp;&nbsp;&nbsp;&nbsp;   官方网站:www.ibigtop.com<br>
            中国·宁夏·银川·新华东街650号隆鑫苑A2-A座12楼·宁夏毕果科技发展有限公司
        </p>
    </div>
</template>

<script>
    import TempLoginStep1  from '../vue/login/login_step1.vue'
    import TempLoginStep2  from  '../vue/steps/reg_step2.vue'
    import TempLoginStep3  from  '../vue/steps/store_apply.vue'
    import TempLoginStep4  from  '../vue/steps/agent_apply.vue'
    import TempExamineResult  from  '../vue/steps/examine_result.vue'
    export default {

        components:{
            TempLoginStep1,
            TempLoginStep2,
            TempLoginStep3,
            TempLoginStep4,
            TempExamineResult
        },
        data(){
            return{
                activeIndex:'1',
                bossName:'',
                phone:'',
                applyType:''
            }
        },
        computed:{

        },
        mounted(){
            // this.activeIndex = '5'
        },
        methods:{
            getActiveIndex(val){
                this.activeIndex= val
            },
            getBossName(val){
                this.bossName = val;
            },
            getApplyType(val){
                this.applyType = val;
            },
            getPhone(val){
                this.phone = val;
            }
        }
    }
</script>


<style  lang='scss'   scoped>
    @import '../sass/common.scss';
    .cloud{
        position: relative;
        height:100%;
        /*text-align: center;*/
        background:url(http://static.ibigtop.com/static/img/login/logInbg.webp) no-repeat;
        background-size: cover;
        min-height:800px;
    }
    .bg_logo{
        background: url("http://static.ibigtop.com/static/img/login/biguo_logo.png") no-repeat;
        background-size: 100% 100%;
        width: 140px;
        height: 35px;
        position: absolute;
        top: 60px;
        left: 80px;
    }
    .login_footer{
        position: absolute;
        bottom: 50px;
        left: 0;
        color: $light_gray;
        font-size: 14px;
        text-align: center;
        width:100%;
        line-height: 1.5;
    }
</style>




