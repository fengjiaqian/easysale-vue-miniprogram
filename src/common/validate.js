//验证手机号
function verifyPhone(val) {
    if(!val) return false
    let reg = !!val.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    return reg
}

//验证身份证号
function verifyIdCard(val) {
    if(!val) return false
    let reg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    return reg.test(val)
}

//验证名称是否带有中文
function checkChinese(val){
    if(!val) return false
    let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    return reg.test(val)
}

export {
    verifyPhone,
    verifyIdCard,
    checkChinese
}