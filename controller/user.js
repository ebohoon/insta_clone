const { signUpSchema,idCheckSchema,nicknameSchema,postLoginSchema } = require('../routers/joi');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

module.exports = {
  //회원가입
  signup: async (req, res, next) => {
    //각 변수를 req.body로 받음
    const { nickname, userId, password, confirmPassword } =
      await signUpSchema.validateAsync(req.body);
    //패스워드 일치 시
    if (password == confirmPassword) {
      //비밀번호 암호화
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      //user가 있는지 찾아봄
      try {
        const userExist = await User.findOne({
          userId: userId,
        });
        //유저가 없으면
        if (!userExist) {
          //데이터베이스에 정보 입력
          const user = new User({
            nickname,
            userId,
            password: encryptedPassword,
          });
          await user.save();
          return res.status(200).json({});
          //유저가 있으면
        } else {
          //400 반환
          return res.status(401).json({
            errorMessage: '중복 아이디 입니다.',
          });
        }
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
    //id,password Validation에 실패하면
    else {
      res.status(401).json({
        errorMessage: '(작성 형식에 맞지 않아)회원가입에 실패하셨습니다.',
      });
    }
  },

  //닉네임 중복체크
  nicknameCheck: async (req, res, next) => {
    const { nickname } = await nicknameSchema.validateAsync(req.body);
    try {
      const userExist = await User.findOne({
        nickname: nickname,
      });
      if (!userExist) {
        res.status(200).json({});
      } else {
        res.status(401).json({ errorMessage: '닉네임이 중복됩니다.' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  //아이디 중복체크
  idCheck: async (req, res, next) => {
    const { userId } = await idCheckSchema.validateAsync(req.body);
    try {
      const userExist = await User.findOne({
        userId: userId,
      });
      if (!userExist) {
        res.status(200).json({});
      } else {
        res.status(400).json({ errorMessage: '아이디가 중복됩니다.' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  //로그인
  login: async (req, res, next) => {
    //body로 userId, password 를 전달 받아 벨리데이션 거침
    const { userId, password } = await postLoginSchema.validateAsync(req.body);
    //User 모델에서 전달받은 데이터와 같은 userId를 찾아 user에 담음
    const user = await User.findOne({
      userId,
    });
    if (!user) {
      return res
        .status(401)
        .send({ msg: '이메일 또는 패스워드가 정확하지 않습니다' });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res
        .status(401)
        .send({ msg: '이메일 또는 패스워드가 정확하지 않습니다' });
      //SECRET_KEY로 인증된 JWT 토근을 token에 담아 status(200)과 함께 json형태로 전송
    } else {
      const token = jwt.sign({ userId }, process.env.SECRET_KEY);
      res.status(200).json({ token, msg: '로그인성공' });
    }
  },
};

//로그인

//   passwordValidation(userId, password, passwordCheck) {
//     if (password !== passwordCheck) {
//       // console.log('패스워드 일치시켜주세요');
//       return false;
//     } else if (password.search(userId) !== -1) {
//       // console.log('아이디와 중복되는 패스워드 설정하지 말아주세요');
//       return false;
//     }
//     return true;
//   },
// };
