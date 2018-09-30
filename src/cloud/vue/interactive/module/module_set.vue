<template>
    <div class="module-set">

        <h1 class="title"> 免费聊天</h1>

        <div class="row">
            <div class="col">
                <span class="lab">是否开启</span> 
                <div class=" btn-switch layui-unselect layui-form-switch" :class="{'layui-form-onswitch':getStatusParams.statusSong==0}" v-on:click="switchHandler('statusSong')">
                    <em>ON</em>
                    <i></i>
                </div>
            </div>

        </div>

        <h1 class="title"> 霸麦设置</h1>

        <div class="row">
            <div class="col">
                <span class="lab">点歌</span>
                <input type="text" v-model="getStatusParams.priceSong">
                <span class="btn btn-save" v-on:click="setHandler('priceSong')">保存</span>
            </div>

            <div class="col">
                <span class="lab">点舞</span>
                <input type="text" v-model="getStatusParams.priceDance">
                <span class="btn btn-save"  v-on:click="setHandler('priceDance')" >保存</span>
            </div>
        </div>

        <h1 class="title"> 数量设置</h1>

        <div class="row">
            <div class="col">
                <span class="lab">点歌</span>
                <input type="text" v-model="getStatusParams.countSong">
                <span class="btn btn-save"  v-on:click="setHandler('countSong')" >保存</span>
            </div>

            <div class="col">
                <span class="lab">点舞</span>
                <input type="text" v-model="getStatusParams.countDance">
                <span class="btn btn-save"  v-on:click="setHandler('countDance')" >保存</span>
            </div>

        </div>

        <h1 class="title"> 分成设置</h1>

        <div class="row">

            <div class="col">
                <span class="lab">商家</span>
                <input type="text" v-model="getIncomeRate.storeScale">
                <span class="btn btn-save"  v-on:click="setHandler('storeScale')" >保存</span>
            </div>

            <div class="col">
                <span class="lab">艺人</span>
                <input type="text" v-model="getIncomeRate.actorScale">
                <span class="btn btn-save"  v-on:click="setHandler('actorScale')" >保存</span>
            </div>

            <div class="col">
                <span class="lab">平台</span>
                <input type="text"  readonly="true"  v-model="getIncomeRate.sysScale">
            </div>

        </div>

    </div>
</template>

<script>

import $       from 'jquery';
import REQ     from "../../global/request.js";

const uInfo = window.UINFO;


export default {

    components:{  
    },


    data(){
        return{
        }
    },
    computed:{

    },

    mounted(){
    },
    
    methods:{
        switchHandler(btnName){

        },

        setHandler(type){
            var _this = this;
            switch(type){
                
            }
            
        },





    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.module-set{ 
    width: 100%; height: 100%;
}

.module-set .title{
    margin: 20px 0 20px 0;
    height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
    color: #FF5722; border-left: 2px solid #FF5722;
}

.module-set .row{
    @include layout-flex-r;
    margin: 20px 0 0 0;
}

.module-set .row .col{
    @include layout-flex-r;
    margin: 0 100px 0 10px; width: 200px;
}

.module-set .row .col .lab{ 
    margin: 0 20px 0 0;
    height: 25px; line-height: 25px; color: #dedede; font-size: 16px; 
}

.module-set .row .col input{
    @include set-wh(60px, 20px);
    background:rgba(0,0,0,0.2); text-indent: 5px; 
    border: 1px solid #dedede; border-radius: 5px; color: #dedede;
}

.module-set .row .col .btn{
    @include set-wh(60px, 20px);
    margin: 0 0 0 20px;
    display:inline-block; text-align: center; border-radius: 5px;
    background: #5FB878; color: #FFF; cursor: pointer;
}

.module-set .row .col .btn-switch{ margin-top: 0;}







</style>




