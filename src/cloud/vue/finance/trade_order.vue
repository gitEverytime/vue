<template>
    <div class="box">
        <el-tabs v-model="activeName">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getTradeInfo"
                    :label="col.resName"
                    :name="col.resName"
            ></el-tab-pane>
        </el-tabs>
        <div class="">
            <div>
                <h1 class="new_title">选择商家<span></span></h1>
                <el-row>
                    <el-col :span="6">
                        <el-cascader
                                :options="options"
                                v-model="region"
                                placeholder="选择省市区"
                                @change="selectBlockCode"
                        >
                        </el-cascader>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="oForm.relatId" placeholder="请选择" @change="chooseStore">
                            <el-option
                                    v-for="item in storeList"
                                    :key="item.id"
                                    :label="item.sname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <h1 class="new_title">选择时间<span></span></h1>
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="selectTimestamp"
                                :clearable="false"
                        >
                        </el-date-picker>
                    </el-col>
                    <el-col :span="6">
                        <h1 class="new_title">选择类型<span></span></h1>
                        <el-select v-model="oForm.orderType" placeholder="请选择" disabled>
                            <el-option
                                    v-for="item in typeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <h1 class="new_title" v-if="oForm.orderType === '1'">选择互动类型<span></span></h1>
                <h1 class="new_title" v-if="oForm.orderType === '2'">查询<span></span></h1>
                <el-row>
                    <el-col :span="6" v-if="oForm.orderType === '1'">
                        <el-select v-model="oForm.type" placeholder="请选择"  @change="selectType">
                            <el-option
                                    v-for="item in interactList"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.type">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="danger" size="medium" @click="sureSearch">查询</el-button>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
            </div>
            <TempTradeTable
                :tradeList = 'tradeList'
                :oForm="oForm"
                :oCode="oCode"
                :totalAmount="totalAmount"
            >

            </TempTradeTable>
            <div class="pagination-wrap">
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        layout="prev, pager, next"
                        :pager-count="5"
                        :page-size="Number(oForm.pageSize)"
                        :total="total3">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data';
    import TempTradeTable   from './trade_table.vue'
    import REQ from "../../vue/global/request.js";
    import Type   from  '../global/name_space.js'
    import cookie from '../global/cookie.js'
    export default {
        components:{
            TempTradeTable
        },
        data(){
            return{
                menuIndex:1,
                activeName:'商户结算',
                perms:[],
                options:regionData,
                storeList: [],
                interactList:Type.interactList,
                typeList:[{
                    value: '1',
                    label: '互动'
                }, {
                    value: '2',
                    label: '点餐'
                }],
                region:[],
                time:'',
                oCode:{
                    ac1:'',
                    ac2:'',
                    ac3:'',
                },
                oForm:{
                    relatId:'',
                    relatType:'2',
                    orderType:'1',
                    pageNo:'1',
                    pageSize:'10',
                    type: '',
                    startTime:'',
                    endTime:''
                },
                totalAmount:0,
                tradeList:[],
                total3:0
            }
        },
        watch:{

        },
        computed:{

        },
        mounted(){
            let vm = this;
            let hisOrderInfo = cookie.get('record');
            if(hisOrderInfo){           //切换页面回来拉取历史选择的信息
                vm.oCode.ac1 = JSON.parse(hisOrderInfo).ac1;
                vm.oCode.ac2 = JSON.parse(hisOrderInfo).ac2;
                vm.oCode.ac3 = JSON.parse(hisOrderInfo).ac3;
                vm.region = [JSON.parse(hisOrderInfo).ac1,JSON.parse(hisOrderInfo).ac2,JSON.parse(hisOrderInfo).ac3];
                vm.oForm.relatId = JSON.parse(hisOrderInfo).relatId;
                vm.getStoreFindByAC(JSON.parse(hisOrderInfo).relatId);
            }
        },
        methods:{
            /**
             * 根据省市区code查询商家
             */
            getStoreFindByAC(relatId){
                let vm = this;
                let postData = vm.oCode;
                REQ.reqStoreFindByAC(postData,
                    (result) => {
                        //初始化信息查询
                        vm.storeList = result.data;
                        if(relatId){    //如果是历史拉取
                            this.getFinanceOrderList();
                        }else{
                            if(vm.storeList.length>0){            //如果是正常拉取
                                vm.oForm.relatId = vm.storeList[0].id;
                            }else {                               //正常拉取没有数据
                                vm.oForm.relatId = '';
                                vm.storeList = [];
                            }
                        }
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             * 确认查询
             */
            sureSearch(){
                if(!this.oForm.relatId) {
                    this.$message.warning("请选择要查询的商家！");
                    return
                }
                this.oForm.pageNo = 1;
                this.getFinanceOrderList();
            },
            /**
             * 获取订单列表
             */
            getFinanceOrderList(){
                let vm = this;
                let postData = vm.oForm;
                REQ.reqFinanceOrderList(postData,
                    (result) => {
                        vm.totalAmount = result.data.totalAmount;
                        vm.tradeList = result.data.rows;
                        vm.total3 = result.data.count;
                        vm.oForm.startTime = Number(result.data.startTime);
                        vm.oForm.endTime = Number(result.data.endTime);
                        vm.time = [Number(result.data.startTime),Number(result.data.endTime)];
                        if(vm.$store.getters.getHisOrderInfo) vm.$store.commit('setHisOrderInfo','');
                        //存贮记录
                        let oData = {
                            ac1: vm.oCode.ac1,
                            ac2: vm.oCode.ac2,
                            ac3: vm.oCode.ac3,
                            relatId: vm.oForm.relatId
                        };
                        cookie.set('record',JSON.stringify(oData),60*60*24*3*1000);    //存贮三天
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            /**
             *
             * @param val
             */
            selectBlockCode(val){
                let vm = this;
                vm.oCode.ac1 = val[0];
                vm.oCode.ac2 = val[1];
                vm.oCode.ac3 = val[2];
                vm.oForm.startTime = '';
                vm.oForm.endTime = '';
                vm.time = '';
                vm.oForm.type ='';
                vm.oForm.pageNo = 1;
                vm.getStoreFindByAC();
            },
            /**
             * 按商家查询
             * @param val
             */
            chooseStore(val){
                let vm = this;
                vm.oForm.startTime = '';
                vm.oForm.endTime = '';
                vm.time = '';
                vm.oForm.type ='';
                vm.oForm.pageNo = 1;
            },
            /**
             * 按选择互动类型查询
             * @param val
             */
            selectType(val){
                this.oForm.pageNo = 1;
            },
            /**
             * 按时间段查询
             * @param val
             */
            selectTimestamp(val){
                this.oForm.startTime = val[0];
                this.oForm.endTime = val[1];
                this.oForm.pageNo = 1;
            },
            /**
             * 分页查找
             * @param val
             */
            handleCurrentChange(val){
                this.oForm.pageNo = val;
                this.getFinanceOrderList();
            },
            handleSizeChange(){

            },
        }
    }
</script>


<style  lang='scss'   scoped>
    @import "../../sass/common.scss";
    .box{
        padding: 0 30px;
    }
    .totleCount{
        padding: 10px;
        color: #FFFFFF;
        @include layout-flex-r-sb;
    }
</style>




