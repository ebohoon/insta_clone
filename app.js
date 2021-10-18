const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const cors = require('cors');
const connect = require('./schema');
connect();
require('dotenv').config(); //환경변수를 위해 사용 , 포트번호 시크릿키

// middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use('/', mainPageRouter);
app.use('/user', userRouter);

module.exports = app;
