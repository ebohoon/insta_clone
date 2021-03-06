const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
      },
    userId: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model('User', userSchema);