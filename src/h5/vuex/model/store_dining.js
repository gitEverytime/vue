import REQ from "../../vue/screen_private/comm/request.js";

var state = {
    menuData: [], //所有菜品数据
    menuDataMap: {}, //菜品数据索引
    cartes: [],   //当前类别菜品数据
    currTypeIndex: 0, //当前菜品类别的索引值
    currTypeName: '', //当前菜品类别的名称
    currFood: {},     //当前菜品
    currTastes: [],  //当前菜品口味列表
    diningInfo: {},   //用户参与点餐的相关信息
    diningOrderId: null, //订餐订单id
    diningTableName: '', //用户桌号
    shopCarData: [],     //购物车数据
    shopCarTypeData: {}, //购物车带类型数据
    shopCarTotalPrice: 0, //购物车总价
    shopCarCount: 0,     //购物车总数量
    eatType: 1,          //就餐类型： 1:堂食 2：外带
    remark: '',          //整单备注
    orderState: 1,       //订单状态 0：点菜 1：用户确认  2：商家确认后厨制作中
    resultState: 1,      //结果状态  1：支付成功  2:取消订单
    payState: 0,         //支付状态  0：未支付 1：支付中 2：支付成功
};


var getters = {
    getMenuData: (state) => state.menuData,
    getCartes: (state) => state.cartes,
    getTypeIndex: (state) => state.currTypeIndex,
    getTypeName: (state) => state.currTypeName,
    getCurrFood: (state) => state.currFood,
    getCurrTastes: (state) => state.currTastes,
    getDiningInfo: (state) => state.diningInfo,
    getDiningOrderId: (state) => state.diningOrderId,
    getDiningTableName: (state) => state.diningTableName,
    getShopCarData: (state) => state.shopCarData,
    getShopCarTypeData: (state) => state.shopCarTypeData,
    getShopCarTotalPrice: (state) => state.shopCarTotalPrice,
    getShopCarCount: (state) => state.shopCarCount,
    getMenuDataMap: (state) => state.menuDataMap,
    getEatType: (state) => state.eatType,
    getRemark: (state) => state.remark,
    getOrderState: (state) => state.orderState,
    getResultState: state => state.resultState,
    getPayState: state => state.payState,
}

var actions = {}

var mutations = {
    storeMenuData: (state, params) => {
        REQ.reqGetDiningMenuData(params,
            (res) => {
                state.menuData = res.data.carteTypes
                if (state.menuData.length) {
                    state.cartes = state.menuData[state.currTypeIndex].cartes
                    state.currTypeName = state.menuData[state.currTypeIndex].carteType.typeName
                    state.menuDataMap = createMenuDataMap([...state.menuData])
                }
                mutations.storeShopCarData(state)
            },
            (complete) => {
            },
            (err) => {
                console.error(err)
            }
        )
    },

    storeUpdateCartes: (state, index) => {
        state.currTypeIndex = index
        state.cartes = state.menuData[index].cartes
        state.currTypeName = state.menuData[state.currTypeIndex].carteType.typeName
    },

    storeUpdateFood: (state, food) => {
        state.currFood = food
        state.currTastes = state.currFood.carteTaste.split("、")
    },

    storeUpdateDiningInfo: (state, info) => {
        state.diningInfo = info
        if (info.order) state.diningOrderId = info.order.id
        if (info.tables) {
            let name = ''
            info.tables.forEach(item => name += item.tableName)
            state.diningTableName = name
        }
    },

    storeUpdateDiningId: (state, id) => {
        state.diningOrderId = id
    },

    storeUpdateDiningName: (state, name) => {
        state.diningTableName = name
    },

    storeUpdateDinerCount: (state, count) => {
        state.diningInfo.order.dinerCount = count
    },

    storeShopCarData: (state, info) => {
        REQ.reqDiningShopcarDetail({orderId: state.diningOrderId},
            (res) => {
                if (info && state.menuDataMap[info.typeId][info.carteId].count == 1 && info.countChange == "-1") {
                    state.menuDataMap[info.typeId].count--
                    state.menuDataMap[info.typeId][info.carteId].count--
                }
                state.shopCarTotalPrice = Number(res.data.price)
                state.shopCarCount = res.data.count
                state.shopCarData = res.data.records
                state.menuDataMap = addCountToMenu({...state.menuDataMap}, res.data.types)
                state.shopCarTypeData = formatShopCarData([...state.shopCarData])
            },
            (complete) => {
            },
            (err) => {
                console.error(err)
            }
        )
    },

    storeUpdateEatType: (state, type) => {
        state.eatType = type
    },

    storeUpdateRemark: (state, remark) => {
        state.remark = remark
    },

    storeUpdateOrderState: (state, orderState) => {
        state.orderState = orderState
    },

    storeUpdateResultState: (state, resultState) => {
        state.resultState = resultState
    },

    storeUpdatePayState: (state, payState) => {
        state.payState = payState
    },

}

function addCountToMenu(menuDataMap, types) {
    types.forEach(item => {
        menuDataMap[item.id].count = item.count
        item.cartes && item.cartes.forEach(i => {
            menuDataMap[item.id][i.id].count = i.count
        })
    })
    return menuDataMap
}

function createMenuDataMap(menuData) {
    let menuDataMap = {}
    menuData.forEach(item => {
        menuDataMap[item.carteType.id] = {typeName: item.carteType.typeName}
        item.cartes && item.cartes.forEach(i => {
            menuDataMap[item.carteType.id][i.id] = i
        })
    })
    return menuDataMap
}

function formatShopCarData(shopCarData) {
    let shopCarTypeData = {}
    shopCarData.forEach(item => {
        if (!shopCarTypeData[item.typeName]) {
            shopCarTypeData[item.typeName] = []
        }
        shopCarTypeData[item.typeName].push(item)
    })
    return shopCarTypeData
}

export default {
    state,
    getters,
    actions,
    mutations
}