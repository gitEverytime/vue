<template>
    <div>
        <div class="transform_center">
        <div class="login_wrap">
            <h2 class="login_title">入驻申请</h2>
            <el-alert
                    v-if="remarks!==''"
                    :title="remarks"
                    :closable="false"
                    type="error"
                    show-icon>
            </el-alert>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

                <el-form-item label="" prop="sname">
                    <el-input v-model="ruleForm.sname" placeholder="商户名称"  class="login_el-input__inner"></el-input>
                </el-form-item>

                <el-form-item label="" prop="storeType">
                    <el-select v-model="ruleForm.storeType" placeholder="请选择商家类型" class="el_select_box">
                        <el-option
                                v-for="item in storeTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="" prop="bossName">
                    <el-input v-model="ruleForm.bossName" placeholder="BOSS姓名"   class="login_el-input__inner"></el-input>
                </el-form-item>

                <el-form-item label="" prop="ac1">
                    <el-cascader
                            :options="options"
                            v-model="region"
                            placeholder="选择省市区"
                            class="login_el-input__inner"
                    >
                    </el-cascader>
                </el-form-item>

                <el-form-item label="" prop="ac4">
                    <el-input v-model="ruleForm.ac4" placeholder="详细地址"  class="login_el-input__inner"></el-input>
                </el-form-item>

                <el-form-item label="" prop="attachs">
                    <el-button type="primary" @click="dialogVisible=true">上传资料</el-button><span class="prompt">*注:没有上传资料无法通过后台审核</span>
                </el-form-item>

                <el-form-item style="text-align:center;">
                    <el-button type="danger" @click="submitForm('ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
        <TempCertification
                :dialogVisible="dialogVisible"
                :attachs="ruleForm.attachs"
                @setDialogStatus="getDialogStatus"
                @setAttachs="getAttachs"
        >
        </TempCertification>
    </div>
</template>

<script>
    import REQ from "../global/request.js";
    import TempCertification    from './certification.vue'
    import { regionData, CodeToText } from 'element-china-area-data';
    import type from '../global/name_space.js'
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempCertification
        },
        props:{
            bossName:{
                type:String
            },
            phone:{
                type:String
            }
        },
        data(){
            return{
                storeTypeList:type.storeType,
                ruleForm: {
                    ac1:'',
                    ac2:'',
                    ac3:'',
                    ac4:'',
                    sname:'',
                    storeType: '',
                    bossName:this.bossName,
                    phone:this.phone,
                    attachs:'',
                    uid:roomInfo.uId
                },
                region:[],
                rules: {
                    ac1: [
                        { required: true, message: '省市区不能为空', trigger: 'change' }
                    ],
                    ac4: [
                        { required: true, message: '请填写所在详细街道信息', trigger: 'change' },
                    ],
                    region: [
                        { type: 'array', required: true, message: '请选择您所在省市', trigger: 'change' }
                    ],
                    sname: [
                        { required: true, message: '请填写商家名称', trigger: 'change' },
                    ],
                    storeType: [
                        { required: true, message: '请选择商户类型', trigger: 'change' },
                    ],
                    bossName: [
                        { required: true, message: '请填写商家名称', trigger: 'change' },
                    ],
                    attachs:[
                        { required: true, message: '请上传商家资料', trigger: 'change' },
                    ]
                },
                remarks:'',
                options:regionData,
                dialogVisible:false,
            }
        },
        watch:{
            bossName(val){
                this.ruleForm.bossName = val;
            },
            phone(val){
                this.phone = val
            },
            region(val){
                this.ruleForm.ac1 = val[0];
                this.ruleForm.ac2 = val[1];
                this.ruleForm.ac3 = val[2];
            }
        },
        mounted(){
            let vm = this;
            let info = vm.$store.getters.getApplyInfo;
            if(info.isApply && info.isApply === '1' && info.status === '2'){     //申请了但是未通过
                let applyInfo = info.applyInfo;
                //循环ruleForm里面的数据，如果存在相同的键名，把applyInfo对应键名的键值赋给ruleForm对应键名的键值
                Object.keys(vm.ruleForm).forEach((key) =>{
                    Object.keys(applyInfo).forEach(index => {
                        if(key === index) vm.ruleForm[key] = applyInfo[index]
                    })
                });
                /***
                 * 重新提交数据要加上applyId和storeId
                 * @type {*[]}
                 */
                vm.ruleForm['applyId'] = info.applyId;
                // vm.ruleForm['storeId'] = roomInfo.storeId;
                vm.region = [vm.ruleForm.ac1,vm.ruleForm.ac2,vm.ruleForm.ac3];  //地区码赋值region
                //错误提示数据提取
                vm.remarks = applyInfo.remarks;
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.reqStoreApply();
                    } else {
                        return false;
                    }
                });
            },
            getDialogStatus(val){
                this.dialogVisible = val;
            },
            /**
             * 把弹窗传过来的资料Array转化为String
             */
            getAttachs(val){
                this.ruleForm.attachs = JSON.stringify(val);
            },
            /**
             * 商家入驻申请
             */
            reqStoreApply(){
                let vm = this;
                let posData = vm.ruleForm;
                vm.REQ.reqStoreApply(posData,
                    function(data){
                        vm.$emit('setActiveIndex','5');
                        vm.$message.success("商家入驻申请已提交成功！")
                    },
                    function(data){},
                    function(data){}
                )
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common';
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
    .login_el-input__inner,.el_select_box{
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
    .text_left{
        text-align: left;
    }
    .prompt{
        display:inline-block;
        padding-left:10px;
        color:#f56c6c
    }
</style>