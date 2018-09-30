const validatePass = (rule, value, callback) => {
    let reg = /^[a-zA-Z]([a-zA-Z0-9]{5,20})$/;
    if (value === '') {
        callback(new Error('请输入密码'));
    }else if(!reg.test(value)){
        callback(new Error('请输入字母开头，英文和数字混合的6-20位数字'));
    } else {
        if (this.ruleForm.repwd !== '') {
            this.$refs.ruleForm.validateField('repwd');
        }
        callback();
    }
};

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

const validatePass3 = (rule, value, callback) => {
    const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
    if (value === '') {
        callback(new Error('请输入您的手机号'));
    } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'));
    } else {
        callback();
    }
};

export default {
    validatePass,
    validatePass2,
    validatePass3
}