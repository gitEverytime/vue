<template>
    <div class="module">
        <div class="title-bar">
             <h1 class="title"> 模块控制 </h1>
        </div>
        <div class="menu menu-bar">
            <span class="btn" v-bind:class="{'actived':currPanelIndex==1}"   v-on:click="showPanelHandler(1)">主题设置</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==2}" v-on:click="showPanelHandler(2)">礼物设置</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==3}" v-on:click="showPanelHandler(3)">游戏设置</span>
        </div>

        <div class="box">
            <TemGiftPanel v-if="currPanelIndex==2"></TemGiftPanel>
            <TemGamePanel v-if="currPanelIndex==3"></TemGamePanel>
        </div>
        
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

import TemGiftPanel from "./gift_panel.vue";
import TemGamePanel from "./game_panel.vue";

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{ TemGiftPanel, TemGamePanel  },

    data(){
        return{
            currPanelIndex:1
        }
    },
    computed:{

    },

    mounted(){
    },
    
    methods:{

        showPanelHandler(val){
            console.log("panel id=", val);
            this.currPanelIndex = val;
        },

        getShopInfo(){
            var _this = this;
            var url = api_domain+'/admin/api/store/one';
            U.request("get",url,{uid:uId}, 
                function(data){
                    //todo sucess
                },
                function(data){
                    //complete
                },
                function(data){
                    //error
                }
            )

        }


    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.module{ width: 100%; height: 100%; background: #f5f5f5; }

.module .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.module .title-bar h1{ font-size: 18px; }

.module .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.module .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede;
}

.module .menu-bar  .actived{border-bottom: 3px solid #ef4836;}

.module .box{ margin: 40px 0 0 20px; }



</style>


