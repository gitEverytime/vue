<template>
    <div class="info">
        <TempBranchList v-if="activeName === '2'">

        </TempBranchList>
        <TempStoreName
            :sname="info.sname"
            @setStoreName="getStoreName"
        ></TempStoreName>

        <TempStoreLogo
            :logo="info.logo"
            @setImg='getImg'
        ></TempStoreLogo>

        <TempBossName
            :bossName="info.bossName"
            @setBossName="getBossName"
        ></TempBossName>

        <!--<TempBossTel-->
            <!--:bossPhone="info.bossPhone"-->
            <!--@setBossPhone="getBossPhone"-->
        <!--&gt;</TempBossTel>-->

        <TempServerTel
            :serviceTel="info.serviceTel"
            @setServerTel="getServerTel"
        ></TempServerTel>

        <TempTotalServer
            :codeValue="codeValue"
            :address="info.ac4"
            :code="code"
            @setAddressInfo="getAddressInfo"
        ></TempTotalServer>

        <TempBusinessIntroduce
            :summary="info.summary"
            @setSummary="getSummary"
        ></TempBusinessIntroduce>

        <TempWorkTime
            :dayStartTime="info.dayStartTime"
            :dayEndTime="info.dayEndTime"
            @setWorkTime="getWorkTime"
        ></TempWorkTime>

        <TempSpecialLabel
            :tags="info.tags"
            @setTags="getTags"
        ></TempSpecialLabel>

        <TempPersonConsume
            :consum="info.consum"
            @setConsum="getConsum"
        ></TempPersonConsume>

        <TempPublicNumber
            :wxpic="info.wxpic"
            @setWxpic="getWxpic"
        ></TempPublicNumber>

        <TempIntelligence
            :attachs="info.attachs"
            @setAttachs="getAttachs"
        ></TempIntelligence>
        <div class="footer" v-if="activeName === '2'">
            <el-button type="primary">冻结分店</el-button>
            <el-button type="danger">删除分店</el-button>
            <p>请谨慎操作</p>
        </div>
    </div>
</template>

<script>
    import TempBranchList  from './branch_List.vue'
    import TempStoreName   from './store_name.vue'
    import TempStoreLogo   from './store_logo.vue'
    import TempBossName    from './boss_name.vue'
    import TempBossTel     from  './boss_tel.vue'
    import TempServerTel   from  './server_tel.vue'
    import TempTotalServer  from './total_address.vue'
    import TempBusinessIntroduce   from './business_introduce.vue'
    import TempSpecialLabel    from './special_label.vue'
    import TempPersonConsume    from  './person_consume.vue'
    import TempPublicNumber  from './public_number.vue'
    import TempIntelligence      from './intelligence_info.vue'
    import TempWorkTime     from    './work_time.vue'
    import REQ from "../../vue/global/request.js";
    import { regionData, CodeToText } from 'element-china-area-data';
    const roomInfo = window.UINFO;

    export default {
        components:{
            TempBranchList,
            TempStoreName,
            TempStoreLogo,
            TempBossName,
            TempBossTel,
            TempServerTel,
            TempTotalServer,
            TempBusinessIntroduce,
            TempSpecialLabel,
            TempPersonConsume,
            TempPublicNumber,
            TempIntelligence,
            TempWorkTime
        },
        props:{
            activeName:{
                type:String
            }
        },
        data(){
            return{
                info:{
                    sname:'',
                    logo:'',
                    bossName:'',
                    bossPhone:'',
                    serviceTel:'',
                    ac4:'',
                    summary:'',
                    tags:'',
                    consum:0,
                    wxpic:'',
                    attachs:'',
                    dayStartTime:'',
                    dayEndTime:''
                },
                updateInfo:{

                },
                codeValue:'',
                code:[]
            }
        },
        watch:{
            info(val){
                this.codeValue = `${CodeToText[val.ac1]}${CodeToText[val.ac2]}${CodeToText[val.ac3]}`;
                this.code = [val.ac1,val.ac2,val.ac3];
            },
        },
        mounted(){
            this.getInfo();
        },
        methods:{
            /**
             * 获取账户基本信息
             */
            getInfo(){
                let vm = this;
                let posData = {
                    uid:roomInfo.uId
                };
                REQ.reqGetStoreMeg(posData,
                    function(data){
                        vm.info = data.data;
                        vm.updateInfo = data.data;
                    },
                    function(data){},
                    function(data){}
                )
            },
            /**
             * 更新账户基本信息
             */
            updateAccountInfo(){
                let vm = this;
                let posData = vm.updateInfo;
                posData.storeId = roomInfo.storeId;
                REQ.reqStoreUpdate(posData,
                    function(data){
                        vm.$message.success("更新账户信息成功！");
                        vm.updateInfo = vm.info;
                    },
                    function(data){},
                    function(data){}
                )
            },
            /**
             * 更新用户信息
             */
            updateUserInfo(){
                let vm = this;
                let posData = {
                    id:vm.updateInfo.id,
                    realName:vm.updateInfo.bossName,
                    phone:vm.updateInfo.bossPhone,
                    storeId:roomInfo.storeId
                };
                REQ.reqUserUpdate(posData,
                    function(data){
                        vm.$message.success("更新账户信息成功！");
                        vm.updateInfo = vm.info;
                    },
                    function(data){},
                    function(data){}
                )
            },
            /**
             * 更改店名
             * @param val
             */
            getStoreName(val){
                let vm = this;
                vm.updateInfo.sname = val;
                vm.updateAccountInfo();
            },
            /**
             * 更改logo
             * @param val
             */
            getImg(val){
                let vm = this;
                vm.updateInfo.logo = val;
                vm.updateAccountInfo();
            },
            /**
             * 更新boss姓名
             */
            getBossName(val){
                let vm = this;
                vm.updateInfo.bossName = val;
                vm.updateUserInfo();
            },
            /**
             * 更新boss电话
             */
            getBossPhone(val){
                let vm = this;
                vm.updateInfo.bossPhone = val;
                vm.updateUserInfo();
            },
            /**
             * 更新客服电话
             */
            getServerTel(val){
                let vm = this;
                vm.updateInfo.serviceTel = val;
                vm.updateAccountInfo();
            },
            /**
             * 更新地址
             */
            getAddressInfo(val){
                let vm = this;
                vm.updateInfo.ac1 = val.region[0];
                vm.updateInfo.ac2 = val.region[1];
                vm.updateInfo.ac3 = val.region[2];
                vm.updateInfo.ac4 = val.address;
                vm.codeValue = `${CodeToText[val.region[0]]}${CodeToText[val.region[1]]}${CodeToText[val.region[2]]}`;
                vm.code = [val.region[0],val.region[1],val.region[2]];
                vm.updateAccountInfo();
            },
            /**
             * 更新商家描述
             */
            getSummary(val){
                let vm = this;
                vm.updateInfo.summary = val;
                vm.updateAccountInfo();
            },
            /**
             * 更新标签
             */
            getTags(val){
                let vm = this;
                vm.updateInfo.tags = val;
                vm.updateAccountInfo();
            },
            /**
             * 更新人均消费金额
             */
            getConsum(val){
                let vm = this;
                vm.updateInfo.consum = val;
                vm.updateAccountInfo();
            },
            /**
             * 更新微信公众号二维码
             */
            getWxpic(val){
                let vm = this;
                vm.updateInfo.wxpic = val;
                vm.updateAccountInfo();
            },
            /**
             * 更新资料信息
             */
            getAttachs(val){
                let vm = this;
                vm.updateInfo.attachs = JSON.stringify(val);
                vm.updateAccountInfo();
            },
            /**
             * 更新工作时间
             * @param val
             */
            getWorkTime(val){
                let vm = this;
                vm.updateInfo.dayStartTime = val.startTime;
                vm.updateInfo.dayEndTime = val.endTime;
                vm.updateAccountInfo();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .info{
        padding-bottom: 50px;
    }
    .footer{
        margin-top: 20px;
        p{
            color: $light_gray;
        }
    }
</style>