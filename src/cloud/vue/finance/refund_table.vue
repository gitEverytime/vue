<template>
    <div class="">
        <el-table
                :data="tradeList"
                ref="multipleTable"
                :highlight-current-row=false
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="发言内容">
                            <span>{{ props.row.content }}</span>
                        </el-form-item>
                        <el-form-item label="记录编号">
                            <span>{{ props.row.id}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    width="70"
                    label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.headimg" class="headimg">
                </template>
            </el-table-column>

            <el-table-column
                    prop="nickname"
                    width="70"
                    label="昵称">
            </el-table-column>

            <el-table-column
                    width="50"
                    label="性别">
                <template slot-scope="scope">
                    <i class="iconfont icon-man" v-if="scope.row.sex === '1'"></i>
                    <i class="iconfont icon-woman" v-else></i>
                </template>
            </el-table-column>

            <el-table-column
                    width=""
                    label="城市">
                <template slot-scope="scope">
                    <span>{{scope.row.province}}{{scope.row.city}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="createdAt"
                    width=""
                    :formatter="dateFormat"
                    label="创建时间">
            </el-table-column>

            <el-table-column
                    width=""
                    label="互动类型">
                <template slot-scope="scope">
                    <div
                            class="amount"
                            v-for="item in interactList"
                    >
                        <span v-if="item.type === scope.row.type">{{item.label}}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    width=""
                    label="退款金额">
                <template slot-scope="scope">
                    <span class="amount">￥{{scope.row.amount}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    width="60"
                    label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === '0'">未完成</span>
                    <span v-if="scope.row.status === '1'">发送成功</span>
                    <span v-if="scope.row.status === '2'">发送失败</span>
                    <span v-if="scope.row.status === '3'">撤回</span>
                    <span v-if="scope.row.status === '4'">删除</span>
                    <span v-if="scope.row.status === '5'">退款中</span>
                    <span v-if="scope.row.status === '6'">已退款</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="address"
                    width=""
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="refundDetail(scope.row.orderId)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--    操作弹窗    -->
        <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                :show-close="true"
                center
                width="870px"
        >
            <table border="0" cellspacing="0" cellpadding="0" class="detail_list" width="100%" style="table-layout:fixed; margin-bottom: 30px">
                <tr>
                    <td width="100">退款单号</td>
                    <td width="250">{{orderDetail.id}}</td>
                    <td width="100">微信退款单号</td>
                    <td width="250">{{orderDetail.outOid}}</td>
                </tr>
                <tr>
                    <td>原订单号</td>
                    <td>{{orderDetail.oid}}</td>
                </tr>

            </table>
            <table border="0" cellspacing="0" cellpadding="0" class="detail_list" width="100%" style="table-layout:fixed; margin-bottom: 30px">
                <tr>
                    <td width="100">订单金额</td>
                    <td width="250">￥{{orderDetail.orderAmount}}</td>
                    <td width="100">退款金额</td>
                    <td width="250">￥{{orderDetail.amount}}</td>
                </tr>
            </table>

            <table border="0" cellspacing="0" cellpadding="0" class="detail_list" width="100%" style="table-layout:fixed">
                <tr>
                    <td width="100">申请人</td>
                    <td width="250">{{orderDetail.createdBy}}</td>
                    <td width="100">申请时间</td>
                    <td width="250">{{dataMoment(orderDetail.createdAt)}}</td>
                </tr>
                <tr>
                    <td width="100">退款状态</td>
                    <td width="250">
                        <span v-if="orderDetail.status === '0'">未完成</span>
                        <span v-if="orderDetail.status === '1'">发送成功</span>
                        <span v-if="orderDetail.status === '2'">发送失败</span>
                        <span v-if="orderDetail.status === '3'">撤回</span>
                        <span v-if="orderDetail.status === '4'">删除</span>
                        <span v-if="orderDetail.status === '5'">退款中</span>
                        <span v-if="orderDetail.status === '6'">已退款</span>
                    </td>
                    <td width="100">退款说明</td>
                    <td width="250">{{orderDetail.remarks}}</td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>



<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import REQ from "../../vue/global/request.js";
    import Type from '../global/name_space.js'
    import moment  from 'moment'
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        props:{
            totalAmount:{
                type:Number
            },
            tradeList:{
                type:Array
            },
            oForm:{
                type:Object
            },
            oCode:{
                type:Object
            }
        },
        data(){
            return{
                pageNo:1,
                value:0,
                storeInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1',
                storeType:Type.storeType,
                interactList:Type.interactList,
                payList:Type.payList,
                multipleSelection:[],
                dialogVisible:false,
                orderDetail:{},
            }
        },
        mounted() {
        },
        watch:{

        },
        methods:{
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            refundDetail(oid){
                let vm = this;
                vm.dialogVisible = true;
                let postData = {
                    oid :oid
                };
                REQ.reqFinanceRefundDetail(postData,
                    (result) => {
                        vm.orderDetail = result.data;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            handleSelectionChange(){

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
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
    .detail_list{
        border: #FFFFFF solid 1px;
        tr{
            td{
                padding: 10px;
                color: #FFFFFF;
                font-size: 14px;
                border: #FFFFFF solid 1px;
            }
        }
    }
</style>