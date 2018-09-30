<template>
    <div class="interactive">
        <div class="title-bar">
             <h1 class="title"> 交互信息 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn" v-bind:class="{'actived':currPanelIndex==1}" v-on:click="showPanelHandler(1)"> 私聊</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==2}" v-on:click="showPanelHandler(2)">霸屏</span>
            <span class="btn" v-bind:class="{'actived':currPanelIndex==3}" v-on:click="showPanelHandler(3)">打赏</span>
        </div>

        <div class="box">
            <TemTalkPre></TemTalkPre>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import TemTalkPre from "./box_private.vue";

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{ TemTalkPre  },

    data(){
        return{
            panelIndex:1
        }
    },
    computed:{
        currPanelIndex(){
            return this.panelIndex;
        }

    },

    mounted(){
    },
    
    methods:{

        showPanelHandler(flag){
            this.panelIndex = flag;
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

.interactive{ width: 100%; height: 100%; }

.interactive .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.interactive .title-bar h1{ font-size: 18px; }

.interactive .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.interactive .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}

.interactive .menu-bar  .actived{border-bottom: 3px solid #ef4836;}




</style>


