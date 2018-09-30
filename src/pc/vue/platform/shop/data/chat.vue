<template>
    <div class="chat">
        <div class="box">
            <schart :canvasId="canvasId"
                :type="type"
                :width="width"
                :height="height"
                :data="data"
                :options="options"
            >
            </schart>

        </div>

    </div>
</template>

<script>
import $  from 'jquery';

import Schart from 'vue-schart';

import U from '../../../../../libs/util.js';

var api_domain = window.CFG.API_DOMAIN;



export default {
    
    components:{  Schart  },

    data(){
        return{
            canvasId: 'myCanvas',
			type: 'pie',
			width: 500,
			height: 400,
			data: [
				{name: '霸屏', value: 1342},
				{name: '点餐', value: 2123},
				{name: '打赏', value: 1654},
				{name: '红包', value: 1795},
			],
			options: {
				padding: 50,                   // canvas 内边距
                bgColor: '#FFFFFF',            // 默认背景颜色
                title: '今日数据',// 图表标题
                titleColor: '#000000',         // 图表标题颜色
                titlePosition: 'top',      // 图表标题位置: top / bottom
                legendColor: '#000000',         // 图例文本颜色
                legendTop: 40,               // 图例距离顶部的长度
                colorList: ['#1E9FFF','#13CE66','#F7BA2A','#FF4949','#72f6ff'],   // 环形图颜色列表
                radius: 100,                     // 环形图外圆半径
                innerRadius: 70            // 环形图内圆半径
			}
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


<style  lang='scss'   scoped>
@import '../../../../../style/sass/mixin.scss';

.chat{ margin: auto; margin-top: 40px;   width: 500px; height: 500px; }




</style>


