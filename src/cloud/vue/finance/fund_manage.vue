<template>
    <div class="box">
        <el-row v-if="JSON.stringify(getBankList) === '{}'">
            <el-col :span="20">
                <h2 class="new_title">支付方式<span>仅限一张银行卡</span></h2>
                <el-button type="primary" icon="el-icon-circle-plus" @click="addBank">添加银行卡</el-button>
            </el-col>
            <el-col :span="4">
            </el-col>
        </el-row>
        <h2 class="new_title">银行卡信息</h2>
        <el-row v-if="JSON.stringify(getBankList) !=='{}'">
            <el-col :span="20">
                <div >
                    <p class="item"><span>银行名称:</span>{{getBankList.bankName}}</p>
                    <p class="item"><span>分行名称:</span>{{getBankList.subBank}}</p>
                    <p class="item"><span>持有人姓名:</span>{{getBankList.holderName}}</p>
                    <p class="item"><span>银行卡编号:</span>{{getBankList.cardNo}}</p>
                    <p class="item"><span>证件类型名称:</span>{{getBankList.certName}}</p>
                    <p class="item"><span>证件号码:</span>{{getBankList.certNo}}</p>
                    <p class="item"><span>银行预留手机号:</span>{{getBankList.phone}}</p>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" @click="updateFund">修改</el-button>
            </el-col>
        </el-row>
        <TempFundDialog
            :dialogVisible="dialogVisible"
            @setDialogStatus="getDialogStatus"
            :isUpdate="isUpdate"
            :getBankList="getBankList"
        >

        </TempFundDialog>
    </div>
</template>

<script>
    import TempFundDialog   from   './fund_dialog.vue'
    import REQ from "../../vue/global/request.js";
    export default {
        components:{
            TempFundDialog
        },
        data(){
            return{
                dialogVisible:false,
                isUpdate:false,
                getBankList:{}
            }
        },
        watch:{
            curInfo(val){
                if(val) this.getBankcardFindAll();
            }
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            }
        },
        mounted(){
            if(this.$store.getters.getCurInfo){
                this.getBankcardFindAll();
            }
        },
        methods:{
            /**
             * 添加银行卡
             */
            addBank(){
                this.dialogVisible = true;
                this.isUpdate = false;
            },
            /**
             * 更新银行卡
             */
            updateFund(){
                this.dialogVisible = true;
                this.isUpdate = true;
            },
            getDialogStatus(val){
                this.dialogVisible = val;
                this.getBankcardFindAll();
            },
            /**
             * 获取当前登录人的银行卡信息
             */
            getBankcardFindAll(){
                let vm = this;
                let postData = {
                    relatId:JSON.parse(vm.$store.getters.getCurInfo).relatId
                };
                REQ.reqBankcardFindOne(postData,
                    (result) => {
                        vm.getBankList = result.data;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .box{
        padding: 0 30px;
        .item{
            color: #FFFFFF;
            padding: 5px 0;
            span{
                color: $green;
                display: inline-block;
                width: 150px;
            }
        }
    }
</style>