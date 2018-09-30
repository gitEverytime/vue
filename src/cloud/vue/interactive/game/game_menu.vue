<template>
    <div class="game-menu">
        <div class="panel">
            <TempItem v-on:E_CLICK_GAME="setGameHandler"  v-for="item in gameList" v-bind="item" :key="Date.now() * Math.random()">
            </TempItem>
        </div>
    </div>
</template>

<script>

import $            from 'jquery';

import TempItem     from "./game_item.vue";


export default {

    components:{  
        TempItem
    },


    data(){
        return{
            gameList:[
                {gameId:1002, title:"大抽奖", icon:"http://static.ibigtop.com/static/img/game/icon/g3000.png"},
                // {gameId:1002, title:"摇2摇", icon:""},
                // {gameId:1003, title:"摇3摇", icon:""},
                // {gameId:1004, title:"摇4摇", icon:""},
                // {gameId:1005, title:"摇5摇", icon:""}
            ]
        }
    },
    computed:{

    },

    mounted(){
        var _this = this;

    },
    
    methods:{
        setGameHandler(data){
            window.location.href = "#/game/set/"+data.gameId;
        }
    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.game-menu{width: 100%; height: 500px;}

.game-menu .panel{
    @include layout-flex-r;
    flex-wrap: wrap;
}


</style>




