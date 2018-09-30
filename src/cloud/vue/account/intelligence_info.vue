<template>
    <div class="store_logo">
        <div class="logo_title">
            <p>资质资料&nbsp;&nbsp;&nbsp;&nbsp;<span>外卖、营销、开设分店、电子发票等功能需按国家相关法律法规上传审核基本资料(审核时间1-7日)</span></p>
            <a href="javascript:;" @click="dialogVisible=true">编辑</a>
        </div>
        <div class="imgInfo" v-for="item in srcList">
            <img :src="item.img">
            <h2>{{item.title}}</h2>
        </div>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改资料"
                :visible.sync="dialogVisible"
                width="700px"
                center
        >
            <el-form :model="oForm"  ref="oForm" label-width="0px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item
                                label=""
                                prop="imageUrl1"
                                :rules="[
                                    { required: true, message: '营业执照不能为空',trigger: 'change'},
                                ]"
                        >
                            <el-upload
                                    class="avatar-big-uploader"
                                    action="http://static.ibigtop.com/res/upload"
                                    :show-file-list="false"
                                    :on-success="handleSuccess1"
                            >
                                <img v-if="oForm.imageUrl1" :src="oForm.imageUrl1" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <h2>营业执照</h2>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item
                                label=""
                                prop="imageUrl2"
                                :rules="[
                                    { required: true, message: '卫生许可证不能为空',trigger: 'change'},
                                ]"
                        >
                            <el-upload
                                    class="avatar-big-uploader"
                                    action="http://static.ibigtop.com/res/upload"
                                    :show-file-list="false"
                                    :on-success="handleSuccess2"
                            >
                                <img v-if="oForm.imageUrl2" :src="oForm.imageUrl2" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <h2>卫生许可证</h2>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item
                                label=""
                                prop="imageUrl3"
                                :rules="[
                                    { required: true, message: '法人身份证(正)不能为空',trigger: 'change'},
                                ]"
                        >
                            <el-upload
                                    class="avatar-big-uploader"
                                    action="http://static.ibigtop.com/res/upload"
                                    :show-file-list="false"
                                    :on-success="handleSuccess3"
                            >
                                <img v-if="oForm.imageUrl3" :src="oForm.imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <h2>法人身份证(正)</h2>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item
                                label=""
                                prop="imageUrl4"
                                :rules="[
                                    { required: true, message: '法人身份证(反)不能为空',trigger: 'change'},
                                ]"
                        >
                            <el-upload
                                    class="avatar-big-uploader"
                                    action="http://static.ibigtop.com/res/upload"
                                    :show-file-list="false"
                                    :on-success="handleSuccess4"
                            >
                                <img v-if="oForm.imageUrl4" :src="oForm.imageUrl4" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <h2>法人身份证(反)</h2>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="submit_center">
                    <el-button type="danger" @click="submitForm('oForm')">确认</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import type from '../global/name_space.js'
    export default {
        components:{

        },
        props:{
            attachs:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                oForm:{
                    imageUrl1:'',
                    imageUrl2:'',
                    imageUrl3:'',
                    imageUrl4:''
                },
                attachList:[
                    {
                        type:type.uploadType[0].code,
                        title:type.uploadType[0].name,
                        img:''
                    },{
                        type:type.uploadType[1].code,
                        title:type.uploadType[1].name,
                        img:''
                    },{
                        type:type.uploadType[2].code,
                        title:type.uploadType[2].name,
                        img:''
                    },{
                        type:type.uploadType[3].code,
                        title:type.uploadType[3].name,
                        img:''
                    }
                ],
                srcList:[]

            }
        },
        watch:{
            attachs(array){
                if(!array ||array === '') return;
                this.srcList = JSON.parse(array);
                JSON.parse(array).forEach((value,key) =>{
                    this.attachList[key].img = value.img;
                    this.oForm[`imageUrl${key+1}`] = value.img;
                })

            }
        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('setAttachs',this.attachList);
                        this.dialogVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            handleSuccess1(file){
                this.oForm.imageUrl1 = file.response.data;
                this.attachList[0].img = file.response.data;
            },
            handleSuccess2(file){
                this.oForm.imageUrl2 = file.response.data;
                this.attachList[1].img = file.response.data;
            },
            handleSuccess3(file){
                this.oForm.imageUrl3 = file.response.data;
                this.attachList[2].img = file.response.data;
            },
            handleSuccess4(file){
                this.oForm.imageUrl4 = file.response.data;
                this.attachList[3].img = file.response.data;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .store_logo{
        padding: 20px 0;
        border-bottom: $green solid 1px;
        .logo_title{
            @include layout-flex-r-sb;
            margin-bottom:10px;
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
        img{
            @include set-width-height(100px,100px)
        }
        .submit_center{
            text-align:center;
            margin-top:20px;
        }
        .imgInfo{
            display: inline-block;
            margin-right: 20px;
            img{
                width: 100px;
                height: 100px;
                border: #FFFFFF solid 1px;
                border-radius: 4px;
            }
            h2{
                text-align: center;
                margin-top: 10px;
                color:#ffffff;
            }
        }
    }
</style>