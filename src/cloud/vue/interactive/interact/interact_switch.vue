<template>
    <div class="interact-switch">
        <h1 class="title">免费聊天</h1>

        <div class="row">
            <div class="col">
                <TempSwitch message = '是否开启' :propsSwitch='isFreeChat'  @isSwitchEmit="isFreeChatEvent"></TempSwitch>
            </div>
        </div>

        <h1 class="title">霸麦设置<span>可同时开启或同时关闭，也可只开启一项，价格可分开设置</span></h1>

        <div class="row">
            <div class="col">
                <TempSaveText text="好声音" :isMaxMin="true" value="保存"  width="80px" :propsSaveText="v_price" @inputVal="BmNumber"></TempSaveText>
            </div>

            <div class="col">
                <TempSwitch message = '是否开启' :propsSwitch='v_isOn'  @isSwitchEmit="isBmVoice"></TempSwitch>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TempSaveText text="真心话" :isMaxMin="true" value="保存" width="80px"  :propsSaveText="r_price" @inputVal="realTolkNumber"></TempSaveText>
            </div>

            <div class="col">
                <TempSwitch message = '是否开启' :propsSwitch='r_isOn' @isSwitchEmit="isBmRealTolk"></TempSwitch>
            </div>
        </div>

        <h1 class="title">霸屏设置<span>所有霸屏可设置起始时间和价格</span></h1>

        <div class="row">
            <div class="col">
                <TempSwitch message = '炫酷霸屏' :propsSwitch='bpKx' @isSwitchEmit="isBPKX" ></TempSwitch>
            </div>

            <div class="col">
                <TempSwitch message = '重金霸屏' :propsSwitch='bpZj'  @isSwitchEmit="isBPZJ"></TempSwitch>

            </div>

            <div class="col">
                <TempSwitch message = '主题霸屏' :propsSwitch='bpTheme'  @isSwitchEmit="isBPZT"></TempSwitch>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TempSaveText text="起始时间" value="保存" width="80px" :isMaxMin="true" :propsSaveText="bpStartTime" @inputVal="setStartTime"></TempSaveText>
            </div>

            <div class="col">
                <TempSaveMini text="1秒价格" value="保存" width="80px" :isMaxMin="true" :propsSaveText="bpPrice" @inputVal="setBpPrice"></TempSaveMini>
            </div>
        </div>

        <h1 class="title">顶栏文本<span>最多3条</span></h1>

        <div class="row">
            <div class="col w300">
                <TempSwitch message = '是否开启' :propsSwitch='isOn'   @isSwitchEmit="isTopText"></TempSwitch>
                <div class="btn-icon insertBtn" @click="insertTopTextTitle" :class="{'grayBtn':titles.length>2}">+</div>
            </div>
        </div>

        <div class="row" v-for="(item,index) in titles">
            <div class="col w_auto">
                <input type="text" placeholder="欢迎光临苏木音乐酒吧" style="width: 400px;" v-model="item.title">
                <span class="btn btn-save" @click="setTopTextApi">保存</span>
                <span class="btn btn-delete" @click="deleteTitleBtn(index)">删除</span>
            </div>
        </div>

        <h1 class="title">背景设置<span>只能为单一形式，且每种类型最多允许3个项目轮播</span></h1>

        <div class="row">
            <div class="col">
                <TempSwitch message = '纯色' :propsSwitch='bgData.isOn' @isSwitchEmit="isBgColor"></TempSwitch>

            </div>
            <div class="col">
                <el-color-picker v-model="color4"  @change="colorChange" :disabled="colorList.length === 4"></el-color-picker>
                <div
                        class="bg_color"
                        v-for="(item,index) in colorList"
                        :style="{'background-color':item.color}">
                    <i class="el-icon-remove remove" @click="removeColor(index)"></i>
                </div>

            </div>

            <div class="col">
                <TempSaveText text="轮播时间" value="保存" width="80px" :isMaxMin="true" :propsSaveText="bgData.time" @inputVal="setBgTime"></TempSaveText>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TempSwitch message = '视频' :propsSwitch='postData.isOn'  @isSwitchEmit="isBgVoice"></TempSwitch>
            </div>

            <div class="col">
                <el-upload
                        :disabled="videoList.length === 4"
                        class="avatar-uploader-mini"
                        action="http://static.ibigtop.com/res/upload"
                        :show-file-list="false"
                        :on-success="uploadVideoSuccess">
                    <video v-if="videoUrl" :src="videoUrl" class="avatar" style="object-fit: fill;"></video>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="videoWrap" v-for="(item,index) in videoList">
                    <video
                            class="ovideo"
                             :src="item.video"
                    >
                    </video>
                    <i class="el-icon-remove remove" @click="removeVideo(index)"></i>
                </div>
            </div>

            <div class="col">
                <TempSaveText text="轮播时间" value="保存" width="80px" :isMaxMin="true" :propsSaveText="postData.time" @inputVal="setBvTime"></TempSaveText>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TempSwitch message = '图片' :propsSwitch='bpData.isOn' @isSwitchEmit="isBgPicture"></TempSwitch>

            </div>
            <div class="col">
                <el-upload
                        :disabled="imgList.length === 4"
                        class="avatar-uploader-mini"
                        action="http://static.ibigtop.com/res/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div    v-for="(item,index) in imgList"
                        :style="{
                        'background':`url(${item.img})`,
                        'background-size':'100%,100%'
                        }"
                        class="oimg">
                    <i class="el-icon-remove remove" @click="removePicture(index)"></i>

                </div>
            </div>

            <div class="col">
                <TempSaveText text="轮播时间" value="保存" width="80px" :isMaxMin="true" :propsSaveText="bpData.time" @inputVal="setBpTime"></TempSaveText>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <TempSwitch message = '透明' :propsSwitch='bl_isOn' @isSwitchEmit="isBgLucency"></TempSwitch>
            </div>

            <div class="col w_auto">
              <span class="prompt">开启透明后，则默认桌面背景等元素</span>
            </div>
        </div>

        <h1 class="title">Wifi设置</h1>

        <div class="row">
            <div class="col">
                <TempSwitch message = '是否开启' :propsSwitch='w_isOn'  @isSwitchEmit="isWifi" ></TempSwitch>
            </div>

            <div class="col">
                <span class="lab">账号名称</span>
                <input type="text" v-model="wifiName">
            </div>

            <div class="col">
                <span class="lab">账号密码</span>

                <input type="text" v-model="wifiPwd" class="W150">
                <span class="btn btn-save" @click="setWifi">保存</span>
            </div>
        </div>

    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'
    import TempSaveMini from '../../components/save_mini.vue'

    const roomInfo = window.UINFO;
    export default {

        components:{
            TempSwitch,
            TempSaveText,
            TempSaveMini
        },


        data(){
            return{
                videoUrl:'',
                imageUrl: '',
                freeText:'是否开启',
                isFreeChat:'0',
                v_isOn:'0',
                v_price:10,
                r_isOn:'0',
                r_price:10,
                bpKx:'0',
                bpZj:'0',
                bpTheme:'0',
                bpStartTime:10,
                bpPrice:10,
                isOn:'0',
                titles:[
                    {
                        title:''
                    }
                ],
                bgData:{
                    storeId: roomInfo.storeId,
                    isOn:'0',
                    val1:'',
                    time:10,
                },
                postData:{
                    storeId: roomInfo.storeId,
                    isOn:'0',
                    val1:'',
                    time:10,
                },
                bpData:{
                    storeId: roomInfo.storeId,
                    isOn:'0',
                    val1:'',
                    time:10,
                },
                bl_isOn:'0',
                w_isOn:'0',
                wifiName:'',
                wifiPwd:'',
                color4:'#00B594',
                colorList:[

                ],
                col_disabled:false,
                imgList:[

                ],
                img_disabled:false,
                videoList:[

                ]
            }
        },
        computed:{

        },

        mounted(){
            console.log(this.REQ);
            let vm = this;
            //获取初始设置的信息
            let posData = {
                storeId: roomInfo.storeId,
            };
            this.REQ.reqGetCfg(posData,
                function(data){
                    let result = data.data;
                    result.freeChat === "1" ? vm.isFreeChat = "1" : vm.isFreeChat = "0";                //免费聊天是否开启
                    vm.v_price = JSON.parse(result.bmVoice).price;
                    JSON.parse(result.bmVoice).isOn === "1" ? vm.v_isOn = "1" : vm.v_isOn = "0";        //好声音是否开启
                    vm.r_price = JSON.parse(result.bmHert).price;
                    JSON.parse(result.bmHert).isOn === "1" ? vm.r_isOn = "1" : vm.r_isOn = "0";         //真心话是否开启
                    result.bp1 === "1" ? vm.bpKx = '1' : vm.bpKx = '0';                                //炫酷霸屏是否开启
                    result.bp2 === "1" ? vm.bpZj = '1' : vm.bpZj = '0';                                //重金霸屏是否开启
                    result.bp3 === "1" ? vm.bpTheme = '1' : vm.bpTheme = '0';                       //主题霸屏是否开启
                    vm.bpStartTime = Number(result.bpStartTime);                                        //起始时间
                    vm.bpPrice = Number(result.bpPrice);                                                        //价格
                    JSON.parse(result.storeTitle).isOn === "1" ? vm.isOn = '1' : vm.isOn = '0';         //顶栏文本是否开启
                    vm.titles[0].title = JSON.parse(result.storeTitle)[`title${1}`];                    //顶栏文本title
                    for(let i = 1; i<3; i++){
                        let otitle = JSON.parse(result.storeTitle)[`title${i+1}`];
                        if(otitle !== ""){
                            vm.titles.push({
                                title:otitle
                            });
                        }
                    }
                    JSON.parse(result.bgColor).isOn === "1" ? vm.bgData.isOn = '1' : vm.bgData.isOn = '0';       //纯色
                    vm.bgData.time = Number(JSON.parse(result.bgColor).time);
                    JSON.parse(result.bgVideo).isOn === "1" ? vm.postData.isOn = '1' : vm.postData.isOn = '0';       //视频
                    vm.postData.time = Number(JSON.parse(result.bgVideo).time);
                    let bgColorList = JSON.parse(result.bgColor);
                    let bgPictureList = JSON.parse(result.bgPicture);
                    let bgVideoList = JSON.parse(result.bgVideo);
                    for (let i = 1; i<5; i++) {
                        if(bgColorList[`val${i}`]!==''){                     //背景颜色
                            vm.colorList.push({
                                color:bgColorList[`val${i}`]
                            });
                            vm.bgData[`val${i}`] = bgColorList[`val${i}`];
                        }
                        if(bgVideoList[`val${i}`]!==''){                     //背景视频
                            vm.videoList.push({
                                video:bgVideoList[`val${i}`]
                            });
                            vm.postData[`val${i}`] = bgVideoList[`val${i}`];
                        }
                        if(bgPictureList[`val${i}`]!==''){                   //背景图片
                            vm.imgList.push({
                                img:bgPictureList[`val${i}`]
                            });
                            vm.postData[`val${i}`] = bgPictureList[`val${i}`];
                        }
                    }
                    JSON.parse(result.bgPicture).isOn === "1" ? vm.bpData.isOn = '1' : vm.bpData.isOn = '0';     //图片
                    vm.bpData.time = Number(JSON.parse(result.bgPicture).time);
                    result.bgLucency === "1" ? vm.bl_isOn = '1' : vm.bl_isOn = '0';                      //透明
                    JSON.parse(result.wifi).isOn === "1" ?  vm.w_isOn = '1' :  vm.w_isOn = '0';          //wifi是否开启
                    vm.wifiName = JSON.parse(result.wifi).wifiName;                                      //wifi名称
                    vm.wifiPwd = JSON.parse(result.wifi).wifiPwd                                         //wifi密码
                },
                function(data){},
                function(data){
                    //todo  error
                }
            )
        },

        methods:{
            colorChange(val){
                let vm = this;
                vm.colorList.push({
                    color:val
                });
                vm.colorList.forEach((item,key) => {
                    vm.bgData[`val${key+1}`] = item.color;
                });
                vm.setBgColor();
            },
            handleAvatarSuccess(res, file) {
                let vm = this;
                vm.imageUrl = URL.createObjectURL(file.raw);
                vm.imgList.push({
                    img:res.response.data
                });
                vm.imgList.forEach((item,key) => {
                    vm.bpData[`val${key+1}`] = item.img;
                });
                this.setBgPicture();
            },
            uploadVideoSuccess(res, file) {
                let vm = this;
                vm.videoUrl = URL.createObjectURL(file.raw);
                vm.videoList.push({
                    video:res.response.data
                });
                vm.videoList.forEach((item,key) => {
                    vm.postData[`val${key+1}`] = item.video;
                });
                this.setBgVoice();
            },
            /**
             * 是否开启免费聊天
             * @param data
             */
            isFreeChatEvent(data){
                let vm = this;
                vm.isFreeChat = data ;
                let posData = { storeId: roomInfo.storeId, type:vm.isFreeChat };
                vm.REQ.reqSetFreeChatApi(posData,
                    function(data){
                        vm.isFreeChat === '1' ? vm.$message.success("开启免费聊天成功！") :  vm.$message.success("关闭免费聊天成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },

            //是否开启好声音
            isBmVoice(data){
                this.v_isOn = data;
                this.isGoodVoiceEvent();
            },
            //好声音数值保存
            BmNumber(val){
                this.v_price = val;
                this.isGoodVoiceEvent();
            },
            /**
             * 霸麦好声音
             * @param data
             */
            isGoodVoiceEvent(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    isOn:vm.v_isOn,
                    price:vm.v_price
                };
                vm.REQ.reqSetBmvApi(posData,
                    function(data){
                        vm.$message.success("已设置霸麦好声音！");
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },

            //是否开启真心话
            isBmRealTolk(data){
                this.r_isOn = data;
                this.isRealTolkEvent();
            },
            //真心话数值
            realTolkNumber(val){
                this.r_price = val;
                this.isRealTolkEvent();
            },
            /**
             * 霸麦真心话
             * @param data
             */
            isRealTolkEvent(data){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    isOn:vm.r_isOn,
                    price:vm.r_price
                };
                vm.REQ.reqSetBmrApi(posData,
                    function(data){
                        vm.$message.success("已设置霸麦真心话！");
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },

            //炫酷霸屏
            isBPKX(data){
                this.bpKx = data;
                this.setBP();
            },
            //重金霸屏
            isBPZJ(data){
                this.bpZj = data;
                this.setBP();
            },
            //主题霸屏
            isBPZT(data){
                this.bpTheme = data;
                this.setBP();
            },
            //起始时间
            setStartTime(val){
                this.bpStartTime = val;
                this.setBP();
            },
            //单位价格
            setBpPrice(val){
                this.bpPrice = val;
                this.setBP();
            },

            /**
             *  霸屏设置
             * @param data
             */
            setBP(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    bp1:vm.bpKx,
                    bp2:vm.bpZj,
                    bp3:vm.bpTheme,
                    bpStartTime:vm.bpStartTime,
                    bpPrice:vm.bpPrice
                };
                this.REQ.reqSetBpApi(posData,
                    function(data){
                        vm.$message.success("设置霸屏信息成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },
            //是否开启顶栏文本
            isTopText(data){
                this.isOn = data;
                this.setTopTextApi();
            },
            /**
             * 顶栏文本
             * @param data
             */
            setTopTextApi(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    isOn:vm.isOn,
                };
                vm.titles.forEach((val,key) =>{
                    posData[`title${key+1}`] = val.title;
                });
                this.REQ.reqSetDLWBApi(posData,
                    function(data){
                        vm.$message.success("设置顶栏文本信息成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },
            //增加
            insertTopTextTitle(){
                if(this.titles.length<3){
                    this.titles.push({
                        title:''
                    })
                }else{
                    //todo
                }
            },
            //删除
            deleteTitleBtn(index){
                if(this.titles.length>1){
                    this.titles.splice(index,1);
                    this.setTopTextApi();
                }else{
                    //todo
                }
            },

            //是否设置纯色
            isBgColor(data){
                this.bgData.isOn = data;
                this.setBgColor();
            },
            //轮播时间
            setBgTime(val){
                this.bgData.time = val;
                this.setBgColor();
            },
            /**
             * 纯色设置
             */
            setBgColor(){
                let vm = this;
                let posData = vm.bgData;
                this.REQ.reqSetBgColorApi(posData,
                    function(data){
                        vm.$message.success("设置纯色背景成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },
            /**
             * 删除颜色
             */
            removeColor(index){
                let vm = this;
                vm.colorList.splice(index,1);
                for (let i = 0; i<4; i++) {
                    if(vm.colorList[i]){
                        vm.bgData[`val${i+1}`] = vm.colorList[i].color;
                    }else{
                        delete vm.bgData[`val${i+1}`];
                    }

                }
                vm.setBgColor();
            },
            /**
             * 删除视频
             */
            removeVideo(index){
                let vm = this;
                vm.videoList.splice(index,1);
                for (let i = 0; i<4; i++) {
                    if(vm.videoList[i]){
                        vm.postData[`val${i+1}`] = vm.videoList[i].video;
                    }else{
                        delete vm.postData[`val${i+1}`];
                    }

                }
                vm.setBgVoice();
            },

            /**
             * 删除图片
             */
            removePicture(index){
                let vm = this;
                vm.imgList.splice(index,1);
                for (let i = 0; i<4; i++) {
                    if(vm.imgList[i]){
                        vm.bpData[`val${i+1}`] = vm.imgList[i].img;
                    }else{
                        delete vm.bpData[`val${i+1}`];
                    }

                }
                vm.setBgPicture();
            },

            //是否设置视频背景
            isBgVoice(data){
                this.postData.isOn = data;
                this.setBgVoice();
            },
            //轮播时间
            setBvTime(val){
                this.postData.time = val;
                this.setBgVoice();
            },
            /**
             * 视频设置
             */
            setBgVoice(){
                let vm = this;
                let posData = vm.postData;
                this.REQ.reqSetBgVoiceApi(posData,
                    function(data){
                        vm.$message.success("设置视频背景成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },

            //是否设置图片背景
            isBgPicture(data){
                this.bpData.isOn = data;
                this.setBgPicture();
            },
            //轮播时间
            setBpTime(val){
                this.bpData.time = val;
                this.setBgPicture();
            },
            /**
             * 图片设置
             */
            setBgPicture(){
                let vm = this;
                let posData = vm.bpData;

                this.REQ.reqSetBgPictureApi(posData,
                    function(data){
                        vm.$message.success("设置图片背景成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },

            //是否设置背景透明
            isBgLucency(data){
                this.bl_isOn = data;
                this.setBgLucency();
            },
            /**
             * 透明背景设置
             */
            setBgLucency(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    isOn:vm.bl_isOn
                };
                this.REQ.reqSetBgLucencyApi(posData,
                    function(data){
                        vm.$message.success("设置纯色背景成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },

            //是否开启wifi
            isWifi(data){
                this.w_isOn = data;
                this.setWifi();
            },
            //账号名称
            setWifiName(val){
                this.wifiName = val;
                this.setWifi();
            },
            //账号密码
            setWifiPassWord(val){
                this.wifiPwd = val;
                this.setWifi();
            },

            /**
             * wifi设置
             */
            setWifi(){
                let vm = this;
                let posData = {
                    storeId: roomInfo.storeId,
                    isOn:vm.w_isOn,
                    wifiName:vm.wifiName,
                    wifiPwd:vm.wifiPwd
                };
                this.REQ.reqSetWifiApi(posData,
                    function(data){
                        vm.$message.success("设置wifi信息成功！")
                    },
                    function(data){},
                    function(data){
                        //todo  error
                    }
                )
            },
        }


    }


</script>


<style  lang='scss'   scoped>
    @import "../../../../style/sass/mixin.scss";
    .interact-switch{
        width: 100%; height: 100%;
        padding-bottom: 50px;
    }

    .interact-switch .title{
        margin: 20px 0 20px 0;
        height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
        color: #FF5722; border-left: 2px solid #FF5722;
    }

    .interact-switch .title span{
        color:#787B80;
        display: inline;
        padding-left: 20px;
    }

    .interact-switch .row{
        @include layout-flex-r;
        margin: 20px 0 0 0;
    }

    .interact-switch .row .col{
        @include layout-flex-r;
        margin: 0 60px 0 10px;
        width: 240px;
    }

    .interact-switch .row .w_auto{
        width: auto;
    }
    .interact-switch .row .w300{
        width: 320px;
    }

    .interact-switch .row .col .lab{
        margin: 0 20px 0 0;
        height: 25px; line-height: 25px; color: #dedede; font-size: 16px;
    }

   .interact-switch .row .col .btn-icon{
        width: 25px; height: 25px;
       background: #FFFFFF; color: #BC5044;
       border-radius: 50%;
       font-size: 30px; text-align: center;
       line-height: 25px; display: inline-block;
       margin-left: 40px; cursor: pointer;
   }

    .interact-switch .row .col input{
        @include set-wh(60px, 20px);
        background:rgba(0,0,0,0.2); text-indent: 5px;
        border: 1px solid #dedede; border-radius: 5px; color: #dedede;
    }

    .interact-switch .row .col .btn{
        @include set-wh(60px, 20px);
        margin: 0 0 0 20px;
        display:inline-block; text-align: center; border-radius: 5px;
        background: #00B594; color: #FFF; cursor: pointer;
    }
    .interact-switch .row .col .prompt{
        color:#787B80;
        font-size: 18px;
    }
    .interact-switch .row .col .btn-delete{
        background: #CD533B;
    }
    .interact-switch .row .col .deleteBtn{
        line-height: 22px;
    }
    .interact-switch .row .col .btn-switch{ margin-top: 0;}
    .grayBtn{
        color:#787B80 !important;
        cursor: default !important;
        pointer-events: none;
    }
    .bg_color{
        display: inline-block;
        @include set-width-height(40px,40px);
        position: relative;
        border-radius: 2px;
        .remove{
            position: absolute;
            @include box-center(50%,50%);
            font-size: 18px;
            color: #ffffff;
            cursor: pointer;
        }
    }
    .avatar-uploader{
        margin-right: 30px;
    }
    .oimg{
        @include set-width-height(40px,40px);
        border-radius: 2px;
        display: inline-block;
        position: relative;
        .remove{
            position: absolute;
            @include box-center(50%,50%);
            font-size: 18px;
            color: #ffffff;
            cursor: pointer;
        }
    }
    .videoWrap{
        @include set-width-height(40px,40px);
        border-radius: 2px;
        display: inline-block;
        position: relative;
        .ovideo{
            object-fit: fill;
            @include set-width-height(40px,40px);
        }
        .remove{
            position: absolute;
            @include box-center(50%,50%);
            font-size: 18px;
            color: #ffffff;
            cursor: pointer;
        }
    }

</style>




