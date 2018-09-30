<template>
    <div>
        <h1 class="title">买单设置<span>餐前、餐后二者只能开其一</span></h1>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">餐前买单</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">

            </el-col>
        </el-row>
        <el-row >
            <el-col :span="2">
                <span class="sec_title">抵用设置</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">

            </el-col>
        </el-row>
        <h1 class="title">抵用设置<span>买单之时可抵用相应折扣和金额</span></h1>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">代金券</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">

            </el-col>
        </el-row>
        <el-row >
            <el-col :span="2">
                <span class="sec_title">折扣券</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">

            </el-col>
        </el-row>
        <h1 class="title">会员设置<span>会员与其他项目是否可叠加使用（建议叠加）</span></h1>
        <el-row>
            <el-col :span="2">
                <span class="sec_title">抵用叠加</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">

            </el-col>
        </el-row>
        <h1 class="title">预约设置<span>预约席位是否需要先行支付费用（建议开启预约点餐支付）</span></h1>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">预约席位</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">

            </el-col>
        </el-row>
        <el-row >
            <el-col :span="2">
                <span class="sec_title">支付定金</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="6">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
                <span class="sec_title">点餐支付</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="8">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TempSwitch from '../../components/switch.vue'
    import TempSaveText from '../../components/save_Text.vue'

    export default {

        components:{
            TempSwitch,
            TempSaveText
        },


        data(){
            return{
                radio2: 3
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

<style scoped>
    .title{
        margin: 20px 0 20px 0;
        height: 30px; line-height: 30px; font-size: 18px; text-indent: 10px;
        color: #FF5722; border-left: 2px solid #FF5722;
    }
    .tab{
        margin: 0 !important;
    }
    .title span{
        color:#787B80;
        display: inline;
        padding-left: 20px;
    }
    .sec_title{
        color: #00B594;
        display: inline-block;
        font-size: 16px;
    }
    .freeze{
        color: #08B192;
        text-decoration: underline;
        font-size: 16px;
    }
    .cover{
        color: #963E4A;
        text-decoration: underline;
        font-size: 16px;
    }
</style>