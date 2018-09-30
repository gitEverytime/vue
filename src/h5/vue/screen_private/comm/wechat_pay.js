import REQ from './request'

function startPay(data) {
    return new Promise((resolve, reject) => {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data, (result, error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }), false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data, (result, error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }));
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(data, (result, error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }));
            }
        } else {
            onBridgeReady(data, (result, error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }
    })
}

function onBridgeReady(data, callback) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": data.appId,     //公众号名称，由商户传入
            "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr": data.nonceStr, //随机串
            "package": data.package,
            "signType": data.signType,         //微信签名方式：
            "paySign": data.paySign //微信签名
        },
        function (res) {
            // alert(JSON.stringify(res))
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                let timer = setInterval(() => {
                    REQ.reqOrderQueryStatus({oid: data.oid},
                        (response) => {
                            if (response.data.status == 1) {
                                callback(response, null)
                                clearInterval(timer)
                            }
                        },
                        (complete) => {
                        },
                        (err) => {
                            callback(null, err)
                            clearInterval(timer)
                            console.error(err)
                        })
                }, 500)
            } else {
                callback(null, {msg: '支付取消'})
            }
        }
    );
}


export default {
    startPay
}

