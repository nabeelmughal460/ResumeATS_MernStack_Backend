const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        default:"user"
    },
    photoURL: {
      type: String,
    },
  },
  { timestamps: true } 
);

// module.exports = mongoose.model('User', userSchema);
// const userModel = mongoose.model('User', userSchema);
// module.exports = { userModel };
// const UserModel = mongoose.model('user', userSchema);
// module.exports = UserModel;  // export directly
module.exports = mongoose.model('user', userSchema);
