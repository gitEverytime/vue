<template>
    <div class="store_name">
        <h3>BOSS电话&nbsp;&nbsp;&nbsp;&nbsp;<span>{{bossPhone}}</span></h3>
        <a href="javascript:;" @click='dialogVisible = true'>编辑</a>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改BOSS电话"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="bossTel"
                        :rules="[
                           {validator: validatePass3, trigger: 'change' },
                        ]"
                >
                    <el-input v-model="oForm.bossTel" placeholder="请输入BOSS电话" auto-complete="off"></el-input>
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
            bossPhone:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    bossTel:this.bossPhone
                }
            }
        },
        watch:{
            bossPhone(val){
                this.oForm.bossTel = val;
            }
        },
        mounted(){

        },
        methods:{
            validatePass3(rule, value, callback){
                const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (value === '') {
                    callback(new Error('请输入您的手机号'));
                } else if (!reg.test(value)) {
                    callback(new Error('手机号码格式不正确'));
                } else {
                    callback();
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setBossPhone',this.oForm.bossTel);
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