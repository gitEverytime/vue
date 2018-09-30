<template>
    <div class="box">
        <div class="panel">
            <div class="row">
                <i>请完善资料</i>
            </div>

            <div class="row">
                <p class="label">请输入酒吧名称</p>
                <input type="text" class="inp"    v-model="valTitle">
            </div>

            <div class="row">
                <p class="label">请输入邮箱</p>
                <input type="text" class="inp"    v-model="valEmail">
            </div>

            <div class="row">
                <p class="label" >请选择地址</p>
                <area-select :level='2'  class="area-pick"     v-model='selected'> </area-select>
            </div>

            <div class="row">
                <p class="label"> 请输入详细地址</p>
                <textarea name="" v-model="addr_detail"></textarea>
            </div>

            <div class="row btns">
                <button  class="btn btn-canel" v-on:click="canelHandler"> 取消</button>
                <button  class="btn btn-sub"  v-on:click="subHandler"> 提交</button>
            </div>
        </div>


        

        
    </div>
</template>

<script>
import $  from 'jquery';
import U from '../../../../libs/util.js';


var api_domain = window.CFG.API_DOMAIN;
var uId = window.UINFO.uId;

export default {
    
    components:{   },

    data(){
        return{
            selected:["640000","640100", "640104"],
            valTitle:"",
            addr_detail:"",
            valEmail:''
        }
    },
    computed:{

    },

    mounted(){
        this.initSelectStyle();
    },
    
    methods:{
        subHandler(){
            var _this = this;
            var url = api_domain+'/admin/api/store/update'
            var posData = {
                uid:uId,
                sname:this.valTitle, 
                email:this.valEmail,
                ac1:this.selected[0],
                ac2:this.selected[1],
                ac3:this.selected[2],
                ac4:this.addr_detail
            }


            U.request("post",url,posData, 
                function(data){
                    //todo sucess
                    console.log(data);
                    _this.$store.commit("setAccountState", 1);
                },
                function(data){ /* todo*/ },
                function(data){ /* todo*/ }
            )

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
                border:"1px solid #a1a4ad"
            });

        },

        canelHandler(){

        }



    }//end methods


}
</script>


<style  lang='scss'   scoped>
@import '../../../../style/sass/mixin.scss';
.box{ 
    position: absolute; width: 100%; height: 100%; top: 0; left: 0; 
    background: #000;
    background-color:rgba(0,0,0,0.8);
}
.box .panel{
    margin: auto;  margin-top: 100px;
    width: 460px; height: auto;
    border: solid 1px #bbbbbb;
    box-shadow: 0px 0px 10px #bbbbbb;
    z-index: 9999; background: #FFF;
}

.box .row{ margin: 10px 0 0 0;   width: 100%; }
.box .row .label{margin: 0 0 0 10px; color: #dedede; }
.box .row .inp{
    margin: auto; width: 95%; height: 40px; line-height: 40px;
    border: 1px solid #dedede; text-indent: 5px;
}

.box .row textarea{
    width: 95%; height: 100px;
    border: 1px solid #dedede; text-indent: 5px;
}

.box .area-pick{position: relative; z-index: 9999;}

.box .area-select-wrap{
    @include layout-flex-r;
    z-index: 9999;
}

.box .btns{
    @include layout-flex-r-center;
    width: 100%;
}

.box .btns .btn{margin: 10px; width: 100px; height: 40px; line-height: 40px; text-align: center;}

.box .btns .btn-sub{ background: #1AA094; }




</style>




