const express = require('express');
const router = express.Router();
const { signup, nicknameCheck,idCheck,login } = require('../controller/user');

//회원가입
router.post('/signup', signup);

//닉네임 중복확인
router.post('/checkupNick', nicknameCheck);

//아이디 중복확인
router.post('/checkupId', idCheck);

//로그인
router.post('/auth', login);


module.exports = router;