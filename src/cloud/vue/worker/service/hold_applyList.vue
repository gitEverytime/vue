<template>
    <div class="box_wrap">
        <div class="box">
            <el-table
                    :data="staffInfo"
                    ref="multipleTable"
                    :highlight-current-row=false
                    style="width: 100%">
                <el-table-column
                        type="selection"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        width="100"
                        label="头像">
                    <template slot-scope="scope">
                        <img src="http://static.ibigtop.com/static/img/public/touxiang/headimg2.jpg" class="headimg">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        width="100"
                        label="昵称">
                </el-table-column>
                <el-table-column
                        width="100"
                        label="类型">
                    <template slot-scope="scope">
                        <span v-for="item in staffType">
                            {{item.id ===scope.row.staffType ? item.name:''}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="50"
                        label="性别">
                    <template slot-scope="scope">
                        <i class="iconfont icon-man" v-if="scope.row.sex === '1'"></i>
                        <i class="iconfont icon-woman" v-else></i>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="city"
                        width="200"
                        label="城市">
                    <template slot-scope="scope">
                        {{scope.row.province}}{{scope.row.city}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actorId"
                        width="200"
                        label="身份证号">
                    <template slot-scope="scope">
                        {{scope.row.idcard}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="200"
                        label="电话">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template slot-scope="scope">
                        <a class="pass" href="javascript:;" v-if="scope.row.sysStatus === '0'">
                            平台审批中
                        </a>
                        <a class="pass" href="javascript:;" v-if="scope.row.sysStatus === '2'">
                            已拒绝
                        </a>
                        <el-button type="primary" @click="staffAddToStore(scope.row.staffId)" v-if="scope.row.sysStatus === '1'">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-wrap">
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next"
                    :pager-count="5"
                    :page-size="20"
                    :total="value">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { provinceAndCityData, CodeToText } from 'element-china-area-data';
    import REQ from "../../../vue/global/request.js";
    import Type from '../../global/name_space.js'
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        data(){
            return{
                pageNo:1,
                value:0,
                staffInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1',
                staffType:Type.staffType
            }
        },
        mounted(){
            this.staffAddList();
        },
        watch:{

        },
        methods:{
            staffAddList(){
                let vm = this;
                let postData = {
                    pageNo:this.pageNo,
                };
                REQ.reqStaffAddList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.staffInfo = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            handleCurrentChange(val){
                this.pageNo = val;
                this.staffList();
            },
            handleSizeChange(){

            },
            staffAddToStore(staffId){
                let vm = this;
                let postData = {
                    staffId:staffId
                };
                REQ.reqStaffAddToStore(postData,
                    (result) => {
                        vm.$message.success("添加成功！");
                        vm.staffAddList();
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            passStaffEvent(staffId){
                let vm = this;
                let postData = {
                    staffId:staffId
                };
                REQ.reqStaffUnfreeze(postData,
                    (result) => {
                        vm.$message.success("解冻成功！");
                        vm.staffList();
                    },
                    (data) => {},
                    (data) => {}
                )
            }
        }
    }
</script>

<style scoped lang="scss">
    .box_wrap{
        .material_info{
            text-align: center;
            padding: 10px 0;
            display: inline-block;
            margin-right: 30px;
            border-radius: 4px;
            img{
                width: 100px;
                height: 100px;
            }
            h2{
                padding-top: 10px;
                color: #FFFFFF;
            }
        }
    }
</style>