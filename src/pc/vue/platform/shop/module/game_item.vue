<template>
    <div class="game-item">
        <ul class="row">
            <li><div class="img-con"> <img v-bind:src="url" alt=""> </div></li>
            <li><span class="ga"> <i class="n" >游戏名称:</i> <i class="val">{{gName}}</i> </span></li>
            <li>
                <span fa fa-toggle-on></span>
            </li>
            <li>
                <span class="ga"><i class="n">状态:</i> <i class="val prompt">{{onLineLabel}} </i> </span>
                <span class="fa btn btn-line " v-bind:class="[isOnline? 'fa-toggle-on':'fa-toggle-off']"  v-on:click="switchOnlineHandler"></span>
            </li>
        </ul>
    </div>
</template>

<script>
import $  from 'jquery';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {
    props:['url','gName','id', 'price1', 'price2', 'price3'],
    components:{   },

    data(){
        return{
            onLine:0,    //0:下线状态   1：在线状态
        }
    },
    computed:{
        isOnline(){
            return this.onLine ==1;
        },
        onLineLabel(){
            return this.onLine==1? '在线' : "线下";
        }
    },

    mounted(){

    },
    
    methods:{

        switchOnlineHandler(){
            this.onLine = this.onLine==0?  1 : 0;
        },

        getGiftInfo(){
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

.game-item{
    margin: 10px;
    width: 100%; height: 40px; border: 1px solid #BDC4C9;
    background: #FFFFFF;
}

.game-item .row{
    @include layout-flex-r;
    width: 100%; height: 100%;
}

.game-item .row li{
    @include layout-flex-r;
    margin: 0 20px 0 0;
    height: 40px; line-height: 40px;
}
.game-item .row li .img-con,
.game-item .row li .img-con img{ width: 40px; height: 40px; }

.game-item .row li span{height: 40px; line-height: 40px; font-size: 12px; }

.game-item .row li .ga{color: #58666e;}
.game-item .row li .ga .val{font-weight: bold;}
.game-item .row li .ga .prompt{color: #d9534f; }

.game-item .row li input{ margin: 7px 0 0 5px;  width: 70px; height: 25px; line-height: 25px; text-indent: 5px; border: 1px solid #dedede; }

.game-item .row li .btn{ 
    margin: 5px 0 0 10px;
    width: 75px; height: 30px; line-height: 30px; text-align: center; 
    cursor: pointer;
}

.game-item .row li .btn-line{ color: #d9534f; font-size: 25px;}






</style>


