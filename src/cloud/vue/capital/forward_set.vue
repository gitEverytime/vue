<template>
    <div class="forward_wrap">
        <h1 class="com_title">银行卡<span>仅限一张银行卡</span></h1>
        <el-button type="primary" @click="insertBankCardEvent">+添加银行卡</el-button>
        <TempBaseBankMsg
                v-if="JSON.stringify(bankMsg) !== '{}'"
        >

        </TempBaseBankMsg>
        <TempBankCard
                :dialogVisible1="dialogVisible"
                @setDialogStatus="dialogStatus"
        >
        </TempBankCard>
    </div>
</template>

<script>
    import TempBankCard from './inset_bank_card.vue'
    import TempBaseBankMsg from './base_bank_msg.vue'
    export default {
        components:{
            TempBankCard,
            TempBaseBankMsg
        },
        data(){
            return{
                dialogVisible:false,
                bankMsg:{

                }
            }
        },

        mounted(){

        },
        methods:{
            insertBankCardEvent(){
                this.dialogVisible = true;
            },
            dialogStatus(val){
                this.dialogVisible = val;
            }
        }
    }
</script>

<style scoped>

</style>