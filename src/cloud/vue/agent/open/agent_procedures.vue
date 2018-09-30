<template>
    <div class="box">
        <el-row>
            <el-col :span="4">
                <el-form-item
                        label="代理手续"
                        prop="licence"
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
                        <img v-if="licence" :src="licence" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <h2 class="title">营业执照</h2>
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item
                        label=""
                        prop="health"
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
                        <img v-if="health" :src="health" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <h2 class="title">卫生许可证</h2>
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item
                        label=""
                        prop="idCardZ"
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
                        <img v-if="idCardZ" :src="idCardZ" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <h2 class="title">法人身份证(正)</h2>
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item
                        label=""
                        prop="idCardF"
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
                        <img v-if="idCardF" :src="idCardF" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <h2 class="title">法人身份证(反)</h2>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import type from '../../global/name_space.js'
    export default {
        components:{

        },
        data(){
            return{
                licence:'',
                health:'',
                idCardZ:'',
                idCardF:'',
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
                ]
            }
        },
        watch:{
            licence(val){
                this.$emit('setLicence',val)
            },
            health(val){
                this.$emit('setHealth',val)
            },
            idCardZ(val){
                this.$emit('setIdCardZ',val)
            },
            idCardF(val){
                this.$emit('setIdCardF',val)
            }
        },
        mounted(){

        },
        methods:{
            handleSuccess1(file){
                this.licence = file.response.data;
                this.attachList[0].img = file.response.data;
            },
            handleSuccess2(file){
                this.health = file.response.data;
                this.attachList[1].img = file.response.data;
            },
            handleSuccess3(file){
                this.idCardZ = file.response.data;
                this.attachList[2].img = file.response.data;
            },
            handleSuccess4(file){
                this.idCardF = file.response.data;
                this.attachList[3].img = file.response.data;
            },
        }
    }
</script>

<style scoped lang="scss">
    .title{
        color: #FFFFFF;
    }
</style>