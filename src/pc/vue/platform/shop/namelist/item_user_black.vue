<template>
    <div class="item-user">
        <ul class="row">
            <li class="col"><div class="img-con"> <img v-bind:src="url" alt=""></div> </li>

            <li class="col col-name"><label class="nick-name">{{nickname}}</label> </li>

            <li class="col col-msg"><label class="msg">{{msg}}</label> </li>
            <!-- 封禁原因 -->
            <li class="col col-cause"><label class="msg">封禁原因</label> </li>

            <!-- 封禁时长 -->
            <li class="col col-time"><label class="msg">封禁时长</label> </li>

            <li class="col col-btn"> 
                <span class="btn btn-warnning" v-on:click="operateHandler">解除黑名单</span> 
            </li>
        </ul>

    </div>
</template>

<script>
import $  from 'jquery';


import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {

    props:["id", "nickname", "url", "msg"],
    components:{    },

    data(){
        return{
        }
    },
    computed:{ 

    },

    mounted(){
    },
    
    methods:{
        operateHandler(){

        }

    }


}
</script>


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';


.item-user{ 
    margin: 10px 0 0 10px;
    width: 100%; height: 80px; border: 1px solid #FFF; border-radius: 5px; background: #FFF;  
}

.item-user .row{
    @include layout-flex-r;
    width: 100%; height: 100%;
}

.item-user .row .img-con,
.item-user .row .img-con img
{
    width: 80px; height: 80px;
}

.item-user .row .col{ margin: 0 10px 0 0;  height: 80px; line-height: 80px; }

.item-user .row .col-name{ width: 150px; }

.item-user .row .col-msg{ width: 300px; }

.item-user .row .col .btn{ 
    margin:5px 0 0 0; width: 100px; height: 30px; line-height: 30px;
    text-align: center; background: #1E9FFF; color: #FFF;  cursor: pointer;
}

.item-user .row .col .btn-warnning{
    background: #FF5722;
}

.item-user .row .col-btn{
    @include layout-flex-c-center;
}










</style>


