let qiniu = require('qiniu')

module.exports.getQiNiuToken = function () {
    var accessKey = 'R-q8c7Q49D0OVqu-QNp9VcV2ONWDZL3tuDckGLGM';
    var secretKey = 'U4_4u-w8dpTPVN8fe1tOhBFmFINUyQ4VrdQQaE_6';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var options = {
        scope: "selfroom-avatar",
        // callbackUrl: 'http://p6tfuzc6r.bkt.clouddn.com/${key}',
        // callbackBody: 'key=$(key)&hash=$(etag)&bucket=$(bucket)&fsize=$(fsize)&name=$(x:name)'
    };
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0;

    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}



