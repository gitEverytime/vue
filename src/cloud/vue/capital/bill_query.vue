<template>
    <div class="bill_wrap">
        <h1 class="com_title">账单查询<span>此处显示上一次结账后累积到目前款项</span></h1>
        <div class="billText">
        <h3>总营业额:{{}}元</h3>
        <span>正式使用日期{{}}</span>
        </div>
        <el-row>
            <el-col :span="6">
                <div class="billText">
                    <h3>总营业额:{{}}元</h3>
                    <span>上一次提现日期{{}}</span>
                </div>
            </el-col>
            <el-col :span="18">
                <a href="javascript:;"
                   class="forward_history"
                   @click="dialogVisible = true"
                >提现历史</a>
            </el-col>
        </el-row>
        <TempDislogForward
                :dialogVisible1="dialogVisible"
                @setStatus="getStatus"
        ></TempDislogForward>
    </div>

</template>

<script>
    import TempDislogForward from './dialog_forwradList.vue'
    export default {
        components:{
            TempDislogForward
        },
        data(){
            return{
                dialogVisible:false
            }
        },
        mounted(){

        },
        methods:{
            getStatus(val){
                this.dialogVisible = val;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../sass/common.scss';
    .bill_wrap{
        .billText{
            padding-bottom: 20px;
            h3{
                color: $green;
                font-size: 20px;
            }
            span{
                color: #787B80;
            }
        }
        .forward_history{
            color: $orange;
            text-decoration: underline;
            font-size: 16px;
        }
    }
</style>