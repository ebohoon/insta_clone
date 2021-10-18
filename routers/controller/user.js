const Users = require('../../schema/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
//library 폴더에 회원가입 폼과 공통된 에러메세지 출력을 위한 임포트
const { CheckRegister } = require('../../library/signup');
const printError = require('../../library/error');

//회원가입 등록  확인완료
SignupUser = async (req, res, next) => {
  try {
    const UserSchema = Joi.object({
      userId: Joi.string()
        .min(3)
        .pattern(/^[a-z0-9]{3,10}/)
        .required(),
      nickname: Joi.string()
        .min(3)
        .pattern(/^[a-z0-9]{3,10}/)
        .required(),
      password: Joi.string()
        .min(4)
        .pattern(new RegExp('^[a-z0-9]{4,10}$'))
        .required(),
      confirmPassword: Joi.ref('password'),
    });

    const { userId, nickname, password, confirmPassword } =
      await UserSchema.validateAsync(req.body);
    const CheckBody = await CheckRegister(
      userId,
      nickname,
      password,
      confirmPassword
    );

    if (await Users.findOne({ userId })) {
      res.send({ msg: '이미 존재하는 아이디입니다' });
    } else if (await Users.findOne({ nickname })) {
      res.send({ msg: '이미 존재하는 닉네임입니다' });
    } else if (CheckBody) {
      res.send(CheckBody);
    } else {
      const Encryptpassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT)
      );
      await Users.create({ nickname, userId, password: Encryptpassword });
      res.status(200).send({ msg: 'success' });
    }
  } catch (err) {
    printError(req, err);
    next(err);
  }
};

//ID 중복확인 체크
CheckDuplicatedID = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const existUsers = await Users.findOne({ userId });
    if (existUsers) {
      res.send({ msg: '이미 존재하는 아이디입니다.' });
    } else {
      res.send({ msg: '사용 가능한 아이디입니다' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

//Nickname 중복확인 체크
CheckDuplicatedNickname = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    const existNickname = await Users.findOne({ nickname });
    if (existNickname) {
      res.send({ msg: '이미 존재하는 닉네임입니다.' });
    } else {
      res.send({ msg: '사용 가능한 닉네임입니다' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

//로그인 페이지 허용, 로그인한 유저는 튕겨져 나감
GetLoginPage = (req, res, next) => {
  try {
    if (res.locals.user) {
      console.log(res.locals.user);
      res.send({ msg: 'success' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

//로그인 시도
TryLogin = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    const user = await Users.findOne({ userId });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        //로그인 성공시 토큰 생성
        const token = jwt.sign(
          { userId: user.userId },
          process.env.SECRET_KEY,
          { expiresIn: '5d' }
        );
        console.log(`발급된 토큰: ${token}\n 로그인 성공`);
        res.send({ msg: 'success', token: token });
      } else {
        res.send({ msg: '아이디 또는 비밀번호가 틀렸습니다.' });
      }
    } else {
      res.send({ msg: '존재하지 않는 아이디입니다.' });
    }
  } catch (err) {
    printError(req, err);
    next();
  }
};

module.exports = {
  SignupUser,
  CheckDuplicatedID,
  CheckDuplicatedNickname,
  GetLoginPage,
  TryLogin,
};
