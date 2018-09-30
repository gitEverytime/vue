<template>
    <div class="module_interact">
        <p class="interactWrap">
            <span>互动开关</span>
            <el-switch
                    v-model="val1"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
                    @change="postApprovalAuthSet()"
            >
            </el-switch>
        </p>
        <p class="interactWrap">
            <span>互动游戏</span>
            <el-switch
                    v-model="val2"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
                    @change="postApprovalAuthSet()"
            >
            </el-switch>
        </p>

        <p class="interactWrap">
            <span>店内打赏</span>
            <el-switch
                    v-model="val3"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
                    @change="postApprovalAuthSet()"
            >
            </el-switch>
        </p>

        <p class="interactWrap">
            <span>霸屏功能</span>
            <el-switch
                    v-model="val4"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
                    @change="postApprovalAuthSet()"
            >
            </el-switch>
        </p>

        <p class="interactWrap">
            <span>麦霸功能</span>
            <el-switch
                    v-model="val5"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
                    @change="postApprovalAuthSet()"
            >
            </el-switch>
        </p>

        <p class="interactWrap">
            <span>点播功能</span>
            <el-switch
                    v-model="val6"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
                    @change="postApprovalAuthSet()"
            >
            </el-switch>
        </p>
    </div>
</template>

<script>
    export default {

        components:{

        },


        data(){
            return{
                menuIndex:1,
                val1:'1',
                val2:'1',
                val3:'0',
                val4:'1',
                val5:'0',
                val6:'1',
                activeColor:'#00B594',
                inactiveColor:'#877f7f'
            }
        },
        computed:{

        },

        mounted(){

        },

        methods:{
            postApprovalAuthSet(){

            }
        }
    }

</script>

<style scoped lang="scss">
    .interactWrap{
        padding-top: 20px;
        span{
            color: #FFFFFF;
            font-size: 16px;
            display: inline-block;
            margin-right: 20px;
        }
    }
</style>