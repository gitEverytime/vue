<template>
    <div>
        <h1 class="title">叠加设置<span>系统默认不叠加，不叠加则会员（福利券）、折扣方案、折扣角色只可适用一种</span></h1>
        <el-row>
            <el-col :span="2">
                <span class="sec_title">折扣叠加</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '开关' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="19">
                <el-radio-group v-model="radio2">
                    <el-radio :label="3" >会员（福利券）</el-radio>
                    <el-radio :label="6" >折扣方案</el-radio>
                    <el-radio :label="9" >折扣角色</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <h1 class="title">折扣方案<span>全单折扣一旦开启设置后，酒水及菜品折扣一致，关闭全单折扣，酒水与菜品折扣可单独设置</span></h1>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">全单折扣</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="19"></el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                <span class="sec_title">酒水折扣</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="6">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
                <span class="sec_title">菜品折扣</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="8">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
        </el-row>
        <h1 class="title">折扣权限<span>角色折扣与方案可叠加，也可以不叠加，商户自行选择</span></h1>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">服务员</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="4">
                <TempSwitch message = '抹零权限' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '密码' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
            </el-col>
            <el-col :span="2">
                <a href="javascript:;" class="freeze">冻结</a>
                <a href="javascript:;" class="cover">恢复</a>
            </el-col>
        </el-row>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">主管</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="4">
                <TempSwitch message = '抹零权限' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '密码' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
            </el-col>
            <el-col :span="2">
                <a href="javascript:;" class="freeze">冻结</a>
                <a href="javascript:;" class="cover">恢复</a>
            </el-col>
        </el-row>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">收银员</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="4">
                <TempSwitch message = '抹零权限' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '密码' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
            </el-col>
            <el-col :span="2">
                <a href="javascript:;" class="freeze">冻结</a>
                <a href="javascript:;" class="cover">恢复</a>
            </el-col>
        </el-row>
        <el-row style="padding-bottom: 20px">
            <el-col :span="2">
                <span class="sec_title">经理</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="4">
                <TempSwitch message = '抹零权限' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '密码' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
            </el-col>
            <el-col :span="2">
                <a href="javascript:;" class="freeze">冻结</a>
                <a href="javascript:;" class="cover">恢复</a>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="2">
                <span class="sec_title">BOSS</span>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '折扣' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="4">
                <TempSwitch message = '抹零权限' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="3">
                <TempSwitch message = '密码' :propsSwitch='aa'  @isSwitchEmit="bb" ></TempSwitch>
            </el-col>
            <el-col :span="3">
                <TempSaveText text="" value="保存" :propsSaveText="aa" @inputVal="bb"></TempSaveText>
            </el-col>
            <el-col :span="2">
            </el-col>
            <el-col :span="2">
                <a href="javascript:;" class="freeze">冻结</a>
                <a href="javascript:;" class="cover">恢复</a>
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