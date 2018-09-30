<template>
    <div class="bar-header">
        <div class="left">
            <div class="icon"></div>
        </div>

        <div class="middle">
            <!--苏木音乐酒吧-->
        </div>
        <div class="right">
            <!--<router-link class="rightText" to="">-->
            <!--帮助 丨-->
            <!--</router-link>-->
            <!--<router-link  class="rightText" to="">-->
            <!--退出-->
            <!--</router-link>-->
            <a href="javascript:;" class="rightText" @click="loginOut">退出</a>
        </div>



    </div>
</template>

<script>

    import $   from 'jquery';
    import REQ from "../../vue/global/request.js";
    const roomInfo = window.UINFO;


    export default {

        components:{
        },


        data(){
            return{
            }
        },
        computed:{

        },
        mounted(){

        },
        methods:{
            loginOut(){
                let vm = this;
                let posData = {
                    cid:roomInfo.uId
                };
                REQ.reqLogout(posData,
                    function(data){
                        vm.$message.success("退出成功！");
                        window.location.href = "/admin/api/page/login";
                    },
                    function(data){},
                    function(data){}
                )
            }
        }
    }


</script>


<style  lang='scss'   scoped>
    @import '../../../style/sass/mixin.scss';
    .bar-header .left{
        width: 200px; height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .bar-header .right{
        line-height: 80px;
    }
    .icon-youxiang{
        font-size:30px;
        color:#ffffff;
    }
    .bar-header{
        @include layout-flex-r-sb;
        margin: auto;
        width:1440px; height:80px;
    }

    .bar-header .left .icon{
        background: url("http://static.ibigtop.com/static/img/login/biguo_logo.png") no-repeat;
        background-size: 100% 100%;
        width: 150px;
        height: 40px;
        margin: 23px 0;
        margin-left: 25px;
    }
    .middle_right{
        float: right;
        color: #FFFFFF;
    }
    .rightText{
        font-size: 17px;
        color: #FFFFFF;
    }

</style>




