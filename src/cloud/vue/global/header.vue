<template>
    <div class="bar-header">
        <div class="left">
            <div class="icon"></div>
        </div>
        <div class="middle">
            {{storeName}}
        </div>
        <div class="right">
            <span class="userId">用户名:{{userName}}</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item>
                        <a href="#/user/center" class="rightText">个人中心</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <a href="javascript:;" class="rightText" @click="loginOut">退出</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

import $   from 'jquery';
import REQ from "../../vue/global/request.js";
const roomInfo = window.UINFO;
import cookie from '../global/cookie.js'
export default {

    components:{  
    },


    data(){
        return{
            loginName:'',
            id:'',
            userName:'',
            storeName:'',
            phone:''
        }
    },
    computed:{

    },
    created(){
        let vm = this;
        vm.getCurInfo();
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
                    cookie.delCookie('userInfo');
                    window.location.href = "/admin/api/page/login";
                },
                function(data){},
                function(data){}
            )
        },
        //获取登录者信息
        getCurInfo(){
            let vm = this;
            REQ.reqGetCurInfo({},
                (result) => {
                    result.data.storeName ? vm.storeName = result.data.storeName : vm.storeName = result.data.proxyName;
                    vm.userName = result.data.userName;
                    vm.phone = result.data.phone;
                    vm.id = result.data.userId;
                    vm.$store.commit('setCurInfo',JSON.stringify(result.data));
                    vm.endLevel(result.data.perms);
                },
                (complete) => {
                },
                (err) => {
                    console.error(err)
                })
        },
        endLevel(result){
            let vm = this;
            result.forEach((item) => {
                switch (item.resName){
                    case '互动管理':
                        vm.$store.commit('setInteractInfo',item.child[0].child);
                        break;
                    case '人员管理':
                        if(item.child.length<1) return;
                        item.child.forEach((col) => {
                            switch (col.resName){
                                case '服务人员管理':
                                    vm.$store.commit('setServiceInfo',col.child);
                                    break;
                                case '艺人管理':
                                    vm.$store.commit('setActorInfo',col.child);
                                    break;
                            }
                        });
                        break;
                    case '代理管理':
                        if(item.child.length<1) return;
                        item.child.forEach((col) => {
                            switch (col.resName){
                                case '开设代理':
                                    vm.$store.commit('setAgentInfo',col.child);
                                    break;
                                case '代理列表':
                                    vm.$store.commit('setAgentList',col.child);
                                    break;
                            }
                        });
                        break;
                    case '商户管理':
                        if(item.child.length<1) return;
                        item.child.forEach((col) => {
                            switch (col.resName){
                                case '开设商户':
                                    vm.$store.commit('setStoreMsg',col.child);
                                    break;
                                case '商户列表':
                                    vm.$store.commit('setStoreList',col.child);
                                    break;
                            }
                        });
                        break;
                    case '人资管理':
                        if(item.child.length<1) return;
                        item.child.forEach((col) => {
                            switch (col.resName){
                                case '艺人管理':
                                    vm.$store.commit('setHrInfo',col.child);
                                    break;
                                case '服务人员管理':
                                    vm.$store.commit('setTotalService',col.child);
                                    break;
                            }
                        });
                        break;
                    case '财务管理':
                        if(item.child.length<1) return;
                        item.child.forEach((col) => {
                            switch (col.resName){
                                case '交易订单':
                                    vm.$store.commit('setTradeInfo',col.child);
                                    break;
                                case '未结订单':
                                    vm.$store.commit('setUnFinished',col.child);
                                    break;
                                case '结算单（未结）':
                                    vm.$store.commit('setSettlementInfo',col.child);
                                    break;
                                case '结算单（已结）':
                                    vm.$store.commit('setUnsettlementInfo',col.child);
                                    break;
                            }
                        });
                        break;
                }

                //
            })

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
         @include layout-flex-r-center;
         .userId{
             color: #ffffff;
             width: 150px;
             @include hiddenLineMax;
             display: inline-block;
         }
     }
     .middle{
          font-size: 22px;
          color: #fff;
          line-height: 80px;
          font-weight: bold;
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
        display: inline-block;
        @include set-width-height(100%,100%)
    }

</style>




