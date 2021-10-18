const mongoose = require('mongoose');
const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/Cloneinsta", {
    .connect(
      'mongodb://wonho:gh2514180@52.78.125.172:27017/Cloneinsta?authSource=admin',
      {
        ignoreUndefined: true,
      }
    )
    .catch((err) => console.log(err));
};
mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});
module.exports = connect;
