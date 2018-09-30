<template>
    <el-dialog
            title="添加/修改银行卡"
            :visible.sync="dialogVisible1"
            width="400px"
            :before-close="handleClose"
            center
            class="unsettlement-dialog"
    >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="银行名称" prop="bankName">
                <el-select v-model="bankInfo" placeholder="请选择" @change="selectBank">
                    <el-option
                            v-for="item in bankList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code+','+item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分行名称">
                <el-input v-model="ruleForm.subBank"></el-input>
            </el-form-item>
            <el-form-item label="持有人姓名" prop="holderName">
                <el-input v-model="ruleForm.holderName"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号" prop="cardNo">
                <el-input v-model="ruleForm.cardNo"></el-input>
            </el-form-item>
            <el-form-item label="证件类型名称" prop="certName">
                <el-select v-model="identInfo" placeholder="请选择" @change="selectIdent">
                    <el-option
                            v-for="item in identList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code+','+item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certNo">
                <el-input v-model="ruleForm.certNo"></el-input>
            </el-form-item>
            <el-form-item label="银行预留手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="code" v-if="isUpdate">
                <el-input v-model="ruleForm.code" class="code_text"></el-input>
                <el-button type="warning" size="small" @click="getSmsCode" :disabled="disabled">{{message}}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import REQ from "../../vue/global/request.js";
    import type    from      '../../vue/global/name_space.js'
    import regular  from   '../../vue/global/regular.js'
    export default {
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean
            },
            getBankList:{
                type:Object
            },
            isUpdate:{
                type:Boolean
            }
        },
        data(){
            return{
                dialogVisible1:this.dialogVisible,
                ruleForm:{
                    cardNo:'',
                    holderName:'',
                    bankType:'',
                    bankName:'',
                    subBank:'',
                    certName:'',
                    certType:'',
                    certNo:'',
                    phone:'',
                    code:''
                },
                bankList:type.bankList,
                identList:type.identList,
                bankInfo:'',
                identInfo:'',
                rules:{
                    certNo: [
                        {required: true,validator:regular.validateIDcard, trigger: 'change' },
                    ],
                    phone: [
                        {required: true,validator:regular.validateNumber, trigger: 'change' },
                    ],
                    bankName:[
                        {required: true, message: '请选择银行类型', trigger: 'change' },
                    ],
                    certName:[
                        {required: true, message: '请选择证件类型', trigger: 'change' },
                    ],
                    subBank:[
                        {required: true, message: '请输入分行名称', trigger: 'change' },
                    ],
                    holderName:[
                        {required: true, message: '银行卡持有人姓名不能为空', trigger: 'change' },
                    ],
                    cardNo:[
                        {required: true,validator:regular.validateBank, trigger: 'change' },
                    ],
                    code:[
                        {required: true, message: '请输入短信验证码', trigger: 'change' },
                    ],

                },
                message:'获取验证码',
                s:0,
                disabled:false

            }
        },
        watch:{
            dialogVisible(val){
                this.dialogVisible1 = val;
            },
            //判断是否是更新操作
            isUpdate(val){
                let vm = this;
                if(val){     //如果是更新操作
                    vm.ruleForm =  JSON.parse(JSON.stringify(vm.getBankList));
                    vm.bankInfo = `${vm.ruleForm.bankType},${vm.ruleForm.bankName}`;
                    vm.identInfo = `${vm.ruleForm.certType},${vm.ruleForm.certName}`
                }else {
                    Object.keys(vm.ruleForm).forEach((item) => vm.ruleForm[item] = '');
                    vm.bankInfo = '';
                    vm.identInfo = '';
                }
            }
        },
        mounted(){

        },
        methods:{
            //  弹窗关闭时的回调函数
            handleClose(done){
                done();
                this.$emit('setDialogStatus',false);
            },
            /**
             * 前端校验
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isUpdate ? this.reqBankcardUpdate(formName) : this.postBankcardAdd(formName);
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 添加银行卡
             */
            postBankcardAdd(formName){
                let vm = this;
                let postData = vm.ruleForm;
                postData['relatId'] = JSON.parse(vm.$store.getters.getCurInfo).relatId;
                REQ.reqBankcardAdd(postData,
                    (result) => {
                        vm.$message.success("成功添加一张银行卡！");
                        vm.$emit('setDialogStatus',false);
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 更新银行卡信息
             */
            reqBankcardUpdate(formName){
                let vm = this;
                let postData = vm.ruleForm;
                postData['relatId'] = JSON.parse(vm.$store.getters.getCurInfo).relatId;
                REQ.reqBankcardUpdate(postData,
                    (result) => {
                        vm.$message.success("更新银行卡信息成功！");
                        vm.$emit('setDialogStatus',false);
                        vm.$refs[formName].resetFields();
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 选择银行卡
             */
            selectBank(){
                let vm = this;
                if(vm.bankInfo){
                    vm.ruleForm.bankType = vm.bankInfo.split(',')[0];
                    vm.ruleForm.bankName = vm.bankInfo.split(',')[1];
                }
            },
            /**
             * 选择证件
             */
            selectIdent(){
                let vm = this;
                if(vm.identInfo){
                    vm.ruleForm.certName = vm.identInfo.split(',')[1];
                    vm.ruleForm.certType = vm.identInfo.split(',')[0];
                }
            },
            //获取手机短信验证码
            getSmsCode(){
                let vm = this;
                let postData = {};
                REQ.reqSmsSendVerify(postData,
                    (result) => {
                        vm.getCode();
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            //倒计时60s
            getCode(){
                let s = 60;
                let m = setInterval(()=>{
                    if(s === 0){
                        this.message = '获取验证码';
                        s = 60;
                        this.disabled = false;
                        clearInterval(m);
                    }else{
                        s--;
                        this.disabled = true;
                        this.message = `重新发送(${s})`;
                    }
                },1000)
            }
        }
    }
</script>

<style scoped>

</style>