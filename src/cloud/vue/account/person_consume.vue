<template>
    <div class="store_name">
        <h3>人均消费&nbsp;&nbsp;&nbsp;&nbsp;<span>{{consum}}元</span></h3>
        <a href="javascript:;" @click="dialogVisible=true">编辑</a>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改人均消费金额"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="money"
                        :rules="[
                            { required: true, message: '消费金额不能为空'},
                            { type: 'number', message: '消费金额必须为数字值'}
                        ]"
                >
                    <el-input v-model.number="oForm.money" placeholder="请输入消费金额" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="danger" @click="submitForm('oForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        components:{

        },
        props:{
            consum:{
                type:Number
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    money:0
                }
            }
        },
        watch:{
            consum(val){
                this.oForm.money = val;
            }
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setConsum',this.oForm.money);
                        this.dialogVisible = false
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .store_name{
        padding: 20px 0;
        @include layout-flex-r-sb;
        border-bottom:$green solid 1px;
        h3{
            font-size: 14px;
            color: #FFFFFF;
            span{
                color: $orange;
            }
        }
        a{
            color: $green;
            font-size: 14px;
        }
    }
</style>