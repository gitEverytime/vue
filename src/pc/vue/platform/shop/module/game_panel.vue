<template>
    <div class="gift-panel">
        <div class="list">
            <div v-for="item in getGameList">
                <TemGameItem v-bind="item"></TemGameItem>
            </div>
        </div>
    </div>
</template>

<script>
import $  from 'jquery';
import TemGameItem from './game_item.vue';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{  TemGameItem },

    data(){
        return{
            gameList:[
                {gName:'xxx1',id:'g1', url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"},
                {gName:'xxx2',id:'g2', url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"},
                {gName:'xxx3',id:'g3', url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"},
                {gName:'xxx4',id:'g4', url:"http://img.wemew.com//wemew/imgFile/2018-04-11-11/152341645225617767.jpg"}
            ]
        }
    },
    computed:{
        getGameList(){
            return this.gameList;
        }
    },

    mounted(){
    },
    
    methods:{

        getGameInfo(){
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


