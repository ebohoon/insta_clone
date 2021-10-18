const jwt = require("jsonwebtoken");
const Users = require("../schema/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      const userFind = await Users.findOne({ userID: userID });
      res.locals.user = userFind.userID;
      next();
    } else {
      //토큰이 없는 경우 튕겨나가게 하기 위해
      console.log(
        `method: ${req.method}, url: ${req.originalUrl}, 인증받지 않는 사용자`
      );
      return res
        .status(401)
        .send({ msg: "권한이 없습니다. 로그인 후 이용해주세요." });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ msg: "로그인 오류입니다. 관리자를 호출하세요." });
    return;
  }
};
