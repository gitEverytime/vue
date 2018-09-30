<template>
    <div class="box_wrap">
        <el-tabs v-model="activeIndex">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getAgentList"
                    :label="col.resName"
                    :name="col.resUrl"
            ></el-tab-pane>
        </el-tabs>
        <div class="box">
            <el-table
                    :data="proxyInfo"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props" >
                        <el-form label-position="left"  class="demo-table-expand">
                            <el-form-item label="资料信息" v-if="props.row.attachs">
                                <div class="material_info" v-for="item in JSON.parse(props.row.attachs)">
                                    <img :src="item.img">
                                    <h2>{{item.title}}</h2>
                                </div>
                            </el-form-item>
                            <el-form-item label="详细地址">
                                {{CodeToText[props.row.ac1]}}·{{CodeToText[props.row.ac2]}}·{{CodeToText[props.row.ac3]}}{{props.row.ac4}}
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="代理名称"
                        prop="proxyName">
                </el-table-column>
                <el-table-column
                        label="代理区域"
                        prop="id">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === '200'">{{CodeToText[scope.row.ac1]}}</span>
                        <span v-else>{{CodeToText[scope.row.ac1]}}·{{CodeToText[scope.row.ac2]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="代理级别"
                        prop="id">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === '200'">一级代理</span>
                        <span v-else>二级代理</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="法人"
                        prop="corporate">
                </el-table-column>
                <el-table-column
                        label="电话"
                        prop="phone">
                </el-table-column>
                <!--<el-table-column-->
                        <!--label="操作"-->
                        <!--prop="phone">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="primary" size="small" @click="agressBtnEvent(scope.row.applyId)">同意</el-button>-->
                        <!--<el-button type="danger" size="small" @click="rejectBtnEvent(scope.row.applyId)">驳回</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
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
    import REQ from "../../vue/global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        data(){
            return{
                pageNo:1,
                value:0,
                proxyInfo:[],
                CodeToText:CodeToText,
                activeIndex:'1'
            }
        },
        watch:{
            activeIndex(){
                this.proxyList();
            }
        },
        mounted(){
            this.proxyList();
        },
        methods:{
            proxyList(){
                let vm = this;
                let postData = {
                    pageNo:this.pageNo,
                    status:vm.activeIndex
                };
                REQ.reqProxyList(postData,
                    (result) => {
                        vm.value = result.data.count;
                        vm.proxyInfo = result.data.rows;
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            handleCurrentChange(val){
                this.pageNo = val;
                his.proxyList();
            },
            handleSizeChange(){

            },
        }
    }
</script>

<style scoped lang="scss">
    .box_wrap{
        padding: 0 30px;
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