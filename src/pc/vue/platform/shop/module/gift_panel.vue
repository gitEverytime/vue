<template>
    <div class="gift-panel">
        <div class="list">
            <div v-for="item in getGiftList">
                <TemGiftItem v-bind="item"></TemGiftItem>
            </div>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';
import TemGiftItem from './gift_item.vue';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{  TemGiftItem },

    data(){
        return{
            giftList:[
                {gName:'xxx1',id:'g1', price1:100, price2:200, price3:300, url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"},
                {gName:'xxx2',id:'g2', price1:100, price2:200, price3:300, url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"},
                {gName:'xxx3',id:'g3', price1:100, price2:200, price3:300, url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"},
                {gName:'xxx4',id:'g4', price1:100, price2:200, price3:300, url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"}
            ]
        }
    },
    computed:{
        getGiftList(){
            return this.giftList;
        }
    },

    mounted(){
    },
    
    methods:{

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

.gift-panel{ width: 920px; height: 100%; }






</style>


