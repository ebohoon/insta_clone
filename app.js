const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

//mongodB연결
const connect = require('./schema');
connect();
//mongodB연결

//morgan
app.use(morgan('dev'));

//cors
// app.use(
//   cors({
//     origin: true,
//     //   origin: 'http://hanghaesherpa.s3-website.ap-northeast-2.amazonaws.com',
//     credentials: true,
//   })
// );

//routing
const router = require('./routers/user');
const { errorHandler }= require('./middlewares/errorHandler');

//parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));

//routing
app.use('/user', router);

//errorHandler
app.use(errorHandler);

module.exports = http;