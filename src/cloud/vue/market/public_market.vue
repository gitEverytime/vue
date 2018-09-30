<template>
    <div class="box">
        <el-row>
            <el-col :span="7" style="text-align: center">
                <div class="bannerBox" v-if="successUrl">
                    <img
                            :src="successUrl"
                            class="bannerImg"
                    >
                    <i class="el-icon-remove" @click="removePic"></i>
                    <span class="prompt">广告预览位置</span>
                </div>
            </el-col>
            <el-col :span="17">
                <el-button type="primary"
                           icon="el-icon-circle-plus"
                           @click="dialogVisible = true"
                           :disabled="successUrl!==''"
                >添加</el-button>
                <span class="prompt">注：上传的素材不超过5M,宽高比例5:8</span>
            </el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                center
                width="300px">
            <el-row>
                <el-col :span="12">
                    <el-upload
                            class="avatar-uploader banner_uploader"
                            action="http://static.ibigtop.com/res/upload"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
                <el-col :span="12">
                    <span class="prompt">您只能上传一张免费广告图</span>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="postPicAdd">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import REQ from "../../vue/global/request.js";
    export default {
        components:{

        },
        data(){
            return{
                fileList:[],
                imageUrl: '',
                dialogVisible: false,
                successUrl:'',
                id:''
            }
        },
        created(){
            this.getPicList();
        },
        mounted(){

        },
        methods:{
            handleRemove(){

            },
            /**
             * 上传成功回调
             * @param file
             */
            handleSuccess(file){
                this.imageUrl = file.response.data;
            },
            getPicList(){
                let vm = this;
                let postData = {
                };
                REQ.reqPicList(postData,
                    (result) => {
                    if(result.data.rows.length<1) return;
                        let length = result.data.rows.length;
                        this.successUrl = result.data.rows[length-1].pic;
                        this.imageUrl = result.data.rows[length-1].pic;
                        this.id = result.data.rows[length-1].id
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            postPicAdd(){
                let vm = this;
                let postData = {
                    pic:vm.imageUrl
                };
                REQ.reqPicAdd(postData,
                    (result) => {
                        vm.$message.success("添加广告图成功！");
                        vm.dialogVisible = false;
                        vm.getPicList();
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            removePic(){
                this.$confirm('确认要删除吗？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delPic();
                }).catch(() => {
                });
            },
            delPic(){
                let vm = this;
                let postData = {
                    id:vm.id
                };
                REQ.reqPicDel(postData,
                    (result) => {
                        vm.$message.success("删除成功！");
                        vm.getPicList();
                        vm.imageUrl = '';
                        vm.successUrl = '';
                    },
                    (data) => {},
                    (data) => {}
                )
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .box{
        padding: 50px 30px 0;
        .prompt{
            color: #FFFFFF;
        }
        .bannerBox{
            width: 300px;
            height: 500px;
            position: relative;
            text-align: center;
            .bannerImg{
                @include set-width-height(300px,480px);
                padding-bottom: 5px;
                border-radius: 3px;
            }
            .el-icon-remove{
                position: absolute;
                color: $green;
                top: -5px;
                right: -5px;
                z-index: 999;
                cursor: pointer;
                font-size: 20px;
            }
        }
    }
</style>