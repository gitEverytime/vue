<template>
    <div class="store_logo">
        <div class="logo_title">
            <p>公众号&nbsp;&nbsp;&nbsp;&nbsp;<span>用于营销，店铺展示及后期新增业务</span></p>
            <a href="javascript:;" @click="dialogVisible = true">编辑</a>
        </div>
        <img  :src="src" v-if='src'>
        <!-- 更新弹窗 -->
        <el-dialog
                title="修改公众号二维码"
                :visible.sync="dialogVisible"
                width="350px"
                center
        >
            <el-upload
                    class="avatar-uploader"
                    action="http://static.ibigtop.com/res/upload"
                    :show-file-list="false"
                    :on-success="handleSuccess"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="danger" :disabled="!imageUrl" @click="sendWxpic">发送</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        components:{

        },
        props:{
            wxpic:{
                type:String
            }
        },
        data(){
            return{
                dialogVisible:false,
                srcList:[
                    'http://static.ibigtop.com/static/img/login/biguo_logo.png'
                ],
                src:this.wxpic,
                imageUrl:this.wxpic
            }
        },
        watch:{
            wxpic(val){
                this.imageUrl = val;
                this.src = val;
            }
        },
        mounted(){

        },
        methods:{
            handleSuccess(file){
                this.imageUrl = file.response.data;
            },
            sendWxpic(){
                this.$emit('setWxpic',this.imageUrl);
                this.dialogVisible = false
            }
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
            @include set-width-height(50px,50px)
        }
        .avatar-uploader{
            text-align: center;
        }
    }
</style>