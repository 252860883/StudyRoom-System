// "use strict";

// const mongoose = require("mongoose");
// const deepFreeze = require("deep-freeze-strict");
// const requireDir = require('require-dir');
// const staticConfigs = require("../staticConfigs");

// mongoose.Promise = global.Promise;

// module.exports = async function () {
//   if (mongoose.connection.readyState === 0) {
//     mongoose.connection.on("error", function (err) {
//       console.error(err);
//       console.info("Exit process.");
//       process.exit(1);
//     });
//     await mongoose.connect(staticConfigs.mongoDB.uri, staticConfigs.mongoDB.options);
//     console.info("Database connected.");
//   }
//   loadAllMongooseModel();
// };


// function loadConfigFromMongo() {
//   return mongoose.connection.db.collection('parentsconfigs').findOne()
//     .then(doc => {
//       global.CONFIG = deepFreeze(JSON.parse(JSON.stringify(doc)));
//     })
//     .catch(err => console.error('load configs from mongodb error', err));
// }

// function loadAllMongooseModel () {
//   requireDir('../models');
// }