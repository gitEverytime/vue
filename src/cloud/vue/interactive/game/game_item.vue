<template>
    <div class="game-item" v-on:click="clickHandler" >
        <div
                class="icon"
                :style="{backgroundImage:'url(' + icon + ')'}"
        >

        </div>
        <h1 class="title">{{ title  }}</h1>
    </div>
</template>

<script>

const E_CLICK_GAME = "E_CLICK_GAME";

import $            from 'jquery';


export default {
    props:[ "gameId", "title",'icon' ],

    components:{  
    },


    data(){
        return{
        }
    },
    computed:{

    },

    mounted(){
        var _this = this;

    },
    
    methods:{
        clickHandler(){
            this.$emit(E_CLICK_GAME, {title:this.title, gameId:this.gameId});
        }
    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.game-item{ margin: 20px; width: 80px; height: 110px; cursor: pointer;}

.game-item .icon{width: 80px; height: 80px; border-radius: 50%; background-size: 100% 100%;}

.game-item .title{ font-size: 18px; text-align: center; color: #dedede;  }


</style>




