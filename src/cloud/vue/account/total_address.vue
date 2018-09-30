<template>
    <div class="store_name">
        <h3>总店地址&nbsp;&nbsp;&nbsp;&nbsp;<span>{{codeValue}}{{address}}</span></h3>
        <a href="javascript:;" @click='dialogVisible = true'>编辑</a>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改地址"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item label=""
                      prop="region"
                      :rules="[
                        { type: 'array', required: true, message: '省市区不能为空', trigger: 'change'},
                      ]"
                >
                    <el-cascader
                            :options="options"
                            v-model="oForm.region"
                    >
                    </el-cascader>
                </el-form-item>
                <el-form-item label=""
                              prop="address"
                              :rules="[
                                { required: true, message: '详细地址不能为空'},
                              ]"
                >
                    <el-input v-model="oForm.address" placeholder="请输入详细地址" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="danger" @click="submitForm('oForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data';
    export default {
        components:{

        },
        props:{
            codeValue:{
                type:String
            },
            address:{
                type:String
            },
            code:{
                type:Array
            }
        },
        data(){
            return{
                dialogVisible:false,
                options:regionData,
                oForm:{
                    region:this.code,
                    address:this.address
                }
            }
        },
        watch:{
            code(val){
                this.oForm.region = val;
            },
            address(val){
                this.oForm.address = val;
            }
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setAddressInfo',this.oForm);
                        this.dialogVisible = false;
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