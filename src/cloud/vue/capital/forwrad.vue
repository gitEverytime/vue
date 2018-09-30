<template>
    <div class="forwrad_wrap">
        <h1 class="com_title">提现<span>提现金额必须为100的倍数，银行卡提现需T+7方可，微信提现实时到账，建议使用微信支付</span></h1>
        <el-row>
            <el-col :span="4" class="p_b_20">
                <el-radio v-model="radio" label="1">银行卡提现</el-radio>
            </el-col>
            <el-col :span="20" class="p_b_20">
                <a href="javascript:;" class="wechat_forward" @click="dialogVisible = true">微信提现</a>
                <a href="javascript:;" class="forwrad_prompt" @click="forwardVisible = true">提现说明</a>
            </el-col>
        </el-row>
        <TempSaveText text="提现金额" value="全部" :propsSaveText="text" @inputVal="setAll" class="p_b_20"></TempSaveText>
        <el-button type="danger">确认</el-button>

        <TempDialogWechat
                :dialogVisible1="dialogVisible"
                @setSatus="setDialogWechat"
        ></TempDialogWechat>

        <TempDialogForward
                :forwardVisible1="forwardVisible"
                @setForwardStatus="getForwardStatus"
        >

        </TempDialogForward>
    </div>
</template>

<script>
    import TempSaveText from '../components/save_Text.vue'
    import TempDialogWechat from './dialog_wechat.vue'
    import TempDialogForward from './dialog_forward.vue'
    export default {
        components:{
            TempSaveText,
            TempDialogWechat,
            TempDialogForward
        },
        data(){
            return{
                radio:'',
                text:'24000',
                dialogVisible:false,
                forwardVisible:false
            }
        },
        mounted(){

        },
        methods:{
            setAll(){

            },
            setDialogWechat(val){
                this.dialogVisible = val;
            },
            getForwardStatus(val){
                this.forwardVisible = val;
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common.scss';
    .forwrad_wrap{
        .wechat_forward{
            color: $green;
            text-decoration: underline;
            font-size:14px;
        }
        .forwrad_prompt{
            color: $orange;
            text-decoration: underline;
            font-size:14px;
            display:inline-block;
            margin-left:20px;
        }
        .p_b_20{
            padding-bottom: 20px;
        }
    }
</style>