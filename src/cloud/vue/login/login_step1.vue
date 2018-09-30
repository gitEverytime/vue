<template>
    <div class="login_wrap transform_center">
        <h2 class="login_title">登录毕果</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item label="" prop="phone">
                <el-input
                        v-model="ruleForm.phone"
                        placeholder="输入手机号"
                        size="mini"
                        class="login_el-input__inner"
                ></el-input>
            </el-form-item>
            <el-form-item label="" prop="pwd">
                <el-input
                        v-model="ruleForm.pwd"
                        placeholder="输入密码"
                        size="mini"
                        type="password"
                        class="login_el-input__inner"
                        @keyup.enter.native="submitForm('ruleForm')"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
        <!--<a class="loginJump" href="/admin/api/page/reg">-->
            <!--忘记密码 丨-->
        <!--</a>-->
        <a  class="loginJump" href="/admin/api/page/reg">
            注册毕果
        </a>
    </div>
</template>

<script>
    import cookie from '../global/cookie.js'
    import base64   from '../global/base64.js'
    export default {

        components:{
        },
        data(){
            let validatePass3 = (rule, value, callback) => {
                const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (value === '') {
                    callback(new Error('请输入您的手机号'));
                } else if (!reg.test(value)) {
                    callback(new Error('手机号码格式不正确'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                let reg = /^[a-zA-Z]([a-zA-Z0-9]{5,20})$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!reg.test(value)){
                    callback(new Error('请输入字母开头，英文和数字混合的6-20位数字'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    phone: '',
                    pwd:'',
                },
                rules: {
                    phone: [
                        {validator: validatePass3, trigger: 'change' },
                    ],
                    pwd: [
                        { validator: validatePass, trigger: 'change' },
                    ],
                },
                isChecked:false
            }
        },
        computed:{

        },

        mounted(){
            console.log('')

        },

        methods:{
            /**
             * 校验
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {                                      //前端验证通过
                        if(this.isChecked){return}       //阻止重复请求接口
                        this.isChecked = true;
                        this.reqLoginApi();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 登录
             */
            reqLoginApi(){
                let vm = this;
                let posData = {
                    phone: vm.ruleForm.phone,
                    pwd:base64.encode(vm.ruleForm.pwd),
                    // pwd:vm.ruleForm.pwd
                };
                vm.REQ.reqLogin(posData,
                    function(result){
                        let oResult = result.data;
                        vm.isChecked = false;
                        vm.$emit('setPhone', vm.ruleForm.phone);
                        if(oResult.isApply === '0'){       //如果没有选择类型先去选择类型页面
                            vm.$message.warning("您还没有选择角色类型！");
                            vm.$emit('setActiveIndex','2');
                        }else {
                            vm.isApplyFunc(oResult);        //如果申请了处理请求函数
                        }
                    },
                    function(data){
                        vm.isChecked = false;
                    },
                    function(data){
                        vm.isChecked = false;
                        //todo  error
                    }
                )
            },
            /**
             * 申请处理
             * @param oResult
             */
            isApplyFunc(oResult){
                let vm = this;
                switch (oResult.status) {
                    //说明：0，资料正在审核   1，审核通过   2，审核未通过   3，冻结
                    case '0':
                        vm.$message.warning("您的资料在审核中，请稍后...");
                        break;
                    case '1':
                        //说明：applyType === '400'跳转商家后台并带storeId参数和userId,否则跳代理后台带proxyId和userId
                        if(oResult.applyType === '400') window.location.href = `/admin/api/page/main?userId=${oResult.userId}`;
                        if(oResult.applyType === '300' || oResult.applyType === '200' || oResult.applyType === '201') window.location.href = `/admin/api/page/main?userId=${oResult.userId}#/user/center`;
                        break;
                    case '2':
                        vm.$message.warning("您的申请资料审核未通过！");
                        if(oResult.applyType === '400'){                                 //商家去商家申请信息页面
                            vm.$emit('setActiveIndex','3');
                            vm.$store.commit('setApplyInfo',oResult)
                        }
                        if(oResult.applyType === '200' || oResult.applyType === '201'){   //代理去代理申请信息页面
                            vm.$emit('setActiveIndex','4');
                            vm.$store.commit('setApplyInfo',oResult)
                        }
                        break;
                    case '3':
                        vm.$message.warning("您的账户已被冻结，请联系管理员尝试解冻！");
                        break;
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common.scss';
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
    .loginJump{
        color: #FFFFFF;
        font-size: 16px;
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