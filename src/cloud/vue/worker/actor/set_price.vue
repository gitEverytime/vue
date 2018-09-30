<template>
    <div>
        <h1 class="com_title"> 价格设置</h1>
        <el-row>
            <el-col :span="4">
                <TempSaveText text="点歌" value="保存" width="60px" :propsSaveText="songPrice" @inputVal="updateSongPrice"></TempSaveText>
            </el-col>

            <el-col :span="20">
                <TempSaveText text="点舞" value="保存" width="60px" :propsSaveText="dancePrice" @inputVal="updateDancePrice"></TempSaveText>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TempSaveText from '../../components/save_Text.vue'
    import REQ     from "../../global/request.js";
    export default {
        components:{
            TempSaveText
        },
        props:{
            setData:{
                type:Object
            }
        },
        data(){
            return{
                songPrice:0,
                dancePrice:0
            }
        },
        computed:{

        },
        watch:{
            setData(val){
                this.songPrice = val.songPrice;
                this.dancePrice = val.dancePrice
            }
        },
        mounted(){
        },
        methods:{
            updateSongPrice(val){
                this.$emit('updateSongPriceChild',val);
            },
            updateDancePrice(val){
                this.$emit('updateDancePriceChild',val);
            }
        }
    }
</script>

<style scoped>

</style>