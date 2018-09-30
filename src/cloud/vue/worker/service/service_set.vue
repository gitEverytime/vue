<template>
    <div class="actor-set">

        <h1 class="title"> 点播设置</h1>

        <div class="row">
            <div class="col">
                <!--<span class="lab">点歌</span> -->
                <!--<div class=" btn-switch layui-unselect layui-form-switch" :class="{'layui-form-onswitch':getStatusParams.statusSong==0}" v-on:click="switchHandler('statusSong')">-->
                    <!--<em>ON</em>-->
                    <!--<i></i>-->
                <!--</div>-->
                <TempSwitch message = '点歌' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </div>

            <div class="col">
                <TempSwitch message = '点舞' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
                <!--<span class="lab">点舞</span> -->
                <!--<div class="btn-switch layui-unselect layui-form-switch" :class="{'layui-form-onswitch':getStatusParams.statusDance==0}" v-on:click="switchHandler('statusDance')">-->
                    <!--<em>ON</em>-->
                    <!--<i></i>-->
                <!--</div>-->
            </div>

        </div>

        <h1 class="title"> 价格设置</h1>

        <div class="row">
            <div class="col">
                <TempSaveText text="点歌" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
aa
                <!--<span class="lab">点歌</span>-->
                <!--<input type="text" v-model="getStatusParams.priceSong">-->
                <!--<span class="btn btn-save" v-on:click="setHandler('priceSong')">保存</span>-->
            </div>

            <div class="col">
                <TempSaveText text="点舞" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
                <!--<span class="lab">点舞</span>-->
                <!--<input type="text" v-model="getStatusParams.priceDance">-->
                <!--<span class="btn btn-save"  v-on:click="setHandler('priceDance')" >保存</span>-->
            </div>
        </div>

        <h1 class="title"> 数量设置</h1>

        <div class="row">
            <div class="col">
                <TempSaveText text="点歌" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
                <!--<span class="lab">点歌</span>-->
                <!--<input type="text" v-model="getStatusParams.countSong">-->
                <!--<span class="btn btn-save"  v-on:click="setHandler('countSong')" >保存</span>-->
            </div>

            <div class="col">
                <TempSaveText text="点舞" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
                <!--<span class="lab">点舞</span>-->
                <!--<input type="text" v-model="getStatusParams.countDance">-->
                <!--<span class="btn btn-save"  v-on:click="setHandler('countDance')" >保存</span>-->
            </div>

        </div>

        <h1 class="title"> 分成设置</h1>

        <div class="row">

            <div class="col">
                <TempSaveText text="商家" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
                <!--<span class="lab">商家</span>-->
                <!--<input type="text" v-model="getIncomeRate.storeScale">-->
                <!--<span class="btn btn-save"  v-on:click="setHandler('storeScale')" >保存</span>-->
            </div>

            <div class="col">
                <TempSaveText text="艺人" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
                <!--<span class="lab">艺人</span>-->
                <!--<input type="text" v-model="getIncomeRate.actorScale">-->
                <!--<span class="btn btn-save"  v-on:click="setHandler('actorScale')" >保存</span>-->
            </div>

            <div class="col">
                <span class="lab">平台</span>
                <input type="text"  readonly="true"  v-model="getIncomeRate.sysScale">
            </div>

        </div>

    </div>
</template>

<script>
import TempSwitch from '../../components/switch.vue'
import TempSaveText from '../../components/save_Text.vue'
import REQ     from "../../global/request.js";

const uInfo = window.UINFO;


export default {

    components:{
        TempSwitch,
        TempSaveText
    },


    data(){
        return{
            statusParams:{
                storeId:uInfo.storeId,
                statusSong:1,   statusDance:1,
                priceSong:0,    priceDance:0,
                countSong:10,   countDance:10
            },

            currStatusSong:1,
            currStatusDance:1,

            incomeRate:{}   //分成比例信息
        }
    },
    computed:{
        getStatusParams(){
            return this.statusParams;
        },

        getIncomeRate(){
            return this.incomeRate;
        }

    },

    mounted(){
        this.getSet();
        this.getProgramRateInfo();
    },
    
    methods:{
        switchHandler(btnName){
            //flagSong=   0 or 1       flagDance=   0 or 1
            var _this = this;
            switch(btnName){

                case "statusSong" :
                    let posData1 = {storeId:uInfo.storeId, status: 1- Number(this.getStatusParams.statusSong )  };
                    REQ.reqSwitchSongModule( posData1 ,
                        function(data){ _this.statusParams.statusSong = posData1.status; },
                        function(data){},
                        function(data){  alert(data.msg);  }
                    );
                break;

                case "statusDance" :
                    let posData2 = {storeId:uInfo.storeId, status: 1- Number( this.getStatusParams.statusDance  )  };
                    REQ.reqSwitchDanceModule( posData2 ,
                        function(data){  _this.statusParams.statusDance = posData2.status;  },
                        function(data){},
                        function(data){  alert(data.msg);  }
                    );
                break;

            }

        },

        setHandler(type){
            var _this = this;
            switch(type){
                case "priceSong" :
                    let posData1 = {storeId:uInfo.storeId, price:this.getStatusParams["priceSong"] };
                    REQ.reqSetStoreSongPrice( posData ,
                        function(data){ alert(data.msg);  },
                        function(data){},
                        function(data){  alert(data.msg);  }
                    );
                break;

                case "priceDance" :
                    let posData2 = {storeId:uInfo.storeId, price:this.getStatusParams["priceDance"] };
                    REQ.reqSetStoreDancePrice( posData2,
                        function(data){ alert(data.msg);  },
                        function(data){},
                        function(data){  alert(data.msg);  }
                    );
                break;

                case "countSong" :
                    let posData3 = {storeId:uInfo.storeId, count:this.getStatusParams["countSong"] };
                    REQ.reqSetStoreMaxSong( posData3,
                        function(data){ alert(data.msg);  },
                        function(data){},
                        function(data){  alert(data.msg);  }
                    );
                break;

                case "countDance" :
                    let posData4 = {storeId:uInfo.storeId, count:this.getStatusParams["countDance"] };
                    REQ.reqSetStoreMaxDance( posData4,
                        function(data){ alert(data.msg);  },
                        function(data){},
                        function(data){  alert(data.msg);  }
                    );
                break;

                case "actorScale" :  //设置艺人分成比例
                case "storeScale" :  //设置艺人分成比例
                    _this.setProgarmRate();
                break;

            }
            
        },

        getSet(){
            var _this = this;
            REQ.reqGetStoreModuleActorSet({storeId:uInfo.storeId},
                function(data){
                    _this.statusParams    = data.data;
                },
                function(data){},
                function(data){}
            );
        },


        getProgramRateInfo(){
            var _this = this;
            REQ.reqGetStoreProgramRate({storeId:uInfo.storeId},
                function(data){
                    _this.incomeRate = data.data;
                },
                function(data){},
                function(data){}
            );
        },

        
        setProgarmRate(){
            REQ.reqSetStoreProgramRate( this.incomeRate ,
                function(data){ alert(data.msg);  },
                function(data){},
                function(data){  alert(data.msg);  }
            );

        }



    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.actor-set{ 
    width: 100%; height: 100%;
}

.actor-set .title{
    margin: 20px 0 20px 0;
    height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
    color: #FF5722; border-left: 2px solid #FF5722;
}

.actor-set .row{
    @include layout-flex-r;
    margin: 20px 0 0 0;
}

.actor-set .row .col{
    @include layout-flex-r;
    margin: 0 100px 0 10px; width: 320px;
}

.actor-set .row .col .lab{ 
    margin: 0 20px 0 0;
    height: 25px; line-height: 25px; color: #dedede; font-size: 16px; 
}

.actor-set .row .col input{
    @include set-wh(60px, 20px);
    background:rgba(0,0,0,0.2); text-indent: 5px; 
    border: 1px solid #dedede; border-radius: 5px; color: #dedede;
}

.actor-set .row .col .btn{
    @include set-wh(60px, 20px);
    margin: 0 0 0 20px;
    display:inline-block; text-align: center; border-radius: 5px;
    background: #5FB878; color: #FFF; cursor: pointer;
}

.actor-set .row .col .btn-switch{ margin-top: 0;}







</style>




