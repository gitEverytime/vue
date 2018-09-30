<template>
   <div class="actor-set">
       <TempSing
            :setData="setData"
            @isSongOnChild="getIsSongOn"
            @isDanceOnChild="getIsDanceOn"
       ></TempSing>

       <TempPrice
               :setData="setData"
               @updateSongPriceChild="getSongPriceChild"
               @updateDancePriceChild="getDancePriceChild"
       ></TempPrice>

       <TempNum
               :setData="setData"
               @updateSongCountChild="getSongCountChild"
               @updateDanceCountChild="getDanceCountChild"
       ></TempNum>

       <TempDivide
               :setData="setData"
       ></TempDivide>
   </div>
</template>

<script>
import TempSaveText from '../../components/save_Text.vue'
import TempSing   from    './set_sing.vue'
import TempPrice  from    './set_price.vue'
import TempNum    from    './set_num.vue'
import TempDivide       from    './set_divide.vue'

import REQ     from "../../global/request.js";
const roomInfo = window.UINFO;
export default {
    components:{
        TempSaveText,
        TempSing,
        TempPrice,
        TempNum,
        TempDivide
    },
    data(){
        return{
            setData:{}
        }
    },
    computed:{
    },
    mounted(){
        let _this = this;
        let posData = {
            storeId:roomInfo.storeId
        };
        REQ.reqActorGetCfg(posData,
            function(result){
                _this.setData = result.data;
            },
            function(data){ },
            function(data){
                //todo error
            }
        );
    },
    methods:{
        getIsSongOn(val){
            this.setData.songOn = val;
            this.actorSetCfg();
        },
        getIsDanceOn(val){
            this.setData.danceOn = val;
            this.actorSetCfg();
        },
        getSongPriceChild(val){
            this.setData.songPrice = val;
            this.actorSetCfg();
        },
        getDancePriceChild(val){
            this.setData.dancePrice = val;
            this.actorSetCfg();
        },
        getSongCountChild(val){
            this.setData.songCount = val;
            this.actorSetCfg();
        },
        getDanceCountChild(val){
            this.setData.danceCount = val;
            this.actorSetCfg();
        },
        actorSetCfg(){
            let _this = this;
            let posData = _this.setData;
            REQ.reqActorSetCfg(posData,
                function(result){
                    _this.$message.success("修改信息成功！");
                },
                function(data){ },
                function(data){
                    //todo error
                }
            );
        }
    }
}
</script>


<style  lang='scss'   scoped>
</style>




