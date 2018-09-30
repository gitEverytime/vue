<template>
    <div class="classify_wrap">
        <div>
            <h1 class="title">分类信息  <el-button type="primary" class="insertBtn" size="small" @click="insertNewType">+新增分类</el-button></h1>
        </div>
        <div class="typeWrap">
            <el-table
                    :data="tableData"
                    ref="multipleTable"
                    :highlight-current-row= true
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    @row-click="chooseCategoryList"
            >
                <el-table-column
                        type="selection"
                        width="60"
                        size="medium"
                >
                </el-table-column>
                <el-table-column
                        type="index"
                        width="30"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        width=""
                        label="分类名称">
                    <template slot-scope="scope">
                        <a class="typeName"
                           href="javascript:;"
                        >
                            {{scope.row.typeName}}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="70"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="updateType(scope.row.id,scope.row.typeName)">修改</el-button>
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
                    :page-size="rowsPerPage"
                    :total="total3">
            </el-pagination>
            <el-button type="danger"
                       class="deleteType"
                       @click="deleteType"
                       :disabled="multipleSelection.length<1"
            >删除分类</el-button>
        </div>
        <!--    新增分类    -->
        <el-dialog
                title="新增分类"
                :visible.sync="dialogVisible"
                :show-close="true"
                center
                width="400px"
        >
            <el-form ref="carteData" :model="carteData" :rules="rules" label-width="80px">
                <el-form-item label="分类名称" prop="typeName" >
                    <el-input v-model="carteData.typeName" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item style="padding-top:20px">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="submitForm('carteData')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--    修改分类    -->
        <el-dialog
                title="修改分类"
                :visible.sync="dialogVisible1"
                :show-close="true"
                center
                width="400px"
        >
            <el-form ref="updateData" :model="updateData" :rules="rules" label-width="80px">
                <el-form-item label="分类名称" prop="typeName" >
                    <el-input v-model="updateData.typeName" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item style="padding-top:20px">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="danger" @click="submitForm1('updateData')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import REQ from "../../global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{
        },
        data(){
            return{
                dialogVisible:false,
                dialogVisible1:false,
                tableData:[],
                total3:0,
                pageIndex:1,
                rowsPerPage:6,
                carteData:{
                    typeName:'',
                    typeDescription:'',
                },
                updateData:{
                    id:'',
                    typeName:'',
                    typeDescription:'',
                },
                rules:{
                    typeName: [
                        { required: true, message: '请输入分类名称', trigger: 'change' }
                    ],
                },
                multipleSelection: []
            }
        },
        watch:{
            curInfo(val){
                if(val) this.getMenuClassify();
            }
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo
            }
        },

        mounted(){
            let curInfo = this.$store.getters.getCurInfo;
            if(curInfo) this.getMenuClassify();
        },

        methods:{
            /**
             * 获取类型list
             */
            getMenuClassify(){
                let _this = this;
                let posData = {
                    carteType: {
                        storeId: JSON.parse(_this.$store.getters.getCurInfo).storeId || ''
                    },
                    pageIndex:_this.pageIndex,
                    rowsPerPage:_this.rowsPerPage
                };
                REQ.reqCarteTypeList(posData,
                    function(data){
                        _this.tableData = data.data.rows;
                        _this.total3 = data.data.count;
                       if(_this.tableData.length>0) _this.$store.commit('setCarteTypeInfo',_this.tableData[0].id)       //拿到第一条数据的类型存贮
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            //vuex配置查询右边对应的菜品信息
            selectCarteType(id){
                this.$store.commit('setCarteTypeInfo',id)
            },
            chooseCategoryList(row){
                this.$store.commit('setCarteTypeInfo',row.id)
            },
            /*************************新增操作****************************/
            //新增弹窗
            insertNewType(){
                this.carteData.typeName = '';
                this.dialogVisible = true;
            },
            //提交验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postCarteTypeCreate();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 新增type
             */
            postCarteTypeCreate(){
                let _this = this;
                let posData = {
                    carteType:{
                        typeName: _this.carteData.typeName,
                        typeDescription:_this.carteData.typeDescription,
                        storeId:JSON.parse(_this.$store.getters.getCurInfo).storeId || ''
                    }
                };
                REQ.reqCarteTypeCreate(posData,
                    function(data){
                        _this.$message.success("新增分类成功！");
                        _this.dialogVisible = false;
                        _this.getMenuClassify();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /*************************修改操作****************************/
            /**
             * 初始化修改弹窗的信息
             */
            updateType(id,typeName){
                this.updateData.id = id;
                this.updateData.typeName = typeName;
                this.dialogVisible1 = true
            },
            /**
             * 验证
             */
            submitForm1(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postCarteTypeUpdate();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 修改菜品
             * @param val
             */
            postCarteTypeUpdate(){
                let _this = this;
                let posData = {
                    carteType:{
                        id:_this.updateData.id,
                        typeName:_this.updateData.typeName,
                        typeDescription:_this.updateData.typeDescription,
                        storeId:JSON.parse(_this.$store.getters.getCurInfo).storeId || ''
                    }
                };
                REQ.reqCarteTypeUpdate(posData,
                    function(data){
                        _this.$message.success("修改分类成功！");
                        _this.dialogVisible1 = false;
                        _this.getMenuClassify();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            /*************************删除操作****************************/
            //批量操作
            handleSelectionChange(val) {
                this.multipleSelection = new Set();
                val.forEach((value) => {
                    this.multipleSelection.add(value.id);
                });
                this.multipleSelection = [...this.multipleSelection]
            },
            /**
             * 删除type
             */
            deleteType(){
                this.$confirm('删除分类将与关联品类同时删除，请谨慎操作', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postDeleteType();
                }).catch(() => {
                });
            },
            //删除接口调用
            postDeleteType(){
                let _this = this;
                let posData = {
                    ids:_this.multipleSelection
                };
                REQ.reqCarteTypeDelete(posData,
                    function(data){
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        _this.getMenuClassify();
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                );
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getMenuClassify();
            },
        }


    }
</script>

<style scoped lang="scss">
    .classify_wrap{
        .title{
            margin: 20px 0 20px 0;
            height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
            color: #FF5722; border-left: 2px solid #FF5722;
        }
        .insertBtn{
            margin-left: 40px;
        }
        .typeWrap{

        }
        .typeName{
            cursor: pointer;
            color:#ffffff;
            display:inline-block;
            padding:4px 0;
            &:focus{
                text-decoration: underline;
                color: #00B594;
            }
        }
        .deleteType{
            margin: 20px 0;
        }
    }

</style>