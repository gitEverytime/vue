<template>
    <div class="">
        <h1 class="new_title">交易订单<span></span></h1>
        <div class="totleCount">
                <span>
                    总金额：{{totalAmount}}元
                </span>
            <span>
                    <!--<el-button type="danger" size="mini" @click="getFinanceExportIncomes" :disabled="unSettlementList.length<1">导出</el-button>-->
                </span>
        </div>
        <el-table
                :data="unSettlementList"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    label="创建日期"
                    :formatter="dateFormat"
                    prop="createdAt">

            </el-table-column>
            <el-table-column
                    label="订单号"
                    prop="id"
                    width="300"
            >
            </el-table-column>
            <el-table-column
                    label="交易起止日期"
                    prop="id"
                    width="350"
            >
                <template slot-scope="scope">
                    {{dataMoment(scope.row.tradeStartTime)}}  至 {{dataMoment(scope.row.tradeEndTime)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="收入总金额(总)"
                    prop="amount">
                <template slot-scope="scope">
                    ￥{{scope.row.amount}}
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
                    prop="phone">
                <template slot-scope="scope">
                    <el-button type="primary"
                               v-if="curInfo && JSON.parse(curInfo).type === '300'"
                               @click="goSettlement(scope.row)"
                    >去结算</el-button>
                    <el-button type="danger" @click="getFinanceExportIncomes(scope.row.id)" >导出</el-button>
                </template>
            </el-table-column>
        </el-table>
        <TempUnsettlementDialog
                :dialogVisible="dialogVisible"
                :baseInfo="baseInfo"
                @setDialogStatus="getDialogStatus"
        >

        </TempUnsettlementDialog>
    </div>
</template>


<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import REQ from "../../vue/global/request.js";
    import Type from '../global/name_space.js'
    import moment  from 'moment'
    import TempUnsettlementDialog   from './unsettlement_dialog.vue'
    const roomInfo = window.UINFO;
    export default {
        components:{
            TempUnsettlementDialog
        },
        props:{
            unSettlementList:{
                type:Array
            },
            relatId:{
                type:String
            },
            relatType:{
                type:String
            },
            startTime:{
                type:Number
            },
            endTime:{
                type:Number
            },
            totalAmount:{
                type:Number
            },
            oForm:{
                type:Object
            },
        },
        data(){
            return{
                pageNo:1,
                value:0,
                storeInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1',
                storeType:Type.storeType,
                multipleSelection:[],
                relatId1:this.relatId,
                dialogVisible:false,
                baseInfo:{}
            }
        },
        mounted() {
        },
        watch:{
            relatId(val){
                this.relatId1 = val
            },
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            }
        },
        methods:{
            handleCurrentChange(val){
                this.pageNo = val;
            },
            handleSizeChange(){

            },
            //批量操作
            handleSelectionChange(val){
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            /**
             * 去结算
             * @param row
             */
            goSettlement(row){
                this.getStoreGetById(row);
            },
            //确认订单
            createOrder(){
                this.$confirm('确认要去结算？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqFinanceAddSettleBill();
                }).catch(() => {
                });
            },
            /**
             * 获取商家基本信息
             */
            getStoreGetById(row){
                let vm = this;
                let postData = {
                    settleId:row.id
                };
                REQ.reqFinanceSettleInfo(postData,
                    (result) => {
                        vm.baseInfo = {
                            sname:result.data.storeName,
                            bossName:result.data.bossName,
                            phone:result.data.bossPhone,
                            orderNumber:row.id,
                            startTime:row.tradeStartTime,
                            endTime:row.tradeEndTime,
                            amount:result.data.amount,
                            relatId:vm.relatId1,
                            chargeAmount:result.data.chargeAmount,
                            chargeScale:result.data.chargeScale,
                            settleAmount:result.data.settleAmount,
                            createdBy:result.data.createdBy,
                            createdPhone:result.data.createdPhone,
                        };
                        vm.dialogVisible = true;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * table日期转换
             */
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            /**
             * 日期转换
             */
            dataMoment(date){
                if (date === undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            getDialogStatus(val){
                this.dialogVisible = false;
            },
            /**
             * 导出订单
             */
            getFinanceExportIncomes(id){
                window.location.href = `/admin/api/v1/finance/exportSettles?settleId=${id}`;
            }

        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .btnsWrap{
        text-align: center;
        padding: 20px 0;
    }
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
</style>