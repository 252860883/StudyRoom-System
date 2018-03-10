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
    let isNew = await Student.find({
        stuId: params.stuId
    });
    if (!isNew.length) {
        let docs = await Student.create(params);
        return true;
    } else {
        return false;
    }
}
// 修改个人资料
module.exports.modify=async function(params){
    // let stuIdOk= await Student.find({
    //     stuId:params.stuId
    // });
    // 如果学号存在则修改信息
    // if(stuIdOk){
        console.log(params);
        let updates = {$set: params};
        let hasModify=await Student.update({'stuId' : '1411651104'}, {$set:{'name':"测试"}});
        return hasModify;
    // }
}