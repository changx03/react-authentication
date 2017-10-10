const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
    lowercase: true
  },
  password: String,
  name: {
    type: String,
    lowercase: true
  }
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

// Pre-save hook method
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt((saltErr, salt) => {
    if (saltErr) {
      return next(saltErr);
    }

    return bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
