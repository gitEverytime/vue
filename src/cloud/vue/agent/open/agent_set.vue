<template>
    <div class="">
        <el-form :model="oForm" ref="oForm" label-width="80px" class="agent-ruleForm">
            <TempAgentLevel
                    @setType="getType"
                    @setRegion="getRegion"
                    @setAc4="getAc4"
            ></TempAgentLevel>
            <TempAgentName
                    @setProxyName="getProxyName"
                    @setLicenceNo="getLicenceNo"
                    @setCorporate="getCorporate"
                    @setIdcard="getIdcard"
            ></TempAgentName>
            <!--<TempAgentProcedures-->
                    <!--@setLicence="getLicence"-->
                    <!--@setHealth="getHealth"-->
                    <!--@setIdCardZ="getIdCardZ"-->
                    <!--@setIdCardF="getIdCardF"-->
            <!--&gt;-->
            <!--</TempAgentProcedures>-->
            <TempAgentBoss
                    @setBossName="getBossName"
                    @setPhone="getPhone"
            >
            </TempAgentBoss>
            <el-form-item>
                <el-button type="danger" class="submit_examine" @click="submitForm('oForm')">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import TempAgentLevel   from './agent_level.vue'
    import TempAgentName    from './agent_name.vue'
    import TempAgentProcedures  from './agent_procedures.vue'
    import TempAgentBoss   from './agent_boss.vue'
    import type from '../../global/name_space.js'
    export default {
        components:{
            TempAgentLevel,
            TempAgentName,
            TempAgentProcedures,
            TempAgentBoss
        },
        data(){
            return{
                oForm:{
                    type:'',
                    proxyName:'',
                    licenceNo:'',
                    corporate:'',
                    idcard:'',
                    ac1:'',
                    ac2:'',
                    ac3:'',
                    ac4:'',
                    licence:'',
                    health:'',
                    idCardZ:'',
                    idCardF:'',
                    bossName:'',
                    phone:'',
                },
                region:[],
                attachs:[
                    {
                        type:type.uploadType[0].code,
                        title:type.uploadType[0].name,
                        img:''
                    },{
                        type:type.uploadType[1].code,
                        title:type.uploadType[1].name,
                        img:''
                    },{
                        type:type.uploadType[2].code,
                        title:type.uploadType[2].name,
                        img:''
                    },{
                        type:type.uploadType[3].code,
                        title:type.uploadType[3].name,
                        img:''
                    }
                ]
            }
        },
        watch:{

        },
        mounted(){

        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.reqProxyApply();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 代理入驻添加
             */
            reqProxyApply(){
                let vm = this;
                let postData = {
                    type:vm.oForm.type,
                    proxyName:vm.oForm.proxyName,
                    licenceNo:vm.oForm.licenceNo,
                    corporate:vm.oForm.corporate,
                    idcard:vm.oForm.idcard,
                    ac1:vm.oForm.ac1,
                    ac2:vm.oForm.ac2,
                    ac3:vm.oForm.ac3,
                    ac4:vm.oForm.ac4,
                    bossName:vm.oForm.bossName,
                    phone:vm.oForm.phone,
                };
                vm.REQ.reqProxyAdd(postData,
                    (data) => {
                        vm.$message.success("代理入驻成功！");
                        vm.$emit('setApplyStatus',true);
                        window.location.href = '#/agent/list'
                    },
                    (data) => {},
                    (data) => {}
                )
            },
            getType(val){
                this.oForm.type = val;
            },
            getRegion(val){
                this.oForm.ac1 = val[0];
                this.oForm.ac2 = val[1];
                this.oForm.ac3 = val[2];
            },
            getAc4(val){
                this.oForm.ac4 = val;
            },
            getProxyName(val){
                this.oForm.proxyName = val;
            },
            getLicenceNo(val){
                this.oForm.licenceNo = val;
            },
            getCorporate(val){
                this.oForm.corporate = val;
            },
            getIdcard(val){
                this.oForm.idcard = val;
            },
            getLicence(val){
                this.oForm.licence = val;
                this.attachs[0].img = val;
            },
            getHealth(val){
                this.oForm.health = val;
                this.attachs[1].img = val;
            },
            getIdCardZ(val){
                this.oForm.idCardZ = val;
                this.attachs[2].img = val;
            },
            getIdCardF(val){
                this.oForm.idCardF = val;
                this.attachs[3].img = val;
            },
            getBossName(val){
                this.oForm.bossName = val;
            },
            getPhone(val){
                this.oForm.phone = val;
            }

        }
    }
</script>

<style scoped lang="scss">
.submit_examine{
    margin-top: 30px;
}
</style>