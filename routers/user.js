const express = require('express');
const router = express.Router();
const {
  SignupUser,
  CheckDuplicatedID,
  CheckDuplicatedNickname,
  TryLogin,
  GetLoginPage,
} = require('./controller/user');
const authUser = require('../middlewares/authMiddleware');

router
  .route('/signup')
  // 회원가입 등록에 대한 API
  .post(SignupUser);

router
  .route('/checkupId')
  // 회원가입 페이지 ID중복확인
  .post(CheckDuplicatedID);

router
  // 회원가입 페이지 Nickname중복확인
  .route('/checkupNick')
  .post(CheckDuplicatedNickname);

router
  .route('/auth')
  //로그인 페이지 렌더링
  .get(authUser, GetLoginPage)
  //로그인 이벤트
  .post(TryLogin);

module.exports = router;
