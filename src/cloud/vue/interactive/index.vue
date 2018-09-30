<template>
    <div class="interactive">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                    v-for="(col,index) in $store.getters.getInteractInfo"
                    :label="col.resName"
                    :name="String(index+1)"
            ></el-tab-pane>
        </el-tabs>

        <div class="box">
            <TempGBDDmsg v-if="activeName === '1' || activeName === '2' || activeName === '3' || activeName === '4'"></TempGBDDmsg>
            <TempGameMenu v-if="activeName === '5'"></TempGameMenu>
            <TempInteractSwitch v-if="activeName === '6'"></TempInteractSwitch>
            <TempWhiteList v-if="activeName === '7'"></TempWhiteList>
            <TempBlackList v-if="activeName === '8'"></TempBlackList>
        </div>

    </div>
</template>

<script>

import $            from 'jquery';
import TempGBDDmsg from './GBDDmsg.vue'
import TempPersonChat from './personChat.vue'
import TempGameMenu from "./game/game_menu.vue";
import TempInteractSwitch from './interact/interact_switch.vue';
import TempWhiteList from './white/white_list.vue';
import TempBlackList from './black/blackList.vue'
import cookie from '../global/cookie.js'
export default {

    components:{
        TempGBDDmsg,
        TempPersonChat,
        TempGameMenu,
        TempInteractSwitch,
        TempWhiteList,
        TempBlackList
    },


    data(){
        return{
            menuIndex:1,
            activeName:'1',
            perms:[]
        }
    },
    watch:{
        permsInfo(val){
            if(val){
                this.perms = JSON.parse(val);
                this.perms.forEach((item) => {
                    if(item.resName === '互动管理'){
                        this.perms = item.child[0].child;
                    }
                })
            }
        }
    },
    computed:{
        getOnMenuIndex(){
            return this.menuIndex;
        },
        permsInfo(){
            let info = this.$store.getters.getParemInfo;
        }

    },

    mounted(){
        var _this = this;

    },
    
    methods:{
        handleClick(){
            this.switchBox(this.activeName)
        },
        switchBox(activeName){
            /**
             *  暂存type状态值，方便切换页面的时候进行调用
             */
            switch (activeName){
                case '1':
                    this.$store.commit('setTypeInfo','');             //公聊
                    break;
                case '2':
                    this.$store.commit('setTypeInfo','3');             //霸屏
                    break;
                case '3':
                    this.$store.commit('setTypeInfo','1,2');             //点歌
                    break;
                case '4':
                    this.$store.commit('setTypeInfo','7');             //店内打赏
                    break;
                case '6':
                    this.$store.commit('setTypeInfo','4,5');             //红包
                    break;
                case '5':
                    this.$store.commit('setTypeInfo','6');             //打赏
                    break;

            }
        }
    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../style/sass/mixin.scss";

.interactive{ 
    margin: 0 0 0 20px;
    width: 100%; height: 100%;
    margin-right: -17px; overflow-x: hidden; overflow-y: auto;
}

.interactive .menu-bar{
    @include layout-flex-r;
    padding: 20px 0;
}

.interactive .menu-bar .btn{
    width: 100px; height: 40px; line-height: 40px; color: #dedede;
    text-align: center; font-size: 18px; cursor: pointer;
}

.interactive .menu-bar .on{
    color: #009688;
}

.interactive .box{
    width: 100%; height: 100%;
}


</style>




