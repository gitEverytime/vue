<template>
    <div class="game-set-box">
        <el-tabs v-model="getCurrMenuIndex">
            <el-tab-pane label="设置游戏" name="1"></el-tab-pane>
            <el-tab-pane label="游戏历史" name="2"></el-tab-pane>
            <el-tab-pane label="玩法介绍" name="3"></el-tab-pane>
            <!--<el-tab-pane label="分店管理" name="2"></el-tab-pane>-->
        </el-tabs>
        <div class="game-info">
            <span class="icon"></span>
            <span class="title"></span>
        </div>

        <div class="box">
            <TempSet1 v-if="getCurrMenuIndex === '1'" ></TempSet1>
        </div>

    </div>
</template>

<script>

import $            from 'jquery';

import TempSet1     from "./game_set_type_1.vue";


export default {

    components:{  
        TempSet1
    },


    data(){
        return{
            menuIndex:1,
            gameId:this.$route.params.gameId,
            getCurrMenuIndex:'1'
        }
    },
    computed:{

    },

    mounted(){
        var _this = this;
    },
    
    methods:{
        switchMenu(menuIndex){
            this.menuIndex = menuIndex;
        }

    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.game-set-box{
    @include layout-flex-c;
    padding: 0 30px;
}

.game-set-box .menu{
    @include layout-flex-r;
    width: 100%; border-bottom: 1px solid #009688;
}

.game-set-box .menu .btn{
    @include set-wh(100px, 115px);
    color: #dedede;  font-size: 18px; text-align: center; cursor: pointer;
}

.game-set-box .menu .on{ color: #009688; }

</style>




