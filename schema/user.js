const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
      min: 3,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Users', UsersSchema);
