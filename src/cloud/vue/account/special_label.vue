<template>
    <div class="store_logo">
        <div class="logo_title">
            <p>特色标签</p><a href="javascript:;" @click="dialogVisible=true">编辑</a>
        </div>
        <ul class="labelList">
            <li v-for="label in labelList">
                {{label}}
            </li>
        </ul>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改标签"
                :visible.sync="dialogVisible"
                width="300px"
                center
        >
            <el-form :model="oForm" ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-form-item
                        label=""
                        prop="label"
                        :rules="[
                            {validator: validatePass3, trigger: 'change' },
                        ]"
                >   <div class="labelWrap">
                        <el-input v-model="oForm.label"
                                  placeholder="输入后按回车键(enter)键添加"
                                  auto-complete="off"
                                  @keyup.enter.native="insertList"
                        ></el-input>
                        <i class="el-icon-circle-plus" @click="insertList" v-if="list.length<10"></i>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="insertWrap" v-for="(item,index) in list">
                        <el-button type="danger">{{item}}</el-button>
                        <i class="el-icon-remove" @click="list.splice(index,1)" ></i>
                    </div>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="danger" @click="submitForm('oForm')">发送</el-button>
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
            tags:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                labelList:this.tags,
                oForm:{
                    label:''
                },
                list:[]
            }
        },
        mounted(){

        },
        watch:{
            tags(val){
                if(!val ||val === '') return;
                this.list = val.split(',');
                this.labelList = val.split(',');
            }
        },
        methods:{
            validatePass3(rule, value, callback){
                const reg = /^[\s\S]{1,4}$/;
                if (value === '') {
                    callback(new Error('请输入您的特色标签'));
                } else if (!reg.test(value)) {
                    callback(new Error('长度在 1 到 4 个字符'));
                } else {
                    callback();
                }
            },
            insertList(){
                if(this.oForm.label === '' || !/^[\s\S]{1,4}$/.test(this.oForm.label)){return}
                let list = new Set(this.list);
                list.add(this.oForm.label);
                this.list = [...list];
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setTags',this.list.join(','));
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
    .store_logo{
        padding: 20px 0;
        border-bottom: $green solid 1px;
        overflow:hidden;
        .logo_title{
            @include layout-flex-r-sb;
            margin-bottom:20px;
            p{
                font-size: 14px;
                color: #FFFFFF;
                span{
                    color: $light_gray;
                }
            }
            a{
                color: $green;
                font-size: 14px;
            }
        }
        .introduce_text{
            font-size: 14px;
            color: $orange;
        }
        .labelList{
            li{
                padding: 2px 10px;
                font-size: 14px;
                float: left;
                margin-right: 20px;
                border: $orange solid 1px;
                color:$orange;
            }
        }
        .labelWrap{
            position: relative;
            .el-icon-circle-plus{
                color: #ffffff;
                font-size: 18px;
                position: absolute;
                top: 11px;
                right: 6px;
                z-index:10;
                cursor: pointer;
            }
        }
        .insertWrap{
            position: relative;
            display: inline-block;
            margin-right: 10px;
            margin-top: 10px;
            .el-icon-remove{
                color: #ffffff;
                font-size: 18px;
                position: absolute;
                top: -5px;
                right: -5px;
                z-index:10;
                cursor: pointer;
            }
        }
    }
</style>