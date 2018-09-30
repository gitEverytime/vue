let Logger = {};

const showLog = true

Logger.install = function (Vue) {
    console.log('%c' + '             http://www.ibigtop.com                       ', 'color:blue')
    console.log('%c' + '     ***********        *******          **********       ', 'color:green')
    console.log('%c' + '     ***      ***         ***          ******             ', 'color:green')
    console.log('%c' + '     ***       ***        ***         ***                 ', 'color:green')
    console.log('%c' + '     ***      ***         ***        ***                  ', 'color:green')
    console.log('%c' + '     *** *******          ***        ***                  ', 'color:green')
    console.log('%c' + '     ***      ***         ***        ***        ******    ', 'color:green')
    console.log('%c' + '     ***       ***        ***         ***       **  **    ', 'color:green')
    console.log('%c' + '     ***      ***         ***           ***     **  **    ', 'color:green')
    console.log('%c' + '     *********         **********         *******         ', 'color:green')
    console.log('%c' + '            @copyright 2018~2020 毕果科技                  ', 'color:red')

    function objLog(msg) {
        if (typeof msg === "object") {
            showLog && console.log('%c' + JSON.stringify(msg, null, 2), "color: salmon")
            return false
        }
        return true

    }

    Vue.prototype.$logger = function (msg) {
        if (!objLog(msg)) return
        showLog && console.log('%c' + msg, "color: #66f")
    }

    Vue.prototype.$logger.info = function (msg) {
        if (!objLog(msg)) return
        showLog && console.info('%c' + msg, "color: green")
    }

    Vue.prototype.$logger.warn = function (msg) {
        showLog && console.warn(msg)
    }

    Vue.prototype.$logger.error = function (msg) {
        showLog && console.error(msg)
    }
}
module.exports = Logger;
