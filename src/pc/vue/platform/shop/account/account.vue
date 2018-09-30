<template>
    <div class="account">
        <div class="title-bar">
             <h1 class="title"> 账号管理 </h1>
        </div>
        <div class="menu-bar">
            <span class="btn" v-bind:class="{'actived':currPanelIndex==1}" v-on:click="showPanelHandler(1)"> 重置密码</span>
        </div>

        <div class="box">
            <TempPwdrest v-if="currPanelIndex==1"></TempPwdrest>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;

import TempPwdrest from "./pwd_reset.vue";


export default {
    
    components:{ TempPwdrest  },

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
        }

    

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.account{ width: 100%; height: 100%; }

.account .title-bar{
    @include layout-flex-r;
    margin: 0 0 0 10px; width: 100%;
}

.account .title-bar h1{ font-size: 18px; }

.account .menu-bar{
    @include layout-flex-r;
    width: 100%;
}

.account .menu-bar .btn{
    margin: 0 10px 0 10px;
    width: 150px; height: 40px; line-height: 40px; text-align: center;
    border-bottom: 2px solid #dedede; cursor: pointer;
}

.account .menu-bar  .actived{border-bottom: 3px solid #ef4836;}




</style>


