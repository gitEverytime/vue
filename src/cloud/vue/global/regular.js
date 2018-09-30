export default {
    /**
     * 电话号码/手机号正则验证
     */
    number(){
        return /^1[3|4|5|6|7|8][0-9]\d{8}$/
    },
    /**
     * 身份证号码正则验证
     */
    idCard(){
        return /(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/
    },
    /**
     * 匹配以字母开头字母开头，英文和数字混合的6-20位(密码/用户名)数字正则验证
     */
    passwordReg(){
        return /^[a-zA-Z]([a-zA-Z0-9]{5,20})$/
    },

    /**
     * 只能输入数字正则
     */
    num(){
        return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/
    },

    /**
     * element-ui自定义验证函数
     *
     */

    /**
     * 输入的电话号码验证
     * @param rule
     * @param value
     * @param callback
     */
    validateNumber(rule, value, callback){
        if (value === '') {
            callback(new Error('请输入您的手机号'));
        } else if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
            callback(new Error('手机号码格式不正确'));
        } else {
            callback();
        }
    },

    /**
     * 身份证校验
     * @param rule
     * @param value
     * @param callback
     */
    validateIDcard(rule, value, callback) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (value === '') {
            callback(new Error('请输入身份证号码'));
        }else if(!reg.test(value)){
            callback(new Error('请确认您的身份证号码是否正确'));
        } else {
            callback();
        }
    },

    /**
     * 密码验证
     * @param rule
     * @param value
     * @param callback
     */
    validatePass(rule, value, callback) {
        let reg = /^[a-zA-Z]([a-zA-Z0-9]{5,20})$/;
        if (value === '') {
            callback(new Error('请输入密码'));
        }else if(!reg.test(value)){
            callback(new Error('请输入字母开头，英文和数字混合的6-20位数字'));
        } else {
            callback();
        }
    },

    /**
     * 银行卡号码验证
     * @param rule
     * @param value
     * @param callback
     */
    validateBank(rule, value, callback) {
        let reg = /^([1-9]{1})(\d{14}|\d{18}|\d{19})$/;
        if (value === '') {
            callback(new Error('请输入您的银行卡号'));
        }else if(!reg.test(value)){
            callback(new Error('请输入正确的银行卡位数'));
        } else {
            callback();
        }
    },


}
