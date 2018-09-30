<template>
    <div class="openDoor">
        <el-row class="header">
            <el-col :span="24" class="header_row">
                <el-button type="danger" @click="startUp">开启大屏幕</el-button>
                <!--<el-button type="danger" >下载中心</el-button>-->
            </el-col>
        </el-row>
        <el-row class="content">
            <div class="ringWrap">
                <el-row>
                    <el-col :span="16">
                        <div
                                class="ring"
                                v-for="(item,key) in ringList"
                        >
                            <canvas :id="key" width="120" height="120">
                                您的浏览器不支持canvas标签!
                            </canvas>

                        </div>
                    </el-col>
                    <el-col :span="8" class="QRcodeWrap">
                        <div class="QRcode">
                            <div id="qrcode" ref="qrcode"></div>
                            <h2 class="QRcode_title">公屏二维码</h2>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <h2 class="title">平台直供</h2>
            <ul class="goodsWrap">
                <li v-for="item in goodsList">
                    <img :src="item.icon">
                    <span class="price">￥{{item.price}}</span>
                    <span class="name">{{item.name}}</span>
                    <span class="desc">{{item.desc}}</span>
                    <span class="sug_price">￥{{item.frontPrice}}</span>
                </li>
            </ul>
        </el-row>
    </div>
</template>

<script>
    const roomInfo = window.UINFO;
    import rawMain from '../global/ringProgressMap.js';
    import REQ from "../global/request.js";
    import QRCode from 'qrcodejs2'
    export default {

        components:{
        },
        data(){
            return{
                ringList:[],
                goodsList:[
                    {
                        icon:'http://static.ibigtop.com/static/img/advert/pic1.webp',
                        name:'[平台直供]吾瓜瓜子',
                        desc:'原味瓜子,餐桌必备!',
                        frontPrice:'20.00',
                        price:'20.00'
                    },
                    {
                        icon:'http://static.ibigtop.com/static/img/advert/pic2.webp',
                        name:'[平台直供]吾瓜瓜子',
                        desc:'原味瓜子,餐桌必备!',
                        frontPrice:'40.00',
                        price:'20.00'
                    },
                    {
                        icon:'http://static.ibigtop.com/static/img/advert/pic3.webp',
                        name:'[平台直供]吾瓜瓜子',
                        desc:'原味瓜子,餐桌必备!',
                        frontPrice:'50.00',
                        price:'20.00'
                    },
                    {
                        icon:'http://static.ibigtop.com/static/img/advert/pic4.webp',
                        name:'[平台直供]吾瓜瓜子',
                        desc:'原味瓜子,餐桌必备!',
                        frontPrice:'30.00',
                        price:'20.00'
                    }
                ],
            }
        },
        watch:{
            curInfo(val){
                if(val){
                    this.qrcode(JSON.parse(val).pubCode);
                }
            }
        },
        computed:{
            curInfo(){
                return this.$store.getters.getCurInfo;
            }
        },

        mounted(){
            this.getIncomeSum();
            let info = this.$store.getters.getCurInfo;
            if(info){
                this.qrcode(JSON.parse(info).pubCode);
            }
        },
        methods:{
            startUp(){
                window.open(`http://web.ibigtop.com/screen/public?storeId=${JSON.parse(this.$store.getters.getCurInfo).storeId}`)
            },
            getIncomeSum(){
                let vm = this;
                let posData = {
                    storeId:roomInfo.storeId
                };
                REQ.reqIncomeSum(posData,
                    function(data){
                        vm.ringList = data.data.incomeList;
                        /*
                         * ps:this.$nextTick(() => {})Dom更新之后才会执行
                         */
                        vm.$nextTick(() => {                //渲染环形图
                            vm.ringList.forEach((val,key) => {
                                let ring = document.getElementById(`${key}`);
                                rawMain(ring, Number(val.percentage), val.name, Number(val.total), "#00B594", "#164648");
                            });
                        })
                    },
                    function(data){},
                    function(data){}
                )
            },
            qrcode(url) {
                let qrcode = new QRCode('qrcode', {
                    text: url
                });
            },
        }


    }


</script>

<style  lang='scss'>
    @import '../../../style/sass/mixin.scss';
    .openDoor{
        padding: 0 30px;
        .header{
            padding: 23px 0;
            border-bottom: #00B594 solid 1px;
            .header_row{text-align: right;}
        }
        .content{
            padding: 23px 0 52px;
            .title{
                color: #FFFFFF;
                font-size: 16px;
                span{
                    color: #655F63;
                }
            }
            .totalIncome{
                color: #CD533E;
                font-size: 40px;
                padding-top:5px;
            }
            .ringWrap{
                padding: 34px 0 52px;
                border-bottom: #00B594 solid 1px;
                margin-bottom: 10px;
                .ring{
                    @include set-width-height(120px, 120px);
                    display:inline-block;
                    margin-right: 53px;
                }
            }
            .goodsWrap{
                padding: 22px 0 24px;
                li{
                    float:left;
                    margin-right:25px;
                    @include set-width-height(214px,auto);
                    img{
                        @include set-width-height(100%,103px);
                    }
                    span{
                        display: block;
                    }
                    .price{
                        padding-top: 5px;
                        color: #CD533E;
                        font-size: 16px;
                    }
                    .name,.desc{
                        color: #FFFFFF;
                        font-size: 14px;
                        padding-top: 2px;
                    }
                    .sug_price{
                        padding-top: 5px;
                        color: #655F63;
                    }

                }
            }
        }
        .QRcode{
            padding: 20px;
            background: #FFFFFF;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            #qrcode{
                @include set-width-height(150px,150px);
                img{
                    @include set-width-height(100%,100%)
                }
            }
        }
        .QRcodeWrap{
            @include layout-flex-r-fd;
        }
    }

</style>