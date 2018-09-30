<template>
    <div>
        <h1 class="com_title"> 点播设置</h1>
        <el-row>
            <el-col :span="4">
                <span class="title">点歌</span>
                <el-switch
                        v-model="songOn"
                        :active-value="activeValue"
                        :inactive-value="inactiveValue"
                        :active-color="activeColor"
                        :inactive-color="inactiveColor"
                        @change="updateActorSongOn()"
                >
                </el-switch>
            </el-col>
            <el-col :span="20">
                <span class="title">点舞</span>
                <el-switch
                        v-model="danceOn"
                        :active-value="activeValue"
                        :inactive-value="inactiveValue"
                        :active-color="activeColor"
                        :inactive-color="inactiveColor"
                        @change="updateActorDanceOn()"
                >
                </el-switch>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import REQ     from "../../global/request.js";
    import type from '../../global/name_space.js'
    const uInfo = window.UINFO;
    export default {
        components:{

        },
        props:{
            setData:{
                type:Object
            }
        },
        data(){
            return{
                activeColor:type.activeColor,
                inactiveColor:type.inactiveColor,
                activeValue:type.activeValue,
                inactiveValue:type.inactiveValue,
                songOn:'0',
                danceOn:'0'
            }
        },
        computed:{

        },
        watch:{
            setData(val){
                this.songOn = val.songOn;
                this.danceOn = val.danceOn
            }
        },

        mounted(){
        },

        methods:{
            updateActorSongOn(){
                this.$emit("isSongOnChild",this.songOn)
            },
            updateActorDanceOn(){
                this.$emit("isDanceOnChild",this.danceOn)
            }
        }
    }


</script>

<style scoped lang="scss">
    .title{
        color: #FFFFFF;
        font-size:16px;
        display:inline-block;
        margin-right: 30px
    }
</style>