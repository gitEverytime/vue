<template>
    <div>
        <el-row>
            <el-col :span="21">
                <el-tabs class="labelPage" v-model="editableTabsValue2" type="card">
                    <el-tab-pane
                            v-for="(item, index) in editableTabs2"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                    >
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="3" style="text-align: right">
                <el-button type="primary" @click="editableTabs2.push({
                    title: '宁夏银川唐徕店',
                    name: '3',
                })">+新增分店</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        components:{

        },
        data(){
            return{
                editableTabsValue2: '2',
                editableTabs2: [{
                    title: '宁夏银川唐徕店',
                    name: '1',
                }, {
                    title: '宁夏银川贺兰店',
                    name: '2',
                }],
                tabIndex: 2
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/common.scss";
    .footer{
        margin-top: 20px;
        p{
            color: $light_gray;
        }
    }
</style>