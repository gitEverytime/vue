<template>
    <div class="game-set">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/interacrt/index' }">互动信息</el-breadcrumb-item>
            <el-breadcrumb-item>设置游戏</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="oForm" ref="oForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item
                        label="活动名称"
                        prop="name"
                        :rules="[
                            { required: true, message: '活动名称不能为空'},
                        ]"
                        >
                        <el-input v-model="oForm.name" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16"></el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item
                            label="一等奖"
                            prop="reward[0].rewardDesc"
                            :rules="[
                            { required: true, message: '奖项不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[0].rewardDesc" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                            label="中奖人数"
                            prop="reward[0].count"
                            :rules="[
                            { required: true, message: '中奖人数不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[0].count" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item
                            label="二等奖"
                            prop="reward[1].rewardDesc"
                            :rules="[
                            { required: true, message: '奖项不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[1].rewardDesc" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                            label="中奖人数"
                            prop="reward[1].count"
                            :rules="[
                            { required: true, message: '中奖人数不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[1].count" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item
                            label="三等奖"
                            prop="reward[2].rewardDesc"
                            :rules="[
                            { required: true, message: '奖项不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[2].rewardDesc" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                            label="中奖人数"
                            prop="reward[2].count"
                            :rules="[
                            { required: true, message: '中奖人数不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[2].count" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item
                            label="幸运奖"
                            prop="reward[3].rewardDesc"
                            :rules="[
                            { required: true, message: '奖项不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[3].rewardDesc" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                            label="中奖人数"
                            prop="reward[3].count"
                            :rules="[
                            { required: true, message: '中奖人数不能为空'},
                        ]"
                    >
                        <el-input v-model="oForm.reward[3].count" placeholder="" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>

            <el-form-item style="text-align:center">
                <el-button type="danger" @click="submitForm('oForm')">创建游戏</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

import $            from 'jquery';

import REQ   from "../../global/request.js";
const roomInfo = window.UINFO;


export default {

    components:{  

    },


    data(){
        return{
            activeName:"",
            gameData:{
                level_1:{count:0,  reward:""},
                level_2:{count:0,  reward:""},
                level_3:{count:0,  reward:""},
                level_4:{count:0,  reward:""},
            },
            oForm:{
                createdBy:'',
                storeId:roomInfo.storeId,
                gameIndex:'1002',
                name:'',
                mode:'1',
                endTime:Date.parse(new Date()),
                startTime:this.preDate(),
                reward:[
                    {
                        rewardDesc:'',
                        count:'',
                        level:'一等奖'
                    },
                    {
                        rewardDesc:'',
                        count:'',
                        level:'二等奖'
                    },
                    {
                        rewardDesc:'',
                        count:'',
                        level:'三等奖'
                    },
                    {
                        rewardDesc:'',
                        count:'',
                        level:'幸运奖'
                    }
                ]
            }
        }
    },
    computed:{

    },

    mounted(){
        var _this = this;
        console.log(_this.preDate());
    },
    
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.createGame()
                } else {
                    return false;
                }
            });
        },
        createGame(){
            let _this = this;
            let posData = _this.oForm;
            REQ.reqGameAddRule(posData,
                function(data){
                    window.open(`http://game.ibigtop.com/game/render/public/1002?storeId=${roomInfo.storeId}&isPrivate=0#/draw/page`)
                },
                function(data){ },
                function(data){
                    //todo error
                }
            );
        },
        preDate(){
            let curDate = new Date();
            return Date.parse(new Date(curDate.getTime() - 24*60*60*1000)); //前一天
        }

    }
         

}


</script>


<style  lang='scss'   scoped>

@import "../../../../style/sass/mixin.scss";

.game-set{  width: 100%; }

.game-set .panel{width: 750px; }

.game-set .panel .row{
    @include layout-flex-r-sb;
    height: 60px;
}

.game-set .panel .row .item label{
    @include set-wh(80px, 30px);
    display: inline-block;
    text-align: left; color: #dedede;
    font-size: 14px;
}

.game-set .panel .row .item .inp{
    @include set-wh(230px,32px);
    border: 1px solid #FF5722; color: #dedede;
    border-radius: 8px; text-indent: 5px;
    background: rgba(0,0,0,0.2);
}

.game-set .panel .btn-bar{
    @include layout-flex-r-center;
}

.game-set .panel .btn-bar .btn{
    @include set-wh(140px, 40px);
    text-align: center; font-size: 20px;
    background: #FF5722; color: #FFF; 
    border-radius: 8px; cursor: pointer;
}



</style>




