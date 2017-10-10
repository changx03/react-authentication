const mongoose = require('mongoose');
// const User = require('./user');

module.exports.connect = (uri) => {
  mongoose.connect(uri, {
    useMongoClient: true
  });
  mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error(`Mongoose connection error - ${err}`);
    process.exit(1);
  });
};
