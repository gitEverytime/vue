<template>
    <div class="transform_center">
        <div class="login_wrap">
            <h2 class="login_title">注册毕果</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item label="" prop="phone">
                    <el-input
                            v-model="ruleForm.phone"
                            placeholder="输入手机号"
                            prefix-icon="icon-jcf-phone iconfont"
                            size="mini"
                            class="login_el-input__inner"
                    ></el-input>
                </el-form-item>
                <el-form-item label="" >
                    <div class="p_code_wrap">
                        <el-input
                                v-model="codeVal"
                                placeholder="图片验证码"
                                prefix-icon="icon-tupianyanzhengma iconfont"
                                size="mini"
                                class="login_el-input__inner w175"
                        ></el-input>
                        <i class="el-icon-refresh refreshIcon" @click="refreshCode"></i>
                        <SIdentify :identifyCode="identifyCode" ></SIdentify>
                    </div>
                </el-form-item>
                <!--<el-form-item label="" prop="safeCode">-->
                    <!--<div class="m_code_wrap">-->
                        <!--<el-input-->
                                <!--v-model.number="ruleForm.safeCode"-->
                                <!--placeholder="手机验证码"-->
                                <!--prefix-icon="icon-shoujiyanzhengma iconfont"-->
                                <!--size="mini"-->
                                <!--class="login_el-input__inner"-->
                        <!--&gt;</el-input>-->
                        <!--<button class="get_code"-->
                                <!--:disabled="disabled"-->
                                <!--@click="getCode"-->
                                <!--:class="{'grayColor':disabled}"-->
                        <!--&gt;{{code}}</button>-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <el-form-item label="" prop="pwd">
                    <el-input
                            v-model="ruleForm.pwd"
                            placeholder="设置密码"
                            prefix-icon="icon-shezhimima iconfont"
                            type="password"
                            size="mini"
                            class="login_el-input__inner"
                    ></el-input>
                </el-form-item>
                <el-form-item label="" prop="confirmPwd">
                    <el-input
                            v-model="ruleForm.confirmPwd"
                            placeholder="确认密码"
                            prefix-icon="icon-shezhimima iconfont"
                            type="password"
                            size="mini"
                            class="login_el-input__inner"
                            @keyup.enter.native="submitForm('ruleForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')">注册</el-button>
                </el-form-item>
            </el-form>
            <a  class="loginJump" href="/admin/api/page/login">
                登录毕果
            </a>
        </div>
    </div>
</template>

<script>
    import SIdentify  from './identify.vue'
    import REQ     from "../global/request.js";
    import reg     from '../global/regular.js'
    import base64   from '../global/base64.js'
    const roomInfo = window.UINFO;
    export default {
        components:{
            SIdentify
        },
        data(){
            var validatePass = (rule, value, callback) => {
                let reg = /^[a-zA-Z]([a-zA-Z0-9]{5,19})$/;
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!reg.test(value)){
                    callback(new Error('请输入字母开头，英文和数字混合的6-20位数字'));
                } else {
                    if (this.ruleForm.confirmPwd !== '') {
                        this.$refs.ruleForm.validateField('confirmPwd');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
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
            return{
                ruleForm: {
                    phone: '',
                    pwd:'',
                    confirmPwd:'',
                    safeCode:''
                },
                codeVal:'',
                rules: {
                    phone: [
                        {validator: validatePass3, trigger: 'change' },
                    ],
                    pwd: [
                        { validator: validatePass, trigger: 'change' },
                    ],
                    confirmPwd: [
                        { validator: validatePass2, trigger: 'change' }
                    ],
                },
                code:'获取验证码',
                identifyCodes: "1234567890",
                identifyCode:'',
                disabled:false,
                isChecked:false,
                active:1,
                phone:''
            }
        },
        computed:{

        },

        mounted(){
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {                                      //前端验证通过
                        if(this.codeVal !== this.identifyCode) {      //验证码校验
                            this.$message({
                                message: '图形验证码校验不一致！请重新输入',
                                type: 'warning'
                            });
                            this.refreshCode();     //刷新验证码
                            return
                        }
                        if(this.isChecked){return}       //阻止重复请求接口
                        this.isChecked = true;
                        this.reqRegister();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**
             * 注册接口请求
             */
            reqRegister(){
                let vm = this;
                let posData = {
                    phone: vm.ruleForm.phone,
                    pwd:base64.encode(vm.ruleForm.pwd),
                    confirmPwd:base64.encode(vm.ruleForm.confirmPwd),
                    safeCode:vm.ruleForm.safeCode
                };
                REQ.reqEnterReg(posData,
                    function(result){
                        vm.isChecked = false;
                        vm.phone = result.data.phone;
                        vm.$message.success("注册成功！");
                        vm.$emit('setActiveIndex','2');
                        vm.$emit('setPhone', result.data.phone);
                    },
                    function(data){
                        vm.isChecked = false;
                    },
                    function(data){}
                )
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                    ];
                }
            },
            getCode(){
                let s = 60;
                let m = setInterval(()=>{
                    if(s === 0){
                        this.code = '获取验证码';
                        s = 60;
                        this.disabled = false;
                        clearInterval(m);
                    }else{
                        s--;
                        this.disabled = true;
                        this.code = `重新发送(${s})`;
                    }
                },1000)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common.scss';
    .s-canvas{
        display:inline-block;
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