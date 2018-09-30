<template>
    <div class="qrcode_wrap">
        <!--<el-button type="danger" @click="batchDownload">批量下载</el-button>-->
        <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
            <el-row>
                <el-col :span="4" v-for="(item,index) in codeList">
                    <div class="QRcode">
                        <div
                                :id="'qrcode'+index"
                                :ref="'qrcode'+index"
                                class="qrcode"
                        ></div>
                        <h2 class="QRcode_title">{{item.roomName}}楼{{item.tableName}}桌</h2>
                    </div>
                    <div class="obtns">
                        <!--<el-checkbox  :label="item.id" :key="item.id"></el-checkbox>-->
                        <a class="el-button el-button--primary el-button--mini downPic"  v-if="item.qrCode"  href="" :download="item.roomName+'楼'+item.tableName"> &nbsp;&nbsp;下载&nbsp;&nbsp;</a>
                        <el-button type="primary" size="mini" @click="qrcodeForTable(item.id,index)" v-else>重新生成</el-button>
                    </div>
                </el-col>
                <el-col :span="20"></el-col>
            </el-row>
        <!--</el-checkbox-group>-->
    </div>
</template>

<script>
    import $ from 'jquery'
    import QRCode from 'qrcodejs2'
    import REQ     from "../../global/request.js";
    const roomInfo = window.UINFO;
    export default {
        components:{

        },
        data(){
            return{
                codeList:[],
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            }
        },
        mounted(){
            let curInfo = this.$store.getters.getCurInfo;
            if(curInfo) {
                this.qrcodeForStore();
            }
        },
        watch:{
            curInfo(val){
                if(val){
                    this.qrcodeForStore();
                }
            },
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo
            }
        },
        methods:{
            /**
             * 获取餐桌类型
             */
            qrcodeForStore(){
                let _this = this;
                let posData = {
                    storeId:JSON.parse(_this.$store.getters.getCurInfo).storeId || '',
                    storeNo:JSON.parse(_this.$store.getters.getCurInfo).storeNo || '',
                };
                REQ.qrcodeForStore(posData,
                    function(result){
                        _this.codeList = result.data;
                        _this.$nextTick(() => {
                            _this.codeList.forEach((item,index) => {
                                if(item.qrCode)_this.qrcode(item.qrCode,index);
                            });
                        })
                    },
                    function(data){},
                    function(data){}
                );
            },
            /**
             * 获取指定桌位的二维码
             */
            qrcodeForTable(id,index){
                let _this = this;
                $(`#qrcode${index}`).find("canvas").remove();
                $(`#qrcode${index}`).find("img").remove();
                let posData = {
                    tableId:id,
                    storeNo:JSON.parse(_this.$store.getters.getCurInfo).storeNo || '',
                };
                REQ.qrcodeForTable(posData,
                    function(result){
                        if(!result.data) return;
                        _this.$set(_this.codeList[index],'id',result.data.id);
                        _this.$set(_this.codeList[index],'qrCode',result.data.qrCode);
                        _this.$set(_this.codeList[index],'roomName',result.data.roomName);
                        _this.$set(_this.codeList[index],'tableName',result.data.tableName);
                        _this.$nextTick(() => {
                            if(result.data.qrCode)_this.qrcode(result.data.qrCode,index);
                        })
                    },
                    function(data){},
                    function(data){}
                );
            },
            /**
             * 生成二维码
             * @param url
             * @param index
             */
            qrcode(url,index) {
                let qrcode = new QRCode(`qrcode${index}`, {
                    text: url
                });
                var ca=$(`#qrcode${index}`).find("canvas")[0];
                //获取二维码中的图片地址
                var src_xp=ca.toDataURL('image/jpeg');
                $(`#qrcode${index}`).parent(".QRcode").siblings(".obtns").find(".downPic").attr("href",src_xp);
            },

            handleCheckedCitiesChange(value) {
                // let checkedCount = value.length;
                // this.checkAll = checkedCount === this.cities.length;
                // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            /**
             * 批量下载
             */
            batchDownload(){
                $(".downPic").trigger("click");

            }
        }
    }
</script>

<style lang="scss">
    @import "../../../sass/common.scss";
    .QRcode{
        padding: 20px;
        background: #FFFFFF;
        border-radius: 4px;
        display: inline-block;
        text-align: center;
        .qrcode{
            @include set-width-height(150px,150px);
            img{
                @include set-width-height(100%,100%)
            }
        }
    }
    .obtns{
        padding: 20px 0;
        @include layout-flex-r-center;
        .downPic{
            color: #FFFFFF;
        }
    }
</style>