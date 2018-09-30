<template>
    <div>
        <h1 class="com_title">数量设置</h1>
        <el-row>
            <el-col :span="4">
                <TempSaveText text="点歌" value="保存" width="60px" :propsSaveText="songCount" @inputVal="updateSongCount"></TempSaveText>
            </el-col>

            <el-col :span="20">
                <TempSaveText text="点舞" value="保存" width="60px" :propsSaveText="danceCount" @inputVal="updateDanceCount"></TempSaveText>
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
                songCount:0,
                danceCount:0
            }
        },
        computed:{

        },
        watch:{
            setData(val){
                this.songCount = val.songCount;
                this.danceCount = val.danceCount
            }
        },
        mounted(){
        },
        methods:{
            updateSongCount(val){
                this.$emit('updateSongCountChild',val);
            },
            updateDanceCount(val){
                this.$emit('updateDanceCountChild',val);
            }
        }
    }
</script>

<style scoped>

</style>