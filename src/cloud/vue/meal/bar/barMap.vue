<template>
    <div class="barMapWrap">
        <div class="barCont">
            <el-row class="cont_right">
                <el-col :span="24">
                    <el-button type="danger" @click="insertRow" :disabled="barData.length === 10">增加一行</el-button>
                    <el-button type="danger" @click="deleteRow" :disabled="barData.length === 3">减少一行</el-button>
                    <el-button type="danger" @click="insertCol" :disabled="barData[0].item.length === 10">增加一列</el-button>
                    <el-button type="danger" @click="deleteCol" :disabled="barData[0].item.length === 3">减少一列</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="grid">
                    <div class="bar_scroll">
                        <!--行-->
                        <div class="bar_row" v-for="(row,key) in barData">
                            <!--列-->
                            <div class="bar_col" v-for="(col,index) in row.item" :class="{'select_active': col.tableType}" >
                                <el-button class="col_block" @click="chooseSeat(key,index)" :disabled="col.tableType && col.tableType!==''">
                                    <span v-if="col.tableTypeName"> {{col.tableTypeName}} </span>
                                    <span v-if="col.tableType === '0'">{{col.tableName}}</span>
                                    <span v-if="col.tableType === '0'">用餐{{col.seatCount}}人</span>
                                </el-button>
                                <i class="el-icon-remove removeBtn" v-if="col.tableType" @click="deleteColMsg(col,col.tablePosition)"></i>
                            </div>
                        </div>
                        <div class="direction">
                            <p>N</p>
                            <i class="iconfont icon-zhinanzhen"></i>
                        </div>
                    </div>
                    <div class="radioWrap">
                        <el-tabs v-model="radio3" class="labelPage" type="card"  closable @tab-remove="removeTab">
                            <el-tab-pane
                                    :key="item.id"
                                    v-for="(item, index) in floorList"
                                    :label="item.roomName"
                                    :name="item.id"
                            >
                            </el-tab-pane>
                        </el-tabs>
                        <el-button  type="primary" class="insertFloor" @click="dialogVisible2=true">+新增楼层</el-button>
                    </div>
                    <div class="">
                        <el-button type="danger" @click="editSave" class="save_btn" :disabled="floorList.length<1 || tables.length<1"> 编辑保存</el-button>
                        <el-button type="primary" @click="dialogVisible1 = true" class="save_btn" :disabled="tables.length<1"> 预览效果 </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="编辑吧图"
            :visible.sync="dialogVisible"
            :show-close="true"
            center
            width="400px"
        >
            <el-form ref="form" :model="seatData" label-width="80px">
                <el-form-item label="吧台类型">
                    <el-select v-model="seatData.tableType" placeholder="" disabled>
                        <el-option
                            v-for="item in options2"
                            :key="String(item.dataValue)"
                            :label="item.dataName"
                            :value="String(item.dataValue)"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="桌位号码" v-if="seatData.tableType === '0'">
                    <el-input v-model="seatData.tableName"></el-input>
                </el-form-item>
                <el-form-item label="用餐人数" v-if="seatData.tableType === '0'">
                    <el-select v-model="seatData.seatCount" placeholder="">
                        <el-option
                            v-for="item in options3"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>
        <TempPreview
                :dialogVisible1 = dialogVisible1
                :bardata ="barData"
                @setCloseEmit="setCloseSatus"
        ></TempPreview>
        <TempInsertFloor
                :dialogVisible2="dialogVisible2"
                :floorList="floorList"
                @setFloorEmit="getFloorEmit"
                @setFloorNumber="getFloorNumber"
        >

        </TempInsertFloor>
    </div>
</template>

<script>
    import $ from 'jquery'
    import REQ     from "../../global/request.js";
    import TempPreview from './bar_preview.vue'
    import TempInsertFloor   from './insert_floor.vue'
    const roomInfo = window.UINFO;
    export default {

        components:{
            TempPreview,
            TempInsertFloor
        },
        data(){
            return{
                activeName:'1',
                barData:[
                    {item:[{},{},{}]},
                    {item:[ {},{},{}]},
                    {item:[{},{},{}]},
                ],
                copyBarData:[
                    {item:[{},{},{}]},
                    {item:[ {},{},{}]},
                    {item:[{},{},{}]},
                ],
                radio3:'1',
                floorList:[],
                dialogVisible1:false,
                dialogVisible:false,
                dialogVisible2:false,
                seatData:{
                    tableType:'0',
                    tableName:'1',
                    seatCount:'2',
                    tablePosition:''
                },
                options2: [],
                options3: [
                    {label: '2'},
                    {label: '4'},
                    {label: '6'},
                    {label: '8'},
                    {label: '10'},
                    {label: '12'},
                    {label: '14'},
                    {label: '16'}
                    ],
                form:[],
                Xaxis:'',
                Yaxis:'',
                tables:[],
                type:'',
                XaxisList:[],
                YaxisList:[],
                maxX:0,
                maxY:0
            }
        },
        watch:{
            XaxisList(val){
                this.maxX = Math.max(...val);
                if(this.maxX<3) return;
                for(let i=2; i<this.maxX; i++){
                    this.insertRow();
                }
            },
            YaxisList(val){
                this.maxY = Math.max(...val);
                if(this.maxY<3) return;
                for(let i=2; i<this.maxY; i++){
                    this.insertCol();
                }
            },
            radio3(val){
                this.barData = [
                    {item:[{},{},{}]},
                    {item:[{},{},{}]},
                    {item:[{},{},{}]},
                ];
                this.getTableList(val);
            },
            curInfo(val){
                if(val){
                    this.getTableTypes();
                    this.getRoomList();
                }
            }
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo
            }
        },
        mounted(){
            let curInfo = this.$store.getters.getCurInfo;
            if(curInfo) {
                this.getTableTypes();
                this.getRoomList();
            }
        },

        methods:{
            /******************************  获取操作  *********************************/
            /**
             * 获取餐桌类型
             */
            getTableTypes(){
                let _this = this;
                let posData = {
                };
                REQ.reqTableTypes(posData,
                    function(result){
                        _this.options2 = result.data.rows;
                    },
                    function(data){},
                    function(data){}
                );
            },
            /**
             * 获取餐桌
             */
            getTableList(id){
                let vm = this;
                let posData = {
                    storeId:JSON.parse(vm.$store.getters.getCurInfo).storeId || '',
                    table:{
                        roomId:id
                    }
                };
                REQ.reqTableList(posData,
                    function(result){
                        let rooms = result.data.rooms[0];
                        vm.tables = rooms.tables;
                        vm.XaxisList = [];
                        vm.YaxisList = [];
                        rooms.tables.forEach((item,key) => {
                            let position = item.tablePosition.split(",");
                            let x = position[0];
                            let y = position[1];
                            vm.XaxisList.push(x);
                            vm.YaxisList.push(y);
                            vm.tableEdit(item,x,y)
                        })
                    },
                    function(data){},
                    function(data){}
                );
            },
            /**
             * 获取楼层
             */
            getRoomList(){
                let _this = this;
                let posData = {
                    storeId:JSON.parse(_this.$store.getters.getCurInfo).storeId || '',
                };
                REQ.reqRoomList(posData,
                    function(result) {
                        _this.floorList = result.data.rows;
                       if(_this.floorList.length>0)_this.radio3 = _this.floorList[0].id;
                    },
                    function(data){},
                    function(data){}
                );
            },
            /*******************************  编辑操作  *************************************/
            /**
             * 编辑更新Dom 渲染数据
             */
            tableEdit(item,x,y){
                let vm = this;
                let data = {
                    id: item.id,
                    orderId:item.orderId,
                    roomId: item.id,
                    seatCount:String(item.seatCount),
                    tableName:item.tableName,
                    tablePosition:item.tablePosition,
                    tableState:String(item.tableState),
                    tableType:String(item.tableType)
                };
                vm.options2.forEach((value => {
                    if(value.dataValue === item.tableType)  data['tableTypeName'] = value.dataName
                }));
                vm.$nextTick(() =>{
                    vm.barData[x].item.splice(y,1,data);
                })
            },
            /*********************************     删除操作   ********************************/
            /**
             * 删除确认
             */
            removeTab(id){
                this.$confirm('删除所选楼层，是否这样做？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.roomDelete(id);
                }).catch(() => {
                });
            },
            /**
             * 删除
             */
            roomDelete(id){
                let _this = this;
                let ids = [];
                ids.push(id);
                let posData = {
                    ids:ids
                };
                REQ.reqRoomdelete(posData,
                    function(result) {
                        _this.$message.success("删除楼层成功！");
                        _this.getRoomList();
                    },
                    function(data){},
                    function(data){}
                );
            },
            /***************************    添加类型创建操作   *******************************/
            /**
             * 选择位置
             * @param x
             * @param y
             */
            chooseSeat(x,y) {
                let vm = this;
                vm.Xaxis = x;
                vm.Yaxis = y;
                vm.seatData = {
                    tableType: '0',
                    tableName: '1',
                    seatCount: '2',
                    tablePosition: ''
                };
                vm.addActive(x, y);
                vm.dialogVisible = true;
            },
            /**
             * 选择类型
             */
            submitForm(){
                let vm = this;
                //给当前操作的盒子加属性以及属性值
                vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'tableType',vm.seatData.tableType);
                vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'tablePosition',`${vm.Xaxis},${vm.Yaxis}`);
                vm.options2.forEach(val => {
                    if(String(val.dataValue) === vm.seatData.tableType) vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'tableTypeName',val.dataName);
                });
                vm.seatData.tablePosition = `${vm.Xaxis},${vm.Yaxis}`;
                if(vm.seatData.tableType === '0'){
                    vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'tableName',vm.seatData.tableName);
                    vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'seatCount',vm.seatData.seatCount);
                }else{
                    vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'tableName','');
                    vm.$set(vm.barData[vm.Xaxis].item[vm.Yaxis],'seatCount','');
                }
                vm.removeRepeat();      //给将要发送的tables数据添加属性
                vm.dialogVisible = false;
            },
            //去重
            removeRepeat(){
                let vm = this;
                let setData = new Set(vm.tables);
                setData.add(vm.seatData);
                vm.tables = [...setData];
            },
            /****************************  编辑/新增操作  *****************************/
            //删除当前编辑的内容
            deleteColMsg(col,tablePosition){
                let vm = this;
                vm.$confirm('确认删除该位置已经存在的信息？', '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Object.keys(col).forEach(i => {col[i] = ''; delete col[i]});
                    //删除tables里面对应的list
                    vm.tables.forEach((val,key) => {
                        if(val.tablePosition === tablePosition){
                            val.id ? val['op'] = 0 : vm.tables.splice(key,1)
                        }
                    });
                }).catch(() => {
                });
            },
            /**
             * 创建布局
             */
            editSave(){
                let vm = this;
                vm.tables.forEach(val => { vm.$set(val,'roomId',vm.radio3)});          //创建好的每个类型都加上楼层参数
                let posData = {
                    tables:vm.tables
                };
                REQ.reqTableLayout(posData,
                    function(result){
                        vm.$message.success("创建/更新布局成功！");
                        vm.barData = [
                            {item:[{},{},{}]},
                            {item:[{},{},{}]},
                            {item:[{},{},{}]},
                        ];
                        vm.getTableList(vm.radio3);
                    },
                    function(data){ },
                    function(data){
                        //todo error
                    }
                )
            },
            /**
             * 增加行
             */
            insertRow(){
                let vm = this;
                let newRow = {item:[]};
                vm.barData[0].item.forEach((val,key) => {
                    newRow.item.push({})
                });
                vm.$set(vm.barData, vm.barData.length, newRow);
            },
            /**
             * 增加列
             */
            insertCol(){
                this.barData.forEach((val,key) => {
                    val.item.push({})
                })
            },
            /**
             * 删除列
             */
            deleteRow(){
                this.barData.pop();
            },
            /**
             * 删除行
             */
            deleteCol(){
                this.$nextTick(() => {
                    this.barData.forEach((val,key) => {
                        val.item.pop();
                    })
                })
            },
            //占用状态
            addActive(x,y){
                $(`.bar_row:eq(${x})`)
                    .find(`.bar_col:eq(${y})`).addClass("active")
                    .siblings(".bar_col").removeClass("active")
                    .end()
                    .end()
                    .siblings(".bar_row")
                    .find(".bar_col").removeClass("active");    //加背景
            },
            /**
             * 获取创建弹窗状态
             */
            setCloseSatus(data){
                this.dialogVisible1 = data;
            },
            /**
             * 获取创建楼层弹窗状态
             * @param data
             */
            getFloorEmit(data){
                this.dialogVisible2 = data;
            },
            /**
             * 获取到添加的楼层
             * @param data
             */
            getFloorNumber(data){
                let vm = this;
                vm.floorList.push(data);
                if(vm.floorList.length === 1) vm.radio3 = vm.floorList[0].id;
            },
        }
    }

</script>

<style scoped lang='scss'>
    @import '../../../sass/common.scss';
    .barMapWrap{
        padding: 0 20px;
        width: 100%;
        height: 100%;
        margin-right: -17px;
        overflow-x: hidden;
        overflow-y: auto;
        .barHead{
            padding: 33px 0 14px;
            border-bottom: #00B594 solid 1px;
            h1{
                font-size: 16px;
                color: #00B594;
            }
        }
        .barCont {
            text-align:center;
            padding-bottom: 100px;
            .grid{
                overflow: hidden;
                .bar_scroll {
                    margin-top: 40px;
                    text-align: center;
                    position: relative;
                    table {
                        border-color: #FFFFFF;
                    }
                    .direction {
                        position: absolute;
                        top: 50px;
                        right: 50px;
                        p {
                            color: #00B594;
                            font-size: 20px;
                            padding-bottom: 5px;

                        }
                        .icon-zhinanzhen {
                            color: #00B594;
                            font-size: 20px
                        }
                    }
                }
                .save_btn {
                    margin-top: 30px;
                }
            }
            .bar_row {
                 @include layout-flex-r-center;
                .bar_col {
                    @include set-width-height(70px, 70px);
                    border: #00B594 solid 1px;
                    margin: 5px;
                    display:inline-block;
                    cursor: pointer;
                    position: relative;
                    .col_block{
                        @include set-width-height(100%, 100%);
                        overflow: hidden;
                        background-color: transparent;
                        border-radius: 0;
                        padding:0;
                        color:#ffffff;
                    }
                    span{
                        display: block;
                    }
                    .iconfont{
                        font-size: 12px;
                    }
                    .removeBtn{
                        position: absolute;
                        top: -5px;
                        right:-5px;
                        color:#FFFFFF;
                        font-size: 15px;
                    }
                }
            }
            .radioWrap{
                @include layout-flex-r-center;
                margin-top:30px;
                .insertFloor{
                    margin-left: 30px;
                    height: 38px;
                }
            }
            .cont_right{
                padding-top:40px;
            }
        }
        .input-suffix{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }
        .active,.select_active{
            background: #CD533E;
        }
    }
</style>