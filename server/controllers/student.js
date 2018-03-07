const mongoose=require('mongoose');
const Student=mongoose.model('Student');

/**
 * 封装一系列和用户有关的方法
 */

// 登陆
module.exports.login= async function(params){
    let docall=await Student.find();
    console.log('all'+docall);
    let docs= await Student.find({password:'456'});
    console.log(docs);
    return docs.length ? true :false; 
}

// 注册
module.exports.resigter= async function(params){
    console.log('注册');
    let docs= await mongoose.create(params); 
}


