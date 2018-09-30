<template>
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/unfinished/order' }">交易订单</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <table border="0" cellspacing="0" cellpadding="0" class="detail_list">
            <tr>
                <td>店铺名称</td>
                <td>{{orderDetail.storeName}}</td>
            </tr>
            <tr>
                <td>订单编号</td>
                <td>{{orderDetail.id}}</td>
            </tr>
            <tr>
                <td>订单时间</td>
                <td>{{dataMoment(orderDetail.createdAt)}}</td>
            </tr>
            <tr>
                <td>互动类型</td>
                <td v-for="item in interactList" v-if="item.type === orderDetail.type ">
                    {{item.label}}
                </td>
            </tr>
            <tr>
                <td>消费内容</td>
                <td>
                    <!--霸屏-->
                    <span
                            v-for="item in onScreenList"
                            v-if="orderDetail.type === '3' && JSON.parse(orderDetail.detail).onScreenType === item.type "
                    >
                        {{orderDetail.cname}}&nbsp;&nbsp;{{item.name}}--{{JSON.parse(orderDetail.detail).duration}}s&nbsp;&nbsp;#{{orderDetail.mediaTitle}}#
                    </span>
                    <!--实物打赏-->
                    <span v-if="orderDetail.type === '7'">
                        {{orderDetail.cname}}
                        打赏给
                        <label v-if="JSON.parse(orderDetail.detail).tableName!==''">
                            {{JSON.parse(orderDetail.detail).tableName}}桌
                        </label>
                        {{orderDetail.tname}}
                        {{orderDetail.mediaTitle}}
                        <label v-if="JSON.parse(orderDetail.detail).count>0">
                            x{{JSON.parse(orderDetail.detail).count}}
                        </label>
                    </span>
                    <!--点歌-->
                    <span
                            v-for="item in actorList"
                            v-if="orderDetail.type === '1' && JSON.parse(orderDetail.detail).actorType === item.type">
                        {{orderDetail.cname}}点歌&nbsp;{{orderDetail.mediaTitle}}——{{JSON.parse(orderDetail.detail).actorName}}({{item.name}})
                    </span>
                    <!--点歌-->
                    <div v-if="orderDetail.type === '8' || orderDetail.type === '9'">
                        {{orderDetail.cname}}<span>{{orderDetail.type === '8'? '真心话' : '好声音'}}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>消费金额</td>
                <td>￥{{orderDetail.amount}}</td>
            </tr>
            <tr>
                <td>分成详单</td>
                <td>
                    <table border="0" cellspacing="0" cellpadding="0" class="scale_list">
                        <tr>
                            <td colspan="3">平台方</td>
                            <td colspan="2">商户方</td>
                        </tr>
                        <tr>
                            <td colspan="3">{{orderDetail.sysScale}}</td>
                            <td colspan="2">{{orderDetail.storeScale}}</td>
                        </tr>
                        <tr>
                            <td colspan="3">￥{{orderDetail.sysAllAmount}}</td>
                            <td colspan="2">￥{{orderDetail.storeAllAmount}}</td>
                        </tr>
                        <tr>
                            <td>平台</td>
                            <td>一代</td>
                            <td>二代</td>
                            <td>商家</td>
                            <td>艺人</td>
                        </tr>
                        <tr>
                            <td>{{orderDetail.sysSysScale}}</td>
                            <td>{{orderDetail.sysP1Scale}}</td>
                            <td>{{orderDetail.sysP2Scale}}</td>
                            <td>{{orderDetail.storeStoreScale}}</td>
                            <td>{{orderDetail.storeActorScale}}</td>
                        </tr>
                        <tr>
                            <td>￥{{orderDetail.sysAmount}}</td>
                            <td>￥{{orderDetail.proxyP1Amount}}</td>
                            <td>￥{{orderDetail.proxyP2Amount}}</td>
                            <td>￥{{orderDetail.storeAmount}}</td>
                            <td>￥{{orderDetail.actorAmount}}</td>
                        </tr>
                        <tr>
                            <td  colspan="5">
                                ￥{{orderDetail.storeAmount}}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--<el-button type="danger" plain>导出</el-button>-->
    </div>
</template>

<script>
    import REQ from "../../vue/global/request.js";
    import Type  from '../../vue/global/name_space.js'
    import moment  from 'moment'
    export default {
        components:{

        },
        data(){
            return{
                storeInfo:{
                    name:''
                },
                orderDetail:{

                },
                interactList:Type.interactList,
                onScreenList:Type.onScreenList,
                actorList:Type.actorList
            }
        },
        mounted(){
            this.getFinanceIncomeDetail();
        },
        methods:{
            /**
             * 获取订单详情
             */
            getFinanceIncomeDetail(){
                let vm = this;
                let postData = {
                    incomeId:vm.$route.params.id
                };
                REQ.reqFinanceIncomeDetail(postData,
                    (result) => {
                        vm.orderDetail = result.data;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            dataMoment(date){
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .box{
        padding: 0 30px;
        .detail_list{
            border: #FFFFFF solid 1px;
            tr{
                td{
                    padding: 10px 30px;
                    color: $green;
                    font-size: 14px;
                    border: #FFFFFF solid 1px;
                }
            }
        }
        .scale_list{
            border: #FFFFFF solid 1px;
            tr{
                td{
                    padding: 10px 10px;
                    color: $green;
                    font-size: 12px;
                    border: #FFFFFF solid 1px;
                }
            }
        }
    }
</style>