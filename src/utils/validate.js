// 过滤特殊字符,用export暴露出去
export function stripscript(str) {
    var pattern = new RegExp(
        "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~!@#￥……&*（）&;——|【】 ‘；：”“’。，、？]"
    );
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, "");
    }
    return rs;
}
//验证邮箱
export function validateEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!reg.test(value)) {
        return false
    } else {
        return true
    }
}
//验证密码 6-20位数字+密码
export function validatePass(value) {
    //密码正则表达式验证
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (!reg.test(value)) {
        return false
    } else {
        return true
    }
}

//验证验证码
export function validateVcode(value) {
    //验证码正则表达式验证
    let reg = /^[a-z0-9]{6}$/;
    if (!reg.test(value)) {
        return false
    } else {
        return true
    }
}
