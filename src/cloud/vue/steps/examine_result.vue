<template>
    <div class="transform_center">
        <div class="login_wrap">
            <div class="success_icon"><i class="el-icon-success"></i></div>
            <h2 class="login_title">提交成功</h2>
            <p class="examine_msg">尊敬的<span>{{phoneNum}}</span>用户，您的入驻申请信息已提交，我们正在审核您的资料，审核时间(1-7个工作日)，请稍后...</p>
            <el-button type="primary" @click="backReg">返回官网</el-button><el-button type="danger" @click="backWebsite">去登录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        components:{

        },
        props:{
            phone:{
                type:String
            }
        },
        data(){
            return{
                phoneNum:this.phone
            }
        },
        watch:{
            phone(val){
                this.phoneNum = val;
            }
        },
        computed:{
        },
        mounted(){
        },
        methods:{
            backReg(){
                window.location.href="http://www.ibigtop.com/"
            },
            backWebsite(){
                window.location.href="/admin/api/page/login"
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common';
    .login_wrap{
        padding: 40px 50px;
        background-color: rgba(0,0,0,0.4);
        text-align:center;
        border-radius: 10px;
        .login_title{
            color: $green;
            font-size: 18px;
            padding-bottom: 30px;
        }
        .mar_t_30{
            margin-top: 40px;
        }
        .examine_msg{
            color: #FFFFFF;
            text-align: center;
            padding-bottom: 30px;
            line-height: 1.9;
            width: 520px;
            span{
                color: $green;
            }
        }
        .success_icon{
            margin-bottom: 10px;
            .el-icon-success{
                color: $green;
                font-size: 27px;
            }
        }
    }

</style>