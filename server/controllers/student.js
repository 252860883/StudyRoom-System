const mongoose = require('mongoose');
const Student = mongoose.model('student');

/**
 * 封装一系列和用户有关的方法
 */

// 登陆
module.exports.login = async function (params) {
    let docs = await Student.find({
        stuId: params.stuId,
        password: params.password
    });
    return docs.length ? true : false;
}

// 注册
module.exports.register = async function (params) {
    console.log(params);
    let isNew = await Student.find({
        stuId: params.stuId
    });
    console.log(isNew)
    if (!isNew.length) {
        let docs = await Student.create(params);
        return true;
    } else {
        return false;
    }

}