<template>
    <el-dialog
        title="结算单"
        :visible.sync="dialogVisible1"
        width="450px"
        :before-close="handleClose"
        center
        class="unsettlement-dialog"
        >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="unsettlement-wrap">
                <h2 class="settle_title">商家信息<span></span></h2>
                <p>商户名称:{{baseInfo.sname}}</p>
                <p>boss姓名:{{baseInfo.bossName}}</p>
                <p>boss电话:{{baseInfo.phone}}</p>
                <p>订单号:{{baseInfo.orderNumber}}</p>
                <p>交易起止日期:{{dataMoment(baseInfo.startTime)}}至{{dataMoment(baseInfo.endTime)}}</p>
                <p>总金额:{{baseInfo.amount}}元</p>
                <p>手续费率:{{baseInfo.chargeScale}}</p>
                <p>手续金额:{{baseInfo.chargeAmount}}元</p>
                <p>结算金额:{{baseInfo.settleAmount}}元</p>
                <h2 class="settle_title">开户人信息<span></span></h2>
                <p>开户人姓名:{{baseInfo.createdBy}}</p>
                <p>开户人电话:{{baseInfo.createdPhone}}</p>
                <h2 class="settle_title">支付方式<span></span></h2>
                <el-radio-group v-model="type">
                    <el-radio :label="3">银行卡支付</el-radio>
                    <el-radio :label="5" disabled>现金支付</el-radio>
                    <el-radio :label="1" disabled>微信支付</el-radio>
                </el-radio-group>
                <div class="" v-if="type === 3">
                    <h2 class="name_title">打款方</h2>
                    <div v-if="makeMoneyList.length>0">
                        <el-form-item label="银行卡" prop="makerInfo">
                            <el-select v-model="ruleForm.makerInfo" placeholder="请选择一张银行卡"  class="samll_select">
                                <el-option
                                    v-for="item in makeMoneyList"
                                    :key="item.id"
                                    :label="item.bankName+item.cardNo"
                                    :value="item.bankName+','+item.cardNo+','+item.holderName+','+item.phone">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div v-if="ruleForm.makerInfo">
                            <p>银行名称:{{ruleForm.makerInfo.split(',')[0]}}</p>
                            <p>银行卡号:{{ruleForm.makerInfo.split(',')[1]}}</p>
                            <p>持卡人:{{ruleForm.makerInfo.split(',')[2]}}</p>
                            <p>电话:{{ruleForm.makerInfo.split(',')[3]}}</p>
                        </div>
                    </div>
                    <h2 class="name_title">收款方</h2>
                    <div v-if="payList.length>0">
                        <el-form-item label="银行卡" prop="payInfo">
                            <el-select v-model="ruleForm.payInfo" placeholder="请选择一张银行卡"  class="samll_select">
                                <el-option
                                        v-for="item in payList"
                                        :key="item.id"
                                        :label="item.bankName+item.cardNo"
                                        :value="item.bankName+','+item.cardNo+','+item.holderName+','+item.phone">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div v-if="ruleForm.payInfo">
                            <p>银行名称:{{ruleForm.payInfo.split(',')[0]}}</p>
                            <p>银行卡号:{{ruleForm.payInfo.split(',')[1]}}</p>
                            <p>持卡人:{{ruleForm.payInfo.split(',')[2]}}</p>
                            <p>电话号码:{{ruleForm.payInfo.split(',')[3]}}</p>
                        </div>
                    </div>
                </div>
                <h2 class="settle_title">财务信息<span></span></h2>
                <el-form-item label="凭证编号" prop="tradeNo">
                    <el-input v-model="ruleForm.tradeNo"></el-input>
                </el-form-item>
                <el-form-item label="上传凭证" prop="attach">
                    <el-upload
                            class="upload-demo"
                            action="http://static.ibigtop.com/res/upload"
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture"
                    >
                        <el-button size="small" type="danger" :disabled="fileList.length>0">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="操作人" prop="operator">
                    <el-input v-model="ruleForm.operator"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="operatorTel">
                    <el-input v-model="ruleForm.operatorTel"></el-input>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import moment  from 'moment'
    import REQ from "../../vue/global/request.js";
    import regular  from   '../../vue/global/regular.js'
    export default {
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean
            },
            baseInfo:{
                type:Object
            }
        },
        data(){
            return{
                dialogVisible1:this.dialogVisible,
                type:3,
                makeMoneyList:[],
                payList:[],
                payInfo:'',
                ruleForm: {
                    makerInfo: '',
                    payInfo:'',
                    attach:'',
                    operator:'',
                    operatorTel:'',
                    tradeNo:''
                },
                rules: {
                    makerInfo: [
                        {required: true, message: '请选择您的银行卡', trigger: 'change' },
                    ],
                    payInfo: [
                        {required: true, message: '请选择您的银行卡', trigger: 'change' },
                    ],
                    attach: [
                        {required: true, message: '请上传附件图片', trigger: 'change' },
                    ],
                    tradeNo: [
                        {required: true, message: '请填写凭证单号', trigger: 'change' },
                    ],
                    operator: [
                        {required: true, message: '请填写操作人姓名', trigger: 'change' },
                    ],
                    operatorTel: [
                        {required: true,validator:regular.validateNumber, trigger: 'change' },
                    ],
                },
                fileList: [],
            }
        },
        watch:{
            dialogVisible(val){
                this.dialogVisible1 = val;
                if(val) {
                    this.getBankcardFindAll();
                    this.getBankcardInfo();
                }
            },
            fileList(val){
                // this.ruleForm.attach = JSON.stringify(val);
            }
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            }
        },
        mounted(){
        },
        methods:{
            handleClose(done){
                this.$emit('setDialogStatus',this.dialogVisible1);
                done();
            },
            dataMoment(date){
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            /**
             * 获取当前登录人的银行卡信息
             */
            getBankcardFindAll(){
                let vm = this;
                let postData = {
                    relatId:JSON.parse(vm.$store.getters.getCurInfo).relatId
                };
                REQ.reqBankcardFindAll(postData,
                    (result) => {
                        vm.makeMoneyList = result.data;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 获取当前收款人的银行卡信息
             */
            getBankcardInfo(){
                let vm = this;
                let postData = {
                    relatId:vm.baseInfo.relatId
                };
                REQ.reqBankcardFindAll(postData,
                    (result) => {
                        vm.payList = result.data;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.sureMakeSettle(formName);
                    } else {
                        return false;
                    }
                });
            },

            /**
             * 确认结算
             */
            sureMakeSettle(formName){
                this.$confirm('确认结算吗？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postFinanceMakeSettle(formName);
                }).catch(() => {
                });
            },

            /**
             * 结算
             */
            postFinanceMakeSettle(formName){
                let vm = this;
                let postData = {
                    id:vm.baseInfo.orderNumber,
                    payType:vm.type,
                    type:1,
                    tradeNo:vm.ruleForm.tradeNo,
                    attach:vm.ruleForm.attach,
                    operator:vm.ruleForm.operator,
                    operatorTel:vm.ruleForm.operatorTel,
                    bankCardNo:vm.ruleForm.makerInfo.split(',')[1],
                    bankName:vm.ruleForm.makerInfo.split(',')[0],
                    bankCardHolder:vm.ruleForm.makerInfo.split(',')[2],
                    tBankCardNo:vm.ruleForm.payInfo.split(',')[1],
                    tBankName:vm.ruleForm.payInfo.split(',')[0],
                    tBankCardHolder:vm.ruleForm.payInfo.split(',')[2]
                };
                REQ.reqFinanceMakeSettle(postData,
                    (result) => {
                        vm.$message.success(`订单${vm.baseInfo.orderNumber}结算成功！`);
                        vm.$emit('setDialogStatus',false);
                        //刷弹窗数据/刷list数据/
                        vm.$refs[formName].resetFields();
                        vm.fileList = [];
                        vm.$store.commit('setIsSettle',true);
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 上传成功回调
             * @param file
             */
            handleSuccess(file){
                this.fileList.push({
                    name:'',
                    url:file.response.data
                });
                this.ruleForm.attach = file.response.data;
            },
            /**
             * 删除图片回调
             * @param file
             * @param fileList
             */
            handleRemove(file, fileList) {
                this.fileList.forEach((item,key) => {
                    if(item.url === file.url) this.fileList.splice(key,1);
                });
                this.ruleForm.attach = '';
            },
        }
    }
</script>

<style scoped>

</style>