/*
 * @Author: jgg 
 * @Date: 2018-04-04 15:15:44 
 * @Last Modified by: jgg
 * @Last Modified time: 2018-06-27 21:21:13
 * @Describe  IM 消息类型
 */


module.exports = {
    E_SOCKET_STORE_COMFRIM_ORDER: 100,   //商家确认订单
    E_SOCKET_USER_COMFRIM_ORDER: 101,    //用户确认订单
    E_SOCKET_CALL_WAITER: 102,           //呼叫服务员
    E_SOCKET_USER_ENTER: 103,            //用户进场
    E_SOCKET_UPDATE_ORDERLIST_STATE: 104, //更新订单状态 [点菜 - 0、确认 - 1、制作 - 2]
    E_SOCKET_PAY_END: 106,                //支付完毕 [0:支付失败  1：成功]
    E_SOCKET_UPDATA_ORDERLIST: 107,       //更新订单
    E_SOCKET_UPDATA_CART: 108,            //更新购物车

    E_SHOW_TOAST_INFO: 'E_SHOW_TOAST_INFO' //显示加减菜toast
}