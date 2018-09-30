<template>
    <div class="store_name">
        <h3>总店名称&nbsp;&nbsp;&nbsp;&nbsp;<span>{{sname}}</span></h3>
        <a href="javascript:;" @click='dialogVisible = true'>编辑</a>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改店名"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="storeName"
                        :rules="[
                           {validator: validatePass3, trigger: 'change' },
                        ]"
                >
                    <el-input v-model="oForm.storeName" placeholder="请输入店名" auto-complete="off"></el-input>
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
            sname:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    storeName: this.sname
                }
            }
        },
        watch:{
            sname(val){
                this.oForm.storeName = val
            }
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setStoreName',this.oForm.storeName);
                        this.dialogVisible = false
                    } else {
                        return false;
                    }
                });
            },
            validatePass3(rule, value, callback){
                // const reg = /^[\u4E00-\u9FA5]+$/;
                if (value === '') {
                    callback(new Error('请输入店铺名称'));
                } else if (this.getStrLength(value)>16) {
                    callback(new Error('输入的字符长度过长'));
                } else {
                    callback();
                }
            },
            getStrLength(str){
                return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
            }
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