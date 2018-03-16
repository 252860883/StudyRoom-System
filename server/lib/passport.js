// passport.js
const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy


// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user)
  done(null, user.id)
})

// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(id, done) {
  console.log('deserializeUser: ', id)
  var user = {id: 1, username: 'admin', password: '123456'}
  done(null, user)
})

// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email',
  // passwordField: 'passwd'
}, function(username, password, done) {
  console.log('LocalStrategy', username, password)
  var user = {id: 1, username: username, password: password}
  done(null, user, {msg: 'this is a test'})
  // done(err, user, info)
}))

module.exports = passport;