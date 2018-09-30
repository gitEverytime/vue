<template>
    <div class="set">
        <h1 class="title">叫号形式</h1>
        <p>
            <span>语音叫号</span>
            <el-switch
                    v-model="val1"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
            >
            </el-switch>
        </p>
        <p>
            <span>服务员提示</span>
            <el-switch
                    v-model="val2"
                    active-value="1"
                    inactive-value="0"
                    :active-color="activeColor"
                    :inactive-color="inactiveColor"
            >
            </el-switch>
            <label>服务员获得叫号语音及震动</label>
        </p>
    </div>
</template>

<script>
    export default {

        components:{
        },
        data(){
            return{
                activeColor:'#00B594',
                inactiveColor:'#877f7f',
                val1:'',
                val2:'',
            }
        },
        computed:{

        },

        mounted(){
        },

        methods:{
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../../sass/common.scss';
    .set{
        .title{
            margin: 20px 0 20px 0;
            height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
            color: #FF5722; border-left: 2px solid #FF5722;
        span{
            color:#787B80;
            display: inline;
            padding-left: 20px;
        }
        }
        p{
            padding-bottom: 10px;
            color: $green;
            span{
                display:inline-block;
                width:100px
            }
            label{
                color:#787B80;
                display: inline;
                padding-left: 20px;
            }
        }
    }
</style>