<template>
    <div class="box-wrap">
        <div class="box">
            <span>用户ID:&nbsp;&nbsp;{{curInfo ? JSON.parse(curInfo).userId :''}}</span>
        </div>
        <div class="box">
            <span>用户名:&nbsp;&nbsp;{{curInfo ? JSON.parse(curInfo).userName:''}}</span>
        </div>
        <div class="box">
            <span>手机号码:&nbsp;&nbsp;{{curInfo ? JSON.parse(curInfo).phone:''}}</span>  <div class="btns"><el-button type="success" plain disabled>修改号码</el-button></div>
        </div>
        <div class="box">
            <span>设置密码</span>   <div class="btns"><el-button type="success" plain disabled>修改密码</el-button></div>
        </div>
    </div>
</template>

<script>
    export default {
        components:{

        },
        data(){
            return{
                userId:'',
                userName:'',
                phone:''
            }
        },
        // watch:{
        //     curInfo(val){
        //         if(!val) return;
        //         this.userId = JSON.parse(val).userId;
        //         this.userName = JSON.parse(val).userName;
        //         this.phone = JSON.parse(val).phone;
        //     }
        // },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            }
        },
        mounted(){

        },

        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common";
    .box-wrap{
        padding: 0 30px;
        .box{
            height: 100px;
            width: 800px;
            border-bottom: $green solid 1px;
            @include layout-flex-r-sb;
            span{
                line-height: 100px;
                color: #ffffff;
                font-size: 16px;
            }
            .btns{
                line-height: 100px;
            }
        }
    }
</style>