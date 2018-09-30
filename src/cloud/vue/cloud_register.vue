<template>
    <div class="cloud">
        <div class="bg_logo"></div>
        <TempRegStep1
                v-if="activeIndex === '1'"
                @setActiveIndex="getActiveIndex"
                @setPhone="getPhone"
        ></TempRegStep1>

        <TempRegStep2
                v-if="activeIndex === '2'"
                @setActiveIndex="getActiveIndex"
                @setBossName="getBossName"
                @setApplyType="getApplyType"
        ></TempRegStep2>

        <TempRegStore
                v-if="activeIndex === '3'"
                @setActiveIndex="getActiveIndex"
                :bossName="bossName"
                :phone="phone"
        ></TempRegStore>

        <TempRegAgent
                v-if="activeIndex === '4'"
                @setActiveIndex="getActiveIndex"
                :applyType="applyType"
                :bossName="bossName"
                :phone="phone"
        ></TempRegAgent>

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
    import TempRegStep1  from '../vue/reg/reg_step1.vue'
    import TempRegStep2  from '../vue/steps/reg_step2.vue'
    import TempRegStore  from '../vue/steps/store_apply.vue'
    import TempRegAgent  from '../vue/steps/agent_apply.vue'
    import TempExamineResult  from './steps/examine_result.vue'
    export default {
        components:{
            TempRegStep1,
            TempRegStep2,
            TempRegStore,
            TempRegAgent,
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
    .s-canvas{
        display:inline-block;
    }
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
    .p_code_wrap{
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .m_code_wrap{
        position: relative;
        //获取验证码
        .get_code{
            position: absolute;
            top: 10px;
            right: 0;
            color: $green;
            cursor: pointer;
            padding-right: 10px;
            display: inline-block;
            background-color: transparent;
            &:focus{
                outline: -webkit-focus-ring-color auto 0;
            }
        }
        .grayColor{
            color: $light_gray;
            cursor: default;
        }
    }
    .loginJump{
        color: #FFFFFF;
        font-size: 16px;
    }
    .login_el-input__inner{
        width: 350px;
    }
    .el-button--danger{
        padding: 12px 30px;
    }
    .login_wrap{
        padding: 40px 50px;
        background-color: rgba(0,0,0,0.4);
        text-align:center;
        border-radius: 10px;
        .login_title{
            color: $green;
            font-size: 18px;
            padding-bottom: 40px;
        }
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




