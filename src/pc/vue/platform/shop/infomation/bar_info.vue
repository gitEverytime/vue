<template>
    <div class="base-info">
        <div class="box">
            <div class="row">
                <p class="label">请输入酒吧名称</p>
                <input type="text" class="inp"    v-model="setStoreInfo.valTitle">
            </div>

            <div class="row">
                <p class="label">手机号码</p>
                <input type="text" class="inp"    v-model="setStoreInfo.valPhone">
            </div>

            <div class="row">
                <p class="label">微信号</p>
                <input type="text" class="inp"    v-model="setStoreInfo.valWx">
            </div>


            <div class="row">
                <p class="label">邮箱</p>
                <input type="text" class="inp"    v-model="setStoreInfo.valEmail">
            </div>

            <div class="row">
                <p class="label" >请选择地址</p>
                <area-select :level='2'  class="area-pick"     v-model='selected'> </area-select>
            </div>

            <div class="row">
                <p class="label"> 请输入详细地址</p>
                <textarea name="" v-model="setStoreInfo.addr_detail"></textarea>
            </div>

            <div class="row btns">
                <button  class="btn btn-canel" v-on:click="canelHandler"> 取消</button>
                <button  class="btn btn-sub"  v-on:click="subHandler"> 提交</button>
            </div>

        
        </div>
    </div>
</template>

<script>

import REQ from "../../comm/comm_req.js";

export default {
    
    components:{   },

    data(){
        return{
            selected:["640000","640100", "640104"],
            storeInfo:{ valTitle:"", valPhone:"", valEmail:"", addr_detail:"", valWx:""  }
        }
    },
    computed:{
        setStoreInfo(){
            return this.storeInfo;
        }
    },

    mounted(){
        this.initSelectStyle();
    },
    
    methods:{

        subHandler(){
            this.updateStoreInfo();
        },

        initStoreData(){
            if(window.STORE_INFO){
                this.storeInfo.valTitle = window.STORE_INFO.sname;
                this.storeInfo.valPhone = window.STORE_INFO.phone;
            }

        },

        updateStoreInfo(){
            var _this = this;
            var posData = {
                uid:  window.UINFO.uId,
                id:   "1",
                wx:   this.storeInfo.valWx,
                sname:this.storeInfo.valTitle,
                ac1:  this.selected[0],
                ac2:  this.selected[1],
                ac3:  this.selected[2],
                ac4:  this.storeInfo.addr_detail
            }

            REQ.reqStoreInfoUpdate(posData,
                function(data){
                    console.log("[ store info update]", data);
                },
                function(data){},
                function(data){
                    //todo error
                }
            );


        },


        initSelectStyle(){
            var eleSelect = $('.area-select');
            eleSelect.css({
                width:"150px", height:"30px", "line-height":"30px",
                border:"1px solid #dedede"
            });

            var eleAreaName = $('.area-selected-trigger');
            eleAreaName.css({
                display:"inline-block",
                margin:"0 0 0 10px",  width:"100%"
            });

            var eleAreaList = $('.area-selectable-list');
            eleAreaList.css({
                background:"#FFFFFF",
                "max-height":"300px", "overflow-y":"auto",
                border:"1px solid #a1a4ad", "z-index":9999
            });

        },

        canelHandler(){

        }

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.base-info{ width: 500px; height: 100%; }
.base-info .box{margin: 10px 0 0 10px; width: 100%; height: 100%; }

.base-info .box .row{ margin: 10px 0 0 0;}
.base-info .box .row .label{ margin: 0 0 0 10px; color: #dedede; }
.base-info .box .row .inp{
    margin: auto; width: 95%; height: 40px; line-height: 40px;
    border: 1px solid #dedede; text-indent: 5px;
}

.base-info .box .row .area-select-wrap{
    @include layout-flex-r;
    position: relative;
    z-index: 9999;
}

.base-info .box .row textarea{
    width: 95%; height: 100px;
    border: 1px solid #dedede; text-indent: 5px;
}

.base-info .box .btns{
    @include layout-flex-r-center;
    width: 100%;
}

.base-info .box .btns .btn{margin: 10px; width: 100px; height: 40px; line-height: 40px; text-align: center;}

.base-info .box .btns .btn-sub{ background: #1AA094; }




</style>




