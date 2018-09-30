export default {
    //艺人角色
    1:'歌手',
    2:'舞蹈',
    3:'吉他手',
    4:'DJ',
    5:'MC',
    6:'贝斯',
    7:'鼓手',
    8:'DMC',
    9:'主持人',
    10:'其他',

    //switch切换色值
    activeColor:'#00B594',
    inactiveColor:'#877f7f',

    //switch切换值
    activeValue:'1',
    inactiveValue:'0',

    //商户类型/店面类型
    storeType:[
        {
            id:'1',
            name:'酒吧'
        },{
            id:'2',
            name:'餐吧'
        },{
            id:'3',
            name:'KTV'
        },{
            id:'4',
            name:'慢摇'
        },{
            id:'5',
            name:'火锅'
        },{
            id:'6',
            name:'小吃[ 麻辣烫,小吃,煎炸,地方特色]'
        },{
            id:'7',
            name:'面馆'
        },{
            id:'8',
            name:'商超'
        },{
            id:'9',
            name:'婚庆'
        }
    ],
    //服务人员类型
    staffType:[
        {
            id:'100',
            name:'BOSS'
        },{
            id:'101',
            name:'股东'
        },{
            id:'102',
            name:'服务人员'
        },{
            id:'103',
            name:'厨师'
        },{
            id:'104',
            name:'收银员'
        }
    ],
    //上传类型
    uploadType:[
        {
            code:'c010',
            name:'营业执照'
        },{
            code:'c030',
            name:'卫生许可证'
        },{
            code:'c021',
            name:'身份证(正面)'
        }, {
            code:'c020',
            name:'身份证(反面)'
        }
    ],
    classifyList:[
        {type: '1', name: '酒类'},
        {type: '2', name: '烧烤'},
        {type: '3', name: '凉菜'},
        {type: '4', name: '热菜'},
    ],
    //互动类型
    interactList: [{
        type: '',
        label: '全部'
    }, {
        type: '3',
        label: '霸屏'
    }, {
        type: '8',
        label: '霸麦-真心话'
    },{
        type: '9',
        label: '霸麦-好声音'
    },{
        type: '7',
        label: '实物打赏'
    },{
        type: '1',
        label: '点歌'
    }, {
        type: '2',
        label: '点舞'
    },{
        type: '4',
        label: '私人红包'
    }, {
        type: '5',
        label: '全场红包'
    }],
    onScreenList:[
        {
            type: '1',
            name:'炫酷霸屏'
        },{
            type: '2',
            name:'重金霸屏'
        },{
            type: '3',
            name:'主题霸屏'
        }
    ],
    payList:[
        {
            type:'0',
            code:'PAY_GB',
            name:'果币支付'
        },{
            type:'1',
            code:'PAY_WECHAT',
            name:'微信支付'
        },{
            type:'2',
            code:'PAY_ALIPAN',
            name:'支付宝支付'
        },{
            type:'3',
            code:'PAY_BANK',
            name:'银行卡支付'
        },{
            type:'4',
            code:'PAY_TYPE_VIP',
            name:'会员支付'
        },{
            type:'5',
            code:'PAY_TYPE_CASH',
            name:'现金支付'
        }
    ],
    bankList:[
        {
            code:'bk_001',
            name:'中国银行'
        },{
            code:'bk_002',
            name:'中国工商银行'
        },{
            code:'bk_003',
            name:'中国农业银行'
        },{
            code:'bk_004',
            name:'中国建设银行'
        },{
            code:'bk_005',
            name:'交通银行'
        },{
            code:'bk_006',
            name:'中国邮政储蓄银行'
        },{
            code:'bk_007',
            name:'招行银行'
        },{
            code:'bk_008',
            name:'黄河农村商业银行'
        },
    ],
    identList:[
        {
            code:'c_001',
            name:'身份证'
        }
    ],
    actorList:[
        {
            type:'1',
            name:'歌手'
        },{
            type:'2',
            name:'舞蹈'
        },{
            type:'3',
            name:'吉他手'
        },{
            type:'4',
            name:'DJ'
        },{
            type:'5',
            name:'MC'
        },{
            type:'6',
            name:'贝斯'
        },{
            type:'7',
            name:'鼓手'
        },{
            type:'8',
            name:'DMC'
        },{
            type:'9',
            name:'主持人'
        },{
            type:'10',
            name:'其他'
        }
    ]


}